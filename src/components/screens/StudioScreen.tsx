import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { VectorMap } from '../common/VectorMap';
import {
  Calendar,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Navigation,
  Car,
  CheckCircle2,
  Share2,
  DollarSign,
  Footprints,
  Info,
  Layers,
  ArrowRight,
  Flame,
  Check,
} from 'lucide-react';

export const StudioScreen: React.FC = () => {
  const {
    currentDay,
    setCurrentDay,
    dayPlans,
    selectedStopId,
    setSelectedStopId,
    chatMessages,
    addChatMessage,
    proposal,
    voteProposal,
    setCurrentScreen,
    showToast,
  } = useTrip();

  const [chatInput, setChatInput] = useState('');

  const activeDayPlan = dayPlans.find((d) => d.dayNumber === currentDay) || dayPlans[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    addChatMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Studio Header & Quick Switchers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold tracking-wide uppercase">
            <span>Stage 2</span>
            <span>•</span>
            <span>Review Studio & Collaborative Canvas</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-0.5">
            Jaipur 4-Day Cultural Route Workspace
          </h1>
        </div>

        {/* Action Header CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setCurrentScreen('live');
              showToast('Starting GPS Live Navigation Mode for Day 1...', 'info');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow-cyan transition-all"
          >
            <Navigation className="w-4 h-4 text-slate-950" />
            <span>Start Live Navigation</span>
          </button>
        </div>
      </div>

      {/* DUAL-PANE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: DAY TIMELINE (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Day Tabs: Day 1, Day 2, Day 3, Day 4 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {dayPlans.map((day) => {
              const isSelected = day.dayNumber === currentDay;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => {
                    setCurrentDay(day.dayNumber);
                    setSelectedStopId(day.stops[0]?.id || null);
                    showToast(`Switched view to Day ${day.dayNumber}: ${day.theme}`, 'info');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-glow-cyan'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <span className="block text-[11px] font-normal opacity-80">
                    Day {day.dayNumber}
                  </span>
                  <span>{day.date.split(',')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Notice Banner: Operating Hours Advisory */}
          {activeDayPlan.advisory && (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/40 text-xs text-amber-200 flex items-start gap-2.5 shadow-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold block">Advisory Notification</span>
                <p className="mt-0.5 text-amber-300/90 leading-relaxed">
                  {activeDayPlan.advisory}
                </p>
              </div>
            </div>
          )}

          {/* Chronological Venue Cards List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>{activeDayPlan.theme}</span>
              <span>{activeDayPlan.stops.length} Sequence Stops</span>
            </div>

            {activeDayPlan.stops.map((stop, index) => {
              const isSelected = selectedStopId === stop.id;
              const isTransit = stop.type === 'transit';

              if (isTransit) {
                return (
                  <div
                    key={stop.id}
                    onClick={() => setSelectedStopId(stop.id)}
                    className="py-2 px-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between text-xs text-slate-400 cursor-pointer hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium text-slate-300">{stop.title}</span>
                      <span className="text-[11px] text-slate-500 font-mono">({stop.duration})</span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400/80">{stop.cost}</span>
                  </div>
                );
              }

              return (
                <div
                  key={stop.id}
                  onClick={() => setSelectedStopId(stop.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500/80 shadow-glow-cyan'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  {/* Top Bar on Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Step Number Badge */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {stop.time}
                          </span>
                          <span className="text-slate-600">•</span>
                          <h3 className="font-bold text-sm text-slate-100">{stop.title}</h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {stop.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-slate-300 whitespace-nowrap">
                      {stop.duration}
                    </span>
                  </div>

                  {/* Badges Row: Safety, Accessibility, Cost */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-900/90">
                    {/* Safety Score Badge */}
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-[10px] text-emerald-300 font-semibold">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Safety: {stop.safetyScore}/10</span>
                    </div>

                    {/* Wheelchair Accessible Badge */}
                    {stop.wheelchairAccessible && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-[10px] text-cyan-300 font-semibold">
                        <Footprints className="w-3 h-3 text-cyan-400" />
                        <span>Wheelchair Accessible</span>
                      </div>
                    )}

                    {/* Cost Badge */}
                    <div className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
                      Cost: {stop.cost}
                    </div>

                    {/* Operating Hours Alert badge */}
                    {stop.operatingHours && (
                      <div className="text-[10px] text-slate-500 ml-auto flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{stop.operatingHours}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Alert Callout */}
                  {stop.alert && (
                    <div className="mt-2.5 p-2 rounded-lg bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{stop.alert}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANE: VECTOR MAP & REAL-TIME COLLAB DRAWER (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Styled Dark Mode Vector Map Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                Synchronized Vector Map Canvas
              </span>
              <span className="text-[11px] text-slate-500">Click pins to inspect stop</span>
            </div>

            <VectorMap
              stops={activeDayPlan.stops}
              selectedStopId={selectedStopId}
              onSelectStop={(id) => setSelectedStopId(id)}
            />
          </div>

          {/* In-App Group Chat Drawer & Proposal Card */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="font-display font-bold text-sm text-slate-100">
                  Group Collab Channel (3 Active)
                </h3>
              </div>
              <span className="text-[10px] text-slate-500">E2E Client Synced</span>
            </div>

            {/* Group Proposal Voting Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-950/40 border border-indigo-700/50 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                  Pending Itinerary Vote
                </span>
                <span className="text-xs font-mono font-bold text-indigo-300">
                  Votes: {proposal.votesFor}/{proposal.totalVotes}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-100">{proposal.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  {proposal.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-indigo-400 h-full transition-all duration-300"
                  style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                ></div>
              </div>

              {/* Clickable Vote Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => voteProposal('approve')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    proposal.userVoted === 'approve'
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                      : 'bg-slate-800 hover:bg-slate-750 text-emerald-300 border border-emerald-900/60'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Approve ({proposal.votesFor}/{proposal.totalVotes})</span>
                </button>

                <button
                  type="button"
                  onClick={() => voteProposal('reject')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    proposal.userVoted === 'reject'
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-400 border border-slate-750'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>

            {/* Chat Feed */}
            <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 text-xs ${
                    msg.isCurrentUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  {typeof msg.avatar === 'string' && msg.avatar.startsWith('http') ? (
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-sm">
                      {msg.avatar}
                    </div>
                  )}

                  <div
                    className={`p-2.5 rounded-xl max-w-[85%] ${
                      msg.sender.includes('AI')
                        ? 'bg-cyan-950/40 border border-cyan-800/50 text-cyan-200'
                        : msg.isCurrentUser
                        ? 'bg-cyan-500 text-slate-950 font-medium'
                        : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px] opacity-70 mb-0.5">
                      <span className="font-bold">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message co-travelers or prompt AI agent..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-all flex-shrink-0"
                title="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
