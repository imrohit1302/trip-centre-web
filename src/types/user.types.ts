export type UserRoleType =
  | 'customer'
  | 'driver'
  | 'venue_partner'
  | 'reseller_agent';

export interface RoleOption {
  id: UserRoleType;
  title: string;
  description: string;
  badge?: string;
  iconName: 'user' | 'car' | 'hotel' | 'briefcase';
}

export interface UserSession {
  role: UserRoleType;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
  token?: string;
}
