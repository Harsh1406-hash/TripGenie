import React from 'react';
import { useTrip } from '../../context/TripContext';
import { CheckCircle2, AlertTriangle, Info, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useTrip();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md">
      <div className="ios-card-elevated px-4 py-3 rounded-full border border-white/20 shadow-2xl flex items-center gap-3 text-white backdrop-blur-2xl">
        <div className="flex-shrink-0">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-rose-300" />}
        </div>
        <div className="flex-1 pr-2">
          <p className="text-xs text-white/90 font-medium leading-tight">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
