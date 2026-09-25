import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuest } from '../../context/GuestContext';
import { WishEntry, RecipientSide } from '../../types/wedding';
import { getStoredWishes, saveWish } from '../../utils/storage';
import { triggerHeartBurst } from '../../utils/confetti';
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
    triggerHeartBurst();

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
      <div className="text-center mb-12">
        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-antique font-semibold">
          Blessings & RSVP
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mt-1">
          Send Your Heartfelt Wishes
        </h2>
        <p className="text-xs sm:text-sm font-sans text-neutral-400 mt-1">
          Share your love and confirm your presence with Rajat & Archita
        </p>
        <div className="w-12 h-0.5 bg-gold-antique/60 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: RSVP & Wish Form (Solid White Modern Card) */}
        <div className="lg:col-span-6 bg-white p-7 sm:p-9 rounded-3xl border border-neutral-200 shadow-2xl text-neutral-900">
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-neutral-100">
            <div className="w-8 h-8 rounded-xl bg-[#8E1722] text-white flex items-center justify-center shadow-sm">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-950 font-bold">
              Guestbook & RSVP
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Your Name / Family Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Uncle Rajesh & Family"
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                />
                <User className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Recipient Dropdown */}
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Recipient *
              </label>
              <select
                value={targetRecipient}
                onChange={(e) => setTargetRecipient(e.target.value as RecipientSide)}
                className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 transition-all cursor-pointer"
              >
                <option value="both">Both Families (Rajat & Archita)</option>
                <option value="groom">Team Groom (Only Rajat)</option>
                <option value="bride">Team Bride (Only Archita)</option>
              </select>
            </div>

            {/* RSVP Attending Radio */}
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    attending === 'yes'
                      ? 'bg-[#8E1722] text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  <span>🎉 Joyfully Accept</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    attending === 'no'
                      ? 'bg-neutral-800 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  <span>🙏 Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Conditional: Guest Count & Dietary if Attending */}
            {attending === 'yes' && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-sans font-semibold text-neutral-700 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-sans focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans font-semibold text-neutral-700 mb-1">
                    Dietary Choice
                  </label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-sans focus:outline-none focus:border-neutral-900 cursor-pointer"
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
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Heartfelt Wish for the Couple *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt blessings, funny advice, or warm wishes here..."
                className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm font-sans focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
              />
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#8E1722] hover:bg-[#A8202D] text-white font-sans text-sm font-semibold tracking-wider shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                  className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Your heartfelt wish and RSVP have been blessed and recorded! ❤️</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right Column: Live Guestbook Wishes Wall (Solid Dark Cards) */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-bold flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>Wishes from Loved Ones</span>
            </h3>
            <span className="text-xs font-sans text-neutral-400">
              {filteredWishes.length} wishes shared
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-5">
            {['all', 'both', 'groom', 'bride'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterSide(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all capitalize ${
                  filterSide === f
                    ? 'bg-white text-neutral-900 font-semibold shadow-sm'
                    : 'bg-[#161620] text-neutral-400 border border-white/10 hover:border-white/30'
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
                className="bg-[#121218] border border-white/10 rounded-2xl p-5 shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-bold text-white">
                      {item.guestName}
                    </span>
                    {item.attending === 'yes' && (
                      <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                        Attending {item.guestCount ? `(${item.guestCount})` : ''}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-sans text-neutral-400 uppercase tracking-wider">
                    To: {item.recipient === 'both' ? 'Couple' : item.recipient}
                  </span>
                </div>

                <p className="font-serif text-sm sm:text-base text-neutral-200 leading-relaxed italic">
                  "{item.message}"
                </p>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-500 font-sans">
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
