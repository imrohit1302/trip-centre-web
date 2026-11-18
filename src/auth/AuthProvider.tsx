import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { AuthUser } from '../types/auth.types';
import type { UserRoleType } from '../types/user.types';
import { ROUTES } from '../constants/routes';
import {
  AUTH_ACTIVE_ROLE_KEY,
  AUTH_TOKEN_KEY,
  allUserRoles,
  authUserKey,
  getStoredActiveRole,
  getStoredToken,
  getStoredUser,
} from '../utils/authRole';

type AuthContextValue = {
  token: string | null;
  activeRole: UserRoleType | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (input: {
    accessToken: string;
    user: AuthUser;
    role: UserRoleType;
  }) => void;
  clearSession: (role?: UserRoleType) => void;
  getUserForRole: (role: UserRoleType) => AuthUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readInitialUser(role: UserRoleType | null): AuthUser | null {
  if (!role) return null;
  return (getStoredUser(role) as AuthUser | null) ?? null;
}

function hasValidSession(
  token: string | null,
  role: UserRoleType | null,
  user: AuthUser | null,
): boolean {
  return Boolean(token && role && user);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [activeRole, setActiveRole] = useState<UserRoleType | null>(() =>
    getStoredActiveRole(),
  );
  const [user, setUser] = useState<AuthUser | null>(() =>
    readInitialUser(getStoredActiveRole()),
  );

  const setSession = useCallback(
    (input: { accessToken: string; user: AuthUser; role: UserRoleType }) => {
      localStorage.setItem(AUTH_TOKEN_KEY, input.accessToken);
      localStorage.setItem(AUTH_ACTIVE_ROLE_KEY, input.role);
      localStorage.setItem(authUserKey(input.role), JSON.stringify(input.user));
      setToken(input.accessToken);
      setActiveRole(input.role);
      setUser(input.user);
    },
    [],
  );

  const clearSession = useCallback((role?: UserRoleType) => {
    const roles: UserRoleType[] = role ? [role] : allUserRoles();
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_ACTIVE_ROLE_KEY);
    roles.forEach((r) => localStorage.removeItem(authUserKey(r)));
    setToken(null);
    setActiveRole(null);
    setUser(null);
  }, []);

  const getUserForRole = useCallback((role: UserRoleType) => {
    return (getStoredUser(role) as AuthUser | null) ?? null;
  }, []);

  const isAuthenticated = hasValidSession(token, activeRole, user);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      activeRole,
      user,
      isAuthenticated,
      setSession,
      clearSession,
      getUserForRole,
    }),
    [token, activeRole, user, isAuthenticated, setSession, clearSession, getUserForRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

/** Private pages — only for a logged-in user of this role */
export function RequireAuth({
  role,
  children,
}: {
  role: UserRoleType;
  children: React.ReactNode;
}) {
  const { token, activeRole, getUserForRole } = useAuth();
  const location = useLocation();
  const roleUser = getUserForRole(role);
  const activeUser = activeRole ? getUserForRole(activeRole) : null;

  // Logged in as a different role → send them to their own dashboard
  if (token && activeRole && activeRole !== role && activeUser) {
    return <Navigate to={ROUTES.DASHBOARD(activeRole)} replace />;
  }

  if (!token || !roleUser || activeRole !== role) {
    return (
      <Navigate to={ROUTES.LOGIN(role)} replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
}

/**
 * Public pages (onboarding, login, signup, forgot) —
 * only for guests. Logged-in users go to their dashboard.
 */
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, activeRole, token, getUserForRole } = useAuth();

  if (isAuthenticated && activeRole) {
    return <Navigate to={ROUTES.DASHBOARD(activeRole)} replace />;
  }

  // Token without a usable role user → stay on public page (session will clear on private access)
  if (token && activeRole && getUserForRole(activeRole)) {
    return <Navigate to={ROUTES.DASHBOARD(activeRole)} replace />;
  }

  return <>{children}</>;
}

/** Root / unknown routes: dashboard if logged in, else landing */
export function HomeRedirect() {
  const { isAuthenticated, activeRole, token, getUserForRole } = useAuth();

  if (isAuthenticated && activeRole) {
    return <Navigate to={ROUTES.DASHBOARD(activeRole)} replace />;
  }
  if (token && activeRole && getUserForRole(activeRole)) {
    return <Navigate to={ROUTES.DASHBOARD(activeRole)} replace />;
  }
  return <Navigate to={ROUTES.LANDING} replace />;
}
