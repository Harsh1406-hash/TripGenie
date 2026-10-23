import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  X,
  ShieldCheck,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  LogOut,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, userSession, loginWithGoogle, loginWithEmail, logout } = useTrip();
  const [email, setEmail] = useState('rohan.sharma@example.com');
  const [password, setPassword] = useState('SecurePass2026!');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      loginWithEmail(email);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md ios-card-elevated rounded-[28px] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                {userSession.isAuthenticated ? 'Traveler Session Profile' : 'Sign In to TripGenie'}
              </h3>
              <p className="text-xs text-white/50">Supabase Auth with Row-Level Security (RLS)</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {userSession.isAuthenticated ? (
            <div className="space-y-4">
              <div className="p-4 ios-subcard rounded-2xl flex items-center gap-3.5">
                <img
                  src={userSession.avatar}
                  alt={userSession.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">{userSession.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-white/60">{userSession.email}</p>
                  <p className="text-[11px] text-peach-300 mt-1">Auth Provider: {userSession.provider} OAuth</p>
                </div>
              </div>

              <div className="p-3.5 ios-subcard rounded-2xl text-xs text-white/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/50">TripGenie Token Status:</span>
                  <span className="text-emerald-400 font-mono font-medium">JWT VALID (Expires in 6d)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/50">RLS Policy Scope:</span>
                  <span className="text-white/80 font-mono">user_id = auth.uid()</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="flex-1 py-2.5 ios-btn-secondary text-xs font-semibold"
                >
                  Continue Trip
                </button>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Google One-Tap Mockup */}
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full py-2.5 px-4 rounded-full bg-white text-slate-900 font-semibold text-xs flex items-center justify-center gap-2.5 shadow-lg hover:bg-white/90 active:scale-95 transition-all group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-white/10 w-full"></div>
                <span className="bg-[#1e172a] px-3 text-[10px] uppercase font-semibold text-white/40 absolute rounded-full">
                  Or Email Sign In
                </span>
              </div>

              {/* Email Input with Simulated Live Checkmark */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80">Traveler Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full ios-input rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-white/30"
                  />
                  {isEmailValid ? (
                    <CheckCircle2 className="absolute right-3.5 top-3 w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="absolute right-3.5 top-3 w-4 h-4 text-amber-400" />
                  )}
                </div>
              </div>

              {/* Password Input with Strength Checkmark */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/80">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full ios-input rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-white/30"
                  />
                  {isPasswordValid && (
                    <CheckCircle2 className="absolute right-3.5 top-3 w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-emerald-500"></div>
                  <div className="flex-1 h-1 rounded-full bg-emerald-500"></div>
                  <div className="flex-1 h-1 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-emerald-400 font-medium">Strong Password</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 ios-btn-primary text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Autonomous Planner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-white/50">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Protected with Supabase Auth & Row-Level Security (RLS)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
