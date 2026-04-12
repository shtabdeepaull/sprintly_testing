import React, { useState, useEffect } from 'react';
import { canViewReports } from '../utils/helpers';
import EmptyState from '../components/common/EmptyState';
import {
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineTrendingUp
} from 'react-icons/hi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useOrganization } from '../hooks/useOrganization';
import api from '../services/api';
import Card, { CardHeader, CardTitle, CardContent } from '../components/common/Card';
import Loader from '../components/common/Loader';
import Avatar from '../components/common/Avatar';

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'];

const Reports = () => {
  const { currentOrganization } = useOrganization();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [teamAnalytics, setTeamAnalytics] = useState(null);

  const userRole = currentOrganization?.userRole || 'member';

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!currentOrganization) return;

      try {
        setLoading(true);

        const [dashboardRes, teamRes] = await Promise.all([
          api.get('/analytics/dashboard', {
            params: { organization: currentOrganization._id }
          }),
          api.get('/analytics/team', {
            params: { organization: currentOrganization._id }
          })
        ]);

        setAnalytics(dashboardRes.data.data);
        setTeamAnalytics(teamRes.data.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [currentOrganization]);

  if (currentOrganization && !canViewReports(userRole)) {
    return (
      <EmptyState
        title="Access restricted"
        description="Only owner, admin, and project manager can view reports."
      />
    );
  }

  if (loading) {
    return <Loader text="Loading reports..." />;
  }

  const statusData =
    analytics?.tasksByStatus?.map((item) => ({
      name: item._id?.replace('_', ' ') || 'Unknown',
      value: item.count
    })) || [];

  const priorityData =
    analytics?.tasksByPriority?.map((item) => ({
      name: item._id || 'Unknown',
      value: item.count
    })) || [];

  const typeData =
    analytics?.tasksByType?.map((item) => ({
      name: item._id || 'Unknown',
      value: item.count
    })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Reports & Analytics</h1>
        <p className="mt-1 text-secondary-500">
          Overview of {currentOrganization?.name}'s productivity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <HiOutlineClipboardList className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-900">
              {analytics?.overview?.totalTasks || 0}
            </p>
            <p className="text-sm text-secondary-500">Total Tasks</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <HiOutlineTrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-900">
              {analytics?.tasksByStatus?.find((s) => s._id === 'done')?.count || 0}
            </p>
            <p className="text-sm text-secondary-500">Completed</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
            <HiOutlineChartBar className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-900">
              {analytics?.tasksByStatus?.find((s) => s._id === 'in_progress')?.count || 0}
            </p>
            <p className="text-sm text-secondary-500">In Progress</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
            <HiOutlineUsers className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-900">
              {analytics?.overview?.overdueTasks || 0}
            </p>
            <p className="text-sm text-secondary-500">Overdue</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {teamAnalytics?.memberPerformance?.length > 0 ? (
            <div className="space-y-4">
              {teamAnalytics.memberPerformance.slice(0, 5).map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-6 text-lg font-bold text-secondary-400">#{index + 1}</span>
                  <Avatar
                    src={member.user?.avatar}
                    name={member.user?.fullName}
                    size="sm"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">
                      {member.user?.fullName}
                    </p>
                    <p className="text-sm text-secondary-500">
                      {member.completedTasks} tasks completed
                    </p>
                  </div>
                  <div className="h-2 w-32 rounded-full bg-secondary-200">
                    <div
                      className="h-2 rounded-full bg-primary-500"
                      style={{
                        width: `${(member.completedTasks / (teamAnalytics.memberPerformance[0]?.completedTasks || 1)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-secondary-500">
              No performance data available yet
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;