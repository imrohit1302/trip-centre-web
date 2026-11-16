import React from 'react';
import { User, Car, Building2, Check } from 'lucide-react';
import { UserRoleType } from '../../types/user.types';

interface RadioCardProps {
  id: UserRoleType;
  title: string;
  description: string;
  iconName: 'user' | 'car' | 'hotel' | 'building';
  isSelected: boolean;
  onSelect: (id: UserRoleType) => void;
  badge?: string;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  id,
  title,
  description,
  iconName,
  isSelected,
  onSelect,
  badge,
}) => {
  const renderIcon = () => {
    switch (iconName) {
      case 'user':
        return <User size={22} className={isSelected ? 'text-[#FF8A00]' : 'text-gray-600 dark:text-gray-300'} />;
      case 'car':
        return <Car size={22} className={isSelected ? 'text-[#FF8A00]' : 'text-gray-600 dark:text-gray-300'} />;
      case 'hotel':
      case 'building':
        return <Building2 size={22} className={isSelected ? 'text-[#FF8A00]' : 'text-gray-600 dark:text-gray-300'} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(id)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onSelect(id);
        }
      }}
      className={`relative w-full text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer select-none flex items-center gap-3 sm:gap-4 ${
        isSelected
          ? 'border-[#FF8A00] bg-orange-50/40 dark:bg-[#1E2738] shadow-md shadow-orange-500/10 ring-2 ring-[#FF8A00]/20'
          : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161B22] hover:border-gray-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-[#1A222D]'
      }`}
    >
      {badge && isSelected && (
        <span className="absolute -top-2.5 right-4 sm:right-6 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#FF8A00] text-white rounded-full shadow-sm">
          {badge}
        </span>
      )}

      {/* Left Icon Container */}
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isSelected
            ? 'bg-orange-100 dark:bg-orange-950/40 text-[#FF8A00]'
            : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'
        }`}
      >
        {renderIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-1 sm:pr-2">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 leading-normal line-clamp-2">
          {description}
        </p>
      </div>

      {/* Radio Circle */}
      <div className="shrink-0 flex items-center justify-center">
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
            isSelected
              ? 'border-[#FF8A00] bg-[#FF8A00]'
              : 'border-gray-300 dark:border-slate-600 bg-transparent'
          }`}
        >
          {isSelected && <Check size={13} className="text-white stroke-[3]" />}
        </div>
      </div>
    </div>
  );
};

