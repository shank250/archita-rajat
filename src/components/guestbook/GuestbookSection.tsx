import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuest } from '../../context/GuestContext';
import { WishEntry, RecipientSide } from '../../types/wedding';
import { getStoredWishes, saveWish } from '../../utils/storage';
import { triggerCelebrationFireworks } from '../../utils/confetti';
import { Send, Heart, User, CheckCircle2, MessageSquareHeart } from 'lucide-react';

export const GuestbookSection: React.FC = () => {
  const { guestName, recipientSide, isPersonalized } = useGuest();

  // Form State
  const [name, setName] = useState('');
  const [targetRecipient, setTargetRecipient] = useState<RecipientSide>('both');
  const [message, setMessage] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietary, setDietary] = useState<'vegetarian' | 'non-vegetarian' | 'jain' | 'no-preference'>('vegetarian');

  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filterSide, setFilterSide] = useState<string>('all');

  useEffect(() => {
    if (isPersonalized && guestName) {
      setName(guestName);
    }
    if (recipientSide) {
      setTargetRecipient(recipientSide);
    }
  }, [guestName, recipientSide, isPersonalized]);

  useEffect(() => {
    setWishes(getStoredWishes());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const saved = saveWish({
      guestName: name.trim(),
      recipient: targetRecipient,
      message: message.trim(),
      attending: attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      dietaryPreference: dietary,
    });

    setWishes((prev) => [saved, ...prev]);
    setIsSubmitted(true);
    triggerCelebrationFireworks();

    setMessage('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const filteredWishes = wishes.filter((w) => {
    if (filterSide === 'all') return true;
    return w.recipient === filterSide || w.recipient === 'both';
  });

  return (
    <section id="guestbook" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#881337] font-bold">
          Blessings & RSVP
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-bold mt-1">
          Send Your Heartfelt Wishes
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-500 mt-1">
          Share your love and confirm your presence with Rajat & Archita
        </p>
        <div className="w-12 h-0.5 bg-[#881337] rounded-full mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: RSVP & Wish Form */}
        <div className="lg:col-span-6 bg-white p-7 sm:p-9 rounded-3xl border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-neutral-900">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-neutral-100">
            <div className="w-9 h-9 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center shadow-sm">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-950 font-bold">
              Guestbook & RSVP
            </h3>
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

            {/* Recipient Dropdown */}
            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Recipient *
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

            {/* RSVP Attending Radio */}
            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all ${
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
                  className={`py-2.5 px-3 rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all ${
                    attending === 'no'
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Conditional: Guest Count & Dietary if Attending */}
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
                    Dietary Choice
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

            {/* Message Field */}
            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Heartfelt Wish for the Couple *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt blessings, funny advice, or warm wishes here..."
                className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
              />
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#881337] hover:bg-[#70102E] text-white font-sans text-sm font-bold tracking-wider shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Your Wishes</span>
              <Send className="w-4 h-4 text-white" />
            </button>

            {/* Success Toast Banner */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3.5 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs font-sans font-bold flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#881337] flex-shrink-0" />
                  <span>Your wish and RSVP have been recorded! Thank you.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right Column: Live Guestbook Wishes Wall */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-bold flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#881337] fill-current" />
              <span>Wishes from Loved Ones</span>
            </h3>
            <span className="text-xs font-sans text-neutral-500 font-medium">
              {filteredWishes.length} wishes shared
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-5">
            {['all', 'both', 'groom', 'bride'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterSide(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all capitalize ${
                  filterSide === f
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {f === 'all' ? 'All Wishes' : f === 'both' ? 'Both' : `Team ${f}`}
              </button>
            ))}
          </div>

          {/* Scrollable Wishes Feed */}
          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredWishes.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-bold text-neutral-900">
                      {item.guestName}
                    </span>
                    {item.attending === 'yes' && (
                      <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 font-bold">
                        Attending {item.guestCount ? `(${item.guestCount})` : ''}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-sans text-neutral-400 uppercase tracking-wider font-semibold">
                    To: {item.recipient === 'both' ? 'Couple' : item.recipient}
                  </span>
                </div>

                <p className="font-serif text-sm sm:text-base text-neutral-700 leading-relaxed italic">
                  "{item.message}"
                </p>

                <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 font-sans">
                  <span>✦ Warm wishes</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
