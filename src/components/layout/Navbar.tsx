import React from 'react';
import { useTrip } from '../../context/TripContext';
import { ScreenType } from '../../types/trip';
import {
  Compass,
  Sparkles,
  SlidersHorizontal,
  LayoutDashboard,
  Navigation,
  FileText,
  ShieldCheck,
  Bookmark,
  CheckCircle2,
  Lock,
  ChevronRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    userSession,
    setIsSavedTripsOpen,
    setIsAuthModalOpen,
  } = useTrip();

  const navItems: { id: ScreenType; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'landing', label: 'Landing & Auth', icon: Sparkles },
    { id: 'intake', label: 'Trip Intake', icon: SlidersHorizontal, badge: 'Step 1-3' },
    { id: 'studio', label: 'Review Studio', icon: LayoutDashboard, badge: 'Canvas' },
    { id: 'live', label: 'Live Navigation', icon: Navigation, badge: 'GPS' },
    { id: 'dossier', label: 'Master Dossier', icon: FileText, badge: 'PDF' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Agent Tag */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentScreen('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 p-[1px] shadow-glow-cyan flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                    TripGenie
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 tracking-wider">
                    AI Agent
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Autonomous Route & Safety Engine
                </p>
              </div>
            </button>

            {/* Quick Active Trip Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-800/80 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">Sample Trip:</span>
              <span className="text-slate-200 font-semibold truncate max-w-[190px]">
                Jaipur Expedition
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-sky-500/10 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 rounded font-mono ${
                        isActive
                          ? 'bg-cyan-500/30 text-cyan-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header CTAs & Verified User Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved Trips Shortcut Button */}
            <button
              onClick={() => setIsSavedTripsOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Saved Trips</span>
            </button>

            {/* Verified Session Badge */}
            {userSession.isAuthenticated ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all group"
                title="Click to view verified Supabase session"
              >
                <div className="relative">
                  <img
                    src={userSession.avatar}
                    alt={userSession.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-500/50"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center"></span>
                </div>
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {userSession.name}
                    </span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-tight">
                    Verified Session
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 shadow-glow-cyan transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 border-t border-slate-800/60 gap-1.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
