export type UserRoleType = 'customer' | 'driver' | 'venue_partner';

export interface RoleOption {
  id: UserRoleType;
  title: string;
  description: string;
  badge?: string;
  iconName: 'user' | 'car' | 'hotel';
}

export interface UserSession {
  role: UserRoleType;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
  token?: string;
}

