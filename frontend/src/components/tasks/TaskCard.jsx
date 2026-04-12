// src/components/tasks/TaskCard.jsx
import React from 'react';
import { HiOutlineCalendar, HiOutlineChatAlt, HiOutlinePaperClip } from 'react-icons/hi';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import { TASK_PRIORITIES, TASK_TYPES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

const TaskCard = ({ task, onClick }) => {
  const priority = TASK_PRIORITIES[task.priority];
  const type = TASK_TYPES[task.type];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-3 shadow-sm border border-secondary-100 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header with type and key */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{type?.icon}</span>
        <span className="text-xs font-mono text-secondary-500">{task.key}</span>
        <span className={`ml-auto ${priority?.color} px-1.5 py-0.5 rounded text-xs`}>
          {priority?.icon}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-secondary-900 mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Labels */}
      {task.labels?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.labels.slice(0, 2).map((label, index) => (
            <Badge key={index} size="sm" variant="default">
              {label}
            </Badge>
          ))}
          {task.labels.length > 2 && (
            <Badge size="sm" variant="default">
              +{task.labels.length - 2}
            </Badge>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-secondary-50">
        <div className="flex items-center gap-3 text-secondary-500">
          {/* Due date */}
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-500' : ''}`}>
              <HiOutlineCalendar className="w-3.5 h-3.5" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}

          {/* Comments count */}
          {task.commentsCount > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <HiOutlineChatAlt className="w-3.5 h-3.5" />
              <span>{task.commentsCount}</span>
            </div>
          )}

          {/* Attachments count */}
          {task.attachments?.length > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <HiOutlinePaperClip className="w-3.5 h-3.5" />
              <span>{task.attachments.length}</span>
            </div>
          )}
        </div>

        {/* Assignee */}
        {task.assignee && (
          <Avatar
            src={task.assignee.avatar}
            name={task.assignee.fullName}
            size="xs"
          />
        )}
      </div>

      {/* Subtask progress */}
      {task.subtasks?.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center gap-2 text-xs text-secondary-500">
            <div className="flex-1 bg-secondary-200 rounded-full h-1.5">
              <div
                className="bg-primary-500 h-1.5 rounded-full transition-all"
                style={{
                  width: `${(task.subtasks.filter(s => s.completed).length / task.subtasks.length) * 100}%`
                }}
              />
            </div>
            <span>
              {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;