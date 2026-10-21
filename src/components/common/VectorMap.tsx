import React, { useState } from 'react';
import { VenueStop } from '../../types/trip';
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Navigation,
  Shield,
  Clock,
  Car,
  Footprints,
  Eye,
} from 'lucide-react';

interface VectorMapProps {
  stops: VenueStop[];
  selectedStopId: string | null;
  onSelectStop: (stopId: string) => void;
  activeLiveStopId?: string;
}

export const VectorMap: React.FC<VectorMapProps> = ({
  stops,
  selectedStopId,
  onSelectStop,
  activeLiveStopId,
}) => {
  const [mapLayer, setMapLayer] = useState<'dark-vector' | 'satellite-dark' | 'step-free'>('dark-vector');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filter out transit-only stops for primary numbered pins to keep pins clean
  const pinStops = stops.filter((s) => s.type !== 'transit');

  // Compute SVG polyline points connecting the venues in sequence
  const polylinePoints = stops
    .map((s) => `${s.mapCoords.x * 6 + 50},${s.mapCoords.y * 4 + 40}`)
    .join(' ');

  return (
    <div className="relative w-full h-[380px] lg:h-[460px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col shadow-inner">
      {/* Top Map HUD Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-lg flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-semibold text-slate-200">Jaipur Route Vector</span>
            <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
              {stops.length} Waypoints
            </span>
          </div>

          {/* Layer switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMapLayer('dark-vector')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                mapLayer === 'dark-vector'
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dark Vector
            </button>
            <button
              onClick={() => setMapLayer('step-free')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                mapLayer === 'step-free'
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Step-Free Gradient
            </button>
          </div>
        </div>

        {/* Map Zoom Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-md"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-md"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Vector Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center bg-slate-950">
        <svg
          viewBox="0 0 700 480"
          className="w-full h-full transition-transform duration-300 select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Cyan glowing drop shadow */}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Linear gradient for connecting route line */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
            </linearGradient>

            {/* Pattern for city street blocks */}
            <pattern id="streetGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(51, 65, 85, 0.25)"
                strokeWidth="1"
              />
              <circle cx="30" cy="30" r="1.5" fill="rgba(56, 189, 248, 0.15)" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#streetGrid)" />

          {/* Stylized Jaipur Landmarks & Water Bodies */}
          {/* Man Sagar Lake (Water Palace Area) */}
          <path
            d="M 380 90 Q 430 70 480 100 T 520 140 T 460 170 T 400 130 Z"
            fill="rgba(14, 165, 233, 0.12)"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text x="430" y="125" fill="#38bdf8" fontSize="11" opacity="0.7" fontWeight="600">
            Man Sagar Lake
          </text>

          {/* Old Walled Pink City Perimeter (Square boundary) */}
          <rect
            x="320"
            y="190"
            width="220"
            height="180"
            rx="12"
            fill="rgba(244, 63, 94, 0.05)"
            stroke="rgba(244, 63, 94, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text x="330" y="210" fill="#f43f5e" fontSize="10" opacity="0.8" fontWeight="bold">
            Pink City Heritage Walled Zone
          </text>

          {/* Aravalli Hill Ridge Shading (Northern Hills) */}
          <path
            d="M 240 50 Q 320 20 420 35 T 560 30 T 660 60"
            fill="none"
            stroke="rgba(245, 158, 11, 0.25)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text x="330" y="32" fill="#fbbf24" fontSize="9" opacity="0.6">
            ▲ Aravalli Ridge (Nahargarh & Jaigarh Escarpment)
          </text>

          {/* Major Connecting Arterial Highways (MI Road / Amer Rd / JLN Marg) */}
          <path
            d="M 80 250 L 320 250 L 410 200 L 460 70"
            fill="none"
            stroke="rgba(100, 116, 139, 0.35)"
            strokeWidth="4"
          />
          <path
            d="M 330 250 L 330 440"
            fill="none"
            stroke="rgba(100, 116, 139, 0.35)"
            strokeWidth="3.5"
          />

          {/* Optimized Connected Route Polyline */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={mapLayer === 'step-free' ? '8 4' : 'none'}
            className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
          />

          {/* Animated direction flow indicator along polyline */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="8 40"
            opacity="0.8"
            className="animate-pulse"
          />

          {/* Interactive Waypoint Pins */}
          {pinStops.map((stop, index) => {
            const posX = stop.mapCoords.x * 6 + 50;
            const posY = stop.mapCoords.y * 4 + 40;
            const isSelected = selectedStopId === stop.id;
            const isLiveActive = activeLiveStopId === stop.id;
            const isVisited = stop.visited;

            return (
              <g
                key={stop.id}
                transform={`translate(${posX}, ${posY})`}
                className="cursor-pointer transition-transform duration-200 hover:scale-125"
                onClick={() => onSelectStop(stop.id)}
              >
                {/* Active Live Pulse Wave */}
                {(isLiveActive || isSelected) && (
                  <circle
                    r="24"
                    fill={isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(16, 185, 129, 0.2)'}
                    className="animate-ping"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  r={isSelected ? '16' : '13'}
                  fill="#020617"
                  stroke={
                    isSelected
                      ? '#38BDF8'
                      : isVisited
                      ? '#10B981'
                      : stop.alert
                      ? '#F59E0B'
                      : '#64748B'
                  }
                  strokeWidth={isSelected ? '3' : '2'}
                  filter={isSelected ? 'url(#glow-cyan)' : undefined}
                />

                {/* Pin Inner Label / Number */}
                <text
                  textAnchor="middle"
                  dy="4.5"
                  fill={isSelected ? '#38BDF8' : isVisited ? '#10B981' : '#F8FAFC'}
                  fontSize={isSelected ? '12' : '10'}
                  fontWeight="bold"
                >
                  {index + 1}
                </text>

                {/* Hover / Selected Floating Card */}
                {isSelected && (
                  <g transform="translate(0, -32)">
                    <rect
                      x="-85"
                      y="-26"
                      width="170"
                      height="26"
                      rx="6"
                      fill="#0f172a"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      className="shadow-2xl"
                    />
                    <text
                      x="0"
                      y="-9"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {stop.title.length > 24 ? stop.title.slice(0, 24) + '...' : stop.title}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Bottom Legend Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Selected Stop
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Completed / Checked-in
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Curfew Monitored
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-slate-300">
            <Footprints className="w-3.5 h-3.5 text-cyan-400" />
            <span>Step-free path calibrated for wheelchair</span>
          </div>
        </div>
      </div>
    </div>
  );
};
