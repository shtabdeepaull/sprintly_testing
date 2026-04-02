import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineFolder,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineExclamation
} from 'react-icons/hi';
import { useOrganization } from '../hooks/useOrganization';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { getSocket, connectUserRoom } from '../services/socket';
import Card, { CardHeader, CardTitle, CardContent } from '../components/common/Card';
import Loader from '../components/common/Loader';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';
import { TASK_PRIORITIES } from '../utils/constants';
import { getRelativeTime } from '../utils/helpers';

const Dashboard = () => {
  const { currentOrganization } = useOrganization();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    if (!currentOrganization || !user?._id) return;

    try {
      setLoading(true);

      const analyticsRes = await api.get('/analytics/dashboard', {
        params: { organization: currentOrganization._id }
      });
      setAnalytics(analyticsRes.data.data);

      const tasksRes = await api.get('/tasks', {
        params: {
          organization: currentOrganization._id,
          assignee: user._id,
          limit: 5
        }
      });

      setRecentTasks((tasksRes.data.data || []).slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentOrganization, user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (!user?._id) return;

    connectUserRoom(user._id);
    const socket = getSocket();

    const handleRealtimeTaskAssigned = async (payload) => {
      const sameOrg =
        !currentOrganization?._id ||
        payload?.organizationId === currentOrganization._id;

      if (!sameOrg) return;

      await fetchDashboardData();
    };

    const handleRealtimeTaskUpdated = async (payload) => {
      const sameOrg =
        !currentOrganization?._id ||
        payload?.organizationId === currentOrganization._id;

      if (!sameOrg) return;

      await fetchDashboardData();
    };

    socket.on('task_assigned_realtime', handleRealtimeTaskAssigned);
    socket.on('task_updated_realtime', handleRealtimeTaskUpdated);

    return () => {
      socket.off('task_assigned_realtime', handleRealtimeTaskAssigned);
      socket.off('task_updated_realtime', handleRealtimeTaskUpdated);
    };
  }, [user, currentOrganization, fetchDashboardData]);

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  const stats = [
    {
      label: 'Total Projects',
      value: analytics?.overview?.totalProjects || 0,
      icon: HiOutlineFolder,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Total Tasks',
      value: analytics?.overview?.totalTasks || 0,
      icon: HiOutlineClipboardList,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Team Members',
      value: analytics?.overview?.totalMembers || 0,
      icon: HiOutlineUsers,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      label: 'Overdue Tasks',
      value: analytics?.overview?.overdueTasks || 0,
      icon: HiOutlineExclamation,
      color: 'bg-red-100 text-red-600'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      todo: 'bg-secondary-100 text-secondary-700',
      in_progress: 'bg-blue-100 text-blue-700',
      review: 'bg-yellow-100 text-yellow-700',
      done: 'bg-green-100 text-green-700'
    };
    return colors[status] || colors.todo;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          Welcome back, {user?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-secondary-500 mt-1">
          Here's what's happening in {currentOrganization?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              <p className="text-sm text-secondary-500">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>My Tasks</CardTitle>
              <Link
                to="/my-tasks"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {recentTasks.length > 0 ? (
                <div className="space-y-3">
                  {recentTasks.map(task => (
                    <Link
                      key={task._id}
                      to={`/tasks/${task._id}`}
                      className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-mono text-secondary-500">
                          {task.key}
                        </span>
                        <span className="text-sm font-medium text-secondary-900 truncate">
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge
                          size="sm"
                          className={TASK_PRIORITIES[task.priority]?.color}
                        >
                          {task.priority}
                        </Badge>
                        <Badge size="sm" className={getStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-secondary-500">
                  <HiOutlineClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No tasks assigned to you yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.tasksByStatus?.map(item => {
                  const total = analytics?.overview?.totalTasks || 1;
                  const percentage = Math.round((item.count / total) * 100);

                  return (
                    <div key={item._id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-secondary-600 capitalize">
                          {item._id?.replace('_', ' ') || 'Unknown'}
                        </span>
                        <span className="font-medium text-secondary-900">
                          {item.count}
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            item._id === 'done' ? 'bg-green-500' :
                            item._id === 'in_progress' ? 'bg-blue-500' :
                            item._id === 'review' ? 'bg-yellow-500' :
                            'bg-secondary-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics?.recentActivity?.length > 0 ? (
                <div className="space-y-4">
                  {analytics.recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar
                        src={activity.user?.avatar}
                        name={activity.user?.fullName}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="text-sm text-secondary-900">
                          <span className="font-medium">{activity.user?.fullName}</span>
                          {' '}{activity.action}{' '}
                          <span className="text-primary-600">
                            {activity.metadata?.taskKey || activity.metadata?.projectName}
                          </span>
                        </p>
                        <p className="text-xs text-secondary-500">
                          {getRelativeTime(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-secondary-500 py-4">
                  No recent activity
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;