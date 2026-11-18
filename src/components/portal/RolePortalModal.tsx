import React, { useState } from 'react';
import { UserRoleType } from '../../types/user.types';
import { Button } from '../common/Button';
import { 
  User, 
  Car, 
  Hotel, 
  Briefcase,
  X, 
  ArrowLeft, 
  CheckCircle2, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone
} from 'lucide-react';

interface RolePortalModalProps {
  role: UserRoleType;
  isOpen: boolean;
  onClose: () => void;
  onBackToRoles: () => void;
}

export const RolePortalModal: React.FC<RolePortalModalProps> = ({
  role,
  isOpen,
  onClose,
  onBackToRoles,
}) => {
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const getRoleDetails = () => {
    switch (role) {
      case 'customer':
        return {
          title: 'Customer Portal',
          subtitle: 'Schedule upcoming rides, manage active journeys, and view receipts.',
          icon: <User size={28} className="text-[#FF8A00]" />,
          badge: 'Rider & Passenger',
          demoEmail: 'customer@yopmail.com',
          apiEndpoint: '/customer/auth/login',
        };
      case 'driver':
        return {
          title: 'Driver Partner Portal',
          subtitle: 'Accept assigned trips, track earnings, and manage vehicle documentation.',
          icon: <Car size={28} className="text-[#FF8A00]" />,
          badge: 'Verified Chauffeur',
          demoEmail: 'driver@yopmail.com',
          apiEndpoint: '/driver/auth/login',
        };
      case 'venue_partner':
        return {
          title: 'Venue Partner Hub',
          subtitle: 'Book and coordinate pre-booked luxury transit on behalf of hotel & agency guests.',
          icon: <Hotel size={28} className="text-[#FF8A00]" />,
          badge: 'Hotels, Hostels & Travel Agencies',
          demoEmail: 'venue@yopmail.com',
          apiEndpoint: '/venue-partner/auth/login',
        };
      case 'reseller_agent':
        return {
          title: 'Reseller Agent Portal',
          subtitle: 'Book airport transfers and city rides for clients with IATA-ready agency tools.',
          icon: <Briefcase size={28} className="text-[#FF8A00]" />,
          badge: 'Travel Agents & Resellers',
          demoEmail: 'reseller@yopmail.com',
          apiEndpoint: '/reseller-agent/auth/login',
        };
      default:
        return {
          title: 'Customer Portal',
          subtitle: 'Schedule upcoming rides, manage active journeys, and view receipts.',
          icon: <User size={28} className="text-[#FF8A00]" />,
          badge: 'Rider & Passenger',
          demoEmail: 'customer@yopmail.com',
          apiEndpoint: '/customer/auth/login',
        };
    }
  };

  const details = getRoleDetails();

  const handleFillDemo = () => {
    setEmail(details.demoEmail);
    setPassword('12345678');
    setFullName('Demo ' + details.title.split(' ')[0]);
    setPhone('+6421000000');
    setMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate authentication / API integration
    setTimeout(() => {
      setIsLoading(false);
      setMessage({
        type: 'success',
        text: `Successfully authenticated as ${details.title.split(' ')[0]}! Ready to connect with backend (${details.apiEndpoint}).`,
      });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#161B22] rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar with back and close */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onBackToRoles}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Change Role</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Header Banner */}
        <div className="pt-6 pb-4 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/40 border border-[#FF8A00]/20 flex items-center justify-center shrink-0">
            {details.icon}
          </div>
          <div>
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#FF8A00] bg-orange-50 dark:bg-orange-950/50 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-900/50 mb-1">
              {details.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {details.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-normal">
              {details.subtitle}
            </p>
          </div>
        </div>

        {/* Auth Tab Switcher */}
        <div className="flex bg-gray-100 dark:bg-slate-800/80 p-1 rounded-xl my-4">
          <button
            type="button"
            onClick={() => { setAuthTab('login'); setMessage(null); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              authTab === 'login'
                ? 'bg-white dark:bg-[#1E2738] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthTab('signup'); setMessage(null); }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              authTab === 'signup'
                ? 'bg-white dark:bg-[#1E2738] text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Demo Auto-Fill Pill */}
        <div className="flex items-center justify-between py-1 mb-3">
          <span className="text-[11px] text-gray-400">Quick Testing:</span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-[#FF8A00] hover:underline cursor-pointer"
          >
            Fill Demo Credentials
          </button>
        </div>

        {/* Feedback Message */}
        {message && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs sm:text-sm flex items-start gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}
          >
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            <span>{message.text}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authTab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-colors"
              />
            </div>
          </div>

          {authTab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  required
                  placeholder="+64 21 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0D1117] text-gray-900 dark:text-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold"
            >
              {authTab === 'login' ? (
                <>
                  <LogIn size={18} className="mr-2" />
                  <span>Sign In as {details.title.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} className="mr-2" />
                  <span>Create {details.title.split(' ')[0]} Account</span>
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-[#22C55E]" />
            <span>256-bit SSL encrypted & connected to Trip Centre Core</span>
          </p>
        </div>
      </div>
    </div>
  );
};
