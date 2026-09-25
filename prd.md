# Product Requirement Document (PRD): Interactive Wedding / Engagement RSVP & Experience Web App

---

## 1. Executive Summary & Design Philosophy

This PRD outlines an interactive, story-driven digital wedding and engagement invitation web application inspired by the modern animated card experience. The site transforms a standard invitation into an immersive digital journey featuring custom guest-level personalization, narrative timelines, interactive reveal mechanics (wax seals, scratch cards), dynamic itineraries, calendar integrations, and real-time guestbook/wishes submissions.

### Visual Style & Aesthetic

* **Core Style:** Warm Indian luxury paired with modern editorial minimalism.


* **Texture & Lighting:** Deep dark matte backgrounds overlaid with fine golden stardust particles, floating bokeh, and rich parchment/cream modal cards.


* **Motion & Feel:** Smooth physics-based transitions (envelope opening, confetti bursts, horizontal timeline scrubbing, wax seal tap feedback).


* **Typography:** Elegant high-contrast serif headlines (e.g., Cormorant Garamond, Playfair Display, Cinzel Decorative) paired with clean geometric sans-serif body text (e.g., Montserrat, Inter).



---

## 2. Color Palette & Theming Tokens

| Role | Color Name | Hex Code | Usage |
| --- | --- | --- | --- |
| **Primary Background** | Royal Dark Espresso / Midnight Bronze | `#15100D` – `#1C1512` | Main page body, night theme backgrounds, story card backdrop

 |
| **Surface / Card** | Antique Cream / Warm Parchment | `#FDF8F0` – `#FAF1E4` | Interactive cards, modal drawers, invitation card face

 |
| **Accent / Metallic** | Royal Antique Gold | `#D4AF37` – `#E5C378` | Ganesha motif, borders, CTAs, headings, timeline markers

 |
| **Feature Accent** | Deep Burgundy / Crimson Wax | `#6B1D24` – `#85222B` | Digital wax seal, primary action buttons, alert labels

 |
| **Text Primary** | Deep Bronze Charcoal | `#2B231D` | Text on cream cards and modals

 |
| **Text Inverted** | Soft Champagne / Warm White | `#F5EFEB` | Text on dark backgrounds

 |
| **Muted Accents** | Warm Gold Dust / Champagne Mica | `rgba(212, 175, 55, 0.3)` | Sparkles, divider lines, trailing particles

 |

---

## 3. Core Features & Section Breakdown

### 3.1. Dynamic URL-Based Personalization Engine

* **Query Parameter Ingestion:**
* Accept parameters such as `?guest=Chacha+ji+and+Chachi+ji&to=groom` or hash-encoded tokens.




* **Dynamic Content Injection:**
* Landing screen welcome text: `"Welcome, [Guest Name]"`.


* Formal invite section: `"Respected [Guest Name], with the blessings of the Almighty..."`.




* **Fallbacks:** Defaults to `"Family & Friends"` if parameters are missing.

---

### 3.2. Section 1: Hero & Animated Envelope Unveiling

* **Pre-Open View:**
* Centered golden Lord Ganesha iconography with sacred shloka (`ॐ गं गणपतये नमः`).


* Personalized teaser banner: `"Welcome, [Guest Name] — Tap here to open invite"`.


* 3D animated illustration featuring caricatures/avatars of the bride & groom swinging on floral/golden ropes.


* Closed burgundy envelope with a custom-stamped circular wax seal reading the couple hashtag (e.g., `#Shaya`).




* **Interactive Trigger & Animation:**
* Tapping the wax seal triggers a golden sparkle/particle explosion, opens the envelope flap, and slides out an embossed wedding card upwards while background instrumental music (e.g., Ritviz-style acoustic/electronic fusion) fades in.





---

### 3.3. Section 2: Formal Invitation Card

* **Content:**
* Personalized salutation: `"Respected [Guest Name]"`.


* Formal host invitation copy from parents and grandparents.


* Names of the couple: Groom & Bride with family lineage.




* **Visual Elements:**
* Warm cream parchment background texture with thin golden filigree framing.


* Subtle animated `"Keep Scrolling"` downward chevron prompt.





---

### 3.4. Section 3: Interactive Visual Storyboard ("Our Story")

* **Format:** Multi-slide horizontal swipe/snap carousel or vertical scroll-lock presentation.


* **Slide Structure:**
* **Frame 1 (Childhood):** Vintage-framed polaroid childhood photos of both individuals side by side with witty captions.


* **Frame 2 (Independent Lives):** Pictures showcasing their journeys across cities (e.g., Bangalore, Delhi) before meeting.


* **Frame 3 (The Meeting & Spark):** Casual couple photos, late-night call memories, and story narration.


* **Frame 4 (The Proposal / Realization):** Visual transition leading up to the decision to get engaged/married.




* **Components:** Numbered chapter badges (e.g., `03 — THE BIG REVEAL`, `05 — MEANWHILE IN BENGALURU`, `07 — FATE`).



---

### 3.5. Section 4: Scratch-to-Reveal Event Date

* **Visual:** Golden textured scratch card banner with prompt `"Scratch to Reveal Date"`.


* **Interaction (HTML5 Canvas / Shaders):**
* Guest swipes/drags on touch or desktop mouse cursor across the metallic card surface.


* At $\ge 50\%$ clearance, the overlay dissolves with a confetti burst animation.




* **Hidden Content:**
* Revealed date: e.g., `"30th November 2026"`.


* Animated celebration particles.





---

### 3.6. Section 5: Dynamic Itinerary & Timeline ("The Evening Unfolds")

* **Navigation:** Horizontal time-scrubber track with interactive time nodes (`6:30 PM`, `7:00 PM`, `8:00 PM`, `9:30 PM`, `10:00 PM`).


* **Event Cards (Auto-swiping on scroll):**
* `6:30 PM`: Welcome & Guest Arrival.


* `7:00 PM`: Groom & Bride Grand Entry.


* `8:00 PM`: Ring Ceremony, Performances & Speeches.


* `9:30 PM`: Cake Cutting & Dance Floor Opening.


* `10:00 PM`: Dinner Buffet Opens.




* **Styling:** Floating timestamps, gold-highlighted active dots, and brief descriptions for each milestone.



---

### 3.7. Section 6: Action Hub ("Plan Your Evening")

Three high-affordance rounded utility cards:

1. **Save the Date:**
* One-click action generating an `.ics` calendar file download or direct Google/Apple Calendar links pre-filled with event details and reminders.




2. **Join Group (WhatsApp Community):**
* Direct deep-link redirecting guests to the private family/wedding updates WhatsApp group.




3. **Venue & Directions:**
* Displays venue name and address (e.g., *MB Clarks Inn, Rampur Road*).


* Tapping opens a bottom drawer/modal with an image preview and direct redirect buttons to Google Maps & Apple Maps.





---

### 3.8. Section 7: Interactive Guestbook & Wishes ("Send a Wish")

* **Form Elements:**
* `Your Name`: Pre-populated from URL query params or manually editable.


* `Recipient Dropdown`: Select target (e.g., *Both Families*, *Only the Bride*, *Only the Groom*).


* `Message Field`: Multiline text area with prompt `"Write your heartfelt wish for the couple..."`.


* `Submit CTA`: Crimson pill button `"Send Your Wishes →"`.




* **Success State:** Toast notification with floating heart emojis and real-time backend persistence (Supabase / Firebase / Google Sheets API).

---

## 4. Technical Architecture & Implementation Stack

### Recommended Frontend Stack

* **Framework:** Next.js (App Router) or Vite + React for lightweight mobile rendering.
* **Styling:** Tailwind CSS with custom CSS theme extensions for gold gradients and warm paper shadows.
* **Motion & Gestures:**
* `Framer Motion` for page scrolls, envelope unfold animations, and horizontal timeline snapping.
* `Canvas-Confetti` for celebratory unlocks.
* Native HTML5 `<canvas>` with globalCompositeOperation (`destination-out`) for the touch scratchcard.


* **Audio:** Howler.js or native Web Audio API managing background tracks with user-gesture autoplay compliance and mute/unmute floating toggles.



### Key Data Schema (JSON Spec)

```json
{
  "couple": {
    "groom": "Rajat",
    "bride": "Archita",
    "hashtag": "#AR"
  },
  "event": {
    "type": "Engagement Ceremony",
    "date": "2026-10-23",
    "startTime": "18:00",
    "endTime": "23:59",
    "venue": {
      "name": "Elegance Hotel",
      "address": "DLW Road",
      "googleMapsUrl": "https://maps.google.com/..."
    }
  },
  "itinerary": [
    { "time": "6:30 PM", "title": "Guest Welcome", "description": "Arrival and welcome drinks." },
    { "time": "8:00 PM", "title": "Ring Ceremony", "description": "Ring exchange & performances begin." },
    { "time": "10:00 PM", "title": "Dinner Opens", "description": "A lavish spread awaits." }
  ]
}

```

---

## 5. Suggested Enhancements for a "V2" Better Version

* **Two-Way RSVP Confirmation:** Add an explicit RSVP block (Attending: Yes / No / Count of Adults & Children / Dietary Restrictions) feeding directly to a planner spreadsheet.

