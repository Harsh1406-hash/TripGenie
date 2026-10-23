import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  ScreenType,
  TripParams,
  Traveler,
  OcrChip,
  DayPlan,
  ChatMessage,
  Proposal,
  UserSession,
  GroupMode,
  TripModality,
} from '../types/trip';
import {
  initialTripParams,
  initialTravelers,
  initialOcrChips,
  dayPlans as initialDayPlans,
  initialChatMessages,
  initialProposal,
  initialUserSession,
} from '../data/mockData';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface MissedStopState {
  show: boolean;
  venueName: string;
  status: 'pending' | 'rescheduled' | 'dropped';
  resolutionMessage?: string;
}

interface TripContextType {
  // Navigation & Screens
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;

  // Session
  userSession: UserSession;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string) => void;
  logout: () => void;

  // Trip Parameters & Sured Places
  tripParams: TripParams;
  updateTripParams: (params: Partial<TripParams>) => void;
  setGroupMode: (mode: GroupMode) => void;
  setModality: (modality: TripModality) => void;
  addMustVisitPlace: (place: string) => void;
  removeMustVisitPlace: (place: string) => void;

  // Travelers
  travelers: Traveler[];
  toggleTravelerTag: (travelerId: string, tag: string) => void;

  // OCR
  ocrChips: OcrChip[];
  simulateAddOcrChip: () => void;
  removeOcrChip: (id: string) => void;

  // Studio Timeline & Approval
  currentDay: number;
  setCurrentDay: (day: number) => void;
  dayPlans: DayPlan[];
  selectedStopId: string | null;
  setSelectedStopId: (id: string | null) => void;
  toggleStopApproval: (dayNumber: number, stopId: string) => void;
  isMapVisibleInStudio: boolean;
  setIsMapVisibleInStudio: (visible: boolean | ((prev: boolean) => boolean)) => void;

  // Chat & Collab
  chatMessages: ChatMessage[];
  addChatMessage: (text: string) => void;
  proposal: Proposal;
  voteProposal: (vote: 'approve' | 'reject') => void;

  // Live Navigation
  activeLiveStopId: string;
  isCurrentStopVisited: boolean;
  markCurrentStopVisited: () => void;
  missedStopState: MissedStopState;
  rescheduleMissedStop: () => void;
  dropMissedStop: () => void;

  // Modals & Drawers
  isSavedTripsOpen: boolean;
  setIsSavedTripsOpen: (open: boolean) => void;
  isExternalMapOpen: boolean;
  setIsExternalMapOpen: (open: boolean) => void;
  isOfflineDownloadOpen: boolean;
  setIsOfflineDownloadOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Sharing
  shareViaEmail: (email: string) => void;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [userSession, setUserSession] = useState<UserSession>(initialUserSession);
  const [tripParams, setTripParams] = useState<TripParams>(initialTripParams);
  const [travelers, setTravelers] = useState<Traveler[]>(initialTravelers);
  const [ocrChips, setOcrChips] = useState<OcrChip[]>(initialOcrChips);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [dayPlans, setDayPlans] = useState<DayPlan[]>(initialDayPlans);
  const [selectedStopId, setSelectedStopId] = useState<string | null>('stop-1-3');
  const [isMapVisibleInStudio, setIsMapVisibleInStudio] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [proposal, setProposal] = useState<Proposal>(initialProposal);

  // Live Nav State
  const [activeLiveStopId] = useState<string>('stop-1-5'); // Hawa Mahal
  const [isCurrentStopVisited, setIsCurrentStopVisited] = useState<boolean>(false);
  const [missedStopState, setMissedStopState] = useState<MissedStopState>({
    show: true,
    venueName: 'Albert Hall Museum',
    status: 'pending',
  });

  // Modals
  const [isSavedTripsOpen, setIsSavedTripsOpen] = useState<boolean>(false);
  const [isExternalMapOpen, setIsExternalMapOpen] = useState<boolean>(false);
  const [isOfflineDownloadOpen, setIsOfflineDownloadOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Toast notification
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3800);
  };

  const updateTripParams = (params: Partial<TripParams>) => {
    setTripParams((prev) => ({ ...prev, ...params }));
    showToast('Trip settings updated', 'info');
  };

  const addMustVisitPlace = (place: string) => {
    if (!place.trim()) return;
    if (tripParams.mustVisitPlaces.includes(place.trim())) {
      showToast('Place is already in your must-visit list!', 'info');
      return;
    }
    const updated = [...tripParams.mustVisitPlaces, place.trim()];
    setTripParams((prev) => ({ ...prev, mustVisitPlaces: updated }));
    showToast(`Added "${place.trim()}" to your must-visit schedule!`, 'success');
  };

  const removeMustVisitPlace = (place: string) => {
    const updated = tripParams.mustVisitPlaces.filter((p) => p !== place);
    setTripParams((prev) => ({ ...prev, mustVisitPlaces: updated }));
    showToast(`Removed "${place}" from must-visit list`, 'info');
  };

  const toggleStopApproval = (dayNumber: number, stopId: string) => {
    setDayPlans((prev) =>
      prev.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            stops: day.stops.map((stop) => {
              if (stop.id === stopId) {
                const newStatus = stop.approved !== false ? false : true;
                showToast(
                  newStatus ? `Approved: "${stop.title}" is in your route` : `Removed: "${stop.title}" removed from schedule`,
                  newStatus ? 'success' : 'info'
                );
                return { ...stop, approved: newStatus };
              }
              return stop;
            }),
          };
        }
        return day;
      })
    );
  };

  const setGroupMode = (groupType: GroupMode) => {
    setTripParams((prev) => ({ ...prev, groupType }));

    if (groupType === 'Solo') {
      setTravelers([initialTravelers[0]]);
      showToast('Set to Solo traveler mode', 'info');
    } else if (groupType === 'Couple') {
      setTravelers([initialTravelers[0], initialTravelers[1]]);
      showToast('Set to Couple trip mode (2 Travelers)', 'info');
    } else if (groupType === 'Family') {
      setTravelers(initialTravelers);
      showToast('Set to Family trip mode (Wheelchair & Safe routes on)', 'info');
    } else {
      setTravelers([
        initialTravelers[0],
        initialTravelers[1],
        {
          id: 't-4',
          name: 'Kabir Mehta',
          age: 25,
          gender: 'Male',
          role: 'Friend / Explorer',
          tags: ['Adventure', 'Night Owl'],
          emergencyContact: '+91 99000 11223',
          bloodGroup: 'AB+',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        },
      ]);
      showToast('Set to Friends trip mode', 'info');
    }
  };

  const setModality = (modality: TripModality) => {
    setTripParams((prev) => ({ ...prev, modality }));
    showToast(
      modality === 'workation'
        ? 'Workation mode: 10 AM – 3:30 PM reserved for work'
        : 'Relaxed Vacation mode: Full day open for exploring',
      'info'
    );
  };

  const toggleTravelerTag = (travelerId: string, tag: string) => {
    setTravelers((prev) =>
      prev.map((t) => {
        if (t.id === travelerId) {
          const hasTag = t.tags.includes(tag);
          const newTags = hasTag ? t.tags.filter((x) => x !== tag) : [...t.tags, tag];
          return { ...t, tags: newTags };
        }
        return t;
      })
    );
    showToast('Updated traveler preference', 'info');
  };

  const simulateAddOcrChip = () => {
    const newChip: OcrChip = {
      id: `ocr-${Date.now()}`,
      category: 'ticket',
      icon: '🎫',
      title: 'City Palace Fast-Track Pass',
      subtitle: 'VIP entry voucher with wheelchair ramp access',
      rawText: 'Booking #CP-9942 • 3 Guests • Ground Floor Entry',
      timestamp: 'Nov 12, 12:15 PM',
      verified: true,
    };
    setOcrChips((prev) => [...prev, newChip]);
    showToast('Scanned Ticket: City Palace Pass added to your schedule!', 'success');
  };

  const removeOcrChip = (id: string) => {
    setOcrChips((prev) => prev.filter((c) => c.id !== id));
    showToast('Ticket removed', 'info');
  };

  const addChatMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: userSession.name,
      avatar: userSession.avatar,
      time: 'Just now',
      text,
      isCurrentUser: true,
    };
    setChatMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'TripGenie AI',
        avatar: '🤖',
        time: 'Just now',
        text: `Got it! Checked timing and route for "${text}". Updated without any delays.`,
      };
      setChatMessages((prev) => [...prev, aiReply]);
      showToast('TripGenie AI replied to group chat', 'info');
    }, 1200);
  };

  const voteProposal = (vote: 'approve' | 'reject') => {
    setProposal((prev) => {
      if (prev.userVoted === vote) return prev;
      const isApproved = vote === 'approve';
      const newVotesFor = isApproved ? prev.votesFor + 1 : Math.max(0, prev.votesFor - 1);
      const isNowPassed = newVotesFor >= 2;
      return {
        ...prev,
        votesFor: newVotesFor,
        userVoted: vote,
        status: isNowPassed ? 'approved' : 'active',
      };
    });
    showToast(`You voted ${vote === 'approve' ? 'Approve 👍' : 'Reject ✕'}!`, 'success');
  };

  const markCurrentStopVisited = () => {
    setIsCurrentStopVisited(true);
    setDayPlans((prev) =>
      prev.map((day) => {
        if (day.dayNumber === 1) {
          return {
            ...day,
            stops: day.stops.map((s) => (s.id === 'stop-1-5' ? { ...s, visited: true } : s)),
          };
        }
        return day;
      })
    );
    showToast('Checked in at Hawa Mahal! Next stop: Sunset at Nahargarh Fort.', 'success');
  };

  const rescheduleMissedStop = () => {
    setMissedStopState({
      show: true,
      venueName: 'Albert Hall Museum',
      status: 'rescheduled',
      resolutionMessage: '✅ Moved to tomorrow morning at 09:30 AM without any backtracking.',
    });
    showToast('Rescheduled to tomorrow morning!', 'success');
  };

  const dropMissedStop = () => {
    setMissedStopState({
      show: true,
      venueName: 'Albert Hall Museum',
      status: 'dropped',
      resolutionMessage: 'Spot removed. You now have extra time to relax before dinner.',
    });
    showToast('Removed from today’s route.', 'info');
  };

  const loginWithGoogle = () => {
    setUserSession({
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      isAuthenticated: true,
      provider: 'Google',
    });
    setIsAuthModalOpen(false);
  };

  const loginWithEmail = (email: string) => {
    setUserSession({
      name: email.split('@')[0] || 'Traveler',
      email: email || 'traveler@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      isAuthenticated: true,
      provider: 'Email',
    });
    setIsAuthModalOpen(false);
    showToast('Signed in successfully!', 'success');
  };

  const logout = () => {
    setUserSession((prev) => ({ ...prev, isAuthenticated: false }));
    showToast('Signed out', 'info');
  };

  const shareViaEmail = (email: string) => {
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    showToast(`Trip invite & pass sent to ${email}!`, 'success');
  };

  return (
    <TripContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        userSession,
        loginWithGoogle,
        loginWithEmail,
        logout,
        tripParams,
        updateTripParams,
        setGroupMode,
        setModality,
        addMustVisitPlace,
        removeMustVisitPlace,
        travelers,
        toggleTravelerTag,
        ocrChips,
        simulateAddOcrChip,
        removeOcrChip,
        currentDay,
        setCurrentDay,
        dayPlans,
        selectedStopId,
        setSelectedStopId,
        toggleStopApproval,
        isMapVisibleInStudio,
        setIsMapVisibleInStudio,
        chatMessages,
        addChatMessage,
        proposal,
        voteProposal,
        activeLiveStopId,
        isCurrentStopVisited,
        markCurrentStopVisited,
        missedStopState,
        rescheduleMissedStop,
        dropMissedStop,
        isSavedTripsOpen,
        setIsSavedTripsOpen,
        isExternalMapOpen,
        setIsExternalMapOpen,
        isOfflineDownloadOpen,
        setIsOfflineDownloadOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        shareViaEmail,
        toast,
        showToast,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
