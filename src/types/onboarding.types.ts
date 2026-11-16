import { UserRoleType } from './user.types';

export interface OnboardingSlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  accentBadge: string;
  featureBullets: string[];
}

export interface OnboardingContextType {
  currentSlide: number;
  totalSlides: number;
  isRoleSelection: boolean;
  selectedRole: UserRoleType | null;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  skipToRoleSelection: () => void;
  selectRole: (role: UserRoleType) => void;
  resetOnboarding: () => void;
}
