import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuest } from '../../context/GuestContext';
import { WishEntry, RecipientSide } from '../../types/wedding';
import { getStoredUserRsvp, saveUserRsvp } from '../../utils/storage';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { Send, User, CheckCircle2, HeartHandshake, Edit3, Calendar } from 'lucide-react';

const celebrationEvents = [
  {
    id: 'engagement',
    title: 'Engagement & Ring Ceremony',
    date: '23 Oct 2026',
    venue: 'Elegance Hotel',
  },
  {
    id: 'mehndi',
    title: 'Mehndi & Haldi Rasam',
    date: '28 Nov 2026',
    venue: 'Shital Niwas',
  },
  {
    id: 'sangeet',
    title: 'Ladies Sangeet & Musical Night',
    date: '29 Nov 2026',
    venue: 'Shital Niwas',
  },
  {
    id: 'wedding',
    title: 'The Grand Wedding (Vivah)',
    date: '30 Nov 2026',
    venue: 'Krishna Lawn',
  },
];

export const GuestbookSection: React.FC = () => {
  const { guestName, recipientSide, isPersonalized } = useGuest();

  // Form State
  const [name, setName] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'engagement',
    'mehndi',
    'sangeet',
    'wedding',
  ]);
  const [targetRecipient, setTargetRecipient] = useState<RecipientSide>('both');
  const [message, setMessage] = useState('');

  const [submittedRsvp, setSubmittedRsvp] = useState<WishEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  useEffect(() => {
    const existing = getStoredUserRsvp();
    if (existing) {
      setSubmittedRsvp(existing);
      setName(existing.guestName);
      if (existing.eventsAttending && Array.isArray(existing.eventsAttending) && existing.eventsAttending.length > 0) {
        setSelectedEvents(existing.eventsAttending);
      } else if (existing.eventAttendance) {
        if (existing.eventAttendance === 'all') {
          setSelectedEvents(['engagement', 'mehndi', 'sangeet', 'wedding']);
        } else if (existing.eventAttendance === 'wedding') {
          setSelectedEvents(['wedding']);
        } else if (existing.eventAttendance === 'engagement') {
          setSelectedEvents(['engagement']);
        } else if (existing.eventAttendance === 'rasam') {
          setSelectedEvents(['mehndi']);
        } else if (existing.eventAttendance === 'sangeet') {
          setSelectedEvents(['sangeet']);
        }
      }
      setTargetRecipient(existing.recipient);
      setMessage(existing.message);
    } else if (isPersonalized && guestName) {
      setName(guestName);
      if (recipientSide) {
        setTargetRecipient(recipientSide);
      }
    }
  }, [guestName, recipientSide, isPersonalized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const eventAttendanceText =
      selectedEvents.length === 4
        ? 'All Celebrations (23 Oct, 28, 29 & 30 Nov)'
        : selectedEvents.length === 0
        ? 'Sending Warm Blessings from Afar'
        : selectedEvents
            .map((id) => celebrationEvents.find((e) => e.id === id)?.title)
            .filter(Boolean)
            .join(', ');

    const saved = saveUserRsvp({
      guestName: name.trim(),
      recipient: targetRecipient,
      eventsAttending: selectedEvents,
      eventAttendance: eventAttendanceText,
      message: message.trim(),
    });

    setSubmittedRsvp(saved);
    setIsEditing(false);
    triggerCelebrationFireworks();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <section id="guestbook" className="relative py-20 px-4 max-w-xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#881337] font-bold">
          RSVP & Wishes
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-bold mt-1">
          {submittedRsvp && !isEditing ? "RSVP & Blessings Received" : "RSVP & Send Your Blessings"}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1 max-w-md mx-auto">
          {submittedRsvp && !isEditing
            ? "Your attendance and warm wishes have been conveyed to Archita & Rajat"
            : "Select which celebrations you plan to attend and share your heartfelt blessings"}
        </p>
        <div className="w-12 h-0.5 bg-[#881337] rounded-full mx-auto mt-3" />
      </div>

      <AnimatePresence mode="wait">
        {submittedRsvp && !isEditing ? (
          /* Confirmation Summary Card */
          <motion.div
            key="confirmed-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-7 sm:p-9 rounded-3xl border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-neutral-900 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#881337]">
              RSVP Confirmed
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-bold mt-1">
              Thank You, {submittedRsvp.guestName}!
            </h3>

            <p className="text-xs font-sans text-neutral-500 mt-1">
              Archita & Rajat look forward to celebrating with you!
            </p>

            {/* Attendance & Message Details Box */}
            <div className="my-6 p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 text-left space-y-3.5">
              <div>
                <span className="text-[11px] text-neutral-400 font-sans font-bold uppercase tracking-wider block mb-2">
                  Attending Celebrations:
                </span>
                {submittedRsvp.eventsAttending && submittedRsvp.eventsAttending.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {submittedRsvp.eventsAttending.map((evtId) => {
                      const evt = celebrationEvents.find((e) => e.id === evtId);
                      return (
                        <div
                          key={evtId}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200/90 text-xs font-sans text-neutral-800 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="font-semibold text-neutral-900 truncate">
                            {evt ? evt.title : evtId}
                          </span>
                          <span className="text-[10px] font-bold text-[#881337] bg-rose-50 px-1.5 py-0.5 rounded ml-auto flex-shrink-0">
                            {evt?.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-sans text-xs sm:text-sm text-neutral-800 font-medium">
                    {submittedRsvp.eventAttendance || "Sending Warm Blessings from Afar"}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-200/60">
                <span className="text-[11px] text-neutral-400 font-sans font-bold uppercase tracking-wider block mb-1">
                  Your Blessing:
                </span>
                <p className="font-serif text-sm sm:text-base text-neutral-800 italic leading-relaxed">
                  "{submittedRsvp.message}"
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-xs font-sans font-semibold text-neutral-700 transition-colors shadow-sm cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Update RSVP & Blessing</span>
            </button>
          </motion.div>
        ) : (
          /* RSVP Form Card */
          <motion.div
            key="form-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-7 sm:p-9 rounded-3xl border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-neutral-900"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-neutral-950 font-bold">
                  RSVP & Warm Wishes
                </h3>
                <p className="text-xs font-sans text-neutral-400">
                  Share your plan and send your blessings for Archita & Rajat
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Your Name / Family Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Uncle Rajesh & Family"
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                  />
                  <User className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Event Attendance Checkboxes (1 checkbox for each event) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#881337]" />
                    <span>Events You Plan to Attend</span>
                  </label>
                  <span className="text-[11px] font-sans text-neutral-400">
                    {selectedEvents.length} of 4 selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {celebrationEvents.map((evt) => {
                    const isChecked = selectedEvents.includes(evt.id);
                    return (
                      <label
                        key={evt.id}
                        className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-[#881337]/5 border-[#881337]/40 shadow-xs'
                            : 'bg-[#FAFAFA] border-neutral-200/80 hover:border-neutral-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleEvent(evt.id)}
                          className="mt-0.5 w-4 h-4 rounded text-[#881337] focus:ring-[#881337] border-neutral-300 cursor-pointer accent-[#881337]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-sans font-semibold leading-tight ${
                                isChecked ? 'text-[#881337]' : 'text-neutral-800'
                              }`}
                            >
                              {evt.title}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-sans text-neutral-400 mt-1">
                            <span>{evt.venue}</span>
                            <span className="font-semibold text-neutral-600 bg-neutral-200/60 px-1.5 py-0.5 rounded text-[10px]">
                              {evt.date}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Recipient Dropdown */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Blessings For
                </label>
                <select
                  value={targetRecipient}
                  onChange={(e) => setTargetRecipient(e.target.value as RecipientSide)}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 transition-all cursor-pointer"
                >
                  <option value="both">Both (Archita & Rajat)</option>
                  <option value="bride">Archita (Bride's Family)</option>
                  <option value="groom">Rajat (Groom)</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Your Message & Blessings *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your heartfelt wishes, prayers, or blessings for the couple..."
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#881337] hover:bg-[#70102E] text-white font-sans text-sm font-bold tracking-wider shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm RSVP & Send Blessings</span>
                  <Send className="w-4 h-4 text-white" />
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-3.5 px-5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-600 text-xs font-sans font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
