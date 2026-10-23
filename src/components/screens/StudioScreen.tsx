import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { VectorMap } from '../common/VectorMap';
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Navigation,
  Car,
  Map,
  Check,
  Star,
  Eye,
  EyeOff,
  Sparkles,
  Footprints,
} from 'lucide-react';

export const StudioScreen: React.FC = () => {
  const {
    currentDay,
    setCurrentDay,
    dayPlans,
    selectedStopId,
    setSelectedStopId,
    toggleStopApproval,
    isMapVisibleInStudio,
    setIsMapVisibleInStudio,
    tripParams,
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs text-rose-400 font-semibold tracking-wide uppercase">
            Trip Itinerary
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-0.5">
            Jaipur 4-Day Trip Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your daily plan. You can approve or remove places, or view the route map below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Toggle Map View Button */}
          <button
            onClick={() => {
              setIsMapVisibleInStudio((prev) => !prev);
              showToast(isMapVisibleInStudio ? 'Route map hidden' : 'Showing route map', 'info');
            }}
            className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 ios-btn-secondary text-slate-200"
          >
            {isMapVisibleInStudio ? <EyeOff className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5 text-rose-400" />}
            <span>{isMapVisibleInStudio ? 'Hide Route Map' : '🗺️ View Route Map'}</span>
          </button>

          {/* Start Live Guide CTA */}
          <button
            onClick={() => {
              setCurrentScreen('live');
              showToast('Opening Live Travel Guide...', 'info');
            }}
            className="px-5 py-2 rounded-full ios-btn-primary text-white font-bold text-xs flex items-center gap-2"
          >
            <Navigation className="w-3.5 h-3.5 text-white" />
            <span>Start Live Guide</span>
          </button>
        </div>
      </div>

      {/* OPTIONAL EXPANDABLE MAP CONTAINER (Opens smoothly when user clicks 'View Route Map') */}
      {isMapVisibleInStudio && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200">
              Interactive Route Map (Day {currentDay})
            </span>
            <span>Click any pin to inspect the stop</span>
          </div>
          <VectorMap
            stops={activeDayPlan.stops}
            selectedStopId={selectedStopId}
            onSelectStop={(id) => setSelectedStopId(id)}
          />
        </div>
      )}

      {/* Day Tabs: iOS Segmented Control */}
      <div className="flex items-center gap-1.5 ios-pill-container overflow-x-auto p-1.5 no-scrollbar self-start">
        {dayPlans.map((day) => {
          const isSelected = day.dayNumber === currentDay;
          return (
            <button
              key={day.dayNumber}
              onClick={() => {
                setCurrentDay(day.dayNumber);
                setSelectedStopId(day.stops[0]?.id || null);
                showToast(`Viewing Day ${day.dayNumber}: ${day.theme}`, 'info');
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'ios-pill-active text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span>Day {day.dayNumber}</span>
              <span className="opacity-60 ml-1.5 font-normal">({day.date.split(',')[0]})</span>
            </button>
          );
        })}
      </div>

      {/* Advisory Banner (Simple English) */}
      {activeDayPlan.advisory && (
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200 flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{activeDayPlan.advisory}</span>
        </div>
      )}

      {/* TWO COLUMN WORKSPACE: SCHEDULE STOPS (7 COLS) & GROUP CHAT/VOTE (5 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CHRONOLOGICAL STOPS WITH APPROVE / REJECT SELECTION */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-medium text-slate-300">{activeDayPlan.theme}</span>
            <span>{activeDayPlan.stops.filter((s) => s.approved !== false).length} Active Stops</span>
          </div>

          {activeDayPlan.stops.map((stop, index) => {
            const isTransit = stop.type === 'transit';
            const isApproved = stop.approved !== false;
            const isMustVisit =
              stop.isMustVisit ||
              tripParams.mustVisitPlaces.some((p) =>
                stop.title.toLowerCase().includes(p.toLowerCase())
              );

            if (isTransit) {
              return (
                <div
                  key={stop.id}
                  className="py-2 px-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between text-xs text-slate-400"
                >
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-peach-400" />
                    <span className="font-medium text-slate-300">{stop.title}</span>
                    <span className="text-[11px] text-slate-500 font-mono">({stop.duration})</span>
                  </div>
                  <span className="text-[11px] font-mono text-peach-400">{stop.cost}</span>
                </div>
              );
            }

            return (
              <div
                key={stop.id}
                className={`p-4 rounded-2xl ios-subcard transition-all ${
                  !isApproved
                    ? 'opacity-50'
                    : selectedStopId === stop.id
                    ? 'bg-white/[0.08] border-rose-500/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_10px_25px_rgba(244,63,94,0.15)]'
                    : 'hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Order Number Badge */}
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold font-mono flex items-center justify-center text-slate-300 flex-shrink-0">
                      {index + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-rose-400">
                          {stop.time}
                        </span>
                        <span className="text-slate-600">•</span>
                        <h3 className="font-bold text-sm text-slate-100">{stop.title}</h3>

                        {/* Sured Must-Visit Star Badge */}
                        {isMustVisit && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            Must-Visit
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {stop.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 whitespace-nowrap font-mono">
                    {stop.duration}
                  </span>
                </div>

                {/* Bottom Row: Badges & Approve/Reject Selection */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-900">
                  <div className="flex items-center gap-2 text-[10px]">
                    {stop.wheelchairAccessible && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1 font-semibold">
                        <Footprints className="w-3 h-3" />
                        Step-Free
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                      {stop.cost}
                    </span>
                  </div>

                  {/* APPROVE / REJECT SELECTION BUTTONS */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    {isApproved ? (
                      <button
                        onClick={() => toggleStopApproval(currentDay, stop.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-red-500/20 text-emerald-300 hover:text-red-300 border border-emerald-500/40 hover:border-red-500/40 text-[11px] font-semibold flex items-center gap-1 transition-all"
                        title="Click to remove from schedule"
                      >
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Included in Route</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleStopApproval(currentDay, stop.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 border border-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-all"
                        title="Click to re-add to schedule"
                      >
                        <span>+ Restore Stop</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: GROUP CHAT & VOTING DRAWER */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <h3 className="font-display font-bold text-sm text-slate-100">
                  Group Chat & Place Votes
                </h3>
              </div>
              <span className="text-[10px] text-slate-500">3 co-travelers</span>
            </div>

            {/* Group Proposal Card */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Pending Place Vote
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">
                  {proposal.votesFor} of {proposal.totalVotes} Approved
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-100">{proposal.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {proposal.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                ></div>
              </div>

              {/* Vote Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => voteProposal('approve')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    proposal.userVoted === 'approve'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
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

            {/* Chat Messages */}
            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 text-xs ${
                    msg.isCurrentUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  {typeof msg.avatar === 'string' && msg.avatar.startsWith('http') ? (
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-xs">
                      {msg.avatar}
                    </div>
                  )}

                  <div
                    className={`p-2.5 rounded-xl max-w-[85%] ${
                      msg.sender.includes('AI')
                        ? 'bg-rose-950/40 border border-rose-800/50 text-rose-200'
                        : msg.isCurrentUser
                        ? 'bg-gradient-to-r from-rose-500 to-peach-500 text-white font-medium'
                        : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] opacity-70 mb-0.5 font-bold">
                      {msg.sender}
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask AI or chat with group..."
                className="flex-1 ios-input px-3 py-2 text-xs text-slate-100 placeholder-slate-500"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full ios-btn-primary text-white flex items-center justify-center transition-all flex-shrink-0"
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
