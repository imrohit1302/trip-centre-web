import React from 'react';

interface StepperDotsProps {
  total: number;
  current: number;
  onSelect?: (index: number) => void;
  className?: string;
}

export const StepperDots: React.FC<StepperDotsProps> = ({
  total,
  current,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect && onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full focus:outline-none ${
              isActive
                ? 'w-7 h-2.5 bg-[#FF8A00] shadow-sm shadow-orange-500/40'
                : 'w-2.5 h-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          />
        );
      })}
    </div>
  );
};

