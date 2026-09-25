# Royal Vows — Interactive Wedding & Engagement RSVP Web App

An interactive, story-driven digital wedding and engagement invitation web application with warm Indian luxury aesthetics paired with modern editorial minimalism.

---

## 🌟 Features Implemented

1. **Dynamic URL Personalization Engine (`src/context/GuestContext.tsx`):**
   - Automatically adapts salutations and content for specific guests.
   - Example URLs:
     - `http://localhost:3000/?guest=Chacha+ji+and+Chachi+ji&to=groom`
     - `http://localhost:3000/?guest=Dr.+Verma+and+Family&to=bride`
     - `http://localhost:3000/?guest=Pooja+and+Sameer`
   - Graceful fallback to `"Family & Friends"` when parameters are absent.

2. **Section 1: Hero & Animated Envelope Unveiling (`src/components/hero/`):**
   - Centered golden Lord Ganesha iconography with sacred shloka (`ॐ श्री गणेशाय नमः`).
   - Couple caricature swing animation with gentle physics.
   - Closed royal burgundy envelope with stamped 3D wax seal (`#RajatWedsArchita` / `R & A`).
   - Tapping the wax seal triggers golden sparkle explosions, 3D envelope flap opening, and ambient instrumental music fade-in.

3. **Section 2: Formal Invitation Parchment Card (`src/components/invitation/`):**
   - Warm antique parchment texture framed with traditional golden filigree borders.
   - Personalized salutation (`Respected [Guest Name],`).
   - Formal parental and ancestral blessing copy with groom & bride family lineage.
   - Pulsing downward scroll guidance.

4. **Section 3: Interactive Visual Storyboard (`src/components/story/`):**
   - Multi-chapter story carousel with numbered badges:
     - `01 — CHILDHOOD CHRONICLES` (Rajat and Archita childhood polaroids with witty captions)
     - `02 — INDEPENDENT JOURNEYS` (Life before meeting across Delhi & Bengaluru)
     - `03 — THE SPARK & CONNECTION` (First dates and endless conversations)
     - `04 — THE BIG PROMISE` (Two families, one union)
   - Tilt-effect polaroids and chapter navigation.

5. **Section 4: Scratch-to-Reveal Event Date (`src/components/scratch/`):**
   - Real-time HTML5 Canvas metallic gold scratchpad.
   - Swipe/drag scratching with `destination-out` composite operation.
   - Reaching $\ge 50\%$ clearance triggers a dual-cannon celebration fireworks/confetti burst.
   - Instant reveal and reset options.

6. **Section 5: Dynamic Itinerary & Timeline (`src/components/itinerary/`):**
   - Horizontal time-scrubber track with interactive milestone nodes (`6:30 PM`, `7:15 PM`, `8:00 PM`, `9:15 PM`, `10:00 PM`).
   - Animated showcase cards detailing arrival, entry, ring ceremony, cake cutting, and dinner buffet.

7. **Section 6: Action Hub (`src/components/actions/`):**
   - **Save the Date:** Generates `.ics` download for Apple/Outlook calendar and direct link to Google Calendar with prefilled event details.
   - **WhatsApp Community:** One-tap link to join wedding updates group.
   - **Venue & Directions:** Bottom sheet drawer modal with venue details and direct Google & Apple Maps buttons.

8. **Section 7: Interactive Guestbook & RSVP (`src/components/guestbook/`):**
   - Guest name prefilled from URL or editable.
   - Recipient targeting (Both Families, Team Groom, Team Bride).
   - Joyfully Accept / Regretfully Decline toggle.
   - Number of guests & dietary choices (Vegetarian, Non-Vegetarian, Jain, No Preference).
   - Heartfelt wishes message field.
   - Submission triggers floating heart bursts and saves to local storage with live feed display.

9. **Ambient Audio & Visuals (`src/components/common/`):**
   - Floating music toggle with animated soundwave equalizer bars.
   - Web Audio API gentle Indian classical synth fallback + MP3 support.
   - Golden stardust particles and ambient bokeh drifting across the royal espresso matte backdrop.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 18 + Vite 5 + TypeScript
- **Styling:** Tailwind CSS (Custom luxury color tokens, parchment textures, gold gradients)
- **Animation & Motion:** Framer Motion + Canvas-Confetti
- **Audio:** Web Audio API synth + HTML5 Audio
- **Icons:** Lucide React

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
```
Build output is generated into the `dist/` directory, optimized and ready for zero-config hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

### Preview Production Build
```bash
npm run preview
```
