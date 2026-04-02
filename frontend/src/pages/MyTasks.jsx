// src/pages/MyTasks.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import { useOrganization } from '../hooks/useOrganization';
import taskService from '../services/taskService';
import Loader from '../components/common/Loader';
import Badge from '../components/common/Badge';
import TaskFilters from '../components/tasks/TaskFilters';
import EmptyState from '../components/common/EmptyState';
import { TASK_PRIORITIES, TASK_TYPES } from '../utils/constants';
import { formatDate } from '../utils/helpers';

const MyTasks = () => {
  const { user } = useAuth();
  const { currentOrganization } = useOrganization();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchTasks = useCallback(async () => {
    if (!currentOrganization || !user) return;

    try {
      setLoading(true);
      const response = await taskService.getTasks({
        organization: currentOrganization._id,
        assignee: user._id,
        ...filters
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [currentOrganization, user, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  // const getStatusColor = (status) => {
  //   const colors = {
  //     todo: 'bg-secondary-100 text-secondary-700',
  //     in_progress: 'bg-blue-100 text-blue-700',
  //     review: 'bg-yellow-100 text-yellow-700',
  //     done: 'bg-green-100 text-green-700'
  //   };
  //   return colors[status] || colors.todo;
  // };

  // Group tasks by status
  const groupedTasks = {
    todo: tasks.filter(t => t.status === 'todo'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    review: tasks.filter(t => t.status === 'review'),
    done: tasks.filter(t => t.status === 'done')
  };

  if (loading) {
    return <Loader text="Loading your tasks..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">My Tasks</h1>
        <p className="text-secondary-500 mt-1">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned to you
        </p>
      </div>

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      {/* Tasks by Status */}
      {tasks.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([status, statusTasks]) => {
            if (statusTasks.length === 0) return null;

            return (
              <div key={status}>
                <h2 className="text-lg font-semibold text-secondary-900 mb-3 capitalize">
                  {status.replace('_', ' ')} ({statusTasks.length})
                </h2>
                <div className="bg-white rounded-lg shadow-soft border border-secondary-100 overflow-hidden">
                  {statusTasks.map((task) => {
                    const priority = TASK_PRIORITIES[task.priority];
                    const type = TASK_TYPES[task.type];
                    const isOverdue = task.dueDate && 
                      new Date(task.dueDate) < new Date() && 
                      task.status !== 'done';

                    return (
                      <Link
                        key={task._id}
                        to={`/tasks/${task._id}`}
                        className="flex items-center gap-4 p-4 border-b border-secondary-100 last:border-0 hover:bg-secondary-50 transition-colors"
                      >
                        <span className="text-lg">{type?.icon}</span>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-secondary-500">
                              {task.key}
                            </span>
                            <span className="text-sm font-medium text-secondary-900 truncate">
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-secondary-500">
                              {task.project?.name}
                            </span>
                            {task.dueDate && (
                              <span className={`text-xs ${isOverdue ? 'text-red-500' : 'text-secondary-500'}`}>
                                Due {formatDate(task.dueDate)}
                              </span>
                            )}
                          </div>
                        </div>

                        <Badge size="sm" className={priority?.color}>
                          {priority?.label}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={HiOutlineClipboardList}
          title="No tasks assigned"
          description="You don't have any tasks assigned to you yet"
        />
      )}
    </div>
  );
};

export default MyTasks;