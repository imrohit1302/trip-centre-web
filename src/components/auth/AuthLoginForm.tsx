import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Car, Building2, Briefcase, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { UserRoleType } from '../../types/user.types';
import type { AuthUser } from '../../types/auth.types';
import { ROLE_AUTH_CONFIGS } from '../../constants/roleAuthData';
import { useLoginMutation } from '../../store/api/webApi';
import { getApiErrorMessage } from '../../utils/apiError';

interface AuthLoginFormProps {
  role: UserRoleType;
  onBack: () => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword?: () => void;
  onLoginSuccess: (payload: { user: AuthUser; accessToken: string }) => void;
}

export const AuthLoginForm: React.FC<AuthLoginFormProps> = ({
  role,
  onBack,
  onNavigateToSignup,
  onNavigateToForgotPassword,
  onLoginSuccess,
}) => {
  const config = ROLE_AUTH_CONFIGS[role];
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const renderRoleIcon = () => {
    switch (config.iconName) {
      case 'user':
        return <User size={13} className="text-slate-600 dark:text-slate-300" />;
      case 'van':
        return <Car size={13} className="text-slate-600 dark:text-slate-300" />;
      case 'building':
        return <Building2 size={13} className="text-slate-600 dark:text-slate-300" />;
      case 'briefcase':
        return <Briefcase size={13} className="text-slate-600 dark:text-slate-300" />;
      default:
        return <User size={13} className="text-slate-600 dark:text-slate-300" />;
    }
  };

  const handleFillDemo = () => {
    setEmail(config.demoCredentials.email);
    setPassword(config.demoCredentials.password);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    try {
      const data = await login({
        email: email.trim().toLowerCase(),
        password,
        role,
        deviceType: 'web',
      }).unwrap();

      if (!data?.accessToken || !data?.user) {
        setErrorMsg('Login succeeded but no session was returned. Please try again.');
        return;
      }

      setSuccessMsg(data.message || `Login successful! Redirecting to ${config.title} dashboard...`);
      setTimeout(() => {
        onLoginSuccess({ user: data.user, accessToken: data.accessToken! });
      }, 500);
    } catch (err) {
      setErrorMsg(getApiErrorMessage(err, 'Invalid email or password. Please try again.'));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-1 -ml-1 rounded-lg"
          title="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          type="button"
          onClick={handleFillDemo}
          className="text-xs font-bold text-[#FF8A00] hover:underline"
        >
          Fill Demo Credentials
        </button>
      </div>

      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          {renderRoleIcon()}
          <span>{config.loginPillText}</span>
        </div>
      </div>

      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Enter your details to continue.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-3.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-2 text-xs sm:text-sm text-red-600 dark:text-red-300 animate-fade-in">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-3.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2 text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 animate-fade-in">
          <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Email ID
          </label>
          <div className="flex items-center px-3.5 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <Mail size={17} className="text-gray-400 shrink-0 mr-2.5" />
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

        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Password
          </label>
          <div className="flex items-center px-3.5 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <Lock size={17} className="text-gray-400 shrink-0 mr-2.5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={onNavigateToForgotPassword}
            className="text-xs font-bold text-[#FF8A00] hover:text-[#E67600] transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold rounded-2xl py-3.5"
          >
            Log In
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        <span>New to Trip Centre? </span>
        <button
          type="button"
          onClick={onNavigateToSignup}
          className="font-bold text-gray-900 dark:text-white hover:text-[#FF8A00] dark:hover:text-[#FF8A00] transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
