import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { emergencyDirectory } from '../../data/mockData';
import {
  FileText,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  QrCode,
  Barcode,
  Calendar,
  Users,
  Building2,
  PhoneCall,
  Ambulance,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
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
    showToast('Rendering high-fidelity A4 Dossier for PDF printing...', 'info');

    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 600);
  };

  const handleDownloadPdf = () => {
    setIsExporting(true);
    showToast('Compiling TripGenie_Jaipur_Master_Dossier.pdf...', 'info');

    setTimeout(() => {
      setIsExporting(false);
      // Simulate client-side blob download
      const content = `TripGenie Master Dossier - Jaipur 4-Day Cultural Tour\nBooking Reference: TG-JAI-2026-9481\nTravelers: ${travelers.map((t) => t.name).join(', ')}`;
      const blob = new Blob([content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TripGenie_Jaipur_Master_Dossier.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Master Dossier PDF exported successfully!', 'success');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Top Header & Export Action Hub */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold tracking-wide uppercase">
            <span>Stage 3</span>
            <span>•</span>
            <span>Master Travel Dossier & Export Hub</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-100 mt-0.5">
            Verified Travel Dossier & Dispatch Package
          </h1>
        </div>

        {/* Dual Top Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>📲 Share Read-Only Tracking Link with Family</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                Generating PDF...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 text-slate-950" />
                <span>📄 Download Complete Dossier (PDF)</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* PRINTABLE A4-STYLED PREVIEW DOCUMENT CARD */}
      <div className="glass-panel p-6 sm:p-10 rounded-2xl border-slate-800 space-y-8 bg-slate-950/90 text-slate-100 shadow-2xl relative">
        {/* Document Header & Barcode Graphic */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold">
                TripGenie Autonomous Verification Manifest
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100">
              TripGenie Master Dossier — Jaipur 4-Day Cultural Tour
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
              <span>REF: TG-JAI-2026-9481</span>
              <span>•</span>
              <span>Generated: Nov 10, 2026</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Zero-Backtracking Certified</span>
            </div>
          </div>

          {/* Ticket Barcode & Hotel Confirmation QR Code Mockup Graphic */}
          <div className="flex items-center gap-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800 self-end sm:self-auto flex-shrink-0">
            {/* SVG QR Code Mockup */}
            <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 33 33" className="w-full h-full text-slate-950" fill="currentColor">
                <path d="M0 0h11v11H0zm2 2h7v7H2zM22 0h11v11H22zm2 2h7v7h-7zM0 22h11v11H0zm2 2h7v7H2zM14 2h2v4h-2zm4 0h3v2h-3zm-4 6h5v2h-5zm7-2h2v5h-2zm-2 5h4v2h-4zM2 14h3v3H2zm5 0h4v2H7zm-5 5h2v4H2zm4 1h5v2H6zm8-6h2v3h-2zm4 0h3v4h-3zm2 6h2v4h-2zm-4 1h3v2h-3zm-4 3h2v3h-2zm8 1h3v2h-3zM22 14h4v2h-4zm6 0h5v2h-5zm-6 4h2v2h-2zm4 1h3v4h-3zm4 1h3v2h-3zm-4 4h4v2h-4z" />
              </svg>
            </div>

            {/* SVG Barcode Mockup */}
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
                ITC-JAI-CONF-8839
              </span>
            </div>
          </div>
        </div>

        {/* 1. TRAVELER ROSTER TABLE WITH EMERGENCY NUMBERS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              1. Registered Traveler Roster & Vulnerability Profiles
            </h3>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Traveler Name</th>
                  <th className="py-3 px-4">Demographics</th>
                  <th className="py-3 px-4">Assigned Role & Tags</th>
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
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-cyan-300"
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

        {/* 2. COMPLETE 4-DAY SUMMARIZED SCHEDULE TABLE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              2. Complete 4-Day Synchronized Itinerary Schedule
            </h3>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Day & Date</th>
                  <th className="py-3 px-4">Morning Sequence</th>
                  <th className="py-3 px-4">Afternoon Window</th>
                  <th className="py-3 px-4">Sunset & Evening Anchor</th>
                  <th className="py-3 px-4">Safety Curfew Status</th>
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
                        <span className="block text-[11px] font-normal text-slate-400">
                          {day.date}
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
                          Curfew Compliant (Before 8 PM)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. EMERGENCY DIRECTORY GRID */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
              3. Local Emergency & Medical Dispatch Directory
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {emergencyDirectory.map((contact, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      {contact.badge}
                    </span>
                    <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-100 mt-1">{contact.service}</h4>
                  {contact.address && (
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {contact.address}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="font-mono font-black text-sm text-emerald-400">
                    {contact.phone}
                  </span>
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Call SOS
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Policy Endorsement Stamp */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-200 block">
                Autonomous Verification Stamp
              </span>
              Audited for Senior Mobility (Nirmala Sharma, 68), Dietary Requirements (Pure Veg), and Local Sunset Curfew.
            </div>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            Hash: SHA256-7fa88c2...
          </span>
        </div>
      </div>

      {/* Floating Bottom Action Bar for Easy Demo */}
      <div className="no-print pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handlePrintOrPdf}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Print via System Dialog (Cmd+P)</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all"
          >
            Share Read-Only Link
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
          >
            Download Dossier PDF
          </button>
        </div>
      </div>
    </div>
  );
};
