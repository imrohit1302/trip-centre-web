import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Car,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Sparkles,
  Clock3,
} from 'lucide-react';
import { ROUTES } from '../constants/routes';

export function LandingPage() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [when, setWhen] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(ROUTES.LOGIN('customer'));
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Hero */}
      <section className="relative w-full min-h-[calc(100dvh-7.5rem)] lg:min-h-[calc(100vh-7.5rem)] flex flex-col justify-end sm:justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-[heroDrift_18s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: "url('/assets/splash_background_image.png')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#071D33]/70 via-[#0B2A4A]/65 to-[#071D33]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,138,0,0.28),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_75%,rgba(30,74,120,0.45),transparent_45%)]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 mb-5 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-[#FFB74D]">
              Trip Centre · New Zealand
            </span>
          </div>

          <h1 className="animate-slide-up max-w-3xl text-[2.35rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.05]">
            Book a cab.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFB74D] via-[#FF8A00] to-[#FFC107]">
              Travel on your time.
            </span>
          </h1>

          <p className="animate-slide-up mt-4 max-w-xl text-sm sm:text-base text-slate-200/95 leading-relaxed [animation-delay:70ms]">
            Pre-book verified rides for airports, city hops, and guest transfers —
            with live tracking from pickup to drop-off.
          </p>

          <form
            onSubmit={handleSearch}
            className="animate-slide-up mt-8 w-full max-w-4xl rounded-[1.35rem] sm:rounded-[1.75rem] bg-white/97 dark:bg-[#161B22]/96 backdrop-blur-xl border border-white/40 dark:border-slate-600/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] p-3 sm:p-4 [animation-delay:130ms]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <label className="sm:col-span-4 flex items-center gap-2.5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200/90 dark:border-slate-700 px-3.5 py-3.5 focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/25 transition-shadow">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF8A00] shrink-0">
                  <MapPin size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    From
                  </span>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup location"
                    className="w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                  />
                </div>
              </label>

              <label className="sm:col-span-4 flex items-center gap-2.5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200/90 dark:border-slate-700 px-3.5 py-3.5 focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/25 transition-shadow">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-[#1E4A78] dark:text-[#FFB74D] shrink-0">
                  <Navigation size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    To
                  </span>
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Drop-off"
                    className="w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                  />
                </div>
              </label>

              <label className="sm:col-span-2 flex items-center gap-2 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200/90 dark:border-slate-700 px-3 py-3.5 focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/25">
                <CalendarDays size={16} className="text-slate-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    When
                  </span>
                  <input
                    type="date"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    className="w-full min-w-0 bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </label>

              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF8A00] to-[#E67600] hover:from-[#E67600] hover:to-[#FF8A00] text-white font-extrabold text-sm px-4 py-3.5 shadow-glow-orange transition-all"
              >
                <Search size={17} />
                <span>Search</span>
              </button>
            </div>
            <p className="mt-3 px-1 text-[11px] text-slate-500 dark:text-slate-400">
              Log in to confirm your ride — free to search, ready in under a minute.
            </p>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3 animate-fade-in [animation-delay:200ms]">
            <button
              type="button"
              onClick={() => navigate(ROUTES.LOGIN('customer'))}
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B2A4A] font-extrabold text-sm px-5 py-2.5 shadow-lg hover:bg-orange-50 transition-colors"
            >
              <span>Log in to book</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.ONBOARDING_STEP(1))}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white font-bold text-sm px-5 py-2.5 hover:bg-white/10 transition-colors"
            >
              <Sparkles size={15} className="text-[#FFB74D]" />
              <span>See how it works</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.CHOOSE_ROLE)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white/90 font-semibold text-sm px-4 py-2.5 hover:bg-white/10 transition-colors"
            >
              Driver or partner?
            </button>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="w-full border-y border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#161B22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, label: 'Verified commercial drivers' },
            { icon: Clock3, label: 'Pre-book days or weeks ahead' },
            { icon: Car, label: 'Live tracking every trip' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-sm font-bold text-[#0B2A4A] dark:text-slate-100"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/30 text-[#FF8A00]">
                <Icon size={18} />
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="w-full bg-[#F8FAFC] dark:bg-[#0D1117]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FF8A00] mb-2">
              Simple by design
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A4A] dark:text-white tracking-tight">
              How Trip Centre works
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              From search to arrival in three clear steps — for riders, drivers, and venues.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search your route',
                copy: 'Enter pickup, drop-off, and when you need to leave.',
                image: '/assets/onboarding_schedule.png',
              },
              {
                step: '02',
                title: 'Match a driver',
                copy: 'We connect you with verified drivers covering your corridor.',
                image: '/assets/onboarding_assign.png',
              },
              {
                step: '03',
                title: 'Track the trip',
                copy: 'Follow the ride from dispatch to drop-off, start to finish.',
                image: '/assets/onboarding_track.png',
              },
            ].map((item) => (
              <div key={item.step} className="group min-w-0">
                <div className="relative mb-4 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#161B22] aspect-[4/3]">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071D33]/35 to-transparent" />
                  <span className="absolute left-3 bottom-3 text-xs font-extrabold tracking-[0.18em] text-white/95">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0B2A4A] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(ROUTES.ONBOARDING_STEP(1))}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0B2A4A] hover:bg-[#071D33] text-white font-extrabold text-sm px-5 py-3 transition-colors"
            >
              Start the guided tour
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.LOGIN('customer'))}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 text-[#0B2A4A] dark:text-white font-bold text-sm px-5 py-3 hover:border-[#FF8A00] transition-colors"
            >
              Or log in now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
