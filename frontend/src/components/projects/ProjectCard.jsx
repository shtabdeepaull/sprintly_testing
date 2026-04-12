// src/components/projects/ProjectCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineFolder, HiOutlineUsers, HiOutlineClipboardList } from 'react-icons/hi';
import { AvatarGroup } from '../common/Avatar';
import Badge from '../common/Badge';
import { PROJECT_STATUS } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

const ProjectCard = ({ project }) => {
  const status = PROJECT_STATUS[project.status];

  return (
    <Link
      to={`/projects/${project._id}`}
      className="block bg-white rounded-lg shadow-soft border border-secondary-100 hover:shadow-medium transition-all duration-200"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <HiOutlineFolder className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">{project.name}</h3>
              <span className="text-xs font-mono text-secondary-500">{project.key}</span>
            </div>
          </div>
          <Badge variant={project.status === 'active' ? 'success' : 'default'}>
            {status?.label}
          </Badge>
        </div>

        {project.description && (
          <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-secondary-500 mb-4">
          <div className="flex items-center gap-1">
            <HiOutlineClipboardList className="w-4 h-4" />
            <span>{project.taskCount ?? 0} tasks</span>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineUsers className="w-4 h-4" />
            <span>{project.memberCount ?? project.members?.length ?? 0} members</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
          <AvatarGroup users={project.members || []} max={4} size="sm" />

          {project.endDate && (
            <span className="text-xs text-secondary-500">
              Due: {formatDate(project.endDate)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;