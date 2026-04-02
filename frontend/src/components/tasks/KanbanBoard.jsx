// src/components/tasks/KanbanBoard.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { HiPlus } from 'react-icons/hi';

const KanbanBoard = ({ 
  tasks, 
  statuses = ['todo', 'in_progress', 'review', 'done'],
  onStatusChange,
  onTaskClick,
  onAddTask
}) => {
  const [columns, setColumns] = useState({});

  // Group tasks by status
  useEffect(() => {
    const grouped = statuses.reduce((acc, status) => {
      acc[status] = tasks.filter(task => task.status === status);
      return acc;
    }, {});
    setColumns(grouped);
  }, [tasks, statuses]);

  // Handle drag end
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get the task that was dragged
    

    if (source.droppableId !== destination.droppableId) {
      // Status changed
      onStatusChange(draggableId, destination.droppableId);
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      todo: 'To Do',
      in_progress: 'In Progress',
      review: 'Review',
      done: 'Done'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: 'bg-secondary-200',
      in_progress: 'bg-blue-200',
      review: 'bg-yellow-200',
      done: 'bg-green-200'
    };
    return colors[status] || 'bg-secondary-200';
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[calc(100vh-250px)]">
        {statuses.map(status => (
          <div
            key={status}
            className="flex-shrink-0 w-25 bg-secondary-100 rounded-lg"
          >
            {/* Column Header */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                <h3 className="font-medium text-secondary-700">
                  {getStatusLabel(status)}
                </h3>
                <span className="text-xs text-secondary-500 bg-secondary-200 px-2 py-0.5 rounded-full">
                  {columns[status]?.length || 0}
                </span>
              </div>
              
              {status === 'todo' && (
                <button
                  onClick={onAddTask}
                  className="p-1 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-200 rounded"
                >
                  <HiPlus className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Column Content */}
            <Droppable droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`
                    p-2 min-h-[200px] space-y-2
                    ${snapshot.isDraggingOver ? 'bg-primary-50' : ''}
                  `}
                >
                  {columns[status]?.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'opacity-50' : ''}
                        >
                          <TaskCard
                            task={task}
                            onClick={() => onTaskClick(task)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;