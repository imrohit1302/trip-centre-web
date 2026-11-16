import React, { createContext, useState, useEffect } from 'react';
import { OnboardingContextType } from '../types/onboarding.types';
import { UserRoleType } from '../types/user.types';
import { ONBOARDING_SLIDES } from '../constants/onboardingData';

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isRoleSelection, setIsRoleSelection] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<UserRoleType | null>(null);

  const totalSlides = ONBOARDING_SLIDES.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setIsRoleSelection(true);
    }
  };

  const prevSlide = () => {
    if (isRoleSelection) {
      setIsRoleSelection(false);
      setCurrentSlide(totalSlides - 1);
    } else if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
      setIsRoleSelection(false);
    }
  };

  const skipToRoleSelection = () => {
    setIsRoleSelection(true);
  };

  const selectRole = (role: UserRoleType) => {
    setSelectedRole(role);
  };

  const resetOnboarding = () => {
    setCurrentSlide(0);
    setIsRoleSelection(false);
    setSelectedRole(null);
  };

  // Keyboard navigation support: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focused inside an input field
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        if (!isRoleSelection) nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isRoleSelection]);

  return (
    <OnboardingContext.Provider
      value={{
        currentSlide,
        totalSlides,
        isRoleSelection,
        selectedRole,
        nextSlide,
        prevSlide,
        goToSlide,
        skipToRoleSelection,
        selectRole,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
