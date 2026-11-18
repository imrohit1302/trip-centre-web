import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeftRight,
  Car,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Clock,
  Plane,
  Users,
  Luggage,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Check,
  Gift,
  Smartphone,
  QrCode,
  Shield,
  ExternalLink,
  Crown,
  DollarSign,
} from 'lucide-react';
import { ROUTES } from '../constants/routes';

type TripType = 'oneway' | 'roundtrip' | 'hourly';
type VehicleClass = 'sedan' | 'suv' | 'van' | 'luxury';
type SearchMode = 'search' | 'ai';
type DestinationCategory = 'all' | 'auckland' | 'queenstown' | 'wellington' | 'christchurch';
type DirectoryTab = 'cities' | 'airports' | 'scenic' | 'hourly' | 'fleets' | 'deals';

export function LandingPage() {
  const navigate = useNavigate();

  // Search Widget State
  const [searchMode, setSearchMode] = useState<SearchMode>('search');
  const [aiPrompt, setAiPrompt] = useState('');
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [vehicleClass, setVehicleClass] = useState<VehicleClass>('sedan');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0 });
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [luggage, setLuggage] = useState({ checkin: 0, cabin: 1 });
  const [showLuggageModal, setShowLuggageModal] = useState(false);

  const [pickup, setPickup] = useState('Auckland CBD');
  const [dropoff, setDropoff] = useState('Auckland Airport (AKL)');
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [departureTime, setDepartureTime] = useState('10:30');
  const [returnDate, setReturnDate] = useState('2026-11-25');
  const [returnTime, setReturnTime] = useState('16:00');
  const [hourlyDuration, setHourlyDuration] = useState('4');

  // Filter Checkboxes
  const [flightTracking, setFlightTracking] = useState(true);
  const [meetAndGreet, setMeetAndGreet] = useState(false);
  const [childSeat, setChildSeat] = useState(false);

  // Section States
  const [destFilter, setDestFilter] = useState<DestinationCategory>('all');
  const [showMoreRoutes, setShowMoreRoutes] = useState(false);
  const [activeDirectoryTab, setActiveDirectoryTab] = useState<DirectoryTab>('cities');
  const [activeGuaranteeIndex, setActiveGuaranteeIndex] = useState(0);

  // Swap pickup & dropoff
  const handleSwap = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  // Submit search
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(ROUTES.LOGIN('customer'));
  };

  // Quick select destination
  const handleSelectRoute = (fromLoc: string, toLoc: string) => {
    setPickup(fromLoc);
    setDropoff(toLoc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPassengers = passengers.adults + passengers.children;
  const vehicleClassLabels: Record<VehicleClass, string> = {
    sedan: 'Standard Sedan (1-4 pax)',
    suv: 'Executive SUV (1-5 pax)',
    van: 'Passenger Van (6-8 pax)',
    luxury: 'VIP First Class Chauffeur',
  };

  const popularRoutes = [
    {
      id: 1,
      from: 'Auckland Airport (AKL)',
      to: 'Auckland CBD',
      fare: 'Flat $65',
      time: '35 mins',
      img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      from: 'Auckland Airport',
      to: 'Hamilton Central',
      fare: 'From $180',
      time: '1h 30m',
      img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      from: 'Queenstown Airport (ZQN)',
      to: 'Wanaka Lakefront',
      fare: 'From $125',
      time: '55 mins',
      img: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      from: 'Queenstown Airport',
      to: 'Coronet Peak Ski Resort',
      fare: 'From $55',
      time: '30 mins',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      from: 'Wellington Airport (WLG)',
      to: 'Interislander Ferry',
      fare: 'From $45',
      time: '20 mins',
      img: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      from: 'Christchurch Airport (CHC)',
      to: 'Cathedral Square CBD',
      fare: 'Flat $48',
      time: '25 mins',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 7,
      from: 'Christchurch CBD',
      to: 'Akaroa Peninsula',
      fare: 'From $89',
      time: '1h 15m',
      img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 8,
      from: 'Rotorua Regional Airport',
      to: 'Taupo Lakefront',
      fare: 'From $110',
      time: '50 mins',
      img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 9,
      from: 'Dunedin Airport (DUD)',
      to: 'University & Octagon',
      fare: 'From $60',
      time: '30 mins',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 10,
      from: 'Tauranga Airport (TRG)',
      to: 'Mount Maunganui Beach',
      fare: 'From $38',
      time: '18 mins',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 11,
      from: 'Nelson Airport (NSN)',
      to: 'Abel Tasman National Park',
      fare: 'From $95',
      time: '1h 05m',
      img: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 12,
      from: 'Napier Airport (NPE)',
      to: 'Hastings Wine Country',
      fare: 'From $52',
      time: '25 mins',
      img: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=400&auto=format&fit=crop&q=80',
    },
    // Extra routes shown on Show More
    {
      id: 13,
      from: 'Auckland CBD',
      to: 'Waiheke Ferry Terminal',
      fare: 'From $35',
      time: '15 mins',
      img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 14,
      from: 'Queenstown CBD',
      to: 'Arrowtown Historic Village',
      fare: 'From $40',
      time: '20 mins',
      img: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 15,
      from: 'Wellington CBD',
      to: 'Martinborough Wine Region',
      fare: 'From $140',
      time: '1h 10m',
      img: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 16,
      from: 'Palmerston North',
      to: 'Whanganui Riverfront',
      fare: 'From $85',
      time: '1h 00m',
      img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 17,
      from: 'Invercargill Airport',
      to: 'Bluff Ferry (Stewart Island)',
      fare: 'From $58',
      time: '30 mins',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 18,
      from: 'New Plymouth Airport',
      to: 'Mount Taranaki Gateway',
      fare: 'From $75',
      time: '45 mins',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const popularDestinations = [
    {
      id: 'queenstown',
      name: 'Queenstown & Coronet Peak',
      region: 'Southern Alps, NZ',
      badge: 'Scenic & Ski Chauffeur',
      fare: '$39',
      duration: '25 min transit',
      img: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&auto=format&fit=crop&q=80',
      pickup: 'Queenstown Airport (ZQN)',
      dropoff: 'Queenstown Central / Coronet Peak',
      featured: false,
    },
    {
      id: 'auckland',
      name: 'Auckland Airport (AKL) ⇄ CBD Hotels',
      region: 'Auckland City, NZ',
      badge: 'Executive Express · Flight Radar Sync',
      fare: '$65',
      duration: '35 min flat transit',
      img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1000&auto=format&fit=crop&q=80',
      pickup: 'Auckland International Airport (AKL)',
      dropoff: 'Auckland CBD / Viaduct Harbour',
      featured: true, // Kiwi-style featured wide card
    },
    {
      id: 'wellington',
      name: 'Wellington Interislander Ferry ⇄ Airport',
      region: 'Capital Region, NZ',
      badge: 'Ferry Connector Chauffeur',
      fare: '$38',
      duration: '20 min transit',
      img: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=800&auto=format&fit=crop&q=80',
      pickup: 'Wellington Airport (WLG)',
      dropoff: 'Interislander Ferry Terminal',
      featured: false,
    },
    {
      id: 'christchurch',
      name: 'Christchurch ⇄ Akaroa French Village',
      region: 'Canterbury Peninsula, NZ',
      badge: 'Day Tour & Coastal Charter',
      fare: '$85',
      duration: '1h 15m scenic corridor',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
      pickup: 'Christchurch Airport (CHC)',
      dropoff: 'Akaroa Harbourfront',
      featured: false,
    },
    {
      id: 'rotorua',
      name: 'Rotorua Geothermal & Lakefront',
      region: 'Bay of Plenty, NZ',
      badge: 'Cultural & Spa Transfer',
      fare: '$45',
      duration: '30 min transit',
      img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80',
      pickup: 'Rotorua Regional Airport',
      dropoff: 'Rotorua Lakefront / Polynesian Spa',
      featured: false,
    },
    {
      id: 'tauranga',
      name: 'Mount Maunganui Beach & Tauranga',
      region: 'Bay of Plenty, NZ',
      badge: 'Coastal Shuttle & Surf Corridor',
      fare: '$52',
      duration: '22 min transit',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      pickup: 'Tauranga Airport (TRG)',
      dropoff: 'Mount Maunganui Main Beach',
      featured: false,
    },
  ];

  const filteredDestinations = popularDestinations.filter((d) => {
    if (destFilter === 'all') return true;
    if (destFilter === 'auckland') return d.id === 'auckland';
    if (destFilter === 'queenstown') return d.id === 'queenstown';
    if (destFilter === 'wellington') return d.id === 'wellington';
    if (destFilter === 'christchurch') return d.id === 'christchurch';
    return true;
  });

  const guarantees = [
    {
      title: 'Guaranteed Chauffeur Arrival',
      desc: 'Your verified commercial driver is on-site 10 minutes early. In the rare event of traffic or mechanical breakdown, a standby backup chauffeur is instantly dispatched at no extra charge.',
      badge: '100% On-Time Protocol',
      stat: '99.8% On-Time Track Record',
    },
    {
      title: 'Live Flight Radar Synchronization',
      desc: 'Delayed on the tarmac or cleared customs early? We monitor your flight radar in real-time. Your driver automatically adjusts pickup time with 60 minutes free waiting time.',
      badge: 'Free Airport Waiting Time',
      stat: 'Synced to 120+ Airlines',
    },
    {
      title: 'Strict Flat-Rate Transparency',
      desc: 'Never pay surge multiples during rush hour, midnight arrivals, or stormy weather. The rate you see at checkout is the locked price you pay — zero unexpected extras.',
      badge: 'No Surge Multipliers',
      stat: 'Locked Flat Fare Guarantee',
    },
    {
      title: '24/7 Human Dispatch Concierge',
      desc: 'Direct line to real local New Zealand dispatch coordinators who can reroute vehicles, assist with delayed luggage, or coordinate group transport in seconds.',
      badge: 'Local Human Support',
      stat: '< 45 Sec Response Time',
    },
  ];

  const directoryLinks: Record<DirectoryTab, { label: string; from: string; to: string }[]> = {
    cities: [
      { label: 'Rides in Auckland CBD', from: 'Auckland Airport', to: 'Auckland CBD' },
      { label: 'Rides in Queenstown & Alps', from: 'Queenstown Airport', to: 'Queenstown Mall' },
      { label: 'Rides in Wellington City', from: 'Wellington Airport', to: 'Lambton Quay' },
      { label: 'Rides in Christchurch Central', from: 'Christchurch Airport', to: 'Cathedral Square' },
      { label: 'Rides in Hamilton & Waikato', from: 'Hamilton Airport', to: 'Hamilton CBD' },
      { label: 'Rides in Tauranga & Mount', from: 'Tauranga Airport', to: 'Mount Maunganui' },
      { label: 'Rides in Rotorua Lakefront', from: 'Rotorua Airport', to: 'Rotorua Lakefront' },
      { label: 'Rides in Dunedin Coastal', from: 'Dunedin Airport', to: 'The Octagon' },
      { label: 'Rides in Nelson & Tasman', from: 'Nelson Airport', to: 'Nelson Waterfront' },
      { label: 'Rides in Napier & Hastings', from: 'Napier Airport', to: 'Marine Parade' },
      { label: 'Rides in Palmerston North', from: 'Palmerston North', to: 'The Square' },
      { label: 'Rides in Whangarei Northland', from: 'Whangarei Airport', to: 'Town Basin' },
    ],
    airports: [
      { label: 'Auckland Airport (AKL) Transfers', from: 'Auckland Airport (AKL)', to: 'Auckland CBD' },
      { label: 'Queenstown Airport (ZQN) Shuttles', from: 'Queenstown Airport (ZQN)', to: 'Wanaka' },
      { label: 'Wellington Airport (WLG) Express', from: 'Wellington Airport (WLG)', to: 'Interislander Ferry' },
      { label: 'Christchurch Airport (CHC) Chauffeur', from: 'Christchurch Airport (CHC)', to: 'Christchurch CBD' },
      { label: 'Hamilton Airport (HLZ) Transfers', from: 'Hamilton Airport', to: 'Cambridge' },
      { label: 'Rotorua Airport (ROT) Transfers', from: 'Rotorua Airport', to: 'Redwoods Forest' },
      { label: 'Tauranga Airport (TRG) Coastal Rides', from: 'Tauranga Airport', to: 'Papamoa Beach' },
      { label: 'Dunedin Airport (DUD) University Shuttles', from: 'Dunedin Airport', to: 'Otago University' },
      { label: 'Sydney Airport (SYD) Trans-Tasman Hub', from: 'Sydney Airport', to: 'Circular Quay' },
      { label: 'Melbourne Airport (MEL) Executive Rides', from: 'Melbourne Airport', to: 'Southbank CBD' },
      { label: 'Brisbane Airport (BNE) Transfers', from: 'Brisbane Airport', to: 'Gold Coast' },
      { label: 'Perth Airport (PER) Chauffeur Lines', from: 'Perth Airport', to: 'Perth City' },
    ],
    scenic: [
      { label: 'Queenstown to Milford Sound Tour', from: 'Queenstown CBD', to: 'Milford Sound Gateway' },
      { label: 'Auckland to Hobbiton Movie Set', from: 'Auckland CBD', to: 'Matamata Hobbiton' },
      { label: 'Christchurch to Franz Josef Glacier', from: 'Christchurch CBD', to: 'Franz Josef' },
      { label: 'Wellington to Martinborough Wineries', from: 'Wellington CBD', to: 'Martinborough' },
      { label: 'Rotorua to Waitomo Glowworm Caves', from: 'Rotorua Central', to: 'Waitomo Caves' },
      { label: 'Queenstown to Glenorchy Paradise', from: 'Queenstown', to: 'Glenorchy' },
      { label: 'Auckland to Piha & West Coast Beaches', from: 'Auckland CBD', to: 'Piha Beach' },
      { label: 'Nelson to Kaiteriteri Beach', from: 'Nelson Airport', to: 'Kaiteriteri' },
      { label: 'Dunedin to Royal Albatross Centre', from: 'Dunedin', to: 'Otago Peninsula' },
    ],
    hourly: [
      { label: '2-Hour City Business Charter', from: 'Auckland CBD', to: 'Client Meetings' },
      { label: '4-Hour VIP Executive Chauffeur', from: 'Wellington CBD', to: 'Parliament Corridor' },
      { label: '8-Hour Full Day Scenic Charter', from: 'Queenstown', to: 'Ski Fields & Wineries' },
      { label: 'Hourly Chauffeur for Weddings', from: 'Christchurch', to: 'Wedding Venue' },
      { label: 'Event Guest Shuttle Service', from: 'Venue Desk', to: 'Partner Hotels' },
      { label: 'Corporate Delegation Mini-Bus', from: 'Convention Centre', to: 'Airports' },
    ],
    fleets: [
      { label: 'Standard Comfort Sedan (Camry, Prius, Passat)', from: 'Auckland Airport', to: 'City Hotels' },
      { label: 'Executive Luxury SUV (Lexus RX, Audi Q7)', from: 'Queenstown Airport', to: 'Alpine Lodges' },
      { label: 'Passenger Vans (Mercedes Sprinter, HiAce)', from: 'Wellington Airport', to: 'Conference Centre' },
      { label: 'First Class Chauffeur (Mercedes S-Class, BMW 7)', from: 'Auckland CBD', to: 'Private Terminals' },
      { label: 'Electric & Hybrid Eco-Fleet', from: 'Christchurch CBD', to: 'Tech Hubs' },
      { label: 'Wheelchair Accessible Mobility Vans', from: 'Regional Hospitals', to: 'Accommodations' },
    ],
    deals: [
      { label: 'New Member $15 Welcome Ride Voucher', from: 'Any Pickup', to: 'Any Drop-off' },
      { label: '10% OFF Return Airport Transfers', from: 'Auckland Airport', to: 'Round-trip' },
      { label: 'Trip Centre Club 5% Instant Cashback', from: 'All Intercity Rides', to: 'Wallet Credits' },
      { label: 'Venue Partner Corporate Rates', from: 'Hotel Lobby', to: 'International Terminal' },
      { label: 'Ski Shuttle Season Pass Discount', from: 'Queenstown', to: 'Cardrona / Treble Cone' },
      { label: 'Student & Senior Airport Concession', from: 'Campuses', to: 'Regional Terminals' },
    ],
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-50 dark:bg-[#0D1117] text-slate-900 dark:text-slate-100 selection:bg-[#FF8A00] selection:text-white">
      {/* 1. HERO SECTION (KIWI.COM STYLE SEARCH BAR & MODE SELECTOR) */}
      <section
        id="search-rides"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#071D33] via-[#0B2A4A] to-[#0A223B] pt-8 pb-14 sm:pb-20 text-white"
      >
        {/* Background Atmospheric Lighting */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
          style={{ backgroundImage: "url('/assets/splash_background_image.png')" }}
          aria-hidden
        />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF8A00]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#1E4A78]/35 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Country / Scope Pill */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-bold text-[#FFB74D]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>New Zealand & Australia Pre-booked Transport</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-white/70">
              <ShieldCheck size={14} className="text-[#22C55E]" />
              <span>Verified Commercial Drivers</span>
            </span>
          </div>

          {/* Headline (Matching Kiwi "Fly for less, Guaranteed!") */}
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-white">
              Ride for less,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB74D] via-[#FF8A00] to-[#FFA726]">
                Guaranteed!
              </span>
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-slate-200/90 leading-relaxed font-medium">
              Pre-book fixed-rate airport transfers, city rides, and hourly chauffeurs with real-time flight delay tracking and zero surge multipliers.
            </p>
          </div>

          {/* Mode Switcher Tabs (Kiwi Style: Search vs AI Mode BETA) */}
          <div className="mt-6 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchMode('search')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
                searchMode === 'search'
                  ? 'bg-white text-[#0B2A4A] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Car size={16} className={searchMode === 'search' ? 'text-[#FF8A00]' : ''} />
              <span>Standard Search</span>
            </button>
            <button
              type="button"
              onClick={() => setSearchMode('ai')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all border ${
                searchMode === 'ai'
                  ? 'bg-gradient-to-r from-[#FF8A00] to-[#E67600] text-white border-transparent shadow-glow-orange'
                  : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
              }`}
            >
              <Sparkles size={15} className="text-[#FFD54F]" />
              <span>AI Booking Assistant</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/25 px-1.5 py-0.5 rounded-full">
                BETA
              </span>
            </button>
          </div>

          {/* AI MODE BOX */}
          {searchMode === 'ai' ? (
            <div className="mt-4 w-full rounded-3xl bg-white/95 dark:bg-[#161B22]/95 backdrop-blur-xl border border-white/30 dark:border-slate-700 shadow-2xl p-5 text-slate-900 dark:text-white">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#FF8A00] mb-2 uppercase tracking-wider">
                <Sparkles size={16} />
                <span>Tell Trip Centre AI what you need</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Describe your journey in plain English (e.g. &ldquo;Need a pickup from Auckland Airport AKL to Cordis Hotel for 3 adults, 4 bags, flight NZ123 arriving at 2:30 PM tomorrow&rdquo;)
              </p>
              <div className="relative">
                <textarea
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Flight landing at Queenstown Airport at 14:45. Need a luxury SUV for 4 passengers with ski gear to The Rees Hotel with child seat..."
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0D1117] p-4 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 transition-all resize-none"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    <span>Auto-matches vehicle capacity, luggage allowance & flight radar</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('customer'))}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#E67600] px-5 py-2.5 text-sm font-extrabold text-white shadow-glow-orange hover:brightness-105 transition-all"
                  >
                    <span>Analyze & Book with AI</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* KIWI.COM STYLE SEARCH CARD */
            <form
              onSubmit={handleSearch}
              className="mt-4 w-full rounded-3xl bg-white dark:bg-[#161B22] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.45)] border border-white/20 dark:border-slate-700/80 p-4 sm:p-5 text-slate-900 dark:text-white"
            >
              {/* TOP BAR DROPDOWNS: One-way | Economy/Vehicle | Passengers | Luggage */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-3.5 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                {/* Trip Type Dropdown */}
                <div className="relative">
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value as TripType)}
                    className="appearance-none bg-slate-100 dark:bg-[#0D1117] hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl px-3.5 py-1.5 pr-8 cursor-pointer outline-none border border-transparent focus:border-[#FF8A00] transition-colors"
                  >
                    <option value="oneway">One-way</option>
                    <option value="roundtrip">Return ride</option>
                    <option value="hourly">Hourly Chauffeur</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
                  />
                </div>

                {/* Vehicle Class Dropdown */}
                <div className="relative">
                  <select
                    value={vehicleClass}
                    onChange={(e) => setVehicleClass(e.target.value as VehicleClass)}
                    className="appearance-none bg-slate-100 dark:bg-[#0D1117] hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl px-3.5 py-1.5 pr-8 cursor-pointer outline-none border border-transparent focus:border-[#FF8A00] transition-colors"
                  >
                    <option value="sedan">Standard Sedan</option>
                    <option value="suv">Executive SUV</option>
                    <option value="van">Passenger Van (6-8)</option>
                    <option value="luxury">First Class VIP</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
                  />
                </div>

                {/* Passenger Selector Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassengerModal(!showPassengerModal);
                      setShowLuggageModal(false);
                    }}
                    className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-[#0D1117] hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl px-3.5 py-1.5 font-bold cursor-pointer transition-colors"
                  >
                    <Users size={14} className="text-[#FF8A00]" />
                    <span>
                      {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
                    </span>
                    <ChevronDown size={14} className="text-slate-500" />
                  </button>

                  {showPassengerModal && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-[#1E2738] border border-slate-200 dark:border-slate-700 shadow-xl p-4 z-50 animate-fade-in text-slate-900 dark:text-white">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="font-extrabold text-xs">Adults</p>
                          <p className="text-[10px] text-slate-400">Age 12+</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            disabled={passengers.adults <= 1}
                            onClick={() =>
                              setPassengers((p) => ({ ...p, adults: Math.max(1, p.adults - 1) }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-sm w-4 text-center">
                            {passengers.adults}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPassengers((p) => ({ ...p, adults: Math.min(8, p.adults + 1) }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3">
                        <div>
                          <p className="font-extrabold text-xs">Children</p>
                          <p className="text-[10px] text-slate-400">Age 0-11</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            disabled={passengers.children <= 0}
                            onClick={() =>
                              setPassengers((p) => ({
                                ...p,
                                children: Math.max(0, p.children - 1),
                              }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-sm w-4 text-center">
                            {passengers.children}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPassengers((p) => ({
                                ...p,
                                children: Math.min(6, p.children + 1),
                              }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowPassengerModal(false)}
                        className="mt-4 w-full py-1.5 rounded-xl bg-[#0B2A4A] dark:bg-[#FF8A00] text-white text-xs font-bold text-center"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                {/* Luggage Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLuggageModal(!showLuggageModal);
                      setShowPassengerModal(false);
                    }}
                    className="inline-flex items-center gap-2 bg-slate-100 dark:bg-[#0D1117] hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl px-3.5 py-1.5 font-bold cursor-pointer transition-colors"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Luggage size={14} className="text-[#FF8A00]" />
                      <span>{luggage.checkin}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase size={14} className="text-slate-400" />
                      <span>{luggage.cabin}</span>
                    </span>
                    <ChevronDown size={14} className="text-slate-500" />
                  </button>

                  {showLuggageModal && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-[#1E2738] border border-slate-200 dark:border-slate-700 shadow-xl p-4 z-50 animate-fade-in text-slate-900 dark:text-white">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="font-extrabold text-xs">Check-in Baggage</p>
                          <p className="text-[10px] text-slate-400">Large suitcase (23kg+)</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            disabled={luggage.checkin <= 0}
                            onClick={() =>
                              setLuggage((l) => ({ ...l, checkin: Math.max(0, l.checkin - 1) }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-sm w-4 text-center">
                            {luggage.checkin}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setLuggage((l) => ({ ...l, checkin: Math.min(8, l.checkin + 1) }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3">
                        <div>
                          <p className="font-extrabold text-xs">Cabin / Handbag</p>
                          <p className="text-[10px] text-slate-400">Small bag or backpack</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            disabled={luggage.cabin <= 0}
                            onClick={() =>
                              setLuggage((l) => ({ ...l, cabin: Math.max(0, l.cabin - 1) }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-sm w-4 text-center">
                            {luggage.cabin}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setLuggage((l) => ({ ...l, cabin: Math.min(8, l.cabin + 1) }))
                            }
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowLuggageModal(false)}
                        className="mt-4 w-full py-1.5 rounded-xl bg-[#0B2A4A] dark:bg-[#FF8A00] text-white text-xs font-bold text-center"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>

                <div className="ml-auto hidden xl:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span>Class: {vehicleClassLabels[vehicleClass].split(' ')[0]}</span>
                </div>
              </div>

              {/* MAIN INPUT ROW (From | Swap | To | Departure Date/Time | Explore CTA) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
                {/* FROM INPUT */}
                <div className="lg:col-span-3 relative rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700/80 p-2.5 focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                      From
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-orange-100/80 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-md">
                      <MapPin size={11} />
                      <span className="truncate max-w-[140px]">{pickup || 'Select origin'}</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup address or airport"
                    className="mt-1 w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                  />
                </div>

                {/* SWAP BUTTON */}
                <div className="lg:col-span-1 flex justify-center py-1 lg:py-0">
                  <button
                    type="button"
                    onClick={handleSwap}
                    title="Swap locations"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700 hover:rotate-180 transition-all duration-300"
                  >
                    <ArrowLeftRight size={16} />
                  </button>
                </div>

                {/* TO INPUT */}
                <div className="lg:col-span-3 relative rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700/80 p-2.5 focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                      To
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-blue-100/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md">
                      <Plane size={11} />
                      <span className="truncate max-w-[140px]">{dropoff || 'Anywhere'}</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Enter drop-off destination or hotel"
                    className="mt-1 w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                  />
                </div>

                {/* DEPARTURE DATE & TIME */}
                <div
                  className={`relative rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700/80 p-2.5 focus-within:border-[#FF8A00] focus-within:ring-2 focus-within:ring-[#FF8A00]/20 transition-all ${
                    tripType === 'roundtrip' ? 'lg:col-span-3' : 'lg:col-span-3'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {tripType === 'hourly' ? 'Start Time & Duration' : 'Departure'}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {tripType === 'hourly' ? `${hourlyDuration} Hours` : departureDate}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none flex-1 min-w-0"
                    />
                    <input
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none w-20"
                    />
                  </div>
                </div>

                {/* EXPLORE CTA BUTTON */}
                <div className="lg:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#FF8A00] to-[#E67600] hover:from-[#E67600] hover:to-[#FF8A00] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-glow-orange hover:shadow-xl transition-all duration-200 cursor-pointer"
                  >
                    <Search size={18} />
                    <span>Explore</span>
                  </button>
                </div>
              </div>

              {/* RETURN RIDE ROW IF ROUNDTRIP */}
              {tripType === 'roundtrip' && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 animate-fade-in">
                  <div className="sm:col-span-6 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700/80 p-2.5">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Return Date & Time (10% Off Return Leg)
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none flex-1 min-w-0"
                      />
                      <input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="bg-transparent text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none w-20"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 flex items-center px-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Check size={14} className="mr-1.5 shrink-0" />
                    <span>Same driver continuity available for your return leg</span>
                  </div>
                </div>
              )}

              {/* HOURLY SELECTOR ROW IF HOURLY */}
              {tripType === 'hourly' && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 animate-fade-in text-xs font-bold">
                  <span className="text-slate-400">Select Hire Duration:</span>
                  {['2', '4', '6', '8', '12'].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setHourlyDuration(hours)}
                      className={`px-3 py-1.5 rounded-xl border transition-all ${
                        hourlyDuration === hours
                          ? 'bg-[#FF8A00] text-white border-[#FF8A00]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:border-slate-300'
                      }`}
                    >
                      {hours} Hours {hours === '8' ? '(Full Day)' : ''}
                    </button>
                  ))}
                </div>
              )}

              {/* EXTRA FLIGHT OPTIONS & CHECKBOXES (Kiwi Style accommodation deals toggle adapted) */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300 font-semibold">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                    <input
                      type="checkbox"
                      checked={flightTracking}
                      onChange={(e) => setFlightTracking(e.target.checked)}
                      className="rounded border-slate-300 text-[#FF8A00] focus:ring-[#FF8A00]"
                    />
                    <span>Flight Radar Sync (Free delayed driver waiting)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                    <input
                      type="checkbox"
                      checked={meetAndGreet}
                      onChange={(e) => setMeetAndGreet(e.target.checked)}
                      className="rounded border-slate-300 text-[#FF8A00] focus:ring-[#FF8A00]"
                    />
                    <span>Meet & Greet (Chauffeur name sign)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                    <input
                      type="checkbox"
                      checked={childSeat}
                      onChange={(e) => setChildSeat(e.target.checked)}
                      className="rounded border-slate-300 text-[#FF8A00] focus:ring-[#FF8A00]"
                    />
                    <span>Child / Booster Seat</span>
                  </label>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                  <ShieldCheck size={13} className="text-[#22C55E]" />
                  <span>Flat Rates · Zero Surge</span>
                </div>
              </div>
            </form>
          )}

          {/* KIWI-STYLE SUB-BANNER TRUST STRIP */}
          <div className="mt-5 flex items-center justify-center text-center">
            <span className="text-xs sm:text-sm font-extrabold text-emerald-300 flex items-center gap-2">
              <span>↓</span>
              <span>No membership fees, zero hidden surge pricing, 100% arrival guarantee.</span>
              <span>↓</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. LOYALTY PROGRAM: TRIP CENTRE CLUB (EXACT MATCH FOR KIWI.COM CLUB SCREENSHOT) */}
      <section
        id="loyalty-club"
        className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-[#0D1117] dark:to-[#161B22]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0B2A4A] via-[#0F355C] to-[#071D33] text-white p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-[#FF8A00]/25 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Kiwi-style Club Pitch */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#FFB74D] border border-white/15 mb-3">
                  <Crown size={14} className="text-[#FFB74D]" />
                  <span>Loyalty Program</span>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <img
                    src="/assets/app_icon.png"
                    alt="Trip Centre"
                    className="w-10 h-10 rounded-xl shadow-md border border-white/20"
                  />
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Trip Centre Club
                  </span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  One booking and you&apos;re in.
                </h2>

                <p className="mt-3 text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-xl">
                  Only one booking with us and you get access to{' '}
                  <strong className="text-white">Trip Centre Club membership</strong> — with
                  member-only flat fares, zero peak surge charges, and free Voucher Drops worth up to{' '}
                  <span className="text-[#FFB74D] font-extrabold">$150 NZD</span>.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.SIGNUP('customer'))}
                    className="rounded-2xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#22C55E] text-white font-black text-sm px-6 py-3.5 shadow-lg shadow-emerald-900/30 hover:scale-[1.02] transition-all"
                  >
                    Join for free
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('customer'))}
                    className="rounded-2xl border border-white/30 text-white hover:bg-white/10 font-bold text-sm px-5 py-3.5 transition-colors"
                  >
                    Member Log In
                  </button>
                </div>

                {/* Micro Perks Strip */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
                  <div>
                    <p className="font-extrabold text-[#FFB74D] text-lg">$25 Voucher Drop</p>
                    <p className="text-slate-300">On your 2nd airport transfer</p>
                  </div>
                  <div>
                    <p className="font-extrabold text-[#22C55E] text-lg">5% Cashback</p>
                    <p className="text-slate-300">Credited to Trip Wallet</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="font-extrabold text-white text-lg">0 Min Wait</p>
                    <p className="text-slate-300">Priority Chauffeur Standby</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual 3D Voucher Cards Showcase */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-white/20 p-4 shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF8A00]">
                      VIP Voucher Drop
                    </span>
                    <span className="text-xs font-black text-[#22C55E] bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div>
                      <p className="text-2xl font-black text-white">$25.00 OFF</p>
                      <p className="text-xs text-slate-300">International Airport Transfer</p>
                    </div>
                    <Gift size={28} className="text-[#FF8A00]" />
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-white/20 p-4 shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Wallet Rewards
                    </span>
                    <span className="text-xs font-bold text-slate-300">Every Trip</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div>
                      <p className="text-2xl font-black text-white">5% Cashback</p>
                      <p className="text-xs text-slate-300">Zero surge multipliers applied</p>
                    </div>
                    <DollarSign size={28} className="text-[#22C55E]" />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center text-xs text-slate-300">
                  <span>No credit card required to activate your membership perks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE TRIP CENTRE GUARANTEE BANNER (MATCHING KIWI GUARANTEE SCREENSHOT) */}
      <section id="guarantee" className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-50/70 via-white to-teal-50/80 dark:from-emerald-950/20 dark:via-[#161B22] dark:to-teal-950/20 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Guarantee Content */}
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                  <ShieldCheck size={16} />
                  <span>The Trip Centre Guarantee</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] dark:text-white tracking-tight">
                  Rise above all travel anxieties.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  We guarantee on-time chauffeur dispatch, live radar flight delay sync, and locked
                  flat-rate pricing on every airport and intercity booking.
                </p>

                {/* Guarantee Tabs Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {guarantees.map((g, idx) => (
                    <button
                      key={g.title}
                      type="button"
                      onClick={() => setActiveGuaranteeIndex(idx)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                        activeGuaranteeIndex === idx
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      {g.title.split(' ')[0]} {g.title.split(' ')[1]}
                    </button>
                  ))}
                </div>

                {/* Active Guarantee Details */}
                <div className="mt-3.5 p-3.5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-[#0B2A4A] dark:text-white">
                      {guarantees[activeGuaranteeIndex].title}
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {guarantees[activeGuaranteeIndex].stat}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {guarantees[activeGuaranteeIndex].desc}
                  </p>
                </div>
              </div>

              {/* Graphic Side */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <div className="w-full max-w-xs rounded-2xl bg-white dark:bg-[#0D1117] border border-emerald-500/30 p-5 text-center shadow-md">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
                    <Shield size={32} />
                  </div>
                  <p className="font-black text-base text-[#0B2A4A] dark:text-white">
                    100% Ride Arrival Shield
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Driver delay or breakdown? Our dispatch backup arrives immediately at $0 extra cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR DESTINATIONS (PICKED JUST FOR YOU - SCREENSHOT 3) */}
      <section id="popular-destinations" className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] dark:text-white tracking-tight">
                Popular destinations from Auckland
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                These alluring destinations from Auckland and across New Zealand are picked just for you.
              </p>
            </div>

            {/* City Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
              {[
                { id: 'all', label: 'All NZ' },
                { id: 'auckland', label: 'Auckland' },
                { id: 'queenstown', label: 'Queenstown' },
                { id: 'wellington', label: 'Wellington' },
                { id: 'christchurch', label: 'Christchurch' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setDestFilter(f.id as DestinationCategory)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    destFilter === f.id
                      ? 'bg-[#0B2A4A] text-white dark:bg-[#FF8A00] shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#FF8A00]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid (Kiwi style with featured wide card in center) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => handleSelectRoute(dest.pickup, dest.dropoff)}
                className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#161B22] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  dest.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Photo Header */}
                <div className={`relative overflow-hidden ${dest.featured ? 'h-60 sm:h-72' : 'h-48'}`}>
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#0B2A4A]/80 backdrop-blur-md text-[#FFB74D] border border-white/20 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {dest.badge}
                  </span>

                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock size={12} className="text-[#FF8A00]" />
                    <span>{dest.duration}</span>
                  </span>

                  {/* Overlay Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-bold text-slate-300">{dest.region}</p>
                    <h3 className="text-lg sm:text-xl font-black leading-snug">{dest.name}</h3>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="p-3.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#161B22]">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400">
                      Fixed fare
                    </span>
                    <p className="text-sm sm:text-base font-black text-[#0B2A4A] dark:text-[#FF8A00]">
                      Transfers from {dest.fare}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-extrabold text-[#FF8A00] group-hover:translate-x-1 transition-transform">
                    <span>Book this route</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MOBILE APP DOWNLOAD SHOWCASE (SCREENSHOT 3) */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-100/70 dark:bg-[#071D33]/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF8A00]">
                Trip Centre On The Go
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-black text-[#0B2A4A] dark:text-white tracking-tight">
                Get more out of Trip Centre with our mobile app.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Experience seamless travel with live GPS turn-by-turn tracking, contactless airport
                check-ins, direct encrypted messaging with your chauffeur, and one-tap rebooking.
              </p>

              {/* App Features List */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  'Live turn-by-turn driver radar tracking',
                  'Direct in-app call & chat with your chauffeur',
                  'Instant digital tax receipts & expense logs',
                  'Redeem Trip Centre Club vouchers in 1 click',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0">
                      <Check size={12} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Download Badges & QR Code */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('customer'))}
                    className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2.5 text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    <Smartphone size={16} />
                    <div className="text-left leading-none">
                      <span className="block text-[9px] text-slate-400">Download on the</span>
                      <span className="text-xs font-extrabold">App Store</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('customer'))}
                    className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2.5 text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    <Smartphone size={16} />
                    <div className="text-left leading-none">
                      <span className="block text-[9px] text-slate-400">GET IT ON</span>
                      <span className="text-xs font-extrabold">Google Play</span>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl">
                  <QrCode size={18} className="text-[#FF8A00]" />
                  <span>Scan QR on airport signboards</span>
                </div>
              </div>
            </div>

            {/* Smartphone UI Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-72 rounded-[2.5rem] border-4 border-slate-900 bg-white dark:bg-[#0D1117] shadow-2xl p-4 text-slate-900 dark:text-white">
                <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto mb-3" />
                <div className="rounded-2xl bg-slate-100 dark:bg-[#161B22] p-3 border border-slate-200 dark:border-slate-800 text-left">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>LIVE TRIP</span>
                    <span className="text-[#22C55E]">ON TIME</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src="/assets/app_icon.png"
                      alt="Chauffeur"
                      className="w-8 h-8 rounded-full border border-orange-400"
                    />
                    <div>
                      <p className="text-xs font-black">James MacLeod</p>
                      <p className="text-[10px] text-slate-400">Mercedes E-Class · AKL-892</p>
                    </div>
                  </div>
                  <div className="mt-3 text-[10px] space-y-1 font-semibold text-slate-600 dark:text-slate-300">
                    <p>📍 Auckland Airport Terminal 1</p>
                    <p>🏁 Cordis Hotel, Symonds St</p>
                    <p className="text-[#FF8A00]">⏱️ ETA: 8 minutes away</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POPULAR TRANSFER ROUTES (PILL GRID - EXACT MATCH FOR SCREENSHOT 4) */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] dark:text-white tracking-tight">
              Popular Transfer Routes
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Check these popular airport and intercity routes on Trip Centre.
            </p>
          </div>

          {/* 3 Columns Grid of Pill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {popularRoutes.slice(0, showMoreRoutes ? 18 : 12).map((route) => (
              <div
                key={route.id}
                onClick={() => handleSelectRoute(route.from, route.to)}
                className="group flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200/90 dark:border-slate-800 hover:border-[#FF8A00] dark:hover:border-[#FF8A00] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={route.img}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {route.from.replace(' (AKL)', '').replace(' (ZQN)', '').replace(' (WLG)', '')} ⇄{' '}
                      {route.to.replace(' (AKL)', '')}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-bold text-[#FF8A00]">{route.fare}</span>
                      <span>•</span>
                      <span>{route.time}</span>
                    </div>
                  </div>
                </div>

                <div className="pr-2 text-slate-400 group-hover:text-[#FF8A00] group-hover:translate-x-1 transition-all">
                  <ArrowRight size={15} />
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button (Kiwi style) */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowMoreRoutes(!showMoreRoutes)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#161B22] px-6 py-2.5 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 hover:border-[#FF8A00] hover:text-[#FF8A00] shadow-sm transition-all"
            >
              <span>{showMoreRoutes ? 'Show less' : 'Show more routes'}</span>
              {showMoreRoutes ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
        </div>
      </section>

      {/* 7. EXPLORE DIRECTORY TABS (SCREENSHOT 5) */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-[#071D33]/25 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B2A4A] dark:text-white tracking-tight mb-4">
            Explore Trip Centre Ride Offers
          </h2>

          {/* Tabs Menu */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold">
            {[
              { id: 'cities', label: 'Rides to cities' },
              { id: 'airports', label: 'Airport transfers' },
              { id: 'scenic', label: 'Scenic & tours' },
              { id: 'hourly', label: 'Hourly chauffeur' },
              { id: 'fleets', label: 'Fleet categories' },
              { id: 'deals', label: 'Special deals' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDirectoryTab(tab.id as DirectoryTab)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeDirectoryTab === tab.id
                    ? 'bg-[#0B2A4A] text-white dark:bg-[#FF8A00] shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3 Columns Directory Table (Kiwi Screenshot 5 Style) */}
          <div className="mt-6 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-xs sm:text-sm">
              {directoryLinks[activeDirectoryTab].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSelectRoute(item.from, item.to)}
                  className="flex items-center gap-2 text-left text-slate-700 dark:text-slate-300 hover:text-[#FF8A00] dark:hover:text-[#FF8A00] font-semibold transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-[#FF8A00] transition-colors shrink-0" />
                  <span className="underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4 group-hover:decoration-[#FF8A00]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. DRIVER, VENUE & RESELLER PARTNER CARDS */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Driver Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0B2A4A] to-[#1E4A78] text-white p-7 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFB74D]">
                For Commercial Drivers
              </span>
              <h3 className="mt-1 text-2xl font-black">Drive with Trip Centre</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                Join New Zealand&apos;s premier chauffeur and airport transfer network. Enjoy
                guaranteed pre-booked fares, 85%+ driver payout, and weekly direct deposits.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(ROUTES.SIGNUP('driver'))}
                className="rounded-xl bg-[#FF8A00] hover:bg-[#E67600] text-white px-5 py-2.5 text-xs font-black shadow-glow-orange transition-colors"
              >
                Sign Up as Driver
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN('driver'))}
                className="rounded-xl border border-white/30 text-white hover:bg-white/10 px-4 py-2.5 text-xs font-bold transition-colors"
              >
                Driver Log In
              </button>
            </div>
          </div>

          {/* Venue Partner Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#161B22] to-[#21262D] text-white p-7 shadow-xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
                For Hotels & Venues
              </span>
              <h3 className="mt-1 text-2xl font-black">Hotel & Venue Concierge</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dispatch verified airport transfers and VIP guest rides from your front desk in 1
                click. Earn venue partner commissions and deliver luxury guest experiences.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(ROUTES.SIGNUP('venue_partner'))}
                className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-xs font-black transition-colors"
              >
                Register Your Venue
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN('venue_partner'))}
                className="rounded-xl border border-white/30 text-white hover:bg-white/10 px-4 py-2.5 text-xs font-bold transition-colors"
              >
                Venue Log In
              </button>
            </div>
          </div>

          {/* Reseller Agent Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#3B0764] to-[#5B21B6] text-white p-7 shadow-xl border border-violet-500/30 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-200">
                For Travel Resellers
              </span>
              <h3 className="mt-1 text-2xl font-black">Reseller Agent Network</h3>
              <p className="mt-2 text-xs sm:text-sm text-violet-100/90 leading-relaxed">
                Book airport transfers and city rides for your clients with IATA-ready tools,
                clear fares, and live trip updates your travellers can trust.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(ROUTES.SIGNUP('reseller_agent'))}
                className="rounded-xl bg-violet-500 hover:bg-violet-400 text-white px-5 py-2.5 text-xs font-black transition-colors"
              >
                Join as Reseller
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN('reseller_agent'))}
                className="rounded-xl border border-white/30 text-white hover:bg-white/10 px-4 py-2.5 text-xs font-bold transition-colors"
              >
                Reseller Log In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. COMPREHENSIVE KIWI-STYLE FOOTER (SCREENSHOT 5) */}
      <footer className="w-full bg-white dark:bg-[#071D33] text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main 5 Columns Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200 dark:border-slate-800 text-xs">
            {/* Column 1: Brand & Socials */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/app_icon.png"
                  alt="Trip Centre"
                  className="w-9 h-9 rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
                />
                <span className="text-base font-black text-[#0B2A4A] dark:text-white">
                  Trip Centre
                </span>
              </div>
              <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                New Zealand&apos;s premier pre-booked transport, airport transfers, and chauffeur
                network.
              </p>

              {/* Social Media Links */}
              <div className="mt-4 flex items-center gap-3 text-slate-500">
                <a
                  href="https://tripcentre.co.nz"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF8A00] transition-colors font-bold text-xs"
                >
                  FB
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF8A00] transition-colors font-bold text-xs"
                >
                  IG
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF8A00] transition-colors font-bold text-xs"
                >
                  IN
                </a>
              </div>
            </div>

            {/* Column 2: Company */}
            <div>
              <p className="font-extrabold text-slate-900 dark:text-white text-xs mb-3">Company</p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#how-it-works" className="hover:text-[#FF8A00] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-[#FF8A00] transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-[#FF8A00] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#accessibility" className="hover:text-[#FF8A00] transition-colors">
                    Accessibility Statement
                  </a>
                </li>
                <li>
                  <a href="#media" className="hover:text-[#FF8A00] transition-colors">
                    Media & Press Room
                  </a>
                </li>
                <li>
                  <a href="#safety" className="hover:text-[#FF8A00] transition-colors">
                    Passenger Safety & Security
                  </a>
                </li>
                <li>
                  <a href="#legal" className="hover:text-[#FF8A00] transition-colors">
                    Legal & Disclosures
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Portals */}
            <div>
              <p className="font-extrabold text-slate-900 dark:text-white text-xs mb-3">Portals</p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('customer'))}
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Customer Booking Portal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('driver'))}
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Driver Partner Portal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('venue_partner'))}
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Venue & Concierge Partner
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.LOGIN('reseller_agent'))}
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Reseller Agent Portal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.CHOOSE_ROLE)}
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Choose Your Role
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.ONBOARDING_STEP(1))}
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Guided Walkthrough
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Features */}
            <div>
              <p className="font-extrabold text-slate-900 dark:text-white text-xs mb-3">Features</p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#guarantee" className="hover:text-[#FF8A00] transition-colors">
                    Trip Centre Guarantee
                  </a>
                </li>
                <li>
                  <a href="#loyalty-club" className="hover:text-[#FF8A00] transition-colors">
                    Trip Centre Club Rewards
                  </a>
                </li>
                <li>
                  <a href="#search-rides" className="hover:text-[#FF8A00] transition-colors">
                    Flight Radar Delay Sync
                  </a>
                </li>
                <li>
                  <a href="#search-rides" className="hover:text-[#FF8A00] transition-colors">
                    Fixed Flat Fares
                  </a>
                </li>
                <li>
                  <a href="#search-rides" className="hover:text-[#FF8A00] transition-colors">
                    Hourly Chauffeur Hire
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#FF8A00] transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Popular Hubs */}
            <div>
              <p className="font-extrabold text-slate-900 dark:text-white text-xs mb-3">
                Major Hubs
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectRoute('Auckland Airport (AKL)', 'Auckland CBD')
                    }
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Auckland Airport (AKL)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectRoute('Queenstown Airport (ZQN)', 'Queenstown CBD')
                    }
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Queenstown Airport (ZQN)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectRoute('Wellington Airport (WLG)', 'Interislander Ferry')
                    }
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Wellington Ferry & WLG
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectRoute('Christchurch Airport (CHC)', 'Cathedral Square')
                    }
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Christchurch Airport (CHC)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectRoute('Rotorua Airport', 'Lakefront')
                    }
                    className="hover:text-[#FF8A00] transition-colors"
                  >
                    Rotorua Regional Hub
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Currency Strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span>© 2026 Trip Centre Ltd. All rights reserved. Registered in New Zealand.</span>
            </div>

            <div className="flex items-center gap-4 font-bold">
              <span className="flex items-center gap-1">
                <span>🇳🇿 New Zealand</span>
              </span>
              <span>•</span>
              <span>NZD ($)</span>
              <span>•</span>
              <a
                href="mailto:support@tripcentre.co.nz"
                className="hover:text-[#FF8A00] transition-colors"
              >
                support@tripcentre.co.nz
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
