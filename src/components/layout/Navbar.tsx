import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  Building2,
  Car,
  ChevronRight,
  LogIn,
  RotateCcw,
  Sparkles,
  User,
} from 'lucide-react';
import { ROUTES, parseRoleFromSlug } from '../../constants/routes';
import { useAuth } from '../../auth/AuthProvider';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, activeRole } = useAuth();
  const pathname = location.pathname;

  const isLanding = pathname === '/';
  const isOnboardingStep1 =
    pathname === '/onboarding' || pathname === '/onboarding/1';
  const isOnboardingStep2 = pathname === '/onboarding/2';
  const isOnboardingStep3 = pathname === '/onboarding/3';
  const isChooseRole = pathname === '/choose-role';
  const isOnboardingArea =
    isOnboardingStep1 || isOnboardingStep2 || isOnboardingStep3 || isChooseRole;

  const isAuthArea =
    /\/(login|signup|forgot-password|verify-code|reset-password)$/.test(pathname);
  const isDashboard = pathname.endsWith('/dashboard');

  const roleSlugMatch = pathname.match(/^\/([^/]+)/);
  const currentRole = parseRoleFromSlug(roleSlugMatch?.[1]);

  const roleBadge = (() => {
    if (currentRole === 'driver') {
      return {
        title: 'Driver Portal',
        icon: <Car size={13} className="text-[#FF8A00]" />,
        badgeBg:
          'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      };
    }
    if (currentRole === 'venue_partner') {
      return {
        title: 'Venue Partner',
        icon: <Building2 size={13} className="text-[#3B82F6]" />,
        badgeBg:
          'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      };
    }
    return {
      title: 'Customer Portal',
      icon: <User size={13} className="text-[#22C55E]" />,
      badgeBg:
        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    };
  })();

  return (
    <header
      className={`sticky top-0 z-40 w-full shrink-0 transition-colors ${
        isLanding
          ? 'bg-[#071D33]/55 backdrop-blur-md border-b border-white/10'
          : 'bg-white/90 dark:bg-[#0D1117]/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-2.5 select-none group"
        >
          <div className="relative">
            <img
              src="/assets/app_icon.png"
              alt="Trip Centre"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-md border border-white/20 dark:border-slate-700 object-cover group-hover:scale-105 transition-transform"
            />
            {!isLanding && (
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white dark:border-[#0D1117] rounded-full" />
            )}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span
                className={`block text-base sm:text-lg font-extrabold tracking-tight leading-none ${
                  isLanding ? 'text-white' : 'text-[#0B2A4A] dark:text-white'
                }`}
              >
                Trip Centre
              </span>
              {!isLanding && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FF8A00] text-white px-2 py-0.5 rounded-full shadow-sm">
                  Web Portal
                </span>
              )}
            </div>
            <span
              className={`hidden sm:block text-[11px] font-medium ${
                isLanding ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Pre-booked cabs & transfers
            </span>
          </div>
        </button>

        {/* Landing marketing nav */}
        {isLanding && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-white/85">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it works
            </a>
            <Link to={ROUTES.ONBOARDING_STEP(1)} className="hover:text-white transition-colors">
              Get started
            </Link>
            <Link to={ROUTES.LOGIN('driver')} className="hover:text-white transition-colors">
              Drivers
            </Link>
            <Link
              to={ROUTES.LOGIN('venue_partner')}
              className="hover:text-white transition-colors"
            >
              Partners
            </Link>
          </nav>
        )}

        {/* Onboarding step tabs — kept as before */}
        {isOnboardingArea && (
          <div className="hidden md:flex items-center gap-1.5 bg-gray-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-gray-200/50 dark:border-slate-700/50 text-xs font-semibold">
            <button
              type="button"
              onClick={() => navigate(ROUTES.ONBOARDING_STEP(1))}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isOnboardingStep1
                  ? 'bg-white dark:bg-[#1E2738] text-[#FF8A00] shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              1. Book Ahead
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.ONBOARDING_STEP(2))}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isOnboardingStep2
                  ? 'bg-white dark:bg-[#1E2738] text-[#FF8A00] shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              2. Match Driver
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.ONBOARDING_STEP(3))}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isOnboardingStep3
                  ? 'bg-white dark:bg-[#1E2738] text-[#FF8A00] shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              3. Track Trip
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.CHOOSE_ROLE)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isChooseRole
                  ? 'bg-[#FF8A00] text-white shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              4. Choose Role
            </button>
          </div>
        )}

        {/* Auth / dashboard breadcrumb */}
        {(isAuthArea || isDashboard) && (
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
            <button
              type="button"
              onClick={() => navigate(ROUTES.CHOOSE_ROLE)}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              Role Selection
            </button>
            <ChevronRight size={13} className="text-gray-400" />
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${roleBadge.badgeBg}`}
            >
              {roleBadge.icon}
              <span>{roleBadge.title}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-2.5">
          {isLanding && !isAuthenticated && (
            <>
              <button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN('customer'))}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Log in</span>
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.SIGNUP('customer'))}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF8A00] hover:bg-[#E67600] text-white px-3.5 py-2 text-xs sm:text-sm font-extrabold shadow-glow-orange transition-colors"
              >
                Book a ride
              </button>
            </>
          )}

          {isLanding && isAuthenticated && activeRole && (
            <button
              type="button"
              onClick={() => navigate(ROUTES.DASHBOARD(activeRole))}
              className="inline-flex items-center rounded-xl bg-[#FF8A00] hover:bg-[#E67600] text-white px-3.5 py-2 text-xs sm:text-sm font-extrabold shadow-glow-orange transition-colors"
            >
              Go to dashboard
            </button>
          )}

          {isOnboardingArea && (
            <>
              {!isChooseRole && (
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.CHOOSE_ROLE)}
                  title="Select Role"
                  className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700"
                >
                  <Sparkles size={14} className="text-[#FF8A00]" />
                  <span>Roles</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate(ROUTES.ONBOARDING_STEP(1))}
                title="Restart Onboarding"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw size={15} />
                <span className="hidden sm:inline">Start Over</span>
              </button>
            </>
          )}

          {!isLanding && !isOnboardingArea && !isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate(ROUTES.HOME)}
              className="hidden sm:inline-flex text-xs font-bold text-gray-500 hover:text-[#0B2A4A] dark:hover:text-white transition-colors"
            >
              Home
            </button>
          )}

          <ThemeToggle
            className={
              isLanding
                ? '!bg-white/10 !border-white/20 !text-white hover:!border-[#FF8A00]'
                : ''
            }
          />
        </div>
      </div>
    </header>
  );
}
