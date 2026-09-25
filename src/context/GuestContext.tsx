import React, { createContext, useContext, useMemo } from 'react';
import { GuestContextData, RecipientSide } from '../types/wedding';

const defaultGuestContext: GuestContextData = {
  guestName: "Family & Friends",
  recipientSide: "both",
  isPersonalized: false,
};

const GuestContext = createContext<GuestContextData>(defaultGuestContext);

export const GuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const guestData = useMemo<GuestContextData>(() => {
    if (typeof window === 'undefined') return defaultGuestContext;

    const params = new URLSearchParams(window.location.search);
    const rawGuest = params.get('guest') || params.get('name') || params.get('to_guest');
    const rawSide = params.get('to') || params.get('side');
    const rawTable = params.get('table');

    let recipientSide: RecipientSide = 'both';
    if (rawSide === 'groom' || rawSide === 'bride') {
      recipientSide = rawSide;
    }

    if (rawGuest && rawGuest.trim().length > 0) {
      // Decode and clean up formatting
      const cleaned = decodeURIComponent(rawGuest.replace(/\+/g, ' ')).trim();
      return {
        guestName: cleaned,
        recipientSide,
        isPersonalized: true,
        tableNumber: rawTable ? decodeURIComponent(rawTable.replace(/\+/g, ' ')) : undefined,
      };
    }

    return {
      guestName: "Family & Friends",
      recipientSide,
      isPersonalized: false,
      tableNumber: rawTable ? decodeURIComponent(rawTable.replace(/\+/g, ' ')) : undefined,
    };
  }, []);

  return (
    <GuestContext.Provider value={guestData}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => useContext(GuestContext);
