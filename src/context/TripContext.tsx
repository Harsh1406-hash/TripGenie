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

  // Trip Parameters
  tripParams: TripParams;
  updateTripParams: (params: Partial<TripParams>) => void;
  setGroupMode: (mode: GroupMode) => void;
  setModality: (modality: TripModality) => void;

  // Travelers
  travelers: Traveler[];
  toggleTravelerTag: (travelerId: string, tag: string) => void;

  // OCR
  ocrChips: OcrChip[];
  simulateAddOcrChip: () => void;
  removeOcrChip: (id: string) => void;

  // Studio Timeline
  currentDay: number;
  setCurrentDay: (day: number) => void;
  dayPlans: DayPlan[];
  selectedStopId: string | null;
  setSelectedStopId: (id: string | null) => void;

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
    showToast('Trip parameters updated', 'info');
  };

  const setGroupMode = (groupType: GroupMode) => {
    setTripParams((prev) => ({ ...prev, groupType }));

    if (groupType === 'Solo') {
      setTravelers([initialTravelers[0]]);
      showToast('Switched to Solo traveler mode', 'info');
    } else if (groupType === 'Couple') {
      setTravelers([initialTravelers[0], initialTravelers[1]]);
      showToast('Switched to Couple mode (Aarav & Riya)', 'info');
    } else if (groupType === 'Family') {
      setTravelers(initialTravelers);
      showToast('Switched to Family mode (Safety & accessibility filters active)', 'info');
    } else {
      // Friends
      setTravelers([
        initialTravelers[0],
        initialTravelers[1],
        {
          id: 't-4',
          name: 'Kabir Mehta',
          age: 25,
          gender: 'Male',
          role: 'Adventure Scout',
          tags: ['Trekker', 'Night Owl'],
          emergencyContact: '+91 99000 11223',
          bloodGroup: 'AB+',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        },
      ]);
      showToast('Switched to Friends trip mode', 'info');
    }
  };

  const setModality = (modality: TripModality) => {
    setTripParams((prev) => ({ ...prev, modality }));
    showToast(
      modality === 'workation'
        ? 'Workation mode enabled: 10:00 AM – 3:30 PM locked for remote work'
        : 'Casual / Leisure mode enabled: Full-day relaxed itinerary',
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
    showToast(`Updated traveler profile preference`, 'info');
  };

  const simulateAddOcrChip = () => {
    const newChip: OcrChip = {
      id: `ocr-${Date.now()}`,
      category: 'ticket',
      icon: '🎫',
      title: 'City Palace Fast-Track Pass',
      subtitle: 'Baradari Courtyard & Museum entry voucher',
      rawText: 'VOUCHER: CP-VIP-9942 | Adult x3 | Priority Wheelchair Line Assigned',
      timestamp: 'Nov 12, 12:15 PM',
      verified: true,
    };
    setOcrChips((prev) => [...prev, newChip]);
    showToast('OCR extracted: City Palace Fast-Track Pass added!', 'success');
  };

  const removeOcrChip = (id: string) => {
    setOcrChips((prev) => prev.filter((c) => c.id !== id));
    showToast('Document anchor removed', 'info');
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

    // Simulate smart AI response after 1.2s
    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'TripGenie AI Agent',
        avatar: '🤖',
        time: 'Just now',
        text: `🤖 Autonomous Check: "${text}" analyzed. Route timing and wheelchair gradient verified against municipal road index.`,
      };
      setChatMessages((prev) => [...prev, aiReply]);
      showToast('AI Agent posted a response to the group chat', 'info');
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
    showToast(`Your vote (${vote === 'approve' ? 'Approved' : 'Rejected'}) recorded!`, 'success');
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
    showToast('Hawa Mahal marked as Visited & Checked-in! Advancing to Sunset at Nahargarh Fort.', 'success');
  };

  const rescheduleMissedStop = () => {
    setMissedStopState({
      show: true,
      venueName: 'Albert Hall Museum',
      status: 'rescheduled',
      resolutionMessage: '✅ Rescheduled to Day 2 Morning (09:15 AM). Route transit re-calculated without backtracking.',
    });
    showToast('Stop successfully rescheduled to Day 2 morning!', 'success');
  };

  const dropMissedStop = () => {
    setMissedStopState({
      show: true,
      venueName: 'Albert Hall Museum',
      status: 'dropped',
      resolutionMessage: '🗑️ Albert Hall Museum dropped from route. Rest hour allocated for Dadi.',
    });
    showToast('Stop dropped. 45 mins buffer added to dinner schedule.', 'info');
  };

  const loginWithGoogle = () => {
    setUserSession({
      name: 'Aarav Sharma',
      email: 'aarav.sharma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      isAuthenticated: true,
      provider: 'Google',
    });
    setIsAuthModalOpen(false);
    showToast('Successfully authenticated via Google OAuth!', 'success');
  };

  const loginWithEmail = (email: string) => {
    setUserSession({
      name: email.split('@')[0] || 'Demo Traveler',
      email: email || 'traveler@tripgenie.ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      isAuthenticated: true,
      provider: 'Email',
    });
    setIsAuthModalOpen(false);
    showToast('Signed in with Supabase Auth session token!', 'success');
  };

  const logout = () => {
    setUserSession((prev) => ({ ...prev, isAuthenticated: false }));
    showToast('Signed out of session', 'info');
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
