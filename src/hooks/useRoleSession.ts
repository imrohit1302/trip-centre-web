import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { ROUTES } from '../constants/routes';
import { useLogoutMutation } from '../store/api/webApi';
import type { AuthUser } from '../types/auth.types';
import type { UserRoleType } from '../types/user.types';

export function useRoleSession(role: UserRoleType) {
  const navigate = useNavigate();
  const { getUserForRole, clearSession } = useAuth();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [userData] = useState<AuthUser | null>(() => getUserForRole(role));

  const displayName = useMemo(() => {
    if (!userData) return 'User';
    return (
      (userData.name as string) ||
      (userData.fullName as string) ||
      (userData.email as string) ||
      'User'
    );
  }, [userData]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutApi({ role }).unwrap();
    } catch {
      // Still clear local session if the network call fails
    } finally {
      clearSession(role);
      navigate(ROUTES.LOGIN(role));
    }
  }, [clearSession, logoutApi, navigate, role]);

  return {
    userData,
    displayName,
    handleLogout,
    isLoggingOut,
  };
}
