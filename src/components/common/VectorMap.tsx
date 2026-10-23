import React, { useState } from 'react';
import { VenueStop } from '../../types/trip';
import {
  ZoomIn,
  ZoomOut,
  Footprints,
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
  const [mapLayer, setMapLayer] = useState<'sunset-vector' | 'step-free'>('sunset-vector');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filter out transit-only stops for primary numbered pins to keep pins clean
  const pinStops = stops.filter((s) => s.type !== 'transit');

  // Compute SVG polyline points connecting the venues in sequence
  const polylinePoints = stops
    .map((s) => `${s.mapCoords.x * 6 + 50},${s.mapCoords.y * 4 + 40}`)
    .join(' ');

  return (
    <div className="relative w-full h-[380px] lg:h-[440px] rounded-[26px] overflow-hidden border border-white/10 bg-[#0C0916]/80 backdrop-blur-xl flex flex-col shadow-inner">
      {/* Top Map HUD Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3.5 py-1.5 rounded-full ios-card text-xs flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span className="font-semibold text-white/90">Jaipur Heritage Vector Route</span>
            <span className="text-[10px] text-white/60 px-2 py-0.5 rounded-full bg-white/10">
              {stops.length} Stops
            </span>
          </div>

          {/* Layer switcher */}
          <div className="hidden sm:flex items-center gap-1 ios-pill-container p-1 rounded-full">
            <button
              onClick={() => setMapLayer('sunset-vector')}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                mapLayer === 'sunset-vector'
                  ? 'ios-pill-active text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sunset Vector
            </button>
            <button
              onClick={() => setMapLayer('step-free')}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
                mapLayer === 'step-free'
                  ? 'ios-pill-active text-white'
                  : 'text-white/60 hover:text-white'
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
            className="w-8 h-8 rounded-full ios-card text-white/70 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
            className="w-8 h-8 rounded-full ios-card text-white/70 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Vector Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center bg-[#0C0916]">
        <svg
          viewBox="0 0 700 480"
          className="w-full h-full transition-transform duration-300 select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Sunset glowing drop shadow */}
            <filter id="glow-sunset" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Sunset Dusk Route Gradient */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0.95" />
            </linearGradient>

            {/* Street Grid pattern */}
            <pattern id="streetGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(80, 60, 105, 0.25)"
                strokeWidth="1"
              />
              <circle cx="30" cy="30" r="1.5" fill="rgba(244, 63, 94, 0.15)" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#streetGrid)" />

          {/* Man Sagar Lake (Water Palace Area) */}
          <path
            d="M 380 90 Q 430 70 480 100 T 520 140 T 460 170 T 400 130 Z"
            fill="rgba(251, 146, 60, 0.1)"
            stroke="rgba(251, 146, 60, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text x="430" y="125" fill="#FB923C" fontSize="11" opacity="0.75" fontWeight="600">
            Man Sagar Lake
          </text>

          {/* Old Walled Pink City Perimeter */}
          <rect
            x="320"
            y="190"
            width="220"
            height="180"
            rx="16"
            fill="rgba(244, 63, 94, 0.06)"
            stroke="rgba(244, 63, 94, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text x="330" y="210" fill="#FB7185" fontSize="10" opacity="0.85" fontWeight="bold">
            Pink City Heritage Walled Zone
          </text>

          {/* Aravalli Hill Ridge Shading */}
          <path
            d="M 240 50 Q 320 20 420 35 T 560 30 T 660 60"
            fill="none"
            stroke="rgba(251, 191, 36, 0.25)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text x="330" y="32" fill="#FCD34D" fontSize="9" opacity="0.65">
            ▲ Aravalli Ridge (Nahargarh Sunset Point)
          </text>

          {/* Major Connecting Arterial Highways */}
          <path
            d="M 80 250 L 320 250 L 410 200 L 460 70"
            fill="none"
            stroke="rgba(120, 100, 140, 0.35)"
            strokeWidth="4"
          />
          <path
            d="M 330 250 L 330 440"
            fill="none"
            stroke="rgba(120, 100, 140, 0.35)"
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
            className="filter drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]"
          />

          {/* Direction pulse flow along polyline */}
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
                    fill={isSelected ? 'rgba(244, 63, 94, 0.25)' : 'rgba(251, 146, 60, 0.2)'}
                    className="animate-ping"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  r={isSelected ? '16' : '13'}
                  fill="#0C0916"
                  stroke={
                    isSelected
                      ? '#FB7185'
                      : isVisited
                      ? '#34D399'
                      : stop.alert
                      ? '#FB923C'
                      : '#6B5B7E'
                  }
                  strokeWidth={isSelected ? '3' : '2'}
                  filter={isSelected ? 'url(#glow-sunset)' : undefined}
                />

                {/* Pin Inner Label / Number */}
                <text
                  textAnchor="middle"
                  dy="4.5"
                  fill={isSelected ? '#FB7185' : isVisited ? '#34D399' : '#F8FAFC'}
                  fontSize={isSelected ? '12' : '10'}
                  fontWeight="bold"
                >
                  {index + 1}
                </text>

                {/* Selected Floating Label */}
                {isSelected && (
                  <g transform="translate(0, -32)">
                    <rect
                      x="-85"
                      y="-26"
                      width="170"
                      height="26"
                      rx="8"
                      fill="#171224"
                      stroke="#FB7185"
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
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-400 bg-[#141021]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#2B233C]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Selected Stop
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Visited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Sunset Alert
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-slate-300">
            <Footprints className="w-3.5 h-3.5 text-rose-400" />
            <span>Gentle level paths for seniors</span>
          </div>
        </div>
      </div>
    </div>
  );
};
