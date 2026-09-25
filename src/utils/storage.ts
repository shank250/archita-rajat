import { WishEntry } from '../types/wedding';

const USER_RSVP_KEY = 'royal_vows_user_rsvp';

export const getStoredUserRsvp = (): WishEntry | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_RSVP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to load user RSVP from localStorage", e);
    return null;
  }
};

export const saveUserRsvp = (newRsvp: Omit<WishEntry, 'id' | 'createdAt'>): WishEntry => {
  const rsvp: WishEntry = {
    ...newRsvp,
    id: `rsvp-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(USER_RSVP_KEY, JSON.stringify(rsvp));
  } catch (e) {
    console.error("Failed to save user RSVP to localStorage", e);
  }

  return rsvp;
};

export const clearUserRsvp = (): void => {
  try {
    localStorage.removeItem(USER_RSVP_KEY);
  } catch (e) {
    console.error("Failed to clear user RSVP from localStorage", e);
  }
};
