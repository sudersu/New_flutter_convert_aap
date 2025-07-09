
import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { CloseIcon } from './icons';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'completed'>) => void;
  task: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [reminder, setReminder] = useState(true);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate);
      setDueTime(task.dueTime);
      setReminder(task.reminder);
    } else {
      // Set defaults for new task
      const now = new Date();
      now.setHours(now.getHours() + 1);
      setTitle('');
      setDueDate(now.toISOString().split('T')[0]);
      setDueTime(now.toTimeString().substring(0, 5));
      setReminder(true);
    }
  }, [task, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        alert("Task title cannot be empty.");
        return;
    }
    onSave({
        id: task?.id,
        title,
        dueDate,
        dueTime,
        reminder,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4">
      <div className="bg-dark-surface rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">{task ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-text-secondary mb-1">Task Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="dueDate" className="block text-sm font-medium text-dark-text-secondary mb-1">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="dueTime" className="block text-sm font-medium text-dark-text-secondary mb-1">Due Time</label>
              <input
                id="dueTime"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-dark-text">Set Reminder</span>
            <label htmlFor="reminder" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  id="reminder"
                  type="checkbox"
                  className="sr-only"
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${reminder ? 'transform translate-x-6 bg-brand-secondary' : ''}`}></div>
              </div>
            </label>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-brand-primary hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
              {task ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
