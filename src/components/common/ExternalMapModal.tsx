import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Navigation2,
  CornerUpRight,
  Car,
  Clock,
  Compass,
  MapPin,
} from 'lucide-react';

export const ExternalMapModal: React.FC = () => {
  const { isExternalMapOpen, setIsExternalMapOpen, showToast } = useTrip();
  const [copied, setCopied] = React.useState(false);

  if (!isExternalMapOpen) return null;

  const handleCopyCoords = () => {
    setCopied(true);
    navigator.clipboard?.writeText?.('26.9239, 75.8267');
    showToast('GPS coordinates copied: 26.9239, 75.8267', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl ios-card-elevated rounded-[28px] overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <Navigation2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Live Google Maps Route
              </h3>
              <p className="text-xs text-white/50">Turn-by-turn route to Hawa Mahal</p>
            </div>
          </div>
          <button
            onClick={() => setIsExternalMapOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real Embedded Google Map */}
        <div className="relative w-full h-64 sm:h-72 bg-black/50 border-b border-white/10">
          <iframe
            title="Google Map Route to Hawa Mahal"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?q=Hawa+Mahal,+Jaipur,+Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-[88%]"
          ></iframe>

          {/* Quick HUD badge over map */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full ios-card text-xs flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white/90">Destination: Hawa Mahal</span>
          </div>
        </div>

        {/* Turn-by-Turn Guidance & Info */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto">
          {/* Destination Details */}
          <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl ios-subcard">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-rose-300 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Next Stop</span>
              </div>
              <h4 className="font-bold text-sm text-white mt-0.5">
                Hawa Mahal (Palace of Winds)
              </h4>
              <p className="text-xs text-white/60">
                Badi Choupad, Pink City, Jaipur (2.4 km away • 12 mins drive)
              </p>
            </div>
            <button
              onClick={handleCopyCoords}
              className="px-3 py-1.5 ios-btn-secondary text-xs flex items-center gap-1.5 flex-shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy GPS'}</span>
            </button>
          </div>

          {/* Next Turn Maneuver */}
          <div className="p-3.5 rounded-2xl ios-subcard flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-peach-500/20 border border-peach-500/30 text-peach-300 flex items-center justify-center flex-shrink-0">
              <CornerUpRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                In 350m, Turn Right onto Johari Bazaar Road
              </p>
              <p className="text-[11px] text-white/50">
                Designated parking and flat ramp access 80m ahead near Sireh Deori Gate.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/50 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-rose-300" />
            <span>Optimal zero-backtracking route</span>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsExternalMapOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2 ios-btn-secondary text-xs font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {}}
              className="flex-1 sm:flex-none px-4 py-2 ios-btn-primary text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
