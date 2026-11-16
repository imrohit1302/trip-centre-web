import { UserRoleType } from '../types/user.types';

export interface RoleAuthConfig {
  role: UserRoleType;
  title: string;
  badge: string;
  loginPillText: string;
  signupPillText: string;
  iconName: 'user' | 'van' | 'building';
  heroBadge: string;
  heroHeading: string;
  heroSubtitle: string;
  features: Array<{ title: string; iconType: 'calendar' | 'shield' | 'clock' | 'dollar' | 'map' }>;
  testimonial: {
    quote: string;
    author: string;
    rating: number;
  };
  demoCredentials: {
    email: string;
    name: string;
    phone: string;
    password: string;
  };
  dashboardRoute: string;
}

export const ROLE_AUTH_CONFIGS: Record<UserRoleType, RoleAuthConfig> = {
  customer: {
    role: 'customer',
    title: 'Customer',
    badge: 'Rider & Passenger',
    loginPillText: 'Logging in as Customer',
    signupPillText: 'Signing up as Customer',
    iconName: 'user',
    heroBadge: 'Premium Passenger Network',
    heroHeading: 'Travel with confidence, anywhere in New Zealand & beyond.',
    heroSubtitle: 'Pre-book verified vehicles, track live driver arrival, and enjoy transparent flat fares with zero hidden charges.',
    features: [
      { title: 'Reserve trips days or weeks in advance with guaranteed cabs', iconType: 'calendar' },
      { title: '100% verified, licensed & commercial drivers', iconType: 'shield' },
      { title: 'Flight synchronization with auto pickup adjustments', iconType: 'clock' },
    ],
    testimonial: {
      quote: 'Booking my airport transfer two weeks in advance eliminated all morning travel stress.',
      author: 'Sarah T., Auckland Executive Traveler',
      rating: 5,
    },
    demoCredentials: {
      email: 'customer@yopmail.com',
      name: 'Emma Watson',
      phone: '210001234',
      password: 'Password123!',
    },
    dashboardRoute: '/customer/dashboard',
  },

  driver: {
    role: 'driver',
    title: 'Driver',
    badge: 'Verified Driver Partner',
    loginPillText: 'Logging in as Driver',
    signupPillText: 'Signing up as Driver',
    iconName: 'van',
    heroBadge: 'Commercial Fleet Chauffeur Hub',
    heroHeading: 'Partner with Trip Centre. Higher earnings, guaranteed trips, zero dead miles.',
    heroSubtitle: 'Pre-assigned itineraries, transparent weekly payouts, flight sync, and dedicated 24/7 fleet dispatch support.',
    features: [
      { title: 'Guaranteed pre-booked fares with zero surge unpredictability', iconType: 'dollar' },
      { title: 'Flexible driver schedules: Full-time, part-time, weekend or on-call', iconType: 'calendar' },
      { title: 'Direct weekly bank deposits & transparent fare breakdowns', iconType: 'shield' },
      { title: 'Live flight tracking with automated delay compensation', iconType: 'clock' },
    ],
    testimonial: {
      quote: 'I know my schedule days in advance. Trip Centre gives me consistent airport jobs with respectable travelers.',
      author: 'David K., Wellington Commercial Chauffeur',
      rating: 5,
    },
    demoCredentials: {
      email: 'driver@yopmail.com',
      name: 'Michael Reid',
      phone: '210005678',
      password: 'Password123!',
    },
    dashboardRoute: '/driver/dashboard',
  },

  venue_partner: {
    role: 'venue_partner',
    title: 'Venue Partner',
    badge: 'Hotels, Hostels & Travel Agencies',
    loginPillText: 'Logging in as Venue Partner',
    signupPillText: 'Signing up as Venue Partner',
    iconName: 'building',
    heroBadge: 'Hospitality Concierge Hub',
    heroHeading: 'Elevate guest transit effortlessly with automated bookings.',
    heroSubtitle: 'Book airport transfers, executive city transit, and private charters for your guests with real-time tracking and automated commissions.',
    features: [
      { title: 'One-click guest transit booking from your front desk', iconType: 'calendar' },
      { title: 'Earn automated commission on every completed guest journey', iconType: 'dollar' },
      { title: 'Real-time arrival notifications for front-desk staff', iconType: 'map' },
      { title: 'Monthly consolidated invoicing and detailed guest receipts', iconType: 'shield' },
    ],
    testimonial: {
      quote: 'Our hotel guests frequently compliment the promptness of Trip Centre drivers. It has made concierge transfers seamless.',
      author: 'James C., Operations Manager, Hilton Auckland',
      rating: 5,
    },
    demoCredentials: {
      email: 'venue@yopmail.com',
      name: 'Grand Hotel Auckland',
      phone: '210009999',
      password: 'Password123!',
    },
    dashboardRoute: '/venue-partner/dashboard',
  },
};

