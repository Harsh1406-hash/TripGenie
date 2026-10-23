import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { emergencyDirectory } from '../../data/mockData';
import {
  Download,
  Share2,
  Printer,
  ShieldCheck,
  Users,
  Calendar,
  PhoneCall,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const MasterDossierScreen: React.FC = () => {
  const {
    travelers,
    dayPlans,
    setIsShareModalOpen,
    showToast,
  } = useTrip();

  const [isExporting, setIsExporting] = useState(false);

  const handlePrintOrPdf = () => {
    setIsExporting(true);
    showToast('Preparing printable Travel Pass...', 'info');

    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 500);
  };

  const handleDownloadPdf = () => {
    setIsExporting(true);
    showToast('Downloading your Jaipur Travel Pass PDF...', 'info');

    setTimeout(() => {
      setIsExporting(false);
      const content = `TripGenie Travel Pass - Jaipur 4-Day Cultural Tour\nReference ID: #TG-JAI-9481\nTravelers: ${travelers.map((t) => t.name).join(', ')}`;
      const blob = new Blob([content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TripGenie_Jaipur_Travel_Pass.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Travel Pass PDF saved to downloads!', 'success');
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Top Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800 no-print">
        <div>
          <span className="text-xs text-rose-400 font-semibold tracking-wide uppercase">
            Final Travel Package
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-0.5">
            Trip Travel Pass & Summary
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Print your summary document or share with family via link or email.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Share by Link or Email (Prototype UI) */}
          <button
            type="button"
            onClick={() => {}}
            className="px-4 py-2.5 rounded-full ios-btn-secondary text-slate-200 font-semibold text-xs flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-peach-400" />
            <span>📲 Share by Link or Email</span>
          </button>

          {/* Download Complete Pass PDF (Prototype UI) */}
          <button
            type="button"
            onClick={() => {}}
            className="px-5 py-2.5 rounded-full ios-btn-primary text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>📄 Download PDF Pass</span>
          </button>
        </div>
      </div>

      {/* A4-STYLED PRINTABLE PREVIEW DOCUMENT CARD */}
      <div className="ios-card-elevated p-6 sm:p-10 space-y-8 relative">
        {/* Pass Header: Reference ID, QR Code & Barcode */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold tracking-wider">
                REF ID: #TG-JAI-9481
              </span>
              <span className="text-emerald-400 text-xs font-semibold">
                ✓ Confirmed Itinerary
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100">
              TripGenie Travel Pass — Jaipur 4-Day Tour
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5 font-mono">
              <span>Nov 12 – Nov 16, 2026</span>
              <span>•</span>
              <span>3 Travelers</span>
              <span>•</span>
              <span className="text-emerald-400">Step-Free & Curfew Verified</span>
            </div>
          </div>

          {/* Ticket Barcode & Hotel Confirmation QR Code */}
          <div className="flex items-center gap-4 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 self-end sm:self-auto flex-shrink-0">
            {/* QR Code */}
            <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 33 33" className="w-full h-full text-slate-950" fill="currentColor">
                <path d="M0 0h11v11H0zm2 2h7v7H2zM22 0h11v11H22zm2 2h7v7h-7zM0 22h11v11H0zm2 2h7v7H2zM14 2h2v4h-2zm4 0h3v2h-3zm-4 6h5v2h-5zm7-2h2v5h-2zm-2 5h4v2h-4zM2 14h3v3H2zm5 0h4v2H7zm-5 5h2v4H2zm4 1h5v2H6zm8-6h2v3h-2zm4 0h3v4h-3zm2 6h2v4h-2zm-4 1h3v2h-3zm-4 3h2v3h-2zm8 1h3v2h-3zM22 14h4v2h-4zm6 0h5v2h-5zm-6 4h2v2h-2zm4 1h3v4h-3zm4 1h3v2h-3zm-4 4h4v2h-4z" />
              </svg>
            </div>

            {/* Barcode Mockup */}
            <div className="flex flex-col justify-between h-16">
              <div className="flex items-center gap-[2px] h-9">
                {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4].map(
                  (width, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-300 h-full"
                      style={{ width: `${width}px` }}
                    ></div>
                  )
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                ITC-JAI-883921
              </span>
            </div>
          </div>
        </div>

        {/* 1. TRAVELER ROSTER TABLE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-rose-400" />
            <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              1. Travelers on this Trip
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Age & Gender</th>
                  <th className="py-3 px-4">Role & Preferences</th>
                  <th className="py-3 px-4">Blood Group</th>
                  <th className="py-3 px-4">Emergency Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                {travelers.map((traveler) => (
                  <tr key={traveler.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-100 flex items-center gap-2.5">
                      <img
                        src={traveler.avatar}
                        alt={traveler.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-800"
                      />
                      <span>{traveler.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {traveler.age} Yrs • {traveler.gender}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {traveler.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-rose-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {traveler.bloodGroup}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {traveler.emergencyContact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. COMPLETE 4-DAY SUMMARIZED SCHEDULE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-peach-400" />
            <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              2. 4-Day Daily Schedule Overview
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Morning</th>
                  <th className="py-3 px-4">Afternoon</th>
                  <th className="py-3 px-4">Sunset & Evening</th>
                  <th className="py-3 px-4">Curfew Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                {dayPlans.map((day) => {
                  const morningStops = day.stops.slice(0, 2).map((s) => s.title).join(' ➔ ');
                  const afternoonStops = day.stops.slice(2, 4).map((s) => s.title).join(' ➔ ');
                  const eveningStops = day.stops.slice(4).map((s) => s.title).join(' ➔ ') || 'Hotel Rest & Dinner';

                  return (
                    <tr key={day.dayNumber} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-100 whitespace-nowrap">
                        Day {day.dayNumber}
                        <span className="block text-[10px] font-normal text-slate-400">
                          {day.date.split(',')[0]}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-xs leading-relaxed">
                        {morningStops}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-xs leading-relaxed">
                        {afternoonStops}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-xs leading-relaxed">
                        {eveningStops}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                          Safe (Back by 8 PM)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. EMERGENCY PHONE DIRECTORY */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              3. Important Emergency Phone Numbers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {emergencyDirectory.map((contact, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-rose-400 uppercase">
                    <span>{contact.badge}</span>
                    <PhoneCall className="w-3 h-3 text-slate-500" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-100 mt-1">{contact.service}</h4>
                  {contact.address && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {contact.address}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-emerald-400">
                    {contact.phone}
                  </span>
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                    className="text-[11px] text-rose-400 hover:underline font-semibold"
                  >
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clean Bottom Punchline (Removed extra tags/matter as requested) */}
      <div className="no-print pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <button
          type="button"
          onClick={() => {}}
          className="hover:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-peach-400" />
          <span>Print Pass (Cmd + P)</span>
        </button>

        <span className="font-medium text-slate-300">
          ✨ TripGenie — AI Travel Made Simple & Stress-Free
        </span>
      </div>
    </div>
  );
};
