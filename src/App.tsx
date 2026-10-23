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

const ScreenRenderer: React.FC = () => {
  const { currentScreen } = useTrip();

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

export function App() {
  return (
    <TripProvider>
      <div className="min-h-screen flex flex-col bg-[#07050C] text-slate-100 relative selection:bg-rose-500/30">
        {/* iOS Ambient Frosted Wallpaper Orbs */}
        <div className="ios-wallpaper-ambient">
          <div className="ios-orb-1"></div>
          <div className="ios-orb-2"></div>
          <div className="ios-orb-3"></div>
        </div>

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
      </div>
    </TripProvider>
  );
}

export default App;
