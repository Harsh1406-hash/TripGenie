import React, { useState, useEffect } from 'react';
import { useTrip } from '../../context/TripContext';
import { VectorMap } from '../common/VectorMap';
import {
  Navigation,
  HardDriveDownload,
  BellRing,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Pause,
  Play,
  Gauge,
  BatteryCharging,
  Eye,
  EyeOff,
  Map,
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

  const [countdownSeconds, setCountdownSeconds] = useState(888);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showLiveMap, setShowLiveMap] = useState(false);

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Travel Guide Active</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-0.5">
            On The Go Guide & Smart Alerts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time directions, sunset curfews, and automatic missed-stop rescheduling.
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full ios-subcard text-slate-300">
            <Gauge className="w-3.5 h-3.5 text-rose-400" />
            <span>Pace: Gentle (3.2 km/h)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full ios-subcard text-emerald-400">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span>Offline Ready</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Stop Card */}
          <div className="ios-card-elevated p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                Next En Route Stop
              </span>
              <span className="text-xs font-mono text-slate-400">Stop 5 of 6</span>
            </div>

            <div>
              <h2 className="font-display font-black text-2xl text-slate-100">
                Hawa Mahal (Palace of Winds)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Famous 953-window palace facade. Flat accessible viewpoint on ground floor.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl ios-subcard text-center">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Distance</span>
                <span className="font-bold text-sm text-rose-400 font-mono">2.4 km</span>
              </div>
              <div className="border-x border-white/[0.08]">
                <span className="text-[10px] text-slate-400 block uppercase">Drive Time</span>
                <span className="font-bold text-sm text-slate-100 font-mono">12 Mins</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Traffic</span>
                <span className="font-bold text-sm text-emerald-400">Light</span>
              </div>
            </div>

            {/* Quick Audio Tour Mini Player */}
            <div className="p-3.5 rounded-2xl ios-subcard flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsPlayingAudio(!isPlayingAudio);
                    showToast(
                      isPlayingAudio ? 'Audio paused' : 'Playing: 3-Min Jaipur Royal Story',
                      'info'
                    );
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-peach-500 text-white flex items-center justify-center hover:from-rose-400 hover:to-peach-400 transition-all flex-shrink-0 shadow-sm"
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">
                    🔊 3-Minute Story: Royal History of Hawa Mahal
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {isPlayingAudio ? 'Playing...' : 'Click to listen offline'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:block">Audio Ready</span>
            </div>

            {/* Check-In Button */}
            <button
              type="button"
              onClick={markCurrentStopVisited}
              className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isCurrentStopVisited
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-glow-emerald'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isCurrentStopVisited
                  ? 'Checked In! Next: Sunset at Nahargarh Fort'
                  : 'Mark as Visited & Checked In'}
              </span>
            </button>
          </div>

          {/* Simple Alarm Box */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <BellRing className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-amber-400">
                  Departure Alarm
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  Leave in {formatCountdown(countdownSeconds)}
                </span>
              </div>
              <h3 className="font-bold text-xs text-slate-100 mt-0.5">
                Leave in 15 minutes to reach Albert Hall Museum on schedule.
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Arriving by 04:30 PM avoids ticket lines before the evening rush.
              </p>
            </div>
          </div>

          {/* DUAL NAVIGATION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Primary: View in Google Maps button (prototype UI only - does nothing when clicked) */}
            <button
              type="button"
              onClick={() => {}}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-peach-500 hover:from-rose-400 hover:to-peach-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-sunset transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-white" />
              <span>🗺️ View in Google Maps</span>
            </button>

            {/* Secondary: Download Offline Day Package (prototype UI only - does nothing when clicked) */}
            <button
              type="button"
              onClick={() => {}}
              className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <HardDriveDownload className="w-4 h-4 text-peach-400" />
              <span>📥 Download Offline Package (.GPX)</span>
            </button>
          </div>

          {/* Adaptive Rescheduler Box */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <h3 className="font-display font-bold text-xs text-slate-100">
                  Smart Plan Rescheduler
                </h3>
              </div>
              <span className="text-[10px] text-slate-500">Auto-detects delays</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-800/40 space-y-2.5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-amber-300 block">
                    Missed Stop: Albert Hall Museum (by 4:30 PM)
                  </span>
                  Would you like to move this stop to tomorrow morning or drop it?
                </div>
              </div>

              {missedStopState.resolutionMessage && (
                <div className="p-2.5 rounded-lg bg-slate-900 border border-rose-500/40 text-xs text-rose-300">
                  {missedStopState.resolutionMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={rescheduleMissedStop}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    missedStopState.status === 'rescheduled'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {missedStopState.status === 'rescheduled'
                      ? '✓ Moved to Tomorrow Morning'
                      : '[Reschedule to Day 2 Morning]'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={dropMissedStop}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    missedStopState.status === 'dropped'
                      ? 'bg-slate-700 text-slate-200 font-bold'
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

        {/* Side Column: Map Toggle & Sunset Curfew (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="ios-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Live Route Map</span>
              <button
                onClick={() => setShowLiveMap(!showLiveMap)}
                className="text-xs text-rose-400 hover:underline flex items-center gap-1 active:scale-95"
              >
                {showLiveMap ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showLiveMap ? 'Hide' : 'Show Map'}</span>
              </button>
            </div>

            {showLiveMap ? (
              <div className="animate-fade-in">
                <VectorMap
                  stops={day1Plan.stops}
                  selectedStopId="stop-1-5"
                  activeLiveStopId="stop-1-5"
                  onSelectStop={() => {}}
                />
              </div>
            ) : (
              <div
                onClick={() => setShowLiveMap(true)}
                className="h-32 rounded-2xl ios-subcard cursor-pointer flex flex-col items-center justify-center text-center p-3 text-xs text-slate-400 transition-colors"
              >
                <Map className="w-6 h-6 text-rose-400 mb-1" />
                <span className="text-slate-200 font-semibold">Click to preview route map</span>
                <span className="text-[10px] text-slate-500">6 waypoints in Jaipur</span>
              </div>
            )}
          </div>

          {/* Evening Curfew Monitor */}
          <div className="ios-card p-5 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Evening 8:00 PM Curfew</span>
              <span className="text-amber-400 font-mono font-bold">2h 15m remaining</span>
            </div>
            <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/10">
              <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full w-[72%]"></div>
            </div>
            <p className="text-[11px] text-slate-400">
              We will remind you at 7:15 PM to head back from Nahargarh hilltop before dark.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
