import React, { useState } from 'react';
import { MailCheck, CheckCircle2, AlertCircle, X, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { UserRoleType } from '../../types/user.types';
import type { AuthUser } from '../../types/auth.types';
import { useResendOtpMutation, useVerifyOtpMutation } from '../../store/api/webApi';
import { getApiErrorMessage } from '../../utils/apiError';

interface AuthOtpModalProps {
  email: string;
  role: UserRoleType;
  isOpen: boolean;
  onClose: () => void;
  onVerified: (payload: { user: AuthUser; accessToken: string }) => void;
}

export const AuthOtpModal: React.FC<AuthOtpModalProps> = ({
  email,
  role,
  isOpen,
  onClose,
  onVerified,
}) => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resending }] = useResendOtpMutation();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextInput = document.getElementById(`auth-otp-input-${Math.min(digits.length, 5)}`);
      nextInput?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      const nextInput = document.getElementById(`auth-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`auth-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');

    try {
      const data = await verifyOtp({
        email,
        otp: code,
        role,
        reason: 'registration',
      }).unwrap();

      if (!data?.accessToken || !data?.user) {
        setErrorMsg('Verification succeeded but no session was returned. Please try logging in.');
        return;
      }

      setSuccessMsg(data.message || 'Email verified successfully! Logging you in...');
      setTimeout(() => {
        onVerified({ user: data.user, accessToken: data.accessToken! });
      }, 500);
    } catch (err) {
      setErrorMsg(
        getApiErrorMessage(err, 'Invalid verification code. Please check and re-enter.'),
      );
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const data = await resendOtp({
        email,
        role,
        reason: 'registration',
      }).unwrap();
      setSuccessMsg(data?.message || 'A new verification code has been dispatched.');
    } catch (err) {
      setErrorMsg(getApiErrorMessage(err, 'Could not resend the code. Please try again.'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#161B22] rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-[#FF8A00] flex items-center justify-center mx-auto mb-3">
            <MailCheck size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Verify your email
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
            We sent a 6-digit confirmation code to{' '}
            <span className="font-bold text-gray-900 dark:text-white">{email}</span>
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-2 text-xs text-red-600 dark:text-red-300">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2 text-xs text-emerald-600 dark:text-emerald-300">
            <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5 max-w-xs mx-auto">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`auth-otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-full aspect-[4/5] max-w-[48px] max-h-[58px] text-center text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all flex items-center justify-center"
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold rounded-2xl py-4"
          >
            Verify & Continue
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <span>Didn’t receive the code? </span>
          <button
            type="button"
            disabled={resending}
            onClick={handleResendOtp}
            className="font-bold text-[#FF8A00] hover:underline disabled:opacity-50 inline-flex items-center gap-1"
          >
            <RotateCcw size={12} className={resending ? 'animate-spin' : ''} />
            <span>Resend Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
