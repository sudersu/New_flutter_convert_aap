import React from 'react';

export const AdBanner: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 bg-dark-surface flex items-center justify-center text-sm text-dark-text-secondary z-20 border-t border-gray-700">
      <div className="text-center">
        <p className="font-semibold">Ad Banner</p>
        <p className="text-xs">This is a placeholder for ad content.</p>
      </div>
    </footer>
  );
};
