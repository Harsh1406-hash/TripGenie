import React from 'react';
import { useTrip } from '../../context/TripContext';
import { CheckCircle2, AlertTriangle, Info, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useTrip();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md">
      <div className="glass-panel-elevated p-3.5 rounded-xl border border-cyan-500/40 shadow-2xl flex items-start gap-3 bg-slate-900/95 text-slate-100">
        <div className="mt-0.5">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              TripGenie System Update
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
