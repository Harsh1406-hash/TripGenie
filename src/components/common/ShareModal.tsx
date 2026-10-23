import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  X,
  Share2,
  Copy,
  Check,
  Mail,
  Send,
  ShieldCheck,
  Link2,
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, shareViaEmail, showToast } = useTrip();
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const shareUrl = 'https://tripgenie.ai/trip/jaipur-9481';

  if (!isShareModalOpen) return null;

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText?.(shareUrl);
    showToast('Trip link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    shareViaEmail(emailInput.trim());
    setEmailInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md ios-card-elevated rounded-[28px] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Share Trip by Link or Email
              </h3>
              <p className="text-xs text-white/50">Let friends & family view the schedule</p>
            </div>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* 1. Share via Direct Link */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-peach-300" />
              <span>1. Share via Link</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 ios-input rounded-2xl px-3.5 py-2.5 text-xs text-white font-mono select-all focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 ios-btn-primary text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-[#1e172a] px-3 text-[10px] uppercase font-semibold text-white/40 absolute rounded-full">
              or
            </span>
          </div>

          {/* 2. Share via Email */}
          <form onSubmit={handleSendEmail} className="space-y-2">
            <label className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-rose-300" />
              <span>2. Send by Email</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="family.member@gmail.com"
                className="flex-1 ios-input rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-white/30"
              />
              <button
                type="submit"
                className="px-4 py-2.5 ios-btn-primary text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
            <p className="text-[11px] text-white/40">
              We'll send them a summary pass and live check-in notifications.
            </p>
          </form>

          {/* Security Note */}
          <div className="p-3.5 rounded-2xl ios-subcard flex items-center gap-2.5 text-xs text-white/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Private & secure: Financial receipts and cards stay private.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex justify-end">
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="px-5 py-2 ios-btn-secondary text-xs font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
