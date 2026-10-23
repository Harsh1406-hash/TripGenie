import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  X,
  HardDriveDownload,
  FileCode2,
  CheckCircle2,
  Download,
  ShieldCheck,
  Smartphone,
  Radio,
  FileCheck,
} from 'lucide-react';

export const OfflinePackageModal: React.FC = () => {
  const { isOfflineDownloadOpen, setIsOfflineDownloadOpen, showToast } = useTrip();
  const [downloading, setDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  if (!isOfflineDownloadOpen) return null;

  const handleDownload = (format: 'GPX' | 'KML' | 'BUNDLE') => {
    setDownloading(true);
    showToast(`Packaging ${format} offline data payload...`, 'info');

    setTimeout(() => {
      setDownloading(false);
      setDownloadCompleted(true);

      // Create a dummy client-side file download blob
      const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="TripGenie Autonomous Planner" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Jaipur 4-Day Cultural Route - Day 1</name>
    <desc>Step-Free Verified Route with 8:00 PM Curfew Compliance</desc>
    <time>2026-11-12T10:30:00Z</time>
  </metadata>
  <wpt lat="26.9200" lon="75.7900"><name>ITC Rajputana</name></wpt>
  <wpt lat="26.9258" lon="75.8236"><name>City Palace</name></wpt>
  <wpt lat="26.9239" lon="75.8267"><name>Hawa Mahal</name></wpt>
  <wpt lat="26.9372" lon="75.8155"><name>Nahargarh Fort</name></wpt>
</gpx>`;

      const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `TripGenie_Jaipur_Day1_${format.toLowerCase()}.${format === 'BUNDLE' ? 'gpx' : format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast(`Downloaded TripGenie ${format} offline package! Ready for zero-data GPS navigation.`, 'success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl ios-card-elevated rounded-[28px] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <HardDriveDownload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Zero-Data Offline Navigation Package
              </h3>
              <p className="text-xs text-white/50">Works in hill areas and low-cellular dead zones</p>
            </div>
          </div>
          <button
            onClick={() => setIsOfflineDownloadOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Payload Manifest */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl ios-subcard space-y-2">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              Package Manifest (v2.4 Compressed)
            </span>
            <div className="space-y-2 pt-1 text-xs text-white/80">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="flex items-center gap-2 font-mono">
                  <FileCode2 className="w-4 h-4 text-rose-300" />
                  TripGenie_Jaipur_Day1.gpx
                </span>
                <span className="text-white/40 text-[11px]">14 Waypoints • 42 KB</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="flex items-center gap-2 font-mono">
                  <FileCheck className="w-4 h-4 text-emerald-300" />
                  Heritage_StepFree_MapOverlay.kml
                </span>
                <span className="text-white/40 text-[11px]">Vector Paths • 185 KB</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="flex items-center gap-2 font-mono">
                  <Smartphone className="w-4 h-4 text-peach-300" />
                  Emergency_Contacts_Offline.json
                </span>
                <span className="text-white/40 text-[11px]">SOS Numbers • 12 KB</span>
              </div>
            </div>
          </div>

          {/* Offline Security Note */}
          <div className="p-3.5 rounded-2xl ios-subcard flex items-start gap-3 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="text-white/70">
              <span className="font-semibold text-white block">Battery & Data Optimized</span>
              Runs natively on device GPS hardware without consuming mobile data, keeping device cool during full-day sightseeing.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload('KML')}
              disabled={downloading}
              className="px-3.5 py-1.5 ios-btn-secondary text-xs font-medium"
            >
              Export .KML
            </button>
            <button
              onClick={() => handleDownload('GPX')}
              disabled={downloading}
              className="px-3.5 py-1.5 ios-btn-secondary text-xs font-medium"
            >
              Export .GPX
            </button>
          </div>

          <button
            onClick={() => handleDownload('BUNDLE')}
            disabled={downloading}
            className="w-full sm:w-auto px-5 py-2.5 ios-btn-primary text-xs font-semibold flex items-center justify-center gap-2"
          >
            {downloading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Packaging Bundle...
              </span>
            ) : downloadCompleted ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Package Saved
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Offline Package
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
