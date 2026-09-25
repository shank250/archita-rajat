import { WishEntry } from '../types/wedding';
import { defaultWishes } from '../data/weddingData';

const WISHES_STORAGE_KEY = 'royal_vows_guestbook_wishes';

export const getStoredWishes = (): WishEntry[] => {
  if (typeof window === 'undefined') return defaultWishes;
  try {
    const raw = localStorage.getItem(WISHES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(defaultWishes));
      return defaultWishes;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load wishes from localStorage", e);
    return defaultWishes;
  }
};

export const saveWish = (newWish: Omit<WishEntry, 'id' | 'createdAt'>): WishEntry => {
  const wishes = getStoredWishes();
  const wish: WishEntry = {
    ...newWish,
    id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
  };

  const updated = [wish, ...wishes];
  try {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save wish to localStorage", e);
  }

  return wish;
};
