import React from 'react';
import { useTrip } from '../../context/TripContext';
import { savedTripsList } from '../../data/mockData';
import { X, Calendar, Users, Wallet, CheckCircle2, ArrowRight, Bookmark } from 'lucide-react';

export const SavedTripsModal: React.FC = () => {
  const { isSavedTripsOpen, setIsSavedTripsOpen, setCurrentScreen, showToast } = useTrip();

  if (!isSavedTripsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-100">Saved Travel Expeditions</h3>
              <p className="text-xs text-slate-400">Stored on-device and synced via Supabase Auth</p>
            </div>
          </div>
          <button
            onClick={() => setIsSavedTripsOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Trips List */}
        <div className="p-5 overflow-y-auto space-y-4">
          {savedTripsList.map((trip) => {
            const isActive = trip.id === 'saved-1';
            return (
              <div
                key={trip.id}
                className={`group p-4 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-slate-800/80 border-cyan-500/50 shadow-glow-cyan'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {trip.title}
                        </h4>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-950 text-cyan-400 border border-cyan-800">
                            Active Demo
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {trip.dates}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          {trip.members} Travelers
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                          {trip.budget}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {trip.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSavedTripsOpen(false);
                      setCurrentScreen('studio');
                      showToast(`Loaded "${trip.title}" into Review Studio`, 'success');
                    }}
                    className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{isActive ? 'View Canvas' : 'Load Trip'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
