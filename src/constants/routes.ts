import { UserRoleType } from '../types/user.types';

export const normalizeRoleSlug = (role?: string): string => {
  if (!role) return 'customer';
  return role.toLowerCase().replace(/_/g, '-');
};

export const parseRoleFromSlug = (slug?: string): UserRoleType => {
  if (!slug) return 'customer';
  const clean = slug.toLowerCase().replace(/_/g, '-');
  if (clean === 'venue-partner' || clean === 'venue') return 'venue_partner';
  if (clean === 'driver') return 'driver';
  return 'customer';
};

export const ROUTES = {
  HOME: '/',
  LANDING: '/',
  ONBOARDING: '/onboarding',
  ONBOARDING_STEP: (step: number = 1) => `/onboarding/${step}`,
  CHOOSE_ROLE: '/choose-role',
  LOGIN: (role: string) => `/${normalizeRoleSlug(role)}/login`,
  SIGNUP: (role: string) => `/${normalizeRoleSlug(role)}/signup`,
  FORGOT_PASSWORD: (role: string, email?: string) =>
    `/${normalizeRoleSlug(role)}/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  VERIFY_CODE: (role: string, email?: string) =>
    `/${normalizeRoleSlug(role)}/verify-code${email ? `?email=${encodeURIComponent(email)}` : ''}`,
  RESET_PASSWORD: (role: string, email?: string, token?: string) => {
    const params = new URLSearchParams();
    if (email) params.set('email', email);
    if (token) params.set('token', token);
    const query = params.toString();
    return `/${normalizeRoleSlug(role)}/reset-password${query ? `?${query}` : ''}`;
  },
  DASHBOARD: (role: string) => `/${normalizeRoleSlug(role)}/dashboard`,
};
