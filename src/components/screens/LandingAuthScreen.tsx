import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Sparkles,
  ArrowRight,
  Bookmark,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react';

export const LandingAuthScreen: React.FC = () => {
  const { setCurrentScreen, setIsSavedTripsOpen } = useTrip();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden pb-16 flex flex-col justify-center">
      {/* Background Twilight Horizon Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[520px] bg-gradient-to-b from-rose-500/20 via-peach-500/10 to-transparent blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[450px] h-[350px] bg-gradient-to-br from-amber-500/15 to-rose-500/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-10 w-full">
        {/* Top Mini Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-rose-500/30 text-xs text-rose-300 shadow-glow-sunset backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-semibold">AI-Powered Travel Planning</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Fast, easy & stress-free</span>
          </div>
        </div>

        {/* HERO SECTION: Catchy Headline on Left, Trip Preview Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Left Column: Catchy Punchline & Actions (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-slate-100 leading-[1.12]">
              Your AI trip planner with{' '}
              <span className="bg-gradient-to-r from-rose-400 via-peach-400 to-amber-300 bg-clip-text text-transparent">
                zero stress
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Get personalized daily plans, skip the crowds, and travel happily with your family — no messy spreadsheets.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => setCurrentScreen('intake')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full ios-btn-primary text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <span>Start Planning Free</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                type="button"
                onClick={() => setIsSavedTripsOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full ios-btn-secondary text-slate-200 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-peach-400" />
                <span>See Saved Trips</span>
              </button>
            </div>
          </div>

          {/* Right Column: iOS Frosted Glass Trip Preview Card (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="ios-card-elevated p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                  <span className="font-bold text-slate-200">Sample Trip: 4-Day Jaipur Heritage Expedition</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('studio')}
                  className="text-xs text-rose-400 font-semibold hover:underline flex items-center gap-1 active:scale-95"
                >
                  <span>View Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl ios-subcard space-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80"
                    alt="City Palace Jaipur"
                    className="w-full h-24 rounded-xl object-cover"
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-100 block">City Palace</span>
                    <span className="text-[10px] text-peach-400 font-medium">Day 1 • 12:15 PM</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl ios-subcard space-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1600100397608-f010f443b7d1?auto=format&fit=crop&w=400&q=80"
                    alt="Hawa Mahal"
                    className="w-full h-24 rounded-xl object-cover"
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-100 block">Hawa Mahal</span>
                    <span className="text-[10px] text-rose-400 font-medium">Day 1 • 03:30 PM</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl ios-subcard space-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80"
                    alt="Amer Fort"
                    className="w-full h-24 rounded-xl object-cover"
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-100 block">Amer Fort</span>
                    <span className="text-[10px] text-amber-400 font-medium">Day 2 • 09:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
