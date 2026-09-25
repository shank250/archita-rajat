export type RecipientSide = 'both' | 'bride' | 'groom';

export interface FamilyPerson {
  name: string;
  relation?: string;
}

export interface CoupleProfile {
  groom: {
    firstName: string;
    fullName: string;
    parents: string;
    grandparents?: string;
    bio?: string;
  };
  bride: {
    firstName: string;
    fullName: string;
    parents: string;
    grandparents?: string;
    bio?: string;
  };
  hashtag: string;
  monogram: string;
  ceremonyTitle: string;
  formalSalutationDefault: string;
}

export interface EventDetails {
  type: string;
  date: string;          // ISO format YYYY-MM-DD
  displayDate: string;   // e.g. "Friday, 23rd October 2026"
  revealDateText: string;// e.g. "30th November 2026"
  startTime: string;     // e.g. "18:00"
  endTime: string;       // e.g. "23:59"
  venue: {
    name: string;
    tagline: string;
    address: string;
    city: string;
    landmark?: string;
    googleMapsUrl: string;
    appleMapsUrl: string;
    embedMapUrl?: string;
  };
  whatsappGroupUrl: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
  };
}

export interface StorySlide {
  id: string;
  chapterBadge: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  narration: string;
  images: {
    src: string;
    caption: string;
    alt: string;
    rotation?: number; // degree for polaroid tilt effect
  }[];
}

export interface ItineraryItem {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlight?: boolean;
}

export interface GuestContextData {
  guestName: string;
  recipientSide: RecipientSide;
  isPersonalized: boolean;
  tableNumber?: string;
  passcode?: string;
}

export interface WishEntry {
  id: string;
  guestName: string;
  recipient: RecipientSide;
  message: string;
  attending?: 'yes' | 'no' | 'undecided';
  guestCount?: number;
  dietaryPreference?: 'vegetarian' | 'non-vegetarian' | 'jain' | 'no-preference';
  createdAt: string;
}
