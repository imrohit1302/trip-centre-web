import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ONBOARDING_SLIDES, ROLE_OPTIONS } from '../../constants/onboardingData';
import { StepperDots } from '../common/StepperDots';
import { Button } from '../common/Button';
import { RadioCard } from '../common/RadioCard';
import { UserRoleType } from '../../types/user.types';
import { ROUTES } from '../../constants/routes';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  CalendarCheck, 
  UserCheck, 
  MapPin, 
  ChevronRight,
  Sparkle
} from 'lucide-react';

interface WebResponsiveViewProps {
  onContinueToPortal?: (role: string) => void;
}

export const WebResponsiveView: React.FC<WebResponsiveViewProps> = ({
  onContinueToPortal,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stepId } = useParams<{ stepId?: string }>();

  // Determine current slide and role selection mode directly from router URL
  const isRoleSelection = location.pathname === ROUTES.CHOOSE_ROLE;
  const parsedStep = parseInt(stepId || '1', 10);
  const currentSlide = Math.min(Math.max(parsedStep - 1, 0), ONBOARDING_SLIDES.length - 1);
  const totalSlides = ONBOARDING_SLIDES.length;

  // Selected role on choose-role page
  const [selectedRole, setSelectedRole] = useState<UserRoleType | null>(() => {
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get('role') as UserRoleType | null;
    if (
      roleParam &&
      ['customer', 'driver', 'venue_partner', 'reseller_agent'].includes(roleParam)
    ) {
      return roleParam;
    }
    return null;
  });

  // Keep selectedRole synced if URL query param changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get('role') as UserRoleType | null;
    if (
      roleParam &&
      ['customer', 'driver', 'venue_partner', 'reseller_agent'].includes(roleParam)
    ) {
      setSelectedRole(roleParam);
    }
  }, [location.search]);

  const currentData = ONBOARDING_SLIDES[currentSlide];

  // Route-driven slide navigation
  const goToSlide = (idx: number) => {
    navigate(ROUTES.ONBOARDING_STEP(idx + 1));
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      navigate(ROUTES.ONBOARDING_STEP(currentSlide + 2));
    } else {
      navigate(ROUTES.CHOOSE_ROLE);
    }
  };

  const prevSlide = () => {
    if (isRoleSelection) {
      navigate(ROUTES.ONBOARDING_STEP(totalSlides));
    } else if (currentSlide > 0) {
      navigate(ROUTES.ONBOARDING_STEP(currentSlide));
    }
  };

  const skipToRoleSelection = () => {
    navigate(ROUTES.CHOOSE_ROLE);
  };

  const handleSelectRole = (role: UserRoleType) => {
    setSelectedRole(role);
    // Sync with search param so back/forward or refresh remembers choice
    navigate(`${ROUTES.CHOOSE_ROLE}?role=${role}`, { replace: true });
  };

  const handleContinue = () => {
    if (selectedRole) {
      if (onContinueToPortal) {
        onContinueToPortal(selectedRole);
      } else {
        navigate(ROUTES.LOGIN(selectedRole));
      }
    }
  };

  // Keyboard navigation support: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        if (!isRoleSelection) nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isRoleSelection]);

  const getSlideIcon = (id: number) => {
    switch (id) {
      case 0:
        return <CalendarCheck size={18} />;
      case 1:
        return <UserCheck size={18} />;
      case 2:
        return <MapPin size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-2xl border border-gray-200/90 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#161B22] lg:h-[min(650px,calc(100vh-135px))] lg:min-h-[570px] transition-colors duration-200">
      {/* ---------------- LEFT BRAND SHOWCASE PANEL (Desktop only) ---------------- */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#071D33] via-[#0B2A4A] to-[#1E4A78] text-white p-6 sm:p-8 lg:p-8 flex-col justify-between relative overflow-hidden h-full">
        {/* Ambient decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FF8A00]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#1E4A78]/60 blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-4">
            <img
              src="/assets/app_icon.png"
              alt="Trip Centre"
              className="w-11 h-11 rounded-2xl shadow-xl border border-white/20 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                  Trip Centre
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FF8A00] text-white px-2 py-0.5 rounded-full shadow-sm">
                  Official
                </span>
              </div>
              <p className="text-xs text-orange-200/90 font-medium tracking-wide">
                Seamless Rides & Chauffeur Services
              </p>
            </div>
          </div>

          <div className="space-y-3 my-4 sm:my-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/15 text-orange-300">
              <Sparkle size={13} />
              <span>{isRoleSelection ? 'Choose Your Account' : 'Pre-Booking Platform'}</span>
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold leading-snug tracking-tight text-white">
              {isRoleSelection
                ? 'Select how you’ll use Trip Centre'
                : 'Plan your journeys with complete peace of mind'}
            </h2>

            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
              {isRoleSelection
                ? 'Your choice configures your dashboard, dispatch options, and booking capabilities.'
                : 'Experience the highest standard of scheduled transportation. Designed for individuals, vetted drivers, and boutique hospitality venues.'}
            </p>
          </div>
        </div>

        {/* Interactive step indicator tabs on desktop (URL-driven) */}
        <div className="relative z-10 my-2 space-y-2">
          {ONBOARDING_SLIDES.map((s, idx) => {
            const isCurrent = !isRoleSelection && currentSlide === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`w-full text-left p-2.5 rounded-2xl transition-all duration-200 flex items-center justify-between border ${
                  isCurrent
                    ? 'bg-white/15 border-white/30 shadow-md text-white translate-x-1.5'
                    : 'bg-black/10 border-transparent hover:bg-white/5 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                      isCurrent ? 'bg-[#FF8A00] text-white shadow-sm' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {getSlideIcon(idx)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-orange-300/80 font-semibold uppercase tracking-wider">Step {idx + 1}</span>
                    <span className="text-xs sm:text-sm font-bold text-white line-clamp-1">{s.title}</span>
                  </div>
                </div>
                {isCurrent && <ChevronRight size={16} className="text-[#FF8A00]" />}
              </button>
            );
          })}

          {/* Role selection tab */}
          <button
            type="button"
            onClick={skipToRoleSelection}
            className={`w-full text-left p-2.5 rounded-2xl transition-all duration-200 flex items-center justify-between border ${
              isRoleSelection
                ? 'bg-white/15 border-white/30 shadow-md text-white translate-x-1.5'
                : 'bg-black/10 border-transparent hover:bg-white/5 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                  isRoleSelection ? 'bg-[#FF8A00] text-white shadow-sm' : 'bg-white/10 text-slate-300'
                }`}
              >
                <Sparkles size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-orange-300/80 font-semibold uppercase tracking-wider">Step 4</span>
                <span className="text-xs sm:text-sm font-bold text-white line-clamp-1">How will you use Trip Centre?</span>
              </div>
            </div>
            {isRoleSelection && <ChevronRight size={16} className="text-[#FF8A00]" />}
          </button>
        </div>

        {/* Footer trust badge */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-300">
          <ShieldCheck size={15} className="text-[#22C55E]" />
          <span>Enterprise-grade security & verified partner network</span>
        </div>
      </div>

      {/* ---------------- RIGHT INTERACTIVE CONTENT PANEL ---------------- */}
      <div className="col-span-12 lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-white dark:bg-[#161B22] h-full overflow-y-auto">
        {isRoleSelection ? (
          /* ================= SCREEN 4: ROLE SELECTION ================= */
          <div className="flex-1 flex flex-col justify-between animate-fade-in h-full">
            <div>
              {/* Back to slides */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Back to features</span>
                </button>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF8A00] bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-900/50">
                  Step 4 of 4
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 mb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
                  How will you use Trip Centre?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Select how you'll use Trip Centre. You can't change this later without contacting support.
                </p>
              </div>

              {/* Roles List */}
              <div className="space-y-3">
                {ROLE_OPTIONS.map((role) => (
                  <RadioCard
                    key={role.id}
                    id={role.id}
                    title={role.title}
                    description={role.description}
                    iconName={role.iconName}
                    badge={role.badge}
                    isSelected={selectedRole === role.id}
                    onSelect={(id) => handleSelectRole(id)}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Continue button */}
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-400">
                {selectedRole
                  ? `Ready to proceed as: ${selectedRole.replace(/_/g, ' ').toUpperCase()}`
                  : 'Please pick an option to continue'}
              </span>

              <Button
                variant="primary"
                size="md"
                disabled={!selectedRole}
                onClick={handleContinue}
                className={`w-full sm:w-auto min-w-[180px] font-bold rounded-2xl py-3 ${
                  !selectedRole
                    ? 'bg-[#FF8A00]/40 text-white cursor-not-allowed shadow-none'
                    : 'bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 active:scale-[0.99]'
                }`}
              >
                <span>Continue</span>
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          /* ================= SCREENS 1, 2, 3: ONBOARDING SLIDES ================= */
          <div className="flex-1 flex flex-col justify-between animate-fade-in h-full">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF8A00] bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-900/50">
                {currentData.accentBadge}
              </span>
              <button
                type="button"
                onClick={skipToRoleSelection}
                className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Skip
              </button>
            </div>

            {/* Content Body */}
            <div className="my-auto py-3">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Illustration Card */}
                <div className="md:col-span-5 bg-gradient-to-b from-slate-50 to-orange-50/30 dark:from-[#0D1117] dark:to-[#161B22] border border-gray-200/80 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-center shadow-inner h-[200px] xl:h-[230px]">
                  <img
                    key={currentData.image}
                    src={currentData.image}
                    alt={currentData.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md animate-fade-in transition-all duration-300"
                  />
                </div>

                {/* Text and Highlights */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                    {currentData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    {currentData.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2 pt-1">
                    {currentData.featureBullets.map((bullet, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-gray-700 dark:text-gray-300">
                        <CheckCircle2 size={15} className="text-[#22C55E] shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <StepperDots
                  total={totalSlides}
                  current={currentSlide}
                  onSelect={goToSlide}
                />
                <span className="text-xs text-gray-400 font-medium">
                  {currentSlide + 1} of {totalSlides}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {currentSlide > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevSlide}
                    className="font-bold rounded-2xl px-4 py-2"
                  >
                    Previous
                  </Button>
                )}

                <Button
                  variant="primary"
                  size="sm"
                  onClick={nextSlide}
                  className="font-bold rounded-2xl min-w-[130px] px-5 py-2 bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-md shadow-orange-500/25"
                >
                  <span>{currentSlide === totalSlides - 1 ? 'Get Started' : 'Next'}</span>
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
