import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label="Toggle color theme"
      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 shadow-sm hover:border-[#FF8A00] hover:text-[#FF8A00] transition-all duration-200 active:scale-95 ${className}`}
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-[#0B2A4A] transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun size={18} className="text-[#FF8A00] transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  );
};

