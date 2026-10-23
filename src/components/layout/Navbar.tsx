import React from 'react';
import { useTrip } from '../../context/TripContext';
import { ScreenType } from '../../types/trip';
import {
  Compass,
  Sparkles,
  Calendar,
  Navigation,
  FileText,
  ShieldCheck,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    userSession,
    setIsSavedTripsOpen,
    setIsAuthModalOpen,
  } = useTrip();

  const navItems: { id: ScreenType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: 'Home', icon: Sparkles },
    { id: 'intake', label: 'Plan Trip', icon: Calendar },
    { id: 'studio', label: 'Schedule', icon: Compass },
    { id: 'live', label: 'Live Guide', icon: Navigation },
    { id: 'dossier', label: 'Travel Pass', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0c0916]/65 backdrop-blur-3xl saturate-190 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with iOS Squircle */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentScreen('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-400 p-[1px] shadow-glow-sunset flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
                <div className="w-full h-full bg-[#140f24] rounded-[15px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-rose-400 group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent">
                  TripGenie
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  AI
                </span>
              </div>
            </button>

            {/* Navigation Tabs - iOS Segmented Pill Control */}
            <nav className="hidden md:flex items-center gap-1 ios-pill-container">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'ios-pill-active text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved Trips */}
            <button
              onClick={() => setIsSavedTripsOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white ios-subcard transition-all active:scale-95"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Saved Trips</span>
            </button>

            {/* User Session Profile (Guest / Minimal) */}
            {userSession.isAuthenticated ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1 rounded-full ios-subcard hover:border-white/20 transition-all group active:scale-95"
                title="Account Settings"
              >
                <img
                  src={userSession.avatar}
                  alt={userSession.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
                />
                <span className="text-xs font-medium text-slate-200 hidden sm:block">
                  {userSession.name}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Sign in
              </button>
            )}

            {/* Primary CTA: Start Planning */}
            <button
              onClick={() => setCurrentScreen('intake')}
              className="px-4 py-2 rounded-full text-xs font-bold ios-btn-primary text-white flex items-center gap-1.5"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Subnav */}
        <div className="flex md:hidden overflow-x-auto py-2.5 border-t border-[#241C33]/60 gap-1.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-slate-200 bg-[#141021]/60'
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
