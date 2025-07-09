import React from 'react';
import { AppSettings } from '../types';
import { CloseIcon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (newSettings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  if (!isOpen) return null;

  const handleNotificationsToggle = (enabled: boolean) => {
    onSettingsChange({ ...settings, notificationsEnabled: enabled });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4">
      <div className="bg-dark-surface rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <span className="font-medium text-dark-text">Enable Reminders</span>
            <label htmlFor="notificationsEnabled" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  id="notificationsEnabled"
                  type="checkbox"
                  className="sr-only"
                  checked={settings.notificationsEnabled}
                  onChange={(e) => handleNotificationsToggle(e.target.checked)}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.notificationsEnabled ? 'transform translate-x-6 bg-brand-secondary' : ''}`}></div>
              </div>
            </label>
          </div>
          <p className="text-sm text-dark-text-secondary px-1">
            Allow DailyList Pro to send you notifications for your task reminders. You may need to grant permission in your browser settings.
          </p>
        </div>

        <div className="pt-6">
            <button 
              onClick={onClose}
              className="w-full bg-brand-primary hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
              Done
            </button>
        </div>
      </div>
    </div>
  );
};
