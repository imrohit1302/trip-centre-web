import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export function Footer() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <footer
      className={`w-full shrink-0 border-t py-2.5 px-3 sm:px-6 lg:px-8 transition-colors z-20 ${
        isLanding
          ? 'border-white/10 bg-[#071D33]/90 text-white/70 backdrop-blur-md'
          : 'border-gray-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0D1117]/90 backdrop-blur-md text-gray-500 dark:text-gray-400'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span
            className={`font-semibold text-xs ${
              isLanding ? 'text-white' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Trip Centre
          </span>
          <span className="hidden md:inline opacity-50">•</span>
          <span className="hidden sm:inline text-xs opacity-80">
            Pre-booked cabs & transfers
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-semibold">
          <Link to={ROUTES.LOGIN('customer')} className="hover:text-[#FF8A00] transition-colors">
            Book a ride
          </Link>
          <Link to={ROUTES.LOGIN('driver')} className="hover:text-[#FF8A00] transition-colors">
            Drive
          </Link>
          <Link
            to={ROUTES.LOGIN('venue_partner')}
            className="hover:text-[#FF8A00] transition-colors"
          >
            Partner
          </Link>
        </div>

        <span className="text-[10px] sm:text-[11px] opacity-70">NZ & beyond</span>
      </div>
    </footer>
  );
}
