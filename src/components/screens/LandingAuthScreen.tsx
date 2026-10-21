import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  HardDriveDownload,
  Users2,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Compass,
  Zap,
  Bookmark,
  ChevronRight,
  Clock,
  Check,
} from 'lucide-react';

export const LandingAuthScreen: React.FC = () => {
  const {
    setCurrentScreen,
    setIsSavedTripsOpen,
    userSession,
    loginWithGoogle,
    loginWithEmail,
    showToast,
  } = useTrip();

  const [emailInput, setEmailInput] = useState('aarav.sharma@gmail.com');
  const [passwordInput, setPasswordInput] = useState('TravelSecure2026!');
  const [authSuccess, setAuthSuccess] = useState(false);

  const isEmailValid = emailInput.includes('@') && emailInput.includes('.');
  const isPasswordValid = passwordInput.length >= 8;

  const handleSimulatedAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;

    setAuthSuccess(true);
    setTimeout(() => {
      loginWithEmail(emailInput);
      showToast('Welcome back, Aarav! Session authenticated via Supabase RLS.', 'success');
      setCurrentScreen('intake');
    }, 800);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-sky-500/10 to-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 relative z-10">
        {/* Top Announcement Chip */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs text-cyan-300 shadow-glow-cyan">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-medium">Autonomous Travel Agent Engine v2.4</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 text-[11px]">Zero-Backtracking TSP Solver</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-slate-100 leading-[1.12]">
            Autonomous Travel Planning Agent —{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Zero Backtracking, Adaptive Safety & Offline Navigation
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate chaotic spreadsheets. TripGenie ingests booking PDFs, analyzes group vulnerability & walking paces, enforces local curfews, and delivers cached offline GPX navigation without requiring mobile cellular data.
          </p>

          {/* Primary Call-to-Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => {
                setCurrentScreen('intake');
                showToast('Launching Trip Intake Wizard...', 'info');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2.5 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Plan a New Trip</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setIsSavedTripsOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>Saved Trips (3)</span>
            </button>
          </div>

          {/* Micro Stat Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Zero External API Keys
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <Check className="w-3.5 h-3.5 text-cyan-400" />
              100% Client-Side Reactive
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <Check className="w-3.5 h-3.5 text-amber-400" />
              Sample: 4-Day Jaipur Expedition
            </span>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Card 1: Document OCR Anchoring */}
          <div className="glass-panel glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border-slate-800">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100">
                  Document OCR Anchoring
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Extracts confirmed flight touchdown times and hotel check-in slots directly from PDFs or screenshots. Anchors your itinerary without duplicate inputs.
                </p>
              </div>

              {/* Visual simulated chip preview */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 text-[11px] space-y-1.5 font-mono">
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <span>✈️</span>
                  <span className="font-semibold">Indigo 6E-204</span>
                  <span className="text-slate-500">➔</span>
                  <span className="text-slate-200">10:15 AM JAI</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <span>🏨</span>
                  <span className="font-semibold">ITC Rajputana</span>
                  <span className="text-slate-500">➔</span>
                  <span className="text-slate-200">12:00 PM Check-in</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-medium">
              <span>Automatic Time Anchoring</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Demographic Safety & Accessibility */}
          <div className="glass-panel glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border-slate-800">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100">
                  Demographic Safety & Accessibility Auditing
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Tailored algorithmic profiling for solo females, seniors, and children. Prunes steep fortress stairways for wheelchair users and applies an 8:00 PM safety curfew.
                </p>
              </div>

              {/* Visual simulated badge preview */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-[11px] text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Safety Filter: 8:00 PM Curfew Active</span>
                </div>
                <p className="text-slate-400 text-[10px]">
                  Nahargarh Fort sunset scheduled to depart hilltop by 7:15 PM.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span>Curfew & Step-Free Guard</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Zero-Data Offline GPX Navigation */}
          <div className="glass-panel glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border-slate-800">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <HardDriveDownload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100">
                  Zero-Data Offline GPX Navigation
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Never get stranded in remote monuments or cellular dead-zones. Generates standalone GPX and KML waypoint vectors with turn markers and emergency numbers cached locally.
                </p>
              </div>

              {/* Visual simulated chip preview */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono">Jaipur_Day1_Route.gpx</span>
                  <span className="text-emerald-400 text-[10px]">Ready (42 KB)</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-full"></div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-amber-400 font-medium">
              <span>Local Hardware GPS</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Auth Simulation Card Section */}
        <div className="mt-16 max-w-xl mx-auto">
          <div className="glass-panel-elevated p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-lg text-slate-100">
                  Traveler Authentication
                </h2>
                <p className="text-xs text-slate-400">
                  Sign in to sync your collaborative travel roster and live GPS telemetry
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Lock className="w-4 h-4" />
              </div>
            </div>

            {/* Google One-Tap Mockup */}
            <button
              onClick={() => {
                loginWithGoogle();
                showToast('Authenticated via Google OAuth 2.0 (Aarav Sharma)', 'success');
                setCurrentScreen('intake');
              }}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center gap-3 shadow-md transition-all group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-slate-900 px-3 text-[10px] uppercase font-semibold text-slate-500 absolute">
                Or Sign In with Email
              </span>
            </div>

            {/* Email & Password Input with Simulated Live Validation Checkmarks */}
            <form onSubmit={handleSimulatedAuth} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-9 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                  />
                  {isEmailValid ? (
                    <CheckCircle2 className="absolute right-3 top-3 w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="absolute right-3 top-3 w-4 h-4 text-amber-500" />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-9 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                  />
                  {isPasswordValid && (
                    <CheckCircle2 className="absolute right-3 top-3 w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 flex items-center justify-center gap-2 shadow-glow-cyan transition-all mt-2"
              >
                {authSuccess ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Session Verified! Opening Intake...
                  </span>
                ) : (
                  <>
                    <span>Enter TripGenie Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Security Footer */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Protected with Supabase Auth & Row-Level Security (RLS)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
