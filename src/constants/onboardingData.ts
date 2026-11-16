import { OnboardingSlideData } from '../types/onboarding.types';
import { RoleOption } from '../types/user.types';

export const ONBOARDING_SLIDES: OnboardingSlideData[] = [
  {
    id: 0,
    title: 'Book ahead, travel stress-free',
    description: 'Schedule your cab days or weeks in advance — no last-minute searching when your trip date arrives.',
    image: '/assets/onboarding_schedule.png',
    accentBadge: 'Smart Pre-Booking',
    featureBullets: [
      'Guaranteed vehicle availability on your chosen schedule',
      'Transparent flat pricing with zero surge surprises',
      'Flight number sync for automatic airport pickup adjustments'
    ]
  },
  {
    id: 1,
    title: 'We match you with the right driver',
    description: 'Our team reviews every request and assigns a verified driver and car that fits your trip.',
    image: '/assets/onboarding_assign.png',
    accentBadge: 'Verified Chauffeurs',
    featureBullets: [
      'Strict background checks & identity verifications',
      'Clean, comfortable, and commercially insured vehicles',
      'Direct WhatsApp and in-app driver communication'
    ]
  },
  {
    id: 2,
    title: 'Track every trip, start to finish',
    description: 'From confirmation to drop-off, follow your booking status and reach your driver anytime.',
    image: '/assets/onboarding_track.png',
    accentBadge: 'End-to-End Visibility',
    featureBullets: [
      'Real-time GPS route updates and arrival countdowns',
      'Automated SMS & email dispatch notifications',
      '24/7 dedicated support team ready for any assistance'
    ]
  }
];

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'customer',
    title: 'Customer',
    description: 'Book a cab for an upcoming trip',
    iconName: 'user',
    badge: 'Popular for Travelers'
  },
  {
    id: 'driver',
    title: 'Driver',
    description: 'Accept and manage assigned trips',
    iconName: 'car',
    badge: 'Verified Fleet'
  },
  {
    id: 'venue_partner',
    title: 'Venue Partner',
    description: 'Hostel / agency booking on behalf of guests',
    iconName: 'hotel',
    badge: 'Hotels & Concierge'
  }
];

