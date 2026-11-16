import type { ReactNode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GuestOnly, HomeRedirect, RequireAuth } from './auth/AuthProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AuthPage } from './pages/AuthPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { DriverDashboardPage } from './pages/DriverDashboardPage';
import { VenuePartnerDashboardPage } from './pages/VenuePartnerDashboardPage';

function Guest({ children }: { children: ReactNode }) {
  return <GuestOnly>{children}</GuestOnly>;
}

function AppShell() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <div
      className={`min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-slate-50 dark:bg-[#0D1117] text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
        isLanding ? '' : 'lg:h-screen lg:overflow-hidden'
      }`}
    >
      <Navbar />
      <div className="flex-1 flex flex-col min-h-0 overflow-x-hidden overflow-y-auto">
        <Routes>
          {/* Default home — cab booking landing (added; does not replace onboarding) */}
          <Route path="/" element={<LandingPage />} />

          {/* Onboarding steps — unchanged */}
          <Route
            path="/onboarding"
            element={<Navigate to="/onboarding/1" replace />}
          />
          <Route
            path="/onboarding/:stepId"
            element={
              <Guest>
                <OnboardingPage />
              </Guest>
            }
          />
          <Route
            path="/choose-role"
            element={
              <Guest>
                <OnboardingPage />
              </Guest>
            }
          />

          <Route path="/customer/login" element={<Guest><AuthPage role="customer" initialMode="login" /></Guest>} />
          <Route path="/customer/signup" element={<Guest><AuthPage role="customer" initialMode="signup" /></Guest>} />
          <Route path="/customer/forgot-password" element={<Guest><AuthPage role="customer" initialMode="forgot" forgotStep="request_code" /></Guest>} />
          <Route path="/customer/verify-code" element={<Guest><AuthPage role="customer" initialMode="forgot" forgotStep="verify_code" /></Guest>} />
          <Route path="/customer/reset-password" element={<Guest><AuthPage role="customer" initialMode="forgot" forgotStep="reset_password" /></Guest>} />
          <Route
            path="/customer/dashboard"
            element={
              <RequireAuth role="customer">
                <CustomerDashboardPage />
              </RequireAuth>
            }
          />

          <Route path="/driver/login" element={<Guest><AuthPage role="driver" initialMode="login" /></Guest>} />
          <Route path="/driver/signup" element={<Guest><AuthPage role="driver" initialMode="signup" /></Guest>} />
          <Route path="/driver/forgot-password" element={<Guest><AuthPage role="driver" initialMode="forgot" forgotStep="request_code" /></Guest>} />
          <Route path="/driver/verify-code" element={<Guest><AuthPage role="driver" initialMode="forgot" forgotStep="verify_code" /></Guest>} />
          <Route path="/driver/reset-password" element={<Guest><AuthPage role="driver" initialMode="forgot" forgotStep="reset_password" /></Guest>} />
          <Route
            path="/driver/dashboard"
            element={
              <RequireAuth role="driver">
                <DriverDashboardPage />
              </RequireAuth>
            }
          />

          <Route path="/venue-partner/login" element={<Guest><AuthPage role="venue_partner" initialMode="login" /></Guest>} />
          <Route path="/venue-partner/signup" element={<Guest><AuthPage role="venue_partner" initialMode="signup" /></Guest>} />
          <Route path="/venue-partner/forgot-password" element={<Guest><AuthPage role="venue_partner" initialMode="forgot" forgotStep="request_code" /></Guest>} />
          <Route path="/venue-partner/verify-code" element={<Guest><AuthPage role="venue_partner" initialMode="forgot" forgotStep="verify_code" /></Guest>} />
          <Route path="/venue-partner/reset-password" element={<Guest><AuthPage role="venue_partner" initialMode="forgot" forgotStep="reset_password" /></Guest>} />
          <Route
            path="/venue-partner/dashboard"
            element={
              <RequireAuth role="venue_partner">
                <VenuePartnerDashboardPage />
              </RequireAuth>
            }
          />

          <Route path="/venue_partner/login" element={<Navigate to="/venue-partner/login" replace />} />
          <Route path="/venue_partner/signup" element={<Navigate to="/venue-partner/signup" replace />} />
          <Route path="/venue_partner/forgot-password" element={<Navigate to="/venue-partner/forgot-password" replace />} />
          <Route path="/venue_partner/verify-code" element={<Navigate to="/venue-partner/verify-code" replace />} />
          <Route path="/venue_partner/reset-password" element={<Navigate to="/venue-partner/reset-password" replace />} />
          <Route path="/venue_partner/dashboard" element={<Navigate to="/venue-partner/dashboard" replace />} />

          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </div>
      {!isLanding && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppShell />
      </Router>
    </ThemeProvider>
  );
}
