import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  AuthMessageResult,
  AuthSessionResult,
  ForgotPasswordRequest,
  LoginRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  SignupRequest,
  VerifyOtpRequest,
} from '../../types/auth.types';
import type { UserRoleType } from '../../types/user.types';
import {
  AUTH_ACTIVE_ROLE_KEY,
  AUTH_TOKEN_KEY,
  authRolePrefix,
  authUserKey,
  getStoredActiveRole,
  getStoredToken,
  getWebDeviceToken,
} from '../../utils/authRole';
import { ROUTES } from '../../constants/routes';

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1'
)
  .trim()
  .replace(/\/$/, '');

function unwrapData<T>(response: { data?: T } | T): T {
  if (response && typeof response === 'object' && 'data' in (response as object)) {
    return ((response as { data?: T }).data ?? response) as T;
  }
  return response as T;
}

function clearLocalSession() {
  try {
    const role = getStoredActiveRole();
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_ACTIVE_ROLE_KEY);
    if (role) localStorage.removeItem(authUserKey(role));
    (['customer', 'driver', 'venue_partner'] as UserRoleType[]).forEach((r) => {
      localStorage.removeItem(authUserKey(r));
    });
  } catch {
    // ignore storage errors
  }
}

function redirectToRoleLogin() {
  const role = getStoredActiveRole() || 'customer';
  clearLocalSession();
  const loginPath = ROUTES.LOGIN(role);
  if (!window.location.pathname.includes('/login')) {
    window.location.replace(loginPath);
  }
}

function withDeviceDefaults<T extends { deviceType?: string; deviceToken?: string }>(
  body: T,
): T & { deviceType: string; deviceToken: string } {
  return {
    ...body,
    deviceType: body.deviceType || 'web',
    deviceToken: body.deviceToken || getWebDeviceToken(),
  };
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getStoredToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) headers.set('X-Timezone', tz);
    } catch {
      // ignore
    }
    return headers;
  },
});

async function baseQueryWithAuth(
  args: Parameters<typeof rawBaseQuery>[0],
  api: Parameters<typeof rawBaseQuery>[1],
  extraOptions: Parameters<typeof rawBaseQuery>[2],
) {
  const result = await rawBaseQuery(args, api, extraOptions);
  const url =
    typeof args === 'string' ? args : typeof args === 'object' && args && 'url' in args
      ? String((args as { url?: string }).url || '')
      : '';
  const isAuthPublic =
    url.includes('/auth/login') ||
    url.includes('/auth/signup') ||
    url.includes('/auth/verify-otp') ||
    url.includes('/auth/resend-otp') ||
    url.includes('/auth/forgot-password') ||
    url.includes('/auth/reset-password');

  if (result.error?.status === 401 && !isAuthPublic) {
    redirectToRoleLogin();
  }
  return result;
}

export const webApi = createApi({
  reducerPath: 'webApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['AuthUser'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthSessionResult, LoginRequest>({
      query: (body) => ({
        url: `/${authRolePrefix(body.role)}/auth/login`,
        method: 'POST',
        body: withDeviceDefaults(body),
      }),
      transformResponse: (response: unknown) => unwrapData<AuthSessionResult>(response as never),
    }),

    signup: builder.mutation<AuthSessionResult, SignupRequest>({
      query: (body) => ({
        url: `/${authRolePrefix(body.role)}/auth/signup`,
        method: 'POST',
        body: withDeviceDefaults(body),
      }),
      transformResponse: (response: unknown) => unwrapData<AuthSessionResult>(response as never),
    }),

    verifyOtp: builder.mutation<AuthSessionResult, VerifyOtpRequest>({
      query: (body) => ({
        url: `/${authRolePrefix(body.role)}/auth/verify-otp`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => unwrapData<AuthSessionResult>(response as never),
    }),

    resendOtp: builder.mutation<AuthMessageResult, ResendOtpRequest>({
      query: (body) => ({
        url: `/${authRolePrefix(body.role)}/auth/resend-otp`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => unwrapData<AuthMessageResult>(response as never),
    }),

    forgotPassword: builder.mutation<AuthMessageResult, ForgotPasswordRequest>({
      query: (body) => ({
        url: `/${authRolePrefix(body.role)}/auth/forgot-password`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => unwrapData<AuthMessageResult>(response as never),
    }),

    resetPassword: builder.mutation<AuthMessageResult, ResetPasswordRequest>({
      query: (body) => ({
        url: `/${authRolePrefix(body.role)}/auth/reset-password`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => unwrapData<AuthMessageResult>(response as never),
    }),

    logout: builder.mutation<AuthMessageResult, { role: UserRoleType }>({
      query: ({ role }) => ({
        url: `/${authRolePrefix(role)}/auth/logout`,
        method: 'POST',
      }),
      transformResponse: (response: unknown) => unwrapData<AuthMessageResult>(response as never),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = webApi;
