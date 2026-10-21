import React from 'react';
import { useTrip } from '../../context/TripContext';
import { ShieldCheck, Compass, HardDriveDownload, Cpu, Radio, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentScreen } = useTrip();

  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-16 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-200">TripGenie Autonomous Planner</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px]">
                Active Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Client-side autonomous travel agent with demographically adaptive safety & offline navigation.
            </p>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase RLS Auth Guard</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
            <HardDriveDownload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero-Data GPX Cache</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>Curfew 8:00 PM Active</span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex items-center gap-4 text-slate-400">
          <button onClick={() => setCurrentScreen('landing')} className="hover:text-cyan-400 transition-colors">
            Overview
          </button>
          <button onClick={() => setCurrentScreen('intake')} className="hover:text-cyan-400 transition-colors">
            Intake
          </button>
          <button onClick={() => setCurrentScreen('studio')} className="hover:text-cyan-400 transition-colors">
            Studio
          </button>
          <button onClick={() => setCurrentScreen('live')} className="hover:text-cyan-400 transition-colors">
            Live Nav
          </button>
          <button onClick={() => setCurrentScreen('dossier')} className="hover:text-cyan-400 transition-colors">
            Dossier
          </button>
        </div>
      </div>
    </footer>
  );
};
