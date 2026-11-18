import type { UserRoleType } from '../types/user.types';

const ALL_ROLES: UserRoleType[] = [
  'customer',
  'driver',
  'venue_partner',
  'reseller_agent',
];

/** API path segment for role-scoped auth routes */
export function authRolePrefix(role: UserRoleType): string {
  if (role === 'driver') return 'driver';
  if (role === 'venue_partner') return 'venue-partner';
  if (role === 'reseller_agent') return 'reseller-agent';
  return 'customer';
}

export const AUTH_TOKEN_KEY = 'trip_centre_token';
export const AUTH_ACTIVE_ROLE_KEY = 'trip_centre_active_role';

export function authUserKey(role: UserRoleType): string {
  return `trip_centre_${role}_user`;
}

/** Stable web device token for login / signup bodies */
export function getWebDeviceToken(): string {
  const key = 'trip_centre_device_token';
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const next = `trip-centre-web-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, next);
    return next;
  } catch {
    return 'trip-centre-web';
  }
}

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredActiveRole(): UserRoleType | null {
  try {
    const role = localStorage.getItem(AUTH_ACTIVE_ROLE_KEY);
    if (
      role === 'customer' ||
      role === 'driver' ||
      role === 'venue_partner' ||
      role === 'reseller_agent'
    ) {
      return role;
    }
    return null;
  } catch {
    return null;
  }
}

export function getStoredUser(role: UserRoleType): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(authUserKey(role));
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function allUserRoles(): UserRoleType[] {
  return [...ALL_ROLES];
}
