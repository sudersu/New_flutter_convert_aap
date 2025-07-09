import React from 'react';

interface FabProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Fab: React.FC<FabProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 md:right-8 bg-brand-primary hover:bg-blue-600 text-white font-bold w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 z-30"
      aria-label="Add new task"
    >
      {children}
    </button>
  );
};
