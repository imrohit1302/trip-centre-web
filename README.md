# Trip Centre Web (`trip-centre-web`)

Production-ready web application for the **Trip Centre** ecosystem, developed with **React 18, TypeScript, and Tailwind CSS**.

The application strictly aligns with the design system, color palette, typography, and component styling of the **`trip-center-admin`** portal and implements the complete onboarding and 3-role authentication workflows (**Customer**, **Driver**, and **Venue Partner**).

---

## 🚀 Features

- **Pure Modern Web Application**:
  - Full-width, responsive web layout designed for desktops, laptops, tablets, and mobile browsers.
  - No simulated phone frame bezels; native web experience taking full advantage of the browser viewport.
- **Pixel-Perfect Onboarding Workflow**:
  - **Screen 1**: *Book ahead, travel stress-free* (Smart pre-booking illustration, active pill indicator, "Skip" & "Next" actions).
  - **Screen 2**: *We match you with the right driver* (Verified driver pairing illustration, step indicator, "Skip" & "Next" actions).
  - **Screen 3**: *Track every trip, start to finish* (Live trip route illustration, step indicator, "Skip" & "Get Started" actions).
  - **Screen 4**: *How will you use Trip Centre?* (Role selection for **Customer**, **Driver**, and **Venue Partner** with radio selection indicators and responsive "Continue" CTA).
- **Reusable Authentication Engine (`src/components/auth/`)**:
  - Powers all 3 roles (**Customer**, **Driver**, and **Venue Partner**) with zero duplicated form logic.
  - **Login**: Email ID, password, eye toggle, forgot password link, demo credential auto-fill, and backend API integration.
  - **Registration**: Full name, email, country code selector (`🇳🇿 +64`, etc.), phone number, gender chips (`♂ Male`, `♀ Female`, `⚧ Other`, `⊘ Prefer not to say`), password confirmation, terms checkbox, and OTP verification modal.
- **Dedicated Portals**:
  - **Customer Portal** (`/customer/dashboard`): Pre-booking widget, upcoming journey status, and verified chauffeur guarantees.
  - **Driver Partner Hub** (`/driver/dashboard`): Duty status toggle (On/Off Duty), weekly earnings summary, vehicle details, document compliance checklist, and assigned itineraries with flight sync.
  - **Venue Partner Portal** (`/venue-partner/dashboard`): Front-desk guest transit booking, live telematics radar, guest satisfaction reviews, and automated partner commission tracking.
- **Theme Engine**:
  - Complete Light and Dark mode support synced with `localStorage` and system preferences.
  - Strictly matches `trip-center-admin` CSS variables and Tailwind color tokens (`brandNavy: #0B2A4A`, `brandOrange: #FF8A00`, etc.).

---

## 🛠 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS & Custom CSS variables
- **Icons**: `lucide-react`
- **Routing**: `react-router-dom`
- **Build Tool**: Vite 5

---

## 📁 Project Architecture

```
trip-centre-web/
├── public/
│   └── assets/
│       ├── app_icon.png
│       ├── onboarding_schedule.png
│       ├── onboarding_assign.png
│       ├── onboarding_track.png
│       └── splash_background_image.png
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthLayout.tsx         # Reusable split SaaS dual-pane layout
│   │   │   ├── AuthLoginForm.tsx      # Reusable login form for Customer, Driver & Venue
│   │   │   ├── AuthOtpModal.tsx       # Reusable 6-digit verification modal
│   │   │   └── AuthSignupForm.tsx     # Reusable registration form for all 3 roles
│   │   ├── common/
│   │   │   ├── Button.tsx             # Reusable button with variants, sizes & loading states
│   │   │   ├── RadioCard.tsx          # Role selection card with icons and radio states
│   │   │   ├── StepperDots.tsx        # Active capsule & inactive dot indicators
│   │   │   └── ThemeToggle.tsx        # Light/Dark mode switcher
│   │   ├── layout/
│   │   │   ├── Footer.tsx             # Clean footer with ecosystem links
│   │   │   └── Navbar.tsx             # Top navigation bar with step tabs & theme switcher
│   │   └── onboarding/
│   │       └── WebResponsiveView.tsx  # Full responsive SaaS web layout
│   ├── constants/
│   │   ├── onboardingData.ts          # Slides, copywriting, and role definitions
│   │   ├── roleAuthData.ts            # Central role configs for Customer, Driver & Venue Partner
│   │   └── theme.ts                   # Hex tokens synced with appColors.js
│   ├── context/
│   │   ├── OnboardingContext.tsx      # Step management & role selection state
│   │   └── ThemeContext.tsx           # Global theme state (light/dark)
│   ├── hooks/
│   │   ├── useOnboarding.ts           # Decoupled onboarding hook (Fast Refresh safe)
│   │   └── useTheme.ts                # Decoupled theme hook (Fast Refresh safe)
│   ├── pages/
│   │   ├── AuthPage.tsx               # Unified auth page for Customer, Driver & Venue Partner
│   │   ├── CustomerDashboardPage.tsx  # Customer Portal
│   │   ├── DriverDashboardPage.tsx    # Driver Partner Hub
│   │   ├── OnboardingPage.tsx         # Main onboarding & role selector container
│   │   └── VenuePartnerDashboardPage.tsx # Venue Partner Hub
│   ├── services/
│   │   ├── apiClient.ts               # Fetch client with timezone & auth header injection
│   │   └── authService.ts             # Customer, Driver & Venue Partner auth APIs
│   ├── types/
│   │   ├── auth.types.ts              # Shared auth types (Country codes, Gender union, Form values)
│   │   ├── onboarding.types.ts
│   │   ├── theme.types.ts
│   │   └── user.types.ts
│   ├── App.tsx
│   ├── index.css                      # Tailwind directives + Admin CSS variable mapping
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🎨 Design Tokens (Synced with `trip-center-admin`)

| Token | Value | Usage |
|---|---|---|
| `brandNavy` | `#0B2A4A` | Primary brand blue, headers, hero panel |
| `brandNavyDark` | `#071D33` | Dark gradient start, hover states |
| `brandNavyLight`| `#1E4A78` | Soft blue gradient accent |
| `brandOrange` | `#FF8A00` | CTA buttons, active radio indicators, stepper pills |
| `brandOrangeDark`| `#E67600` | Button hover and pressed states |
| `brandYellow` | `#FFC107` | Secondary accents |
| `success` | `#22C55E` | Verification badges, live indicators |
| `warning` | `#F59E0B` | Status indicators |
| `error` | `#EF4444` | Validation error alerts |

---

## 💻 Getting Started

### 1. Installation

```bash
cd trip-centre-web
npm install
```

### 2. Development Server

```bash
npm run dev
```

### 3. Production Build

```bash
npm run build
```
