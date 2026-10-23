import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { GroupMode, TripModality } from '../../types/trip';
import {
  MapPin,
  Calendar,
  Wallet,
  UploadCloud,
  Trash2,
  Plus,
  Users,
  ShieldAlert,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Coffee,
  Laptop,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const IntakeScreen: React.FC = () => {
  const {
    tripParams,
    updateTripParams,
    travelers,
    setGroupMode,
    setModality,
    toggleTravelerTag,
    addMustVisitPlace,
    removeMustVisitPlace,
    ocrChips,
    simulateAddOcrChip,
    removeOcrChip,
    setCurrentScreen,
    showToast,
  } = useTrip();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newPlaceInput, setNewPlaceInput] = useState('');

  const groupModes: GroupMode[] = ['Solo', 'Couple', 'Family', 'Friends'];

  const handleAddCustomPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaceInput.trim()) return;
    addMustVisitPlace(newPlaceInput.trim());
    setNewPlaceInput('');
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    showToast('AI is putting together your perfect schedule...', 'info');

    setTimeout(() => {
      setIsGenerating(false);
      setCurrentScreen('studio');
      showToast('Your trip schedule is ready! Check it out below.', 'success');
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-rose-400 font-semibold tracking-wide uppercase">
            Step by Step Setup
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-1">
            Plan Your Trip
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill in a few details and we will build your customized daily itinerary.
          </p>
        </div>

        {/* Friendly Stepper - iOS Segmented Pill Control */}
        <div className="flex items-center ios-pill-container self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveStep(1)}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeStep === 1
                ? 'ios-pill-active text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Where & When
          </button>
          <span className="text-white/20 px-1">›</span>
          <button
            onClick={() => setActiveStep(2)}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeStep === 2
                ? 'ios-pill-active text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Who is Going
          </button>
          <span className="text-white/20 px-1">›</span>
          <button
            onClick={() => setActiveStep(3)}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeStep === 3
                ? 'ios-pill-active text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Must-Visit Spots
          </button>
        </div>
      </div>

      {/* STEP 1: WHERE & WHEN */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-100">
                  Where are you heading?
                </h2>
                <p className="text-xs text-slate-400">
                  Pick your destination and drop any existing ticket/hotel confirmations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Destination */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  City / Destination
                </label>
                <input
                  type="text"
                  value={tripParams.destination}
                  onChange={(e) => updateTripParams({ destination: e.target.value })}
                  placeholder="e.g. Jaipur, Rajasthan"
                  className="w-full ios-input px-3.5 py-2.5 text-xs text-slate-100 font-medium"
                />
              </div>

              {/* Date Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-peach-400" />
                  Travel Dates
                </label>
                <input
                  type="text"
                  value={`${tripParams.dates} • ${tripParams.durationDays} Days`}
                  onChange={(e) => updateTripParams({ dates: e.target.value })}
                  className="w-full ios-input px-3.5 py-2.5 text-xs text-slate-100 font-medium"
                />
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                    Target Budget
                  </span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">
                    ₹{tripParams.budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="80000"
                  step="2500"
                  value={tripParams.budget}
                  onChange={(e) => updateTripParams({ budget: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹15,000</span>
                  <span>Covers stays, cabs & tickets</span>
                  <span>₹80,000</span>
                </div>
              </div>
            </div>

            {/* Simple Ticket Dropzone */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">
                    Have any flight or hotel bookings? (Optional)
                  </span>
                  <p className="text-[11px] text-slate-400">
                    We'll extract your arrival and check-in times automatically.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={simulateAddOcrChip}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Test Ticket</span>
                </button>
              </div>

              <div className="border border-dashed border-slate-700/80 hover:border-rose-500/50 rounded-2xl p-4 bg-slate-950/50 transition-colors">
                <div className="flex flex-col items-center justify-center text-center py-2">
                  <UploadCloud className="w-6 h-6 text-rose-400 mb-1" />
                  <p className="text-xs text-slate-300 font-medium">
                    Upload flight pass or hotel voucher PDF here
                  </p>
                </div>

                {/* Uploaded Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-slate-800">
                  {ocrChips.map((chip) => (
                    <div
                      key={chip.id}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{chip.icon}</span>
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs font-semibold text-slate-100">{chip.title}</h4>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          </div>
                          <p className="text-[10px] text-slate-400">{chip.subtitle}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeOcrChip(chip.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick booking links */}
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="text-[11px]">Book missing legs:</span>
              <a
                href="https://www.makemytrip.com"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-[11px] flex items-center gap-1"
              >
                <span>MakeMyTrip</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href="https://www.booking.com"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-[11px] flex items-center gap-1"
              >
                <span>Booking.com</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* NEXT BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-3 rounded-full ios-btn-primary text-white font-bold text-xs flex items-center gap-2"
            >
              <span>Next: Who is Going</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: WHO IS GOING */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-100">
                  Who is traveling with you?
                </h2>
                <p className="text-xs text-slate-400">
                  We adjust walking pace, stairs, and curfews based on your group
                </p>
              </div>
            </div>

            {/* Group Mode Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Trip Type:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {groupModes.map((mode) => {
                  const isSelected = tripParams.groupType === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setGroupMode(mode)}
                      className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-rose-500/20 border-rose-500/60 text-rose-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <span>{mode}</span>
                      {isSelected && <Check className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Traveler Cards */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-200 block">
                Travelers in this trip ({travelers.length}):
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {travelers.map((traveler) => (
                  <div
                    key={traveler.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={traveler.avatar}
                        alt={traveler.name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-800"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">{traveler.name}</h4>
                        <p className="text-xs text-slate-400">
                          {traveler.age} yrs • {traveler.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {traveler.tags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleTravelerTag(traveler.id, tag)}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-peach-800/60 text-peach-300 hover:bg-peach-950"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {traveler.medicalNote && (
                      <p className="text-[11px] text-amber-300 bg-amber-950/30 p-2 rounded-lg border border-amber-900/40">
                        {traveler.medicalNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Family Safety Alert Box */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-start gap-3 text-xs">
              <ShieldAlert className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <span className="font-bold text-emerald-300 block">
                  Senior & Family Friendly Filter Active
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  All steep stairs at Amer Fort and hill parapets have been replaced with vehicle ramps. Evening curfew is set to 8:00 PM for a relaxed, safe trip.
                </p>
              </div>
            </div>
          </div>

          {/* BACK AND NEXT BUTTONS */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className="px-5 py-2.5 rounded-full ios-btn-secondary text-xs font-semibold text-slate-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className="px-6 py-3 rounded-full ios-btn-primary text-white font-bold text-xs flex items-center gap-2"
            >
              <span>Next: Must-Visit Spots</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SURED MUST-VISIT PLACES & TRIP STYLE */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-100">
                  Places you are sure to visit
                </h2>
                <p className="text-xs text-slate-400">
                  Enter your must-visit spots — these are guaranteed to be in your final schedule!
                </p>
              </div>
            </div>

            {/* Sured Places Input Section */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">
                Your Guaranteed Must-Visit Spots:
              </label>

              {/* Tag List of Sured Places */}
              <div className="flex flex-wrap gap-2">
                {tripParams.mustVisitPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs font-semibold"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{place}</span>
                    <button
                      onClick={() => removeMustVisitPlace(place)}
                      className="text-amber-400/70 hover:text-red-400 ml-1 text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Custom Place Form */}
              <form onSubmit={handleAddCustomPlace} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newPlaceInput}
                  onChange={(e) => setNewPlaceInput(e.target.value)}
                  placeholder="Type a must-visit spot (e.g. Chokhi Dhani, Jal Mahal)..."
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-glow-amber flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Spot</span>
                </button>
              </form>
            </div>

            {/* Trip Style: Relaxed vs Workation */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <label className="text-xs font-semibold text-slate-300 block">
                Trip Style:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setModality('casual')}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    tripParams.modality === 'casual'
                      ? 'bg-rose-500/15 border-rose-500/60 text-white shadow-glow-amber'
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-300 flex items-center gap-1.5">
                      <Coffee className="w-4 h-4" />
                      Relaxed Vacation
                    </span>
                    {tripParams.modality === 'casual' && <Check className="w-4 h-4 text-rose-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Whole day open to sightsee, try local food, and rest without rush.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('workation')}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    tripParams.modality === 'workation'
                      ? 'bg-rose-500/20 border-rose-500/60 text-white shadow-glow-sunset'
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-300 flex items-center gap-1.5">
                      <Laptop className="w-4 h-4" />
                      Workation (Work + Travel)
                    </span>
                    {tripParams.modality === 'workation' && (
                      <Check className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Locks 10:00 AM – 3:30 PM for quiet remote work with hotel Wi-Fi.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* BACK AND GENERATE BUTTON */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-full ios-btn-secondary text-xs font-semibold text-slate-300 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-8 py-3.5 rounded-full ios-btn-primary text-white font-bold text-xs sm:text-sm flex items-center gap-2.5"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Building Your Schedule...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate My Trip Schedule ➔</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
