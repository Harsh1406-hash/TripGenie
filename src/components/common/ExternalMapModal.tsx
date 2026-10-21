import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Navigation2,
  CornerUpRight,
  ShieldAlert,
  Car,
  Clock,
  Compass,
} from 'lucide-react';

export const ExternalMapModal: React.FC = () => {
  const { isExternalMapOpen, setIsExternalMapOpen, showToast } = useTrip();
  const [copied, setCopied] = React.useState(false);

  if (!isExternalMapOpen) return null;

  const handleCopyCoords = () => {
    setCopied(true);
    navigator.clipboard?.writeText?.('26.9239° N, 75.8267° E (Hawa Mahal, Jaipur)');
    showToast('GPS coordinates copied to clipboard: 26.9239° N, 75.8267° E', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Navigation2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-100">
                Google Maps GPS Turn-by-Turn Telemetry
              </h3>
              <p className="text-xs text-slate-400">Synchronized with TripGenie Route Anchor Engine</p>
            </div>
          </div>
          <button
            onClick={() => setIsExternalMapOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Destination Target
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                Fastest Level Route
              </span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-100">Hawa Mahal (Palace of Winds)</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002
                </p>
              </div>
              <button
                onClick={handleCopyCoords}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy GPS'}</span>
              </button>
            </div>
          </div>

          {/* Turn Guidance Simulation */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300">Next Maneuver Guidance:</span>
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                <CornerUpRight className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-200">
                  In 350m, Turn Right onto Johari Bazaar Road
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Ramp access parking is available 80m ahead near Sireh Deori Gate.
                </p>
              </div>
            </div>
          </div>

          {/* Safety & Transit Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Estimated ETA</span>
                <span className="font-semibold text-slate-200">12 Mins • 2.4 km</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
              <Car className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Traffic Status</span>
                <span className="font-semibold text-emerald-400">Light Green Flow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Zero-backtracking route calibrated
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsExternalMapOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-all"
            >
              Close
            </button>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hawa+Mahal+Jaipur"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                showToast('Launching Google Maps turn-by-turn navigation...', 'info');
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-glow-cyan transition-all"
            >
              <span>Open in App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
