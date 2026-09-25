import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuest } from '../../context/GuestContext';
import { WishEntry, RecipientSide } from '../../types/wedding';
import { getStoredUserRsvp, saveUserRsvp } from '../../utils/storage';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { Send, User, CheckCircle2, HeartHandshake, Edit3 } from 'lucide-react';

export const GuestbookSection: React.FC = () => {
  const { guestName, recipientSide, isPersonalized } = useGuest();

  // Form State
  const [name, setName] = useState('');
  const [targetRecipient, setTargetRecipient] = useState<RecipientSide>('both');
  const [message, setMessage] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietary, setDietary] = useState<'vegetarian' | 'non-vegetarian' | 'jain' | 'no-preference'>('vegetarian');

  const [submittedRsvp, setSubmittedRsvp] = useState<WishEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const existing = getStoredUserRsvp();
    if (existing) {
      setSubmittedRsvp(existing);
      setName(existing.guestName);
      setTargetRecipient(existing.recipient);
      setMessage(existing.message);
      if (existing.attending === 'yes' || existing.attending === 'no') {
        setAttending(existing.attending);
      }
      if (existing.guestCount) {
        setGuestCount(existing.guestCount);
      }
      if (existing.dietaryPreference) {
        setDietary(existing.dietaryPreference);
      }
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

    const saved = saveUserRsvp({
      guestName: name.trim(),
      recipient: targetRecipient,
      message: message.trim(),
      attending: attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      dietaryPreference: dietary,
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
          RSVP & Blessings
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-bold mt-1">
          {submittedRsvp && !isEditing ? "Your Response Received" : "Confirm Your Attendance"}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1">
          {submittedRsvp && !isEditing
            ? "Thank you for confirming your presence with Rajat & Archita"
            : "Kindly let us know if you will be celebrating with us"}
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
              Your response has been registered.
            </p>

            {/* Response Details Box */}
            <div className="my-6 p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 text-left space-y-3">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-neutral-500 font-medium">Status</span>
                <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                  submittedRsvp.attending === 'yes'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-neutral-200 text-neutral-800'
                }`}>
                  {submittedRsvp.attending === 'yes' ? 'Joyfully Attending' : 'Regretfully Declined'}
                </span>
              </div>

              {submittedRsvp.attending === 'yes' && (
                <>
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-neutral-500 font-medium">Number of Guests</span>
                    <span className="font-bold text-neutral-900">{submittedRsvp.guestCount || 1} Person(s)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-neutral-500 font-medium">Dietary Preference</span>
                    <span className="font-bold text-neutral-900 capitalize">{submittedRsvp.dietaryPreference || 'Vegetarian'}</span>
                  </div>
                </>
              )}

              <div className="pt-2 border-t border-neutral-200/70">
                <span className="text-xs text-neutral-500 font-sans font-medium block mb-1">
                  Your Heartfelt Blessing:
                </span>
                <p className="font-serif text-sm text-neutral-800 italic leading-relaxed">
                  "{submittedRsvp.message}"
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-xs font-sans font-semibold text-neutral-700 transition-colors shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Update My RSVP</span>
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
                  RSVP Form
                </h3>
                <p className="text-xs font-sans text-neutral-400">
                  Please respond for you and your family
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

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Will you be attending? *
                </label>
                <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      attending === 'yes'
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    <span>Joyfully Accept</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      attending === 'no'
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Guest Count & Dietary if Attending */}
              {attending === 'yes' && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-sans font-bold text-neutral-700 mb-1">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#FAFAFA] text-sm font-sans focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-bold text-neutral-700 mb-1">
                      Dietary Preference
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#FAFAFA] text-xs font-sans focus:outline-none focus:border-neutral-900 cursor-pointer"
                    >
                      <option value="vegetarian">Vegetarian</option>
                      <option value="non-vegetarian">Non-Vegetarian</option>
                      <option value="jain">Pure Jain</option>
                      <option value="no-preference">No Preference</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Recipient Dropdown */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Blessings For *
                </label>
                <select
                  value={targetRecipient}
                  onChange={(e) => setTargetRecipient(e.target.value as RecipientSide)}
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 transition-all cursor-pointer"
                >
                  <option value="both">Both Families (Rajat & Archita)</option>
                  <option value="groom">Team Groom (Only Rajat)</option>
                  <option value="bride">Team Bride (Only Archita)</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Your Blessing & Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your warm blessings or advice for Rajat & Archita..."
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                />
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#881337] hover:bg-[#70102E] text-white font-sans text-sm font-bold tracking-wider shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit RSVP</span>
                  <Send className="w-4 h-4 text-white" />
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-3.5 px-5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-600 text-xs font-sans font-semibold transition-colors"
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
