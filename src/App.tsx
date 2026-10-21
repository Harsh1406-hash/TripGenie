import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { LandingAuthScreen } from './components/screens/LandingAuthScreen';
import { IntakeScreen } from './components/screens/IntakeScreen';
import { StudioScreen } from './components/screens/StudioScreen';
import { LiveNavScreen } from './components/screens/LiveNavScreen';
import { MasterDossierScreen } from './components/screens/MasterDossierScreen';
import { SavedTripsModal } from './components/common/SavedTripsModal';
import { ExternalMapModal } from './components/common/ExternalMapModal';
import { OfflinePackageModal } from './components/common/OfflinePackageModal';
import { AuthModal } from './components/common/AuthModal';
import { ShareModal } from './components/common/ShareModal';
import { Compass, Sparkles, Navigation, Layers, Shield } from 'lucide-react';

const ScreenRenderer: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useTrip();

  return (
    <main className="flex-1">
      {currentScreen === 'landing' && <LandingAuthScreen />}
      {currentScreen === 'intake' && <IntakeScreen />}
      {currentScreen === 'studio' && <StudioScreen />}
      {currentScreen === 'live' && <LiveNavScreen />}
      {currentScreen === 'dossier' && <MasterDossierScreen />}
    </main>
  );
};

const QuickDemoBar: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useTrip();

  return (
    <div className="fixed bottom-4 left-4 z-30 hidden xl:flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl text-[11px] no-print">
      <div className="flex items-center gap-1 px-2.5 py-1 text-slate-400 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Demo Flows:</span>
      </div>
      <button
        onClick={() => setCurrentScreen('landing')}
        className={`px-2.5 py-1 rounded-xl transition-all ${
          currentScreen === 'landing'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'text-slate-300 hover:bg-slate-800'
        }`}
      >
        1. Landing & Auth
      </button>
      <button
        onClick={() => setCurrentScreen('intake')}
        className={`px-2.5 py-1 rounded-xl transition-all ${
          currentScreen === 'intake'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'text-slate-300 hover:bg-slate-800'
        }`}
      >
        2. Intake Wizard
      </button>
      <button
        onClick={() => setCurrentScreen('studio')}
        className={`px-2.5 py-1 rounded-xl transition-all ${
          currentScreen === 'studio'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'text-slate-300 hover:bg-slate-800'
        }`}
      >
        3. Studio Canvas
      </button>
      <button
        onClick={() => setCurrentScreen('live')}
        className={`px-2.5 py-1 rounded-xl transition-all ${
          currentScreen === 'live'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'text-slate-300 hover:bg-slate-800'
        }`}
      >
        4. Live Nav
      </button>
      <button
        onClick={() => setCurrentScreen('dossier')}
        className={`px-2.5 py-1 rounded-xl transition-all ${
          currentScreen === 'dossier'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'text-slate-300 hover:bg-slate-800'
        }`}
      >
        5. Master Dossier
      </button>
    </div>
  );
};

export function App() {
  return (
    <TripProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 bg-grid-pattern glow-ambient-cyan">
        <Navbar />
        <ScreenRenderer />
        <Footer />

        {/* Global Modals & Notifications */}
        <SavedTripsModal />
        <ExternalMapModal />
        <OfflinePackageModal />
        <AuthModal />
        <ShareModal />
        <Toast />

        {/* Quick Demo Switcher */}
        <QuickDemoBar />
      </div>
    </TripProvider>
  );
}

export default App;
