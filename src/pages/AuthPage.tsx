import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import type { AuthUser } from '../types/auth.types';
import { UserRoleType } from '../types/user.types';
import { ROLE_AUTH_CONFIGS } from '../constants/roleAuthData';
import { AuthLayout } from '../components/auth/AuthLayout';
import { parseRoleFromSlug, ROUTES } from '../constants/routes';

interface AuthPageProps {
  role?: UserRoleType;
  initialMode?: 'login' | 'signup' | 'forgot';
  forgotStep?: 'request_code' | 'verify_code' | 'reset_password';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  role: propRole,
  initialMode,
  forgotStep,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roleSlug } = useParams<{ roleSlug?: string }>();
  const { setSession } = useAuth();

  const activeRole: UserRoleType = propRole || parseRoleFromSlug(roleSlug);
  const config = ROLE_AUTH_CONFIGS[activeRole];

  const determineMode = (): 'login' | 'signup' | 'forgot' => {
    if (initialMode) return initialMode;
    const pathname = location.pathname;
    if (pathname.includes('/signup')) return 'signup';
    if (
      pathname.includes('/forgot-password') ||
      pathname.includes('/verify-code') ||
      pathname.includes('/reset-password')
    ) {
      return 'forgot';
    }
    return 'login';
  };

  const currentMode = determineMode();

  const handleModeChange = (newMode: 'login' | 'signup' | 'forgot') => {
    if (newMode === 'login') {
      navigate(ROUTES.LOGIN(activeRole));
    } else if (newMode === 'signup') {
      navigate(ROUTES.SIGNUP(activeRole));
    } else if (newMode === 'forgot') {
      navigate(ROUTES.FORGOT_PASSWORD(activeRole));
    }
  };

  const handleBack = () => {
    if (currentMode === 'signup' || currentMode === 'forgot') {
      navigate(ROUTES.LOGIN(activeRole));
    } else {
      navigate(`${ROUTES.CHOOSE_ROLE}?role=${activeRole}`);
    }
  };

  const handleSuccess = (payload: { user: AuthUser; accessToken: string }) => {
    setSession({
      accessToken: payload.accessToken,
      user: payload.user,
      role: activeRole,
    });
    navigate(config.dashboardRoute);
  };

  return (
    <AuthLayout
      role={activeRole}
      mode={currentMode}
      forgotStep={forgotStep}
      onModeChange={handleModeChange}
      onBack={handleBack}
      onSuccess={handleSuccess}
    />
  );
};
