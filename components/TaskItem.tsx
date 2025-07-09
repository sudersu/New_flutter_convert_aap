
import React from 'react';
import { Task } from '../types';
import { EditIcon, DeleteIcon, BellIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const isPastDue = !task.completed && new Date(`${task.dueDate}T${task.dueTime}`) < new Date();

  return (
    <div className={`
      bg-dark-surface p-4 rounded-lg shadow-md flex items-center transition-all duration-300
      ${task.completed ? 'opacity-50' : ''}
    `}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
        className="form-checkbox h-6 w-6 rounded-full bg-gray-700 border-gray-600 text-brand-secondary focus:ring-brand-secondary focus:ring-offset-dark-surface"
      />
      <div className="flex-grow ml-4">
        <p className={`font-semibold text-lg ${task.completed ? 'line-through text-dark-text-secondary' : 'text-dark-text'}`}>
          {task.title}
        </p>
        <div className="flex items-center text-sm text-dark-text-secondary mt-1 space-x-3">
          <span className={isPastDue ? 'text-red-400 font-semibold' : ''}>
            {task.dueDate} at {task.dueTime}
          </span>
          {task.reminder && !task.completed && <BellIcon className="w-4 h-4 text-brand-secondary" />}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-full hover:bg-gray-700 text-dark-text-secondary hover:text-white transition-colors"
          aria-label="Edit task"
        >
          <EditIcon />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-full hover:bg-gray-700 text-dark-text-secondary hover:text-red-400 transition-colors"
          aria-label="Delete task"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
