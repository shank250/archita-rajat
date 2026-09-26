import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuest } from '../../context/GuestContext';
import { WishEntry } from '../../types/wedding';
import { coupleData } from '../../data/weddingData';
import { getStoredUserRsvp, saveUserRsvp } from '../../utils/storage';
import { sendRsvpToWebhook } from '../../utils/webhook';
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
  const { guestName, isPersonalized } = useGuest();

  // Form State
  const [name, setName] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'engagement',
    'mehndi',
    'sangeet',
    'wedding',
  ]);
  const [message, setMessage] = useState('');

  const [submittedRsvp, setSubmittedRsvp] = useState<WishEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setMessage(existing.message);
    } else if (isPersonalized && guestName) {
      setName(guestName);
    }
  }, [guestName, isPersonalized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const eventAttendanceText =
      selectedEvents.length === 4
        ? 'All Celebrations (23 Oct, 28, 29 & 30 Nov)'
        : selectedEvents.length === 0
        ? 'Sending Warm Blessings from Afar'
        : selectedEvents
            .map((id) => celebrationEvents.find((e) => e.id === id)?.title)
            .filter(Boolean)
            .join(', ');

    const payload = {
      guestName: name.trim(),
      recipient: 'both' as const,
      eventsAttending: selectedEvents,
      eventAttendance: eventAttendanceText,
      message: message.trim(),
    };

    // 1. Save locally for instantaneous confirmation
    const saved = saveUserRsvp(payload);

    // 2. Dispatch to Google Apps Script webhook
    try {
      await sendRsvpToWebhook(payload);
    } catch (err) {
      console.error('Webhook dispatch error:', err);
    } finally {
      setIsSubmitting(false);
    }

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
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-secondary font-bold">
          RSVP &amp; Wishes
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold mt-1">
          {submittedRsvp && !isEditing ? "RSVP & Blessings Received" : "RSVP & Blessings"}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-text-sub mt-1 max-w-md mx-auto">
          {submittedRsvp && !isEditing
            ? "Your attendance and warm wishes have been conveyed to Archita & Rajat"
            : "Confirm your attendance and share your blessings for the couple"}
        </p>
        <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mt-3" />
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
            className="bg-card-surface p-7 sm:p-9 rounded-3xl border border-theme-border shadow-card-subtle text-text-body text-center"
          >
            <div className="w-14 h-14 rounded-full bg-surface-subtle border border-theme-border text-primary flex items-center justify-center mx-auto mb-4 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>

            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-secondary">
              RSVP Confirmed
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold mt-1">
              Thank You, {submittedRsvp.guestName}!
            </h3>

            <p className="text-xs font-sans text-text-sub mt-1">
              Archita &amp; Rajat look forward to celebrating with you!
            </p>

            {/* Attendance & Message Details Box */}
            <div className="my-6 p-5 rounded-2xl bg-surface-subtle border border-theme-border text-left space-y-3.5">
              <div>
                <span className="text-[11px] text-primary font-sans font-bold uppercase tracking-wider block mb-2">
                  Attending Celebrations:
                </span>
                {submittedRsvp.eventsAttending && submittedRsvp.eventsAttending.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {submittedRsvp.eventsAttending.map((evtId) => {
                      const evt = celebrationEvents.find((e) => e.id === evtId);
                      return (
                        <div
                          key={evtId}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-card-surface border border-theme-border text-xs font-sans text-text-body shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="font-semibold text-text-body truncate">
                            {evt ? evt.title : evtId}
                          </span>
                          <span className="text-[10px] font-bold text-secondary bg-surface-highlight px-1.5 py-0.5 rounded ml-auto flex-shrink-0">
                            {evt?.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-sans text-xs sm:text-sm text-text-body font-medium">
                    {submittedRsvp.eventAttendance || "Sending Warm Blessings from Afar"}
                  </p>
                )}
              </div>

              {submittedRsvp.message && (
                <div className="pt-3 border-t border-theme-border">
                  <span className="text-[11px] text-primary font-sans font-bold uppercase tracking-wider block mb-1">
                    Your Blessing:
                  </span>
                  <p className="font-serif text-sm sm:text-base text-text-body italic leading-relaxed">
                    "{submittedRsvp.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Edit Button & Hashtag Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 hand-drawn-pill border-brand-blue/40 bg-card-surface hover:bg-surface-subtle text-xs font-sans font-bold text-primary transition-colors shadow-xs cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Update RSVP &amp; Blessing</span>
              </button>
              <span className="text-xs font-sans font-bold text-secondary tracking-wider px-3.5 py-1.5 hand-drawn-pill bg-surface-subtle border-theme-border">
                {coupleData.hashtag}
              </span>
            </div>
          </motion.div>
        ) : (
          /* RSVP Form Card */
          <motion.div
            key="form-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-card-surface p-7 sm:p-9 rounded-3xl border border-theme-border shadow-card-subtle text-text-body"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme-border">
              <div className="w-10 h-10 rounded-2xl bg-surface-subtle text-primary flex items-center justify-center shadow-xs">
                <HeartHandshake className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-primary font-bold">
                  RSVP &amp; Warm Wishes
                </h3>
                <p className="text-xs font-sans text-text-sub">
                  Share your plan and send your blessings for Archita &amp; Rajat
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-text-body mb-1.5">
                  Your Name / Family Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Uncle Rajesh & Family"
                    className="w-full px-4 py-3 rounded-2xl border border-theme-border bg-surface-subtle text-text-body text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <User className="absolute right-3.5 top-3.5 w-4 h-4 text-text-sub pointer-events-none" />
                </div>
              </div>

              {/* Event Attendance Checkboxes (1 checkbox for each event) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-sans font-bold uppercase tracking-wider text-text-body flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>Events You Plan to Attend</span>
                  </label>
                  <span className="text-[11px] font-sans text-text-sub">
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
                            ? 'bg-surface-highlight/70 border-primary shadow-xs'
                            : 'bg-surface border-theme-border hover:border-primary/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleEvent(evt.id)}
                          className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary border-theme-border cursor-pointer accent-primary"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-sans font-bold leading-tight ${
                                isChecked ? 'text-primary' : 'text-text-body'
                              }`}
                            >
                              {evt.title}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-sans text-text-sub mt-1">
                            <span>{evt.venue}</span>
                            <span className="font-bold text-secondary bg-surface-highlight px-1.5 py-0.5 rounded text-[10px]">
                              {evt.date}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-text-body mb-1.5">
                  Your Message &amp; Blessings (Optional)
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Write your heartfelt wishes, prayers, or blessings for the couple... ${coupleData.hashtag}`}
                  className="w-full px-4 py-3 rounded-2xl border border-theme-border bg-surface-subtle text-text-body text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 hand-drawn-pill bg-primary hover:bg-primary-hover border-brand-blue-hover disabled:opacity-60 text-white font-sans text-sm font-bold tracking-wider shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Recording RSVP...' : 'Confirm RSVP & Send Blessings'}</span>
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-3.5 px-5 hand-drawn-pill border-brand-blue/30 bg-card-surface hover:bg-surface-subtle text-text-body text-xs font-sans font-semibold transition-colors cursor-pointer shadow-xs"
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
