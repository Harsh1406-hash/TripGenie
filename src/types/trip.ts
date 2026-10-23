export type ScreenType = 'landing' | 'intake' | 'studio' | 'live' | 'dossier';

export type GroupMode = 'Solo' | 'Couple' | 'Family' | 'Friends';
export type TripModality = 'casual' | 'workation';

export interface Traveler {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  role: string;
  tags: string[];
  emergencyContact: string;
  bloodGroup: string;
  avatar: string;
  medicalNote?: string;
}

export interface OcrChip {
  id: string;
  category: 'flight' | 'hotel' | 'ticket' | 'transit';
  icon: string;
  title: string;
  subtitle: string;
  rawText: string;
  timestamp: string;
  verified: boolean;
}

export interface VenueStop {
  id: string;
  order: number;
  time: string;
  title: string;
  type: 'hotel' | 'transit' | 'attraction' | 'food' | 'sunset' | 'cultural';
  duration: string;
  safetyScore: number;
  wheelchairAccessible: boolean;
  cost: number | string;
  operatingHours?: string;
  alert?: string;
  mapCoords: { x: number; y: number };
  description: string;
  visited?: boolean;
  transitDetail?: string;
  approved?: boolean;
  isMustVisit?: boolean;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  title: string;
  theme: string;
  advisory?: string;
  stops: VenueStop[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  text: string;
  isCurrentUser?: boolean;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  totalVotes: number;
  userVoted: 'approve' | 'reject' | null;
  status: 'active' | 'approved' | 'rejected';
}

export interface EmergencyContact {
  service: string;
  phone: string;
  badge: string;
  address?: string;
  iconName: string;
}

export interface TripParams {
  destination: string;
  dates: string;
  durationDays: number;
  budget: number;
  groupType: GroupMode;
  modality: TripModality;
  workStartTime: string;
  workEndTime: string;
  stepFreeFilter: boolean;
  curfewEnabled: boolean;
  curfewTime: string;
  mustVisitPlaces: string[];
}

export interface UserSession {
  name: string;
  email: string;
  avatar: string;
  isAuthenticated: boolean;
  provider: 'Google' | 'Email';
}
