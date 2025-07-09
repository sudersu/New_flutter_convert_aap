
import React, { useState, useRef, useEffect } from 'react';
import { DotsVerticalIcon, LogoIcon } from './icons';

interface HeaderProps {
  onAboutClick: () => void;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAboutClick, onSettingsClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-dark-surface shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-3xl">
        <div className="flex items-center space-x-3">
          <LogoIcon className="h-8 w-8 text-brand-secondary" />
          <h1 className="text-2xl font-bold text-white tracking-tight">DailyList Pro</h1>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-surface focus:ring-brand-secondary"
          >
            <DotsVerticalIcon className="h-6 w-6 text-dark-text" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-dark-surface rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-30">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onSettingsClick(); setMenuOpen(false); }}
                className="block px-4 py-2 text-sm text-dark-text hover:bg-gray-700"
              >
                Settings
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onAboutClick(); setMenuOpen(false); }}
                className="block px-4 py-2 text-sm text-dark-text hover:bg-gray-700"
              >
                About
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
