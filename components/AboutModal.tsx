import React from 'react';
import { CloseIcon, ShareIcon } from './icons';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const appVersion = '1.0.0';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DailyList Pro',
        text: 'Check out DailyList Pro, a simple and easy-to-use to-do list app!',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert("Web Share API is not supported in your browser. You can manually copy the URL.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4">
      <div className="bg-dark-surface rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in-up flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-bold mb-2 text-white">About DailyList Pro</h2>
          <p className="text-dark-text-secondary mb-1">
            A simple and easy-to-use to-do list app with reminders.
          </p>
          <p className="text-dark-text-secondary mb-4">
            Version: {appVersion}
          </p>
        </div>

        {/* Scrollable Features */}
        <div className="flex-grow overflow-y-auto my-4 pr-3 -mr-4 border-t border-b border-gray-700 py-4">
            <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
            <ul className="space-y-4 text-dark-text-secondary list-disc list-outside ml-5">
                <li>
                <span className="font-semibold text-dark-text">Add & Edit Tasks:</span> Tap the large '+' button to create tasks. You can set a title, due date, and time. Tap the pencil icon on any task to modify it.
                </li>
                <li>
                <span className="font-semibold text-dark-text">Smart Reminders:</span> Enable the reminder toggle for a task to get a notification with sound at the scheduled time. Never miss a deadline.
                </li>
                <li>
                <span className="font-semibold text-dark-text">Quick Alarm Mute:</span> If a reminder alarm is sounding, simply open the app and mark the task as complete. The alarm will stop instantly, preventing disturbances.
                </li>
                <li>
                <span className="font-semibold text-dark-text">Track Your Progress:</span> Completed tasks move to a separate "Completed" section, giving you a clear view of your accomplishments.
                </li>
                <li>
                <span className="font-semibold text-dark-text">Fully Private:</span> All your data is stored locally on your device. Nothing is ever uploaded to a server.
                </li>
                <li>
                <span className="font-semibold text-dark-text">Control Notifications:</span> Visit the Settings menu to globally enable or disable all reminder notifications according to your preference.
                </li>
            </ul>
        </div>
        
        {/* Footer */}
        <div className="mt-auto flex-shrink-0">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center bg-brand-secondary hover:bg-sky-400 text-dark-bg font-bold py-3 px-4 rounded-md transition-colors duration-300"
          >
            <ShareIcon className="w-5 h-5 mr-2"/>
            Share App
          </button>
        </div>
      </div>
    </div>
  );
};