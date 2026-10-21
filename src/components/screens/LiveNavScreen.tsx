import React, { useState, useEffect } from 'react';
import { useTrip } from '../../context/TripContext';
import { VectorMap } from '../common/VectorMap';
import {
  Navigation,
  HardDriveDownload,
  BellRing,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Volume2,
  Pause,
  Play,
  ShieldCheck,
  Footprints,
  Radio,
  ExternalLink,
  ChevronRight,
  BatteryCharging,
  Gauge,
} from 'lucide-react';

export const LiveNavScreen: React.FC = () => {
  const {
    dayPlans,
    setIsExternalMapOpen,
    setIsOfflineDownloadOpen,
    isCurrentStopVisited,
    markCurrentStopVisited,
    missedStopState,
    rescheduleMissedStop,
    dropMissedStop,
    showToast,
  } = useTrip();

  // Simulated countdown for alarm: 14 mins 48 secs
  const [countdownSeconds, setCountdownSeconds] = useState(888);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const day1Plan = dayPlans[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Live Nav Top Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live GPS Field Telemetry Active</span>
            <span>•</span>
            <span>Zero-Data Mode</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-0.5">
            Real-Time Navigation & Adaptive Rescheduler
          </h1>
        </div>

        {/* Live Device Hardware Telemetry Chips */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pace: 3.2 km/h (Gentle)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span>Battery: 92% (Low Drain)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ACTIVE VENUE, PROACTIVE ALARM & RESCHEDULER (7 COLS) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Venue Card: Current En Route Stop */}
          <div className="glass-panel-elevated p-6 rounded-2xl border-cyan-500/50 shadow-glow-cyan space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                Current En Route Stop
              </span>
              <span className="text-xs font-mono text-slate-400">Day 1 • Stop 5 of 6</span>
            </div>

            <div>
              <h2 className="font-display font-black text-2xl text-slate-100">
                Hawa Mahal (Palace of Winds)
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                953 intricately carved jharokhas with natural air-conditioning effect. Designated accessible photo terrace assigned on ground pavilion.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Transit Distance</span>
                <span className="font-bold text-sm text-cyan-400 font-mono">2.4 km</span>
              </div>
              <div className="border-x border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Estimated ETA</span>
                <span className="font-bold text-sm text-slate-100 font-mono">12 Mins</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Road Congestion</span>
                <span className="font-bold text-sm text-emerald-400">Light Green</span>
              </div>
            </div>

            {/* Simulated Audio Tour Player for Hawa Mahal */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsPlayingAudio(!isPlayingAudio);
                    showToast(
                      isPlayingAudio
                        ? 'Audio guide paused'
                        : 'Playing cached audio: "Jaipur Royal Courtyards Commentary"',
                      'info'
                    );
                  }}
                  className="w-9 h-9 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center hover:bg-cyan-400 transition-all flex-shrink-0"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">
                    🔊 Jaipur Royal Courtyards Commentary (03:45 mins)
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    {isPlayingAudio ? 'Streaming offline audio cache...' : 'Click play for offline audio guide'}
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-400 hidden sm:block">
                MP3 Pre-cached
              </span>
            </div>

            {/* Mark as Visited Check-in Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={markCurrentStopVisited}
                className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isCurrentStopVisited
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-glow-emerald'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isCurrentStopVisited
                    ? 'Stop Checked In! Advancing to Sunset at Nahargarh Fort'
                    : 'Mark as Visited & Checked In'}
                </span>
              </button>
            </div>
          </div>

          {/* Proactive Alarm Card: Departure Alert */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-slate-900/90 border border-amber-500/40 space-y-3 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <BellRing className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                      Proactive AI Alarm
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      T-minus {formatCountdown(countdownSeconds)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-100 mt-1">
                    🔔 Departure Alert: Leave in 15 minutes to reach Albert Hall Museum on schedule.
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Calculating city traffic buffer on Sireh Deori Bazar. Leaving by 04:15 PM preserves daytime lighting for outdoor photography before museum ticket counter closes at 05:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL NAVIGATION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Primary: Open Turn-by-Turn Route in Google Maps */}
            <button
              onClick={() => setIsExternalMapOpen(true)}
              className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2.5 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
            >
              <Navigation className="w-4 h-4 text-slate-950" />
              <span>🗺️ Open Turn-by-Turn Route in Google Maps</span>
            </button>

            {/* Secondary: Download Offline Day Package (.GPX / .KML) */}
            <button
              onClick={() => setIsOfflineDownloadOpen(true)}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md"
            >
              <HardDriveDownload className="w-4 h-4 text-cyan-400" />
              <span>📥 Download Offline Day Package (.GPX / .KML)</span>
            </button>
          </div>

          {/* DYNAMIC RESCHEDULER SIMULATION SECTION */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <h3 className="font-display font-bold text-sm text-slate-100">
                  Adaptive AI Rescheduler Simulation
                </h3>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">Autonomous Recalibration</span>
            </div>

            {/* Interactive Missed Stop Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-700/50 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-300 block">
                    ⚠️ Missed Check-in Detected: You did not check in at Albert Hall Museum by 4:30 PM. Would you like to drop this stop or reschedule it to tomorrow morning?
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    AI Agent detected GPS location remained at LMB Lunch Stop past projected departure slot.
                  </p>
                </div>
              </div>

              {/* Resolution Message after Click */}
              {missedStopState.resolutionMessage && (
                <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-xs font-medium text-cyan-300 animate-fade-in">
                  {missedStopState.resolutionMessage}
                </div>
              )}

              {/* Two Clickable Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={rescheduleMissedStop}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    missedStopState.status === 'rescheduled'
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald font-bold'
                      : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {missedStopState.status === 'rescheduled'
                      ? '✓ Rescheduled to Day 2 Morning'
                      : '[Reschedule to Day 2 Morning]'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={dropMissedStop}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    missedStopState.status === 'dropped'
                      ? 'bg-slate-700 text-slate-300 font-bold'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                  }`}
                >
                  <span>
                    {missedStopState.status === 'dropped' ? '✓ Dropped from Route' : '[Drop from Route]'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME VECTOR MAP & SAFETY CURFEW TELEMETRY (5 COLS) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                Live En Route GPS Visualizer
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live Lock
              </span>
            </div>

            <VectorMap
              stops={day1Plan.stops}
              selectedStopId="stop-1-5"
              activeLiveStopId="stop-1-5"
              onSelectStop={(id) => {
                showToast(`Waypoint telemetry selected: ${id}`, 'info');
              }}
            />
          </div>

          {/* Sunset Curfew Telemetry Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-400" />
                Demographic Safety Curfew Monitor
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                8:00 PM Hard Limit
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Sunset Window: 05:30 PM</span>
                <span className="text-amber-400 font-mono font-bold">2h 15m remaining</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-full w-[72%]"></div>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                AI Agent will trigger a pre-curfew notification at 07:15 PM to initiate vehicular descent from Nahargarh hilltop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
