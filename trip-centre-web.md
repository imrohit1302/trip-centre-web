# Trip Centre Web (`trip-centre-web`)
### Comprehensive Architecture, Design System & Implementation Documentation

---

## 📌 1. Project Overview & Objectives

**`trip-centre-web`** is a production-ready, commercial-grade web application engineered to serve riders, commercial drivers, and hospitality venue partners across New Zealand and international travel hubs.

The application is synchronized with the design system, visual identity, and color palette of the existing **`trip-center-admin`** portal while ensuring **`trip-center-admin` remains completely untouched and unmodified**.

### Core Technical Stack
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS with CSS Variables & Dark/Light mode theme engine
- **Routing:** React Router DOM (v6) with 100% route-driven state and deep-linking
- **Build Tool:** Vite 5 (Sub-second HMR & production builds ~930ms)
- **Icons:** Lucide React
- **Typography:** Nunito & Nunito Sans (synced with admin portal)

---

## 🎨 2. Visual Identity & Design System

The application strictly adopts the tokens from `trip-center-admin/src/theme/appColors.js`:

| Token | Hex / Value | Semantic Role |
|---|---|---|
| `--tc-brand-navy` | `#0B2A4A` | Primary Brand Navy (Headers, Hero backgrounds, Key accents) |
| `--tc-brand-navy-dark`| `#071D33` | Deep Background Gradient Dark Navy |
| `--tc-brand-navy-light`| `#1E4A78` | Secondary Brand Blue / Elevation Tint |
| `--tc-brand-orange` | `#FF8A00` | Accent Brand Orange (Primary CTAs, Active indicators, Focus rings) |
| `--tc-brand-orange-dark`| `#E67600` | CTA Hover & Pressed State |
| `--tc-success` | `#22C55E` | Live Status Indicator, Verified Partners, Success Badges |
| `--tc-warning` | `#F59E0B` | Alert & Delayed Status |
| `--tc-info` | `#3B82F6` | Informational & Flight Sync Badges |
| `--tc-bg-light` | `#F8FAFC` | Light Surface Background |
| `--tc-bg-dark` | `#0D1117` | Dark Mode Surface Background (GitHub/Linear dark aesthetic) |

### Typography
- Primary Font Family: `'Nunito', 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif`
- Form fields utilize `text-base sm:text-sm` to guarantee iOS Safari never triggers unwanted zoom when tapping inputs.

---

## 🗺️ 3. Complete Routing Architecture (React Router DOM)

All screen transitions, onboarding progression, persona choices, authentication states, and recovery steps are **100% driven by React Router DOM URLs** rather than hidden local component state. Browser **Back / Forward** navigation, refreshing, and bookmarking work seamlessly.

### Full Route Map

| Path | Component / Screen | Purpose & Flow |
|---|---|---|
| `/` | `LandingPage` | Kiwi.com-inspired ride booking portal (Hero, Search Widget, Club, Guarantee, Destinations, Routes, Directory, Footer) |
| `/onboarding` | `Navigate to="/onboarding/1"` | Index redirect |
| `/onboarding/1` | `OnboardingPage` (Step 1) | *"Book ahead, travel stress-free"* slide |
| `/onboarding/2` | `OnboardingPage` (Step 2) | *"We match you with the right driver"* slide |
| `/onboarding/3` | `OnboardingPage` (Step 3) | *"Track every trip, start to finish"* slide |
| `/choose-role` | `OnboardingPage` (Step 4) | *"How will you use Trip Centre?"* (`?role=customer\|driver\|venue_partner`) |
| `/:role/login` | `AuthPage (mode="login")` | Role-specific login with pill badge & credentials |
| `/:role/signup` | `AuthPage (mode="signup")` | Role-specific registration (phone picker, gender, terms) |
| `/:role/forgot-password`| `AuthPage (mode="forgot", step 1)`| Password recovery: Enter email & request 6-digit code |
| `/:role/verify-code` | `AuthPage (mode="forgot", step 2)`| 6-digit OTP verification with 28s ticking countdown |
| `/:role/reset-password` | `AuthPage (mode="forgot", step 3)`| Enter & confirm new password |
| `/customer/dashboard` | `CustomerDashboardPage` | Customer portal: Upcoming rides, flight sync & driver info |
| `/driver/dashboard` | `DriverDashboardPage` | Driver hub: Duty online/offline, assignments & earnings |
| `/venue-partner/dashboard`| `VenuePartnerDashboardPage` | Venue partner portal: Concierge booking & commission ledger |
| `/venue_partner/*` | Redirect to `/venue-partner/*` | Graceful fallback for underscore URLs |
| `*` | `Navigate to="/onboarding/1"` | Catch-all 404 redirect |

---

## 📱 4. Viewport & Responsiveness Architecture (`100vh` & `100vw`)

The application implements a dual-mode responsive layout:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Top Navbar (Pinned 64px on desktop / 56px on mobile, shrink-0, glassmorphism)│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Central Viewport Area (flex-1, min-h-0, overflow-y-auto, overflow-x-hidden)  │
│                                                                              │
│  [Desktop View (lg:)]:                                                       │
│  - Anchored within 100vh: lg:h-[min(650px, calc(100vh - 135px))]              │
│  - Dual-pane layout: Left navy showcase + Right scrollable form/slide pane   │
│  - ZERO outer page vertical scroll on standard viewports                     │
│                                                                              │
│  [Mobile View (< lg)]:                                                       │
│  - Uses min-h-[100dvh] with natural touch scrolling                          │
│  - Left brand showcase is hidden (hidden lg:flex)                            │
│  - Content is single-column, matching native mobile UI screenshots           │
│  - 6-digit OTP boxes use a responsive grid that never wraps on 320px screens │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Bottom Status Footer (Compact 36px on mobile / 44px on desktop, shrink-0)   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Zero Horizontal Spill Guarantee
- `html`, `body`, `#root`, and the outermost app container are bounded by `max-w-[100vw] overflow-x-hidden`.
- Ambient decorative blurs (`w-[650px] blur-3xl`) are strictly contained inside `relative overflow-hidden` wrappers.
- Custom modern scrollbars (5px thin with orange hover states) avoid layout displacement.

---

## 🧩 5. Implemented Modules & User Flows

### A. Onboarding Flow (Screens 1 – 3)
- **Visuals:** High-resolution official illustrations (`onboarding_schedule.png`, `onboarding_assign.png`, `onboarding_track.png`).
- **Controls:**
  - Accent badge (`Pre-Booking`, `Verified Drivers`, `Live Tracking`).
  - Stepper indicator dots (`StepperDots`) with active orange pill (`w-7 h-2.5`).
  - Next, Previous, and Skip buttons updating router URL.
  - Keyboard navigation (Left / Right arrow keys).

### B. Persona Selection (Screen 4: `/choose-role`)
- **Header:** "How will you use Trip Centre?" with back arrow to features.
- **Role Cards (`RadioCard`):**
  1. **Customer:** "Book rides for yourself or others, track live trips..."
  2. **Driver:** "Accept scheduled trips, get pre-assigned rides, manage earnings..." (Badge: *"Most Popular"*)
  3. **Venue Partner:** "For hotels, travel agencies and businesses booking for guests..." (Badge: *"B2B Fleet"*)
- Selecting a card immediately updates URL query parameter `?role=...`.
- "Continue" button directs to `/:role/login`.

### C. Unified Reusable Authentication Engine
A single reusable auth engine (`src/components/auth/`) powers all three personas, differing only by configuration tokens (`src/constants/roleAuthData.ts`):

1. **Login (`/:role/login`):**
   - Top Back button returning to `/choose-role`.
   - Role pill badge matching screenshots (`Logging in as Customer`, `Logging in as Driver`, `Logging in as Venue Partner`).
   - "Fill Demo Credentials" quick button for instant testing.
   - Email & Password fields with password visibility eye toggle.
   - "Forgot password?" and "Sign Up" links driving URL transitions.
   - Successful auth directs to `/:role/dashboard`.

2. **Sign Up (`/:role/signup`):**
   - Full Name with user icon.
   - Email ID with mail icon.
   - International Phone Picker: New Zealand flag `+64 ⌵` with searchable/selectable country code dropdown.
   - Gender Chips: `Male ♂`, `Female ♀`, `Other ⚧`, `Prefer not to say ⊘`.
   - Password & Confirm Password with match and strength validation.
   - Terms & Privacy Policy checkbox.
   - On completion, triggers the 6-digit Email Verification OTP modal.

3. **Three-Step Password Recovery (`/:role/forgot-password`):**
   - **Step 1 (`/:role/forgot-password`):** Enter email address; sends code & redirects to step 2.
   - **Step 2 (`/:role/verify-code?email=...`):** 6-digit numeric input with auto-advance, backspace navigation, 28s countdown, and resend trigger.
   - **Step 3 (`/:role/reset-password?email=...&token=...`):** Create new password & confirm.
   - On completion: displays confirmation card with "Return to Log In" button.

### D. Persona Portals & Dashboards
1. **Customer Dashboard (`/customer/dashboard`):**
   - Welcome banner with live customer name.
   - Active pre-booked ride card with driver details (`Michael Reid`), Toyota HiAce van, flight sync status (`NZ451 Auckland - On Time`).
   - Upcoming scheduled rides list.
   - Logout button returning to `/customer/login`.

2. **Driver Hub (`/driver/dashboard`):**
   - Status header with Online/Offline duty toggle (`Radio` status indicator).
   - Metrics cards: Today's Earnings (`$284.50`), Completed Trips (`4`), Acceptance Rate (`98%`), Driver Rating (`4.96 ★`).
   - Upcoming pre-assigned passenger itineraries.
   - Logout button returning to `/driver/login`.

3. **Venue Partner Portal (`/venue-partner/dashboard`):**
   - Hotel concierge welcome banner.
   - Partner Metrics: Active Guest Transfers (`12`), Monthly Commission (`$1,420.00`), Average Pickup Wait Time (`4.2 mins`).
   - Real-time guest transfer ledger with room numbers, pickup points, and driver assignments.
   - Quick front-desk booking dispatch button.
   - Logout button returning to `/venue-partner/login`.

---

## 📂 6. Directory Structure

```
trip-centre-web/
├── public/
│   └── assets/                     # High-res illustrations & app icons
│       ├── app_icon.png
│       ├── onboarding_schedule.png
│       ├── onboarding_assign.png
│       ├── onboarding_track.png
│       └── splash_background_image.png
├── src/
│   ├── components/
│   │   ├── auth/                   # Unified auth components
│   │   │   ├── AuthForgotPasswordForm.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── AuthLoginForm.tsx
│   │   │   ├── AuthOtpModal.tsx
│   │   │   └── AuthSignupForm.tsx
│   │   ├── common/                 # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── RadioCard.tsx
│   │   │   ├── StepperDots.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── layout/                 # Chrome layout
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── onboarding/             # Onboarding view
│   │       └── WebResponsiveView.tsx
│   ├── constants/
│   │   ├── onboardingData.ts       # Slides & role options data
│   │   ├── roleAuthData.ts         # Persona auth configs & copy
│   │   ├── routes.ts               # Central route constants & helpers
│   │   └── theme.ts                # Design tokens & color constants
│   ├── context/
│   │   ├── OnboardingContext.tsx   # Legacy context bridge
│   │   └── ThemeContext.tsx        # Dark/Light theme state
│   ├── hooks/
│   │   ├── useOnboarding.ts        # Fast Refresh-compatible hook
│   │   └── useTheme.ts             # Theme access hook
│   ├── pages/
│   │   ├── AuthPage.tsx            # Unified auth route handler
│   │   ├── CustomerDashboardPage.tsx
│   │   ├── DriverDashboardPage.tsx
│   │   ├── OnboardingPage.tsx
│   │   └── VenuePartnerDashboardPage.tsx
│   ├── services/
│   │   ├── apiClient.ts            # Fetch wrapper with demo fallbacks
│   │   └── authService.ts          # Authentication service layer
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── onboarding.types.ts
│   │   └── user.types.ts
│   ├── App.tsx                     # React Router DOM configuration
│   ├── index.css                   # Global styles & CSS variables
│   ├── main.tsx                    # React DOM entry
│   └── vite-env.d.ts               # Vite typing definitions
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ 7. Development & Verification Guide

### Quick Start
```bash
# Navigate to the project directory
cd trip-centre-web

# Install dependencies (if not already installed)
npm install

# Start local development server
npm run dev
```

### Production Build & Type Checking
```bash
npm run build
```
*Current build status:* **`tsc && vite build` passes in ~930ms with 0 errors.**

---

## 🔒 8. Project Isolation Rules
- All new source code is strictly located inside `trip-centre-web/`.
- The `trip-center-admin` repository and configuration are **100% untouched**.
- The `trip-center-backend` endpoints (`/api/v1/...`) are supported with simulated client-side fallbacks so testing runs without requiring a live backend process.

