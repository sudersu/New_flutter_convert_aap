import { Task } from '../types';

const timeoutIds = new Map<string, number>();
const activeSounds = new Map<string, HTMLAudioElement>();
const REMINDER_SOUND_URL = 'https://wrzpfcponjavdhefbqzp.supabase.co/storage/v1/object/public/my-content-upload//mixkit-facility-alarm-sound-999.wav';

export const requestPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
    return 'denied';
  }
  return await Notification.requestPermission();
};

const stopSound = (taskId: string) => {
  const audio = activeSounds.get(taskId);
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    activeSounds.delete(taskId);
  }
};

export const scheduleNotification = (task: Task) => {
  if (!task.reminder || !task.dueDate || !task.dueTime) return;

  const now = new Date();
  const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);

  if (dueDateTime <= now) {
    return;
  }

  const delay = dueDateTime.getTime() - now.getTime();

  // Cancel any existing notification for this task
  cancelNotification(task.id);

  const timeoutId = window.setTimeout(() => {
    // Message the service worker to show the notification
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({
          type: 'SHOW_NOTIFICATION',
          payload: {
            title: 'DailyList Pro Reminder',
            options: {
              body: task.title,
              icon: '/logo.svg',
              tag: task.id, // Use tag to prevent duplicate notifications and allow replacement
              renotify: true,
            },
          },
        });
      });
    }
    
    // Vibrate and play sound from the main thread (requires tab to be open)
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
    
    const audio = new Audio(REMINDER_SOUND_URL);
    activeSounds.set(task.id, audio);
    audio.addEventListener('ended', () => {
        activeSounds.delete(task.id);
    });
    audio.play().catch(e => {
        console.error("Error playing sound:", e);
        activeSounds.delete(task.id);
    });

    timeoutIds.delete(task.id);
  }, delay);
  
  timeoutIds.set(task.id, timeoutId);
};

export const cancelNotification = (taskId: string) => {
  const timeoutId = timeoutIds.get(taskId);
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutIds.delete(taskId);
  }
  // Also stop any sound that might be playing for this task
  stopSound(taskId);
};

export const clearAllNotifications = () => {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds.clear();

    activeSounds.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    activeSounds.clear();
}