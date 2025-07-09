import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task, AppSettings } from './types';
import { Header } from './components/Header';
import { TaskItem } from './components/TaskItem';
import { TaskModal } from './components/TaskModal';
import { AboutModal } from './components/AboutModal';
import { SettingsModal } from './components/SettingsModal';
import { Fab } from './components/Fab';
import { AdBanner } from './components/AdBanner';
import * as notificationService from './services/notificationService';
import { PlusIcon } from './components/icons';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [settings, setSettings] = useLocalStorage<AppSettings>('settings', {
    notificationsEnabled: true,
  });
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const rescheduleNotifications = useCallback((allTasks: Task[], currentSettings: AppSettings) => {
    notificationService.clearAllNotifications();
    if (currentSettings.notificationsEnabled) {
      allTasks.forEach(task => {
        if (task.reminder && !task.completed) {
          notificationService.scheduleNotification(task);
        }
      });
    }
  }, []);
  
  useEffect(() => {
    rescheduleNotifications(tasks, settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, settings]);


  const handleOpenTaskModal = (task: Task | null = null) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = async (taskData: Omit<Task, 'id' | 'completed'> & { id?: string }) => {
    if (taskData.reminder && settings.notificationsEnabled) {
        const permission = await notificationService.requestPermission();
        if (permission !== 'granted') {
            alert('Notification permission is required for reminders. Please enable it in your browser settings.');
        }
    }

    if (taskData.id) { // Editing existing task
      setTasks(prevTasks => prevTasks.map(t => t.id === taskData.id ? { ...t, ...taskData } : t));
    } else { // Adding new task
      const newTask: Task = {
        ...taskData,
        id: new Date().toISOString(),
        completed: false,
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    handleCloseTaskModal();
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    notificationService.cancelNotification(taskId);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(t => {
        if (t.id === taskId) {
          const updatedTask = { ...t, completed: !t.completed };
          if (updatedTask.completed) {
            notificationService.cancelNotification(taskId);
          }
          return updatedTask;
        }
        return t;
      })
    );
  };
  
  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onAboutClick={() => setIsAboutModalOpen(true)}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
      />

      <main className="flex-grow container mx-auto p-4 md:p-6 max-w-3xl pb-24">
        {tasks.length === 0 ? (
           <div className="text-center py-20">
             <h2 className="text-2xl font-semibold text-dark-text">Welcome to DailyList Pro!</h2>
             <p className="text-dark-text-secondary mt-2">Click the '+' button to add your first task.</p>
           </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-dark-text mb-3">To-Do</h2>
              {incompleteTasks.length > 0 ? (
                <div className="space-y-3">
                  {incompleteTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={() => handleOpenTaskModal(task)}
                      onDelete={() => handleDeleteTask(task.id)}
                      onToggleComplete={() => handleToggleComplete(task.id)}
                    />
                  ))}
                </div>
              ) : (
                 <p className="text-dark-text-secondary italic">All tasks are done. Great job!</p>
              )}
            </div>
            
            {completedTasks.length > 0 && (
               <div>
                <h2 className="text-xl font-bold text-dark-text mb-3">Completed</h2>
                <div className="space-y-3">
                   {completedTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={() => handleOpenTaskModal(task)}
                      onDelete={() => handleDeleteTask(task.id)}
                      onToggleComplete={() => handleToggleComplete(task.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Fab onClick={() => handleOpenTaskModal()}>
        <PlusIcon />
      </Fab>

      {isTaskModalOpen && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={handleCloseTaskModal}
          onSave={handleSaveTask}
          task={taskToEdit}
        />
      )}
      
      {isAboutModalOpen && (
        <AboutModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />
      )}

      {isSettingsModalOpen && (
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          settings={settings}
          onSettingsChange={setSettings}
        />
      )}

      <AdBanner />
    </div>
  );
};

export default App;