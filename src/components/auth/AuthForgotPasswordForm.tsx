import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  Check
} from 'lucide-react';
import { Button } from '../common/Button';
import { UserRoleType } from '../../types/user.types';
import { ROLE_AUTH_CONFIGS } from '../../constants/roleAuthData';
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from '../../store/api/webApi';
import { getApiErrorMessage } from '../../utils/apiError';
import { ROUTES } from '../../constants/routes';

export type ForgotPasswordStep = 'request_code' | 'verify_code' | 'reset_password' | 'success';

interface AuthForgotPasswordFormProps {
  role: UserRoleType;
  step?: ForgotPasswordStep;
  onBackToLogin?: () => void;
  onResetComplete?: () => void;
}

export const AuthForgotPasswordForm: React.FC<AuthForgotPasswordFormProps> = ({
  role,
  step: propStep,
  onBackToLogin,
  onResetComplete,
}) => {
  const config = ROLE_AUTH_CONFIGS[role];
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();
  const isLoading = isForgotLoading || isVerifyLoading || isResetLoading;

  // Route-driven step detection
  const determineStep = (): ForgotPasswordStep => {
    if (propStep) return propStep;
    const pathname = location.pathname;
    if (pathname.includes('/verify-code')) return 'verify_code';
    if (pathname.includes('/reset-password')) return 'reset_password';
    return 'request_code';
  };

  const currentStep = determineStep();
  const [internalSuccess, setInternalSuccess] = useState(false);

  // Form states initialized with search params if available
  const emailParam = searchParams.get('email') || '';
  const tokenParam = searchParams.get('token') || '';

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [passwordResetToken, setPasswordResetToken] = useState(tokenParam);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resendCountdown, setResendCountdown] = useState(28);
  const [canResend, setCanResend] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Keep email synced if query param changes
  useEffect(() => {
    if (emailParam && !email) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  // Keep token synced if query param changes
  useEffect(() => {
    if (tokenParam && !passwordResetToken) {
      setPasswordResetToken(tokenParam);
    }
  }, [tokenParam]);

  // Ticking timer for resend code
  useEffect(() => {
    let timer: any;
    if (currentStep === 'verify_code' && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, resendCountdown]);

  const handleFillDemo = () => {
    setEmail(config.demoCredentials.email);
    setErrorMsg('');
  };

  const handleBackToLoginAction = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      navigate(ROUTES.LOGIN(role));
    }
  };

  // STEP 1: Request Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');

    try {
      await forgotPassword({
        email: email.trim().toLowerCase(),
        role,
      }).unwrap();

      setResendCountdown(28);
      setCanResend(false);
      navigate(ROUTES.VERIFY_CODE(role, email.trim().toLowerCase()));
    } catch (err) {
      setErrorMsg(
        getApiErrorMessage(err, 'Unable to send reset code. Please check your email.'),
      );
    }
  };

  // STEP 2: Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        newOtp[i] = d;
      });
      setOtp(newOtp);
      const targetIdx = Math.min(digits.length, 5);
      setFocusedIndex(targetIdx);
      document.getElementById(`forgot-otp-${targetIdx}`)?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      setFocusedIndex(index + 1);
      document.getElementById(`forgot-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setFocusedIndex(index - 1);
      document.getElementById(`forgot-otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code.');
      return;
    }

    setErrorMsg('');

    try {
      const data = await verifyOtp({
        email: email.trim().toLowerCase(),
        otp: code,
        role,
        reason: 'password_reset',
      }).unwrap();

      const token = data?.passwordResetToken;
      if (!token) {
        setErrorMsg('Verification succeeded but no reset token was returned. Please try again.');
        return;
      }

      setPasswordResetToken(token);
      navigate(ROUTES.RESET_PASSWORD(role, email.trim().toLowerCase(), token));
    } catch (err) {
      setErrorMsg(
        getApiErrorMessage(err, 'Invalid verification code. Please check and re-enter.'),
      );
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const data = await forgotPassword({
        email: email.trim().toLowerCase(),
        role,
      }).unwrap();
      setResendCountdown(28);
      setCanResend(false);
      setSuccessMsg(data?.message || 'A new verification code has been dispatched.');
    } catch (err) {
      setErrorMsg(getApiErrorMessage(err, 'Could not resend the code. Please try again.'));
    }
  };

  // STEP 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!passwordResetToken) {
      setErrorMsg('Missing reset token. Please verify your email code again.');
      return;
    }

    setErrorMsg('');

    try {
      await resetPassword({
        email: email.trim().toLowerCase(),
        passwordResetToken,
        newPassword,
        role,
      }).unwrap();

      setInternalSuccess(true);
    } catch (err) {
      setErrorMsg(getApiErrorMessage(err, 'Password update failed. Please try again.'));
    }
  };

  // =========================================================================
  // RENDER: SUCCESS SCREEN
  // =========================================================================
  if (internalSuccess || currentStep === 'success') {
    return (
      <div className="w-full max-w-md mx-auto text-center py-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="stroke-[3]" />
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
          Password updated successfully!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Your password has been reset. You can now log in to your {config.title} account using your new credentials.
        </p>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => {
            if (onResetComplete) onResetComplete();
            else navigate(ROUTES.LOGIN(role));
          }}
          className="bg-[#FF8A00] hover:bg-[#E67600] text-white font-bold rounded-2xl py-4 shadow-lg shadow-orange-500/25"
        >
          Return to Log In
        </Button>
      </div>
    );
  }

  // =========================================================================
  // RENDER: STEP 1 - REQUEST CODE
  // =========================================================================
  if (currentStep === 'request_code') {
    return (
      <div className="w-full max-w-md mx-auto animate-fade-in">
        {/* Top Header: Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={handleBackToLoginAction}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-1 -ml-1 rounded-lg"
            title="Back to login"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-bold text-[#FF8A00] hover:underline"
          >
            Fill Demo Email
          </button>
        </div>

        {/* Lock with Circular Arrow Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-[#0B2A4A] dark:text-white flex items-center justify-center shadow-sm">
            <div className="relative">
              <RotateCcw size={28} className="stroke-[2.3] text-[#0B2A4A] dark:text-white" />
              <Lock size={12} className="absolute inset-0 m-auto stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Forgot password?
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            Enter the email linked to your account. We'll send a 6-digit code to reset your password.
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5 text-xs sm:text-sm text-red-600 dark:text-red-300">
            <AlertCircle size={17} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Request Form */}
        <form onSubmit={handleRequestCode} className="space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">
              Email ID
            </label>
            <div className="flex items-center px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
              <Mail size={18} className="text-gray-400 shrink-0 mr-3" />
              <input
                type="email"
                required
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold rounded-2xl py-4"
          >
            Send Code
          </Button>
        </form>
      </div>
    );
  }

  // =========================================================================
  // RENDER: STEP 2 - ENTER VERIFICATION CODE
  // =========================================================================
  if (currentStep === 'verify_code') {
    return (
      <div className="w-full max-w-md mx-auto animate-fade-in">
        {/* Top Header: Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate(ROUTES.FORGOT_PASSWORD(role, email))}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-1 -ml-1 rounded-lg"
            title="Change email"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Heading & Subtitle */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Enter verification code
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            We sent a 6-digit code to{' '}
            <span className="font-extrabold text-gray-900 dark:text-white break-all">{email || 'your email'}</span>
          </p>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5 text-xs sm:text-sm text-red-600 dark:text-red-300">
            <AlertCircle size={17} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-600 dark:text-emerald-300">
            <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 6 Digit Verification Boxes */}
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5 max-w-sm mx-auto">
            {otp.map((digit, idx) => {
              const isBoxFocused = focusedIndex === idx;
              return (
                <input
                  key={idx}
                  id={`forgot-otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onFocus={() => setFocusedIndex(idx)}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className={`w-full aspect-[4/5] max-w-[54px] max-h-[64px] text-center text-lg sm:text-2xl font-extrabold rounded-xl sm:rounded-2xl border-2 outline-none transition-all ${
                    isBoxFocused
                      ? 'border-slate-900 dark:border-white bg-white dark:bg-[#161B22] shadow-sm'
                      : digit
                      ? 'border-gray-300 dark:border-slate-600 bg-white dark:bg-[#161B22] text-gray-900 dark:text-white'
                      : 'border-gray-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0D1117] text-gray-900 dark:text-white'
                  }`}
                />
              );
            })}
          </div>

          {/* Resend in 28s / Resend Code */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span>Didn't get the code? </span>
            {resendCountdown > 0 ? (
              <span className="font-semibold text-gray-400">
                Resend in {resendCountdown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-bold text-[#FF8A00] hover:underline cursor-pointer"
              >
                Resend code
              </button>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold rounded-2xl py-4"
          >
            Verify Code
          </Button>
        </form>
      </div>
    );
  }

  // =========================================================================
  // RENDER: STEP 3 - RESET PASSWORD
  // =========================================================================
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => navigate(ROUTES.VERIFY_CODE(role, email))}
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-1 -ml-1 rounded-lg"
          title="Back to code verification"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Create new password
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
          Your new password must be at least 8 characters long.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5 text-xs sm:text-sm text-red-600 dark:text-red-300">
          <AlertCircle size={17} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">
            New Password
          </label>
          <div className="flex items-center px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <Lock size={18} className="text-gray-400 shrink-0 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">
            Confirm New Password
          </label>
          <div className="flex items-center px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <Lock size={18} className="text-gray-400 shrink-0 mr-3" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold rounded-2xl py-4"
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};
