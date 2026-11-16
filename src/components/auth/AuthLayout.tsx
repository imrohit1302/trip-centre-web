import React, { useState } from 'react';
import { UserRoleType } from '../../types/user.types';
import type { AuthUser } from '../../types/auth.types';
import { ROLE_AUTH_CONFIGS } from '../../constants/roleAuthData';
import { AuthLoginForm } from './AuthLoginForm';
import { AuthSignupForm } from './AuthSignupForm';
import { AuthForgotPasswordForm } from './AuthForgotPasswordForm';
import { AuthOtpModal } from './AuthOtpModal';
import { 
  CalendarCheck, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  MapPin, 
  Sparkles, 
  Star 
} from 'lucide-react';

interface AuthLayoutProps {
  role: UserRoleType;
  mode: 'login' | 'signup' | 'forgot';
  forgotStep?: 'request_code' | 'verify_code' | 'reset_password';
  onModeChange: (mode: 'login' | 'signup' | 'forgot') => void;
  onBack: () => void;
  onSuccess: (payload: { user: AuthUser; accessToken: string }) => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  role,
  mode,
  forgotStep,
  onModeChange,
  onBack,
  onSuccess,
}) => {
  const config = ROLE_AUTH_CONFIGS[role];
  const [pendingEmail, setPendingEmail] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const renderFeatureIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return <CalendarCheck size={18} className="text-[#FF8A00] shrink-0" />;
      case 'shield':
        return <ShieldCheck size={18} className="text-[#22C55E] shrink-0" />;
      case 'clock':
        return <Clock size={18} className="text-[#3B82F6] shrink-0" />;
      case 'dollar':
        return <DollarSign size={18} className="text-[#22C55E] shrink-0" />;
      case 'map':
        return <MapPin size={18} className="text-[#FF8A00] shrink-0" />;
      default:
        return <Sparkles size={18} className="text-[#FF8A00] shrink-0" />;
    }
  };

  const handleSignupSuccess = (data: { email: string; user?: any; otpExpiresInMinutes?: number }) => {
    setPendingEmail(data.email);
    setIsOtpModalOpen(true);
  };

  const handleOtpVerified = (payload: { user: AuthUser; accessToken: string }) => {
    setIsOtpModalOpen(false);
    onSuccess(payload);
  };

  return (
    <div className="flex-1 w-full min-h-0 flex items-center justify-center p-3 sm:p-5 lg:p-6 relative overflow-hidden">
      {/* Background ambient gradient blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] max-w-[85vw] max-h-[85vh] bg-gradient-to-tr from-[#FF8A00]/10 via-[#0B2A4A]/5 to-[#1E4A78]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main SaaS Card */}
      <div className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-2xl border border-gray-200/90 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#161B22] lg:h-[min(670px,calc(100vh-135px))] lg:min-h-[570px] animate-fade-in transition-colors">
        {/* ---------------- LEFT BRAND PANEL (Desktop) ---------------- */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#071D33] via-[#0B2A4A] to-[#1E4A78] text-white p-6 xl:p-8 flex-col justify-between relative overflow-hidden h-full">
          {/* Ambient decorative glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FF8A00]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#1E4A78]/60 blur-3xl pointer-events-none" />

          {/* Brand header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3.5 mb-5">
              <img
                src="/assets/app_icon.png"
                alt="Trip Centre"
                className="w-11 h-11 rounded-2xl shadow-xl border border-white/20 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                    Trip Centre
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FF8A00] text-white px-2 py-0.5 rounded-full">
                    {config.title}
                  </span>
                </div>
                <p className="text-xs text-orange-200/90 font-medium tracking-wide">
                  {config.badge}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/15 text-orange-300">
                <Sparkles size={13} />
                <span>{config.heroBadge}</span>
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold leading-snug tracking-tight text-white">
                {mode === 'forgot'
                  ? 'Account Security & Password Recovery'
                  : config.heroHeading}
              </h2>

              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                {mode === 'forgot'
                  ? 'Follow the steps to securely recover access to your verified Trip Centre account with 6-digit email authentication.'
                  : config.heroSubtitle}
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-1">
              {config.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-[13px] text-slate-200 bg-white/5 border border-white/10 rounded-2xl p-2.5">
                  {renderFeatureIcon(feat.iconType)}
                  <span>{feat.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative z-10 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1 text-[#FFC107] mb-1.5">
              {Array.from({ length: config.testimonial.rating }).map((_, i) => (
                <Star key={i} size={13} className="fill-[#FFC107]" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic line-clamp-2">
              "{config.testimonial.quote}"
            </p>
            <span className="block text-[11px] font-bold text-orange-200 mt-1">
              — {config.testimonial.author}
            </span>
          </div>
        </div>

        {/* ---------------- RIGHT FORM PANEL ---------------- */}
        <div className="col-span-12 lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-white dark:bg-[#161B22] h-full overflow-y-auto">
          {mode === 'login' ? (
            <AuthLoginForm
              role={role}
              onBack={onBack}
              onNavigateToSignup={() => onModeChange('signup')}
              onNavigateToForgotPassword={() => onModeChange('forgot')}
              onLoginSuccess={onSuccess}
            />
          ) : mode === 'signup' ? (
            <AuthSignupForm
              role={role}
              onBack={onBack}
              onNavigateToLogin={() => onModeChange('login')}
              onSignupSuccess={handleSignupSuccess}
            />
          ) : (
            <AuthForgotPasswordForm
              role={role}
              step={forgotStep}
              onBackToLogin={() => onModeChange('login')}
              onResetComplete={() => onModeChange('login')}
            />
          )}
        </div>
      </div>

      {/* Signup OTP Verification Modal */}
      <AuthOtpModal
        email={pendingEmail}
        role={role}
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerified={handleOtpVerified}
      />
    </div>
  );
};
