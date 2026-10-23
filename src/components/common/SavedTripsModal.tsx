import React from 'react';
import { useTrip } from '../../context/TripContext';
import { savedTripsList } from '../../data/mockData';
import { X, Calendar, Users, Wallet, CheckCircle2, ArrowRight, Bookmark } from 'lucide-react';

export const SavedTripsModal: React.FC = () => {
  const { isSavedTripsOpen, setIsSavedTripsOpen, setCurrentScreen, showToast } = useTrip();

  if (!isSavedTripsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl ios-card-elevated rounded-[28px] overflow-hidden flex flex-col max-h-[85vh] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Saved Travel Expeditions</h3>
              <p className="text-xs text-white/50">Stored on-device and synced via Supabase Auth</p>
            </div>
          </div>
          <button
            onClick={() => setIsSavedTripsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-95"
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
                className={`group p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'ios-card-elevated border-rose-500/40 shadow-glow-sunset'
                    : 'ios-subcard hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="w-16 h-16 rounded-2xl object-cover border border-white/10 flex-shrink-0 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-white group-hover:text-rose-300 transition-colors">
                          {trip.title}
                        </h4>
                        {isActive && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            Active Demo
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-white/40" />
                          {trip.dates}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-white/40" />
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
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/70"
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
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                      isActive
                        ? 'ios-btn-primary'
                        : 'ios-btn-secondary'
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
