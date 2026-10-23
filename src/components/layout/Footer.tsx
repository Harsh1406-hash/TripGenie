import React from 'react';
import { useTrip } from '../../context/TripContext';
import { Compass, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentScreen } = useTrip();

  return (
    <footer className="border-t border-white/[0.08] bg-[#0c0916]/60 backdrop-blur-3xl text-slate-400 text-xs py-6 px-4 sm:px-6 lg:px-8 mt-12 no-print relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Simple Brand Punch Line */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-rose-400 shadow-sm">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-200">
            TripGenie — AI travel planning made simple & stress-free.
          </span>
        </div>

        {/* Clean Nav Links */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <button onClick={() => setCurrentScreen('landing')} className="hover:text-white transition-colors">
            Home
          </button>
          <button onClick={() => setCurrentScreen('intake')} className="hover:text-white transition-colors">
            Plan Trip
          </button>
          <button onClick={() => setCurrentScreen('studio')} className="hover:text-white transition-colors">
            Schedule
          </button>
          <button onClick={() => setCurrentScreen('live')} className="hover:text-white transition-colors">
            Live Guide
          </button>
          <button onClick={() => setCurrentScreen('dossier')} className="hover:text-white transition-colors">
            Travel Pass
          </button>
        </div>
      </div>
    </footer>
  );
};
