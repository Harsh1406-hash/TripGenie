import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { GroupMode, TripModality } from '../../types/trip';
import {
  MapPin,
  Calendar,
  Wallet,
  UploadCloud,
  FileCheck2,
  Trash2,
  Plus,
  Users,
  ShieldAlert,
  ShieldCheck,
  Briefcase,
  Coffee,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Check,
  ExternalLink,
  Laptop,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export const IntakeScreen: React.FC = () => {
  const {
    tripParams,
    updateTripParams,
    travelers,
    setGroupMode,
    setModality,
    toggleTravelerTag,
    ocrChips,
    simulateAddOcrChip,
    removeOcrChip,
    setCurrentScreen,
    showToast,
  } = useTrip();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const groupModes: GroupMode[] = ['Solo', 'Couple', 'Family', 'Friends'];

  const handleGenerate = () => {
    setIsGenerating(true);
    showToast('AI Autonomous Engine: Calculating zero-backtracking TSP route matrix...', 'info');

    setTimeout(() => {
      setIsGenerating(false);
      setCurrentScreen('studio');
      showToast('Itinerary Generated! Opened in Review Studio canvas.', 'success');
    }, 1100);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold tracking-wide uppercase">
            <span>Stage 1</span>
            <span>•</span>
            <span>Trip Parameters & Vulnerability Profiling</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-1">
            Intake & Autonomous Route Calibration
          </h1>
        </div>

        {/* Stepper Navigation Pills */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 1
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>1. Logistics</span>
          </button>
          <span className="text-slate-600 px-1">➔</span>
          <button
            onClick={() => setActiveStep(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 2
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>2. Travelers</span>
          </button>
          <span className="text-slate-600 px-1">➔</span>
          <button
            onClick={() => setActiveStep(3)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 3
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>3. Work & Mode</span>
          </button>
        </div>
      </div>

      {/* STEP 1: DESTINATION & BOOKINGS */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-100">
                  Step 1: Destination, Dates & Document OCR Dropzone
                </h2>
                <p className="text-xs text-slate-400">
                  Specify core travel anchors or ingest booking confirmations automatically
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Destination Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Target Destination
                </label>
                <input
                  type="text"
                  value={tripParams.destination}
                  onChange={(e) => updateTripParams({ destination: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-medium focus:outline-none transition-colors"
                />
              </div>

              {/* Date Range Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Date Range & Duration
                </label>
                <input
                  type="text"
                  value={`${tripParams.dates} • ${tripParams.durationDays} Days`}
                  onChange={(e) => updateTripParams({ dates: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-medium focus:outline-none transition-colors"
                />
              </div>

              {/* Budget Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                    Target Budget
                  </span>
                  <span className="font-bold text-emerald-400 font-mono">
                    ₹{tripParams.budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="100000"
                  step="2500"
                  value={tripParams.budget}
                  onChange={(e) => updateTripParams({ budget: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Min ₹15,000</span>
                  <span>Est: Stay ₹18k • Transit ₹5k • Dining ₹7k</span>
                  <span>Max ₹1,00,000</span>
                </div>
              </div>
            </div>

            {/* Dashed-border Document Dropzone with Simulated OCR Chips */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">
                    Document OCR Dropzone (Flight / Hotel / Tickets)
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Anchors timetable automatically from PDF boarding passes and booking confirmations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={simulateAddOcrChip}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Upload Test Voucher</span>
                </button>
              </div>

              {/* Dropzone Container */}
              <div className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-5 bg-slate-950/50 transition-colors">
                <div className="flex flex-col items-center justify-center text-center py-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-2">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Drag and drop booking PDFs, Indigo passes, or MakeMyTrip invoices here
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Simulated client-side OCR engine parses arrival slots and hotel coordinates
                  </p>
                </div>

                {/* Extracted Chips Display */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Active Extracted OCR Anchors ({ocrChips.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ocrChips.map((chip) => (
                      <div
                        key={chip.id}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 group hover:border-cyan-500/40 transition-all"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-xl p-1 bg-slate-950 rounded-lg border border-slate-800">
                            {chip.icon}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-bold text-slate-100">{chip.title}</h4>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{chip.subtitle}</p>
                            <span className="text-[10px] font-mono text-cyan-400/90 block mt-1">
                              {chip.rawText}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeOcrChip(chip.id)}
                          className="opacity-60 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity p-1"
                          title="Remove Anchor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* External Referral Row */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Need to book missing legs? Open integrated portals:
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.makemytrip.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <span>MakeMyTrip</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
                <a
                  href="https://www.google.com/travel/flights"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Google Flights</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
                <a
                  href="https://www.booking.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>Booking.com</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Action */}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow-cyan transition-all"
            >
              <span>Proceed to Travelers & Vulnerability Profiler</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TRAVELERS & VULNERABILITY PROFILER */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-100">
                  Step 2: Traveler Dynamics & Vulnerability Profiler
                </h2>
                <p className="text-xs text-slate-400">
                  Algorithmic demographic auditing ensures safety curfews and step-free accessibility
                </p>
              </div>
            </div>

            {/* Toggle Chips: Solo, Couple, Family, Friends */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Trip Dynamic Profile:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {groupModes.map((mode) => {
                  const isSelected = tripParams.groupType === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setGroupMode(mode)}
                      className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-200 shadow-glow-cyan'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <span>{mode}</span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Member Cards Display */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  Registered Travel Roster ({travelers.length})
                </span>
                <span className="text-[11px] text-slate-500">
                  Click tags to toggle preferences live
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {travelers.map((traveler) => (
                  <div
                    key={traveler.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <img
                          src={traveler.avatar}
                          alt={traveler.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-100">{traveler.name}</h4>
                          <p className="text-xs text-slate-400">
                            {traveler.age} yrs • {traveler.gender}
                          </p>
                          <span className="text-[10px] font-semibold text-cyan-400 block mt-0.5">
                            {traveler.role}
                          </span>
                        </div>
                      </div>

                      {/* Tag Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {traveler.tags.map((tag, idx) => (
                          <button
                            key={idx}
                            onClick={() => toggleTravelerTag(traveler.id, tag)}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-cyan-800/60 text-cyan-300 hover:bg-cyan-950 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      {traveler.medicalNote && (
                        <p className="text-[11px] text-amber-300/90 bg-amber-950/30 p-2 rounded-lg border border-amber-900/40 mt-2.5">
                          ⚠️ {traveler.medicalNote}
                        </p>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                      Emergency: {traveler.emergencyContact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prominent Safety & Accessibility Alert Shield */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-cyan-950/40 border border-emerald-500/40 space-y-3 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-emerald-300">
                    High-Safety & Step-Free Filter Active: Night curfew set to 8:00 PM; steep staircases pruned
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    AI Autonomous Engine has audited the itinerary for Senior Member (Dadi, 68). Steep ascent stairs at Amer Fort and Nahargarh parapets have been automatically substituted with vehicular and step-free ramp routes.
                  </p>
                </div>
              </div>

              {/* Interactive Switches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer">
                  <span className="text-xs font-medium text-slate-200">
                    Strict Step-Free Route Optimization
                  </span>
                  <input
                    type="checkbox"
                    checked={tripParams.stepFreeFilter}
                    onChange={(e) => updateTripParams({ stepFreeFilter: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer">
                  <span className="text-xs font-medium text-slate-200">
                    Enforce 8:00 PM Demographic Curfew
                  </span>
                  <input
                    type="checkbox"
                    checked={tripParams.curfewEnabled}
                    onChange={(e) => updateTripParams({ curfewEnabled: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Logistics</span>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow-cyan transition-all"
            >
              <span>Proceed to Trip Modality</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: WORK & MODALITY */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-100">
                  Step 3: Trip Modality & Workation Time-Blocker
                </h2>
                <p className="text-xs text-slate-400">
                  Balance leisure sightseeing with remote work schedules and high-speed Wi-Fi windows
                </p>
              </div>
            </div>

            {/* Modality Toggle */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300">Select Operating Modality:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setModality('casual')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    tripParams.modality === 'casual'
                      ? 'bg-cyan-500/15 border-cyan-500/60 shadow-glow-cyan'
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                      <Coffee className="w-4 h-4" />
                      <span>Casual / Leisure</span>
                    </div>
                    {tripParams.modality === 'casual' && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Full-day unhurried cultural immersion with generous lunch and rest breaks.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('workation')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    tripParams.modality === 'workation'
                      ? 'bg-indigo-500/20 border-indigo-500/60 shadow-glow-cyan'
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                      <Laptop className="w-4 h-4" />
                      <span>Professional / Workation</span>
                    </div>
                    {tripParams.modality === 'workation' && (
                      <Check className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Locks core office hours into hotel/coworking blocks. Sightseeing scheduled strictly before 10 AM & after 3:30 PM.
                  </p>
                </button>
              </div>
            </div>

            {/* Interactive Visual Time-Blocker Bar (shown when Workation is selected) */}
            {tripParams.modality === 'workation' ? (
              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-800/60 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>
                      Locked Work Hours: 10:00 AM – 3:30 PM (Sightseeing scheduled exclusively in morning & evening windows)
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-200 border border-indigo-700 font-mono">
                    5.5 Hrs Locked
                  </span>
                </div>

                {/* 24-Hour Visual Schedule Bar */}
                <div className="space-y-1.5">
                  <div className="h-10 w-full rounded-xl bg-slate-950 border border-slate-800 flex overflow-hidden text-[11px] font-semibold">
                    {/* Morning Window (08:00 - 10:00) */}
                    <div className="w-[18%] bg-cyan-500/25 border-r border-slate-800 flex items-center justify-center text-cyan-300 p-1 text-center">
                      <span className="truncate">08:00-10:00 Morning Tour</span>
                    </div>

                    {/* Locked Work Block (10:00 - 15:30) */}
                    <div className="w-[45%] bg-gradient-to-r from-indigo-600/50 to-purple-600/50 border-r border-slate-800 flex items-center justify-center text-indigo-100 p-1 text-center font-bold relative">
                      <span className="truncate">🔒 10:00 AM – 3:30 PM Remote Work (High-Speed WiFi)</span>
                    </div>

                    {/* Evening Window (15:30 - 20:00) */}
                    <div className="w-[37%] bg-amber-500/25 flex items-center justify-center text-amber-300 p-1 text-center">
                      <span className="truncate">15:30-20:00 Sunset & Dinner</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 px-1 font-mono">
                    <span>08:00 AM</span>
                    <span>10:00 AM</span>
                    <span>01:00 PM (Lunch Break)</span>
                    <span>03:30 PM</span>
                    <span>08:00 PM (Curfew)</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  💡 All Day 1 through Day 4 itineraries will auto-route to ITC Rajputana Business Center during this window with desk power reservations.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                <Coffee className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>
                  Casual Leisure profile active: sightseeing windows span 09:30 AM to 07:30 PM with afternoon rests.
                </span>
              </div>
            )}
          </div>

          {/* Bottom Action: Generate Optimized Itinerary */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Travelers</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-sm flex items-center gap-3 shadow-glow-cyan transition-all transform hover:scale-105 active:scale-95"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Synthesizing TSP Route Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Generate Optimized Itinerary</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
