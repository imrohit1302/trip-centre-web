import React, { useState } from 'react';
import { 
  User, 
  Car, 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle2, 
  Check 
} from 'lucide-react';
import { Button } from '../common/Button';
import { UserRoleType } from '../../types/user.types';
import { 
  UserGender, 
  COUNTRY_OPTIONS, 
  CountryCodeOption 
} from '../../types/auth.types';
import { ROLE_AUTH_CONFIGS } from '../../constants/roleAuthData';
import { useSignupMutation } from '../../store/api/webApi';
import { getApiErrorMessage } from '../../utils/apiError';

interface AuthSignupFormProps {
  role: UserRoleType;
  onBack: () => void;
  onNavigateToLogin: () => void;
  onSignupSuccess: (data: { email: string; user?: any; otpExpiresInMinutes?: number }) => void;
}

export const AuthSignupForm: React.FC<AuthSignupFormProps> = ({
  role,
  onBack,
  onNavigateToLogin,
  onSignupSuccess,
}) => {
  const config = ROLE_AUTH_CONFIGS[role];
  const [signup, { isLoading }] = useSignupMutation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeOption>(COUNTRY_OPTIONS[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState<UserGender>('prefer_not_to_say');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
    }
  };

  const genderOptions: Array<{ id: UserGender; label: string; symbol: string }> = [
    { id: 'male', label: 'Male', symbol: '♂' },
    { id: 'female', label: 'Female', symbol: '♀' },
    { id: 'other', label: 'Other', symbol: '⚧' },
    { id: 'prefer_not_to_say', label: 'Prefer not to say', symbol: '⊘' },
  ];

  const handleFillDemo = () => {
    setFullName(config.demoCredentials.name);
    setEmail(`${config.role}.${Math.floor(Math.random() * 900 + 100)}@yopmail.com`);
    setPhoneNumber(config.demoCredentials.phone);
    setGender('male');
    setPassword(config.demoCredentials.password);
    setConfirmPassword(config.demoCredentials.password);
    setAgreeToTerms(true);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeToTerms) {
      setErrorMsg('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    try {
      const data = await signup({
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: {
          countryCode: selectedCountry.code,
          isoCode: selectedCountry.iso,
          localNumber: phoneNumber.replace(/\D/g, ''),
        },
        password,
        gender,
        role,
        deviceType: 'web',
      }).unwrap();

      setSuccessMsg(data?.message || 'Account created successfully! Please verify your email.');
      setTimeout(() => {
        onSignupSuccess({
          email: email.trim().toLowerCase(),
          user: data?.user,
          otpExpiresInMinutes: data?.otpExpiresInMinutes || 10,
        });
      }, 600);
    } catch (err) {
      setErrorMsg(
        getApiErrorMessage(err, 'Registration failed. Please check the details and try again.'),
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Top Header: Back Button */}
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
          Auto-Fill Sample Data
        </button>
      </div>

      {/* Role Pill Badge */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          {renderRoleIcon()}
          <span>{config.signupPillText}</span>
        </div>
      </div>

      {/* Heading & Subtitle */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Create your account
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-normal">
          Basic details first — you can add more once your email is verified.
        </p>
      </div>

      {/* Feedback Messages */}
      {errorMsg && (
        <div className="mb-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-2 text-xs text-red-600 dark:text-red-300 animate-fade-in">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2 text-xs text-emerald-600 dark:text-emerald-300 animate-fade-in">
          <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Full Name
          </label>
          <div className="flex items-center px-3.5 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <User size={16} className="text-gray-400 shrink-0 mr-2.5" />
            <input
              type="text"
              required
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Email ID */}
        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Email ID
          </label>
          <div className="flex items-center px-3.5 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <Mail size={16} className="text-gray-400 shrink-0 mr-2.5" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Phone Number
          </label>
          <div className="grid grid-cols-12 gap-2">
            {/* Country Selector */}
            <div className="col-span-5 relative">
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] text-sm text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{selectedCountry.flag}</span>
                  <span className="font-semibold text-xs">{selectedCountry.code}</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {/* Country Picker Dropdown */}
              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-[#1E2738] rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-1.5 z-30 max-h-48 overflow-y-auto">
                  {COUNTRY_OPTIONS.map((c) => (
                    <button
                      key={c.code + c.iso}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(c);
                        setIsCountryDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{c.flag}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                      </div>
                      <span className="font-bold text-gray-500 dark:text-gray-400">{c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Number Input */}
            <div className="col-span-7">
              <div className="flex items-center px-3.5 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
                <input
                  type="tel"
                  required
                  placeholder={selectedCountry.format}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Gender
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {genderOptions.map((g) => {
              const isSelected = gender === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGender(g.id)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-2xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-[#FF8A00] bg-orange-50/70 dark:bg-orange-950/40 text-[#FF8A00] font-bold shadow-sm'
                      : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600'
                  } ${g.id === 'prefer_not_to_say' ? 'col-span-2 sm:col-span-3' : ''}`}
                >
                  <span className="text-xs">{g.symbol}</span>
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Password
          </label>
          <div className="flex items-center px-3.5 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <Lock size={16} className="text-gray-400 shrink-0 mr-2.5" />
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
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
            Confirm Password
          </label>
          <div className="flex items-center px-3.5 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
            <Lock size={16} className="text-gray-400 shrink-0 mr-2.5" />
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
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <div
              onClick={() => setAgreeToTerms(!agreeToTerms)}
              className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                agreeToTerms
                  ? 'border-[#FF8A00] bg-[#FF8A00]'
                  : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-[#0D1117]'
              }`}
            >
              {agreeToTerms && <Check size={12} className="text-white stroke-[3]" />}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
              I agree to the{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="font-bold text-gray-900 dark:text-white hover:underline">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="font-bold text-gray-900 dark:text-white hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold rounded-2xl py-3"
          >
            Create Account
          </Button>
        </div>
      </form>

      {/* Footer Switcher */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <span>Already have an account? </span>
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="font-bold text-gray-900 dark:text-white hover:text-[#FF8A00] dark:hover:text-[#FF8A00] transition-colors"
        >
          Log In
        </button>
      </div>
    </div>
  );
};
