import type { UserRoleType } from './user.types';

export type UserGender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type DeviceType = 'web' | 'ios' | 'android';
export type OtpReason = 'registration' | 'password_reset';

export interface CountryCodeOption {
  code: string;
  iso: string;
  name: string;
  flag: string;
  format: string;
}

export const COUNTRY_OPTIONS: CountryCodeOption[] = [
  { code: '+64', iso: 'NZ', name: 'New Zealand', flag: '🇳🇿', format: '12 123 1234' },
  { code: '+61', iso: 'AU', name: 'Australia', flag: '🇦🇺', format: '412 345 678' },
  { code: '+1', iso: 'CA', name: 'Canada', flag: '🇨🇦', format: '555 123 4567' },
  { code: '+1', iso: 'US', name: 'United States', flag: '🇺🇸', format: '555 123 4567' },
  { code: '+44', iso: 'GB', name: 'United Kingdom', flag: '🇬🇧', format: '7123 456789' },
  { code: '+91', iso: 'IN', name: 'India', flag: '🇮🇳', format: '98765 43210' },
];

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  fullName: string;
  email: string;
  countryCode: string;
  countryIso: string;
  phoneNumber: string;
  gender: UserGender;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

/** Backend phone shape */
export interface AuthPhonePayload {
  isoCode: string;
  countryCode: string;
  localNumber: string;
}

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRoleType;
  [key: string]: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: UserRoleType;
  deviceType?: DeviceType;
  deviceToken?: string;
  timezone?: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phone: AuthPhonePayload;
  password: string;
  role: UserRoleType;
  deviceType?: DeviceType;
  deviceToken?: string;
  gender?: UserGender;
  timezone?: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  role: UserRoleType;
  reason: OtpReason;
}

export interface ResendOtpRequest {
  email: string;
  role: UserRoleType;
  reason: OtpReason;
}

export interface ForgotPasswordRequest {
  email: string;
  role: UserRoleType;
}

export interface ResetPasswordRequest {
  email: string;
  role: UserRoleType;
  passwordResetToken: string;
  newPassword: string;
}

export interface AuthSessionResult {
  user: AuthUser;
  accessToken?: string;
  message?: string;
  otpExpiresInMinutes?: number;
  passwordResetToken?: string;
}

export interface AuthMessageResult {
  message?: string;
  otpExpiresInMinutes?: number;
}
