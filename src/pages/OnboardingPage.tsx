import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WebResponsiveView } from '../components/onboarding/WebResponsiveView';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleContinueToPortal = (role: string) => {
    if (role === 'customer') {
      navigate('/customer/login');
    } else if (role === 'driver') {
      navigate('/driver/login');
    } else if (role === 'venue_partner') {
      navigate('/venue-partner/login');
    } else if (role === 'reseller_agent') {
      navigate('/reseller-agent/login');
    }
  };

  return (
    <main className="flex-1 w-full min-h-0 flex flex-col justify-center items-center p-3 sm:p-5 lg:p-6 relative overflow-hidden">
      {/* Background ambient gradient blurs constrained strictly within viewport */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] max-w-[85vw] max-h-[85vh] bg-gradient-to-tr from-[#FF8A00]/10 via-[#0B2A4A]/5 to-[#1E4A78]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Web Responsive SaaS Application */}
      <div className="w-full max-w-6xl mx-auto my-auto animate-fade-in flex items-center justify-center">
        <WebResponsiveView onContinueToPortal={handleContinueToPortal} />
      </div>
    </main>
  );
};
