// src/pages/TaskDetails.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePaperClip,
  HiOutlineDotsVertical,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineCheck
} from 'react-icons/hi';
import taskService from '../services/taskService';
import { useAuth } from '../hooks/useAuth';
import { useOrganization } from '../hooks/useOrganization';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';
import Select from '../components/common/Select';
import Textarea from '../components/common/Textarea';
import Dropdown, { DropdownItem } from '../components/common/Dropdown';
import TaskModal from '../components/tasks/TaskModal';
import { TASK_PRIORITIES, TASK_TYPES } from '../utils/constants';
import {
  formatDate,
  formatDateTime,
  getRelativeTime,
  canUpdateTasks,
  canComment,
  canDeleteTasks
} from '../utils/helpers';
import { toast } from 'react-toastify';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { members, currentOrganization } = useOrganization();

  const userRole = currentOrganization?.userRole || 'member';
  const canEditTask = canUpdateTasks(userRole);
  const canAddComment = canComment(userRole);
  const canRemoveTask = canDeleteTasks(userRole);

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch task details and comments
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [taskRes, commentsRes] = await Promise.all([
        taskService.getTask(id),
        taskService.getComments(id)
      ]);

      setTask(taskRes.data);
      setComments(commentsRes.data);
    } catch (error) {
      toast.error('Failed to load task');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update task field
  const handleUpdateField = async (field, value) => {
    if (!canEditTask) {
      toast.error('You do not have permission to update this task');
      return;
    }

    try {
      setUpdating(true);
      const response = await taskService.updateTask(id, { [field]: value });
      setTask(response.data);
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setUpdating(false);
    }
  };

  // Submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!canAddComment) {
      toast.error('You do not have permission to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      const response = await taskService.addComment(id, newComment);
      setComments((prev) => [...prev, response.data]);
      setNewComment('');
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Toggle subtask
  const handleToggleSubtask = async (subtaskId) => {
    if (!canEditTask) {
      toast.error('You do not have permission to update subtasks');
      return;
    }

    try {
      const response = await taskService.toggleSubtask(id, subtaskId);
      setTask(response.data);
    } catch (error) {
      toast.error('Failed to update subtask');
    }
  };

  // Delete task
  const handleDeleteTask = async () => {
    if (!canRemoveTask) {
      toast.error('You do not have permission to delete this task');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted');
      navigate(-1);
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  // Update task from modal
  const handleUpdateTask = async (taskData) => {
    if (!canEditTask) {
      toast.error('You do not have permission to update this task');
      return;
    }

    try {
      setUpdating(true);
      const response = await taskService.updateTask(id, taskData);
      setTask(response.data);
      setShowEditModal(false);
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loader text="Loading task..." />;
  }

  if (!task) {
    return null;
  }

  const priority = TASK_PRIORITIES[task.priority];
  const type = TASK_TYPES[task.type];
  const statuses =
    task.project?.settings?.taskStatuses || ['todo', 'in_progress', 'review', 'done'];

  const statusOptions = statuses.map((s) => ({
    value: s,
    label: s.replace('_', ' ')
  }));

  const priorityOptions = Object.entries(TASK_PRIORITIES).map(([value, { label }]) => ({
    value,
    label
  }));

  const memberOptions = [
    { value: '', label: 'Unassigned' },
    ...(members || []).map((m) => ({
      value: m.user._id,
      label: m.user.fullName
    }))
  ];

  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-lg">{type?.icon}</span>
          <span className="text-sm font-mono text-secondary-500">{task.key}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {canEditTask && (
            <Button
              variant="secondary"
              icon={HiOutlinePencil}
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </Button>
          )}

          {canRemoveTask && (
            <Dropdown
              trigger={
                <button className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg">
                  <HiOutlineDotsVertical className="w-5 h-5" />
                </button>
              }
              position="bottom-right"
            >
              <DropdownItem icon={HiOutlineTrash} danger onClick={handleDeleteTask}>
                Delete Task
              </DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Description */}
          <div className="bg-white rounded-lg shadow-soft border border-secondary-100 p-6">
            <h1 className="text-2xl font-bold text-secondary-900 mb-4">{task.title}</h1>

            <div className="prose max-w-none text-secondary-700">
              {task.description || (
                <p className="text-secondary-400 italic">No description provided</p>
              )}
            </div>

            {/* Subtasks */}
            {task.subtasks?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-secondary-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-secondary-900">Subtasks</h3>
                  <span className="text-sm text-secondary-500">
                    {completedSubtasks}/{totalSubtasks} completed
                  </span>
                </div>

                <div className="space-y-2">
                  {task.subtasks.map((subtask) => (
                    <div
                      key={subtask._id}
                      className="flex items-center gap-3 p-2 hover:bg-secondary-50 rounded-lg"
                    >
                      <button
                        onClick={() => handleToggleSubtask(subtask._id)}
                        disabled={!canEditTask}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          subtask.completed
                            ? 'bg-primary-600 border-primary-600 text-white'
                            : 'border-secondary-300 hover:border-primary-500'
                        } ${!canEditTask ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        {subtask.completed && <HiOutlineCheck className="w-3 h-3" />}
                      </button>

                      <span
                        className={`text-sm ${
                          subtask.completed
                            ? 'text-secondary-400 line-through'
                            : 'text-secondary-700'
                        }`}
                      >
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {task.attachments?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-secondary-100">
                <h3 className="font-medium text-secondary-900 mb-3">Attachments</h3>
                <div className="space-y-2">
                  {task.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 hover:bg-secondary-50 rounded-lg text-sm text-primary-600"
                    >
                      <HiOutlinePaperClip className="w-4 h-4" />
                      {attachment.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="bg-white rounded-lg shadow-soft border border-secondary-100 p-6">
            <h3 className="font-medium text-secondary-900 mb-4">
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            {canAddComment ? (
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex gap-3">
                  <Avatar src={user?.avatar} name={user?.fullName} size="sm" />
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={2}
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        type="submit"
                        size="sm"
                        loading={submittingComment}
                        disabled={!newComment.trim()}
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-6 rounded-lg border border-secondary-200 bg-secondary-50 p-4 text-sm text-secondary-600">
                You have read-only access for comments.
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <Avatar
                    src={comment.user?.avatar}
                    name={comment.user?.fullName}
                    size="sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-secondary-900">
                        {comment.user?.fullName}
                      </span>
                      <span className="text-xs text-secondary-500">
                        {getRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-700 mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-center text-secondary-500 py-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-soft border border-secondary-100 p-4 space-y-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Status
              </label>
              <Select
                disabled={!canEditTask}
                value={task.status}
                onChange={(e) => handleUpdateField('status', e.target.value)}
                options={statusOptions}
              />
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Assignee
              </label>
              <Select
                disabled={!canEditTask}
                value={task.assignee?._id || ''}
                onChange={(e) => handleUpdateField('assignee', e.target.value || null)}
                options={memberOptions}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Priority
              </label>
              <Select
                disabled={!canEditTask}
                value={task.priority}
                onChange={(e) => handleUpdateField('priority', e.target.value)}
                options={priorityOptions}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Current Priority
              </label>
              <Badge>{priority?.label || task.priority}</Badge>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-soft border border-secondary-100 p-4">
            <h3 className="font-medium text-secondary-900 mb-4">Details</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-500">Project</span>
                <Link
                  to={`/projects/${task.project?._id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {task.project?.name}
                </Link>
              </div>

              <div className="flex justify-between">
                <span className="text-secondary-500">Type</span>
                <span className="flex items-center gap-1">
                  {type?.icon} {type?.label}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-secondary-500">Reporter</span>
                <span className="flex items-center gap-2">
                  <Avatar
                    src={task.reporter?.avatar}
                    name={task.reporter?.fullName}
                    size="xs"
                  />
                  {task.reporter?.fullName}
                </span>
              </div>

              {task.dueDate && (
                <div className="flex justify-between">
                  <span className="text-secondary-500">Due Date</span>
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="w-4 h-4" />
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              )}

              {task.estimatedHours && (
                <div className="flex justify-between">
                  <span className="text-secondary-500">Estimated</span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="w-4 h-4" />
                    {task.estimatedHours}h
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-secondary-500">Created</span>
                <span>{formatDateTime(task.createdAt)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-secondary-500">Updated</span>
                <span>{getRelativeTime(task.updatedAt)}</span>
              </div>
            </div>

            {/* Labels */}
            {task.labels?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-secondary-100">
                <span className="text-sm text-secondary-500 block mb-2">Labels</span>
                <div className="flex flex-wrap gap-1">
                  {task.labels.map((label, index) => (
                    <Badge key={index} size="sm">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {canEditTask && (
        <TaskModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateTask}
          task={task}
          projectId={task.project?._id}
          loading={updating}
        />
      )}
    </div>
  );
};

export default TaskDetails;