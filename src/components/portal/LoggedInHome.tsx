import { Building2, Car, CheckCircle2, LogOut, User } from 'lucide-react';
import { Button } from '../common/Button';
import { ROLE_AUTH_CONFIGS } from '../../constants/roleAuthData';
import { useRoleSession } from '../../hooks/useRoleSession';
import type { UserRoleType } from '../../types/user.types';

function RoleIcon({ role }: { role: UserRoleType }) {
  if (role === 'driver') return <Car size={28} />;
  if (role === 'venue_partner') return <Building2 size={28} />;
  return <User size={28} />;
}

export function LoggedInHome({ role }: { role: UserRoleType }) {
  const config = ROLE_AUTH_CONFIGS[role];
  const { userData, displayName, handleLogout, isLoggingOut } = useRoleSession(role);
  const email = (userData?.email as string) || '';

  return (
    <div className="flex-1 w-full flex items-center justify-center px-4 py-10 sm:py-14 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] max-w-[90vw] bg-gradient-to-tr from-[#FF8A00]/15 via-[#0B2A4A]/10 to-[#1E4A78]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="rounded-3xl border border-gray-200/90 dark:border-slate-800 bg-white dark:bg-[#161B22] shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#071D33] via-[#0B2A4A] to-[#1E4A78] px-6 pt-8 pb-10 text-center relative">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#FF8A00]/20 blur-2xl pointer-events-none" />

            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4">
              <RoleIcon role={role} />
            </div>

            <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3">
              <CheckCircle2 size={13} />
              <span>You are logged in</span>
            </div>

            <h1 className="relative text-2xl font-extrabold text-white tracking-tight">
              Welcome, {displayName}
            </h1>
            <p className="relative mt-1.5 text-sm text-slate-300">
              Signed in as {config.title}
            </p>
          </div>

          <div className="px-6 py-6 space-y-4">
            <div className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1117] px-4 py-3.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                Account
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white break-all">
                {displayName}
              </p>
              {email ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-all">
                  {email}
                </p>
              ) : null}
            </div>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 leading-relaxed px-2">
              You’re all set. More {config.title.toLowerCase()} tools will show up here soon.
            </p>

            <Button
              type="button"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isLoggingOut}
              onClick={handleLogout}
              className="bg-[#FF8A00] hover:bg-[#E67600] text-white shadow-lg shadow-orange-500/25 font-bold rounded-2xl py-3.5"
            >
              <LogOut size={16} className="mr-1.5" />
              <span>Sign out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
