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

  // Pre-fill name and side when context changes
  useEffect(() => {
    if (isPersonalized && guestName) {
      setName(guestName);
    }
    if (recipientSide) {
      setTargetRecipient(recipientSide);
    }
  }, [guestName, recipientSide, isPersonalized]);

  // Load initial wishes from localStorage
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

    // Reset message field
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
    <section id="guestbook" className="relative py-16 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-serif uppercase tracking-[0.3em] text-gold-antique">
          Blessings & RSVP
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-bold mt-1">
          Send Your Heartfelt Wishes
        </h2>
        <p className="text-xs sm:text-sm font-serif italic text-champagne-muted mt-1">
          Share your love and confirm your presence with Rajat & Archita
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-antique to-transparent mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: RSVP & Wish Form */}
        <div className="lg:col-span-6 bg-parchment-cream p-6 sm:p-8 rounded-2xl border-2 border-gold-antique/40 shadow-parchment text-charcoal-bronze">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold-antique/20">
            <MessageSquareHeart className="w-5 h-5 text-crimson-wax" />
            <h3 className="font-serif text-xl text-amber-950 font-bold">
              Guestbook & RSVP
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-charcoal-bronze mb-1">
                Your Name / Family Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Uncle Rajesh & Family"
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-900/20 bg-amber-50/50 text-charcoal-bronze text-sm font-serif focus:outline-none focus:border-gold-antique focus:ring-1 focus:ring-gold-antique transition-all"
                />
                <User className="absolute right-3 top-3 w-4 h-4 text-amber-900/40 pointer-events-none" />
              </div>
            </div>

            {/* Recipient Dropdown */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-charcoal-bronze mb-1">
                Recipient *
              </label>
              <select
                value={targetRecipient}
                onChange={(e) => setTargetRecipient(e.target.value as RecipientSide)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-900/20 bg-amber-50/50 text-charcoal-bronze text-sm font-serif focus:outline-none focus:border-gold-antique transition-all"
              >
                <option value="both">Both Families (Rajat & Archita)</option>
                <option value="groom">Team Groom (Only Rajat)</option>
                <option value="bride">Team Bride (Only Archita)</option>
              </select>
            </div>

            {/* RSVP Attending Radio */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-charcoal-bronze mb-1.5">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2 px-3 rounded-xl border text-xs font-serif font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    attending === 'yes'
                      ? 'bg-amber-900 text-gold-light border-amber-950 shadow-sm'
                      : 'bg-amber-50 border-amber-900/20 text-charcoal-muted hover:bg-amber-100'
                  }`}
                >
                  <span>🎉 Joyfully Accept</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-2 px-3 rounded-xl border text-xs font-serif font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    attending === 'no'
                      ? 'bg-amber-900 text-gold-light border-amber-950 shadow-sm'
                      : 'bg-amber-50 border-amber-900/20 text-charcoal-muted hover:bg-amber-100'
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
                  <label className="block text-xs font-serif font-bold text-charcoal-bronze mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl border border-amber-900/20 bg-amber-50/50 text-sm font-serif focus:outline-none focus:border-gold-antique"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif font-bold text-charcoal-bronze mb-1">
                    Dietary Choice
                  </label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-amber-900/20 bg-amber-50/50 text-xs font-serif focus:outline-none focus:border-gold-antique"
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
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-charcoal-bronze mb-1">
                Heartfelt Wish for the Couple *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt blessings, funny advice, or warm wishes here..."
                className="w-full px-4 py-2.5 rounded-xl border border-amber-900/20 bg-amber-50/50 text-charcoal-bronze text-sm font-serif focus:outline-none focus:border-gold-antique focus:ring-1 focus:ring-gold-antique transition-all"
              />
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full bg-crimson-gradient text-gold-light font-serif text-sm font-semibold tracking-wider shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-red-950/40 cursor-pointer"
            >
              <span>Send Your Wishes</span>
              <Send className="w-4 h-4 text-gold-light" />
            </button>

            {/* Success Toast Banner */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-serif flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Your heartfelt wish and RSVP have been blessed and recorded! ❤️</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right Column: Live Guestbook Wishes Wall */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl text-champagne font-bold flex items-center gap-2">
              <Heart className="w-4 h-4 text-crimson-light fill-current" />
              <span>Wishes from Loved Ones</span>
            </h3>
            <span className="text-xs font-serif text-gold-light/70">
              {filteredWishes.length} wishes shared
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-4">
            {['all', 'both', 'groom', 'bride'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterSide(f)}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-colors capitalize ${
                  filterSide === f
                    ? 'bg-gold-antique text-espresso font-semibold'
                    : 'bg-espresso-surface text-champagne-muted border border-gold-antique/30 hover:border-gold-antique'
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
                className="bg-espresso-surface/85 border border-gold-antique/25 rounded-xl p-4 backdrop-blur-sm shadow-md"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-bold text-gold-light">
                      {item.guestName}
                    </span>
                    {item.attending === 'yes' && (
                      <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                        Attending {item.guestCount ? `(${item.guestCount})` : ''}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-serif text-champagne-muted uppercase tracking-wider">
                    To: {item.recipient === 'both' ? 'Couple' : item.recipient}
                  </span>
                </div>

                <p className="font-serif text-xs sm:text-sm text-champagne/90 leading-relaxed italic">
                  "{item.message}"
                </p>

                <div className="mt-2 pt-2 border-t border-gold-antique/10 flex items-center justify-between text-[10px] text-champagne-muted font-sans">
                  <span>✨ Warm wishes</span>
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
