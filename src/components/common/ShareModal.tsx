import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  X,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  QrCode,
  Radio,
  Eye,
  Send,
  Smartphone,
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, showToast } = useTrip();
  const [copied, setCopied] = useState(false);
  const shareUrl = 'https://tripgenie.ai/track/jaipur-aarav-9481';

  if (!isShareModalOpen) return null;

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText?.(shareUrl);
    showToast('Copied live family tracking link to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-100">
                Share Live Family Tracking Link
              </h3>
              <p className="text-xs text-slate-400">Read-only encrypted emergency telemetry</p>
            </div>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
              Direct Tracking URL
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono select-all focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Privacy & Safety Scope */}
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/60">
              <Radio className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="text-slate-300">
                <span className="font-semibold text-slate-100 block">Real-time Check-in Broadcast</span>
                Family members receive automatic SMS/WhatsApp notification whenever the group arrives at hotels or departs from evening heritage spots.
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="text-slate-300">
                <span className="font-semibold text-slate-100 block">Strict Privacy Guard</span>
                Financial details, booking receipts, and passport data remain completely hidden. Only route progress and safety status are visible.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Tracking PIN: 4910</span>
          <button
            onClick={() => {
              setIsShareModalOpen(false);
              showToast('Tracking link shared with registered emergency contacts', 'success');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Send to Roster</span>
          </button>
        </div>
      </div>
    </div>
  );
};
