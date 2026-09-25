import { CoupleProfile, EventDetails, StorySlide, WeddingEvent, VenueInfo } from '../types/wedding';

export const coupleData: CoupleProfile = {
  groom: {
    firstName: "Rajat",
    fullName: "Rajat Ranjan",
    parents: "Madhu Sinha & Ritu Ranjan Sinha",
    bio: "Tech enthusiast, passionate foodie, and the guy who fell hopelessly in love.",
  },
  bride: {
    firstName: "Archita",
    fullName: "Archita Srivastava",
    parents: "Prem Lata Srivastava & Pramendra Kumar Srivastava",
    bio: "Creative soul, travel lover, and the bride who stole Rajat's heart.",
  },
  hashtag: "#ArchitaWedsRajat",
  monogram: "A & R",
  ceremonyTitle: "The Wedding Celebrations",
  formalSalutationDefault: "Family & Friends",
};

export const venuesList: VenueInfo[] = [
  {
    name: "Krishna Lawn",
    type: "The Grand Wedding Lawn",
    tagline: "Venue for The Grand Wedding (30 Nov)",
    address: "Krishna Lawn",
    city: "Gwalior, Madhya Pradesh",
    landmark: "Main Road",
    googleMapsUrl: "https://maps.google.com/?q=Krishna+Lawn+Gwalior",
    appleMapsUrl: "https://maps.apple.com/?q=Krishna+Lawn+Gwalior",
  },
  {
    name: "Elegance Hotel",
    type: "Luxury Hotel & Banquet",
    tagline: "Venue for Engagement & Ring Ceremony (23 Oct)",
    address: "Hotel Elegance, City Centre",
    city: "Gwalior, Madhya Pradesh",
    landmark: "Near City Centre",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Elegance+Gwalior",
    appleMapsUrl: "https://maps.apple.com/?q=Hotel+Elegance+Gwalior",
  },
  {
    name: "Shital Niwas",
    type: "Family Residence",
    tagline: "Venue for Mehndi & Ladies Sangeet (28 & 29 Nov)",
    address: "Shital Niwas",
    city: "Gwalior, Madhya Pradesh",
    landmark: "Our Home",
    googleMapsUrl: "https://maps.google.com/?q=Shital+Niwas+Gwalior",
    appleMapsUrl: "https://maps.apple.com/?q=Shital+Niwas+Gwalior",
  },
];

export const weddingEvents: WeddingEvent[] = [
  {
    id: "engagement",
    title: "Engagement & Ring Ceremony",
    category: "The Ring Exchange",
    shortDate: "23 OCT",
    dayOfWeek: "Friday",
    fullDateText: "Friday, 23rd October 2026",
    timeRange: "7:00 PM Onwards",
    tagline: "The beginning of forever with rings, toasts, and music",
    dressCode: "Cocktail Chic / Indo-Western Festive",
    venue: venuesList[1], // Elegance Hotel
    calendarStartDate: "20261023T190000",
    calendarEndDate: "20261023T235900",
    milestones: [
      {
        time: "7:00",
        period: "PM",
        title: "Welcome Drinks & Appetizers",
        description: "Guests arrive to sparkling welcome drinks, fine hors d'oeuvres, and acoustic melodies.",
        iconName: "Sparkles",
      },
      {
        time: "8:00",
        period: "PM",
        title: "Ring Exchange & Family Speeches",
        description: "The moment of commitment — Archita and Rajat exchange rings amidst the blessings of loved ones.",
        iconName: "HeartHandshake",
      },
      {
        time: "9:00",
        period: "PM",
        title: "Celebratory Toast & Royal Dinner",
        description: "A lavish dinner buffet featuring chef-curated delicacies and celebratory music.",
        iconName: "UtensilsCrossed",
      },
    ],
  },
  {
    id: "mehndi",
    title: "Mehndi & Haldi Rasam",
    category: "Pre-Wedding Rasam",
    shortDate: "28 NOV",
    dayOfWeek: "Saturday",
    fullDateText: "Saturday, 28th November 2026",
    timeRange: "3:00 PM Onwards",
    tagline: "Auspicious henna art, sacred haldi & lively dhol rhythms",
    dressCode: "Sunny Yellows, Henna Greens & Festive Florals",
    venue: venuesList[2], // Shital Niwas
    calendarStartDate: "20261128T150000",
    calendarEndDate: "20261128T200000",
    milestones: [
      {
        time: "3:00",
        period: "PM",
        title: "Dhol Welcome & Floral Haldi",
        description: "Joyful arrival of family with traditional Punjabi dhol and auspicious floral haldi blessings.",
        iconName: "Flame",
      },
      {
        time: "4:30",
        period: "PM",
        title: "Henna Art & Folk Anthems",
        description: "Intricate bridal mehndi application alongside expert mehndi artists for all attending guests.",
        iconName: "Sparkles",
      },
      {
        time: "6:30",
        period: "PM",
        title: "High Tea & Chaat Bazaar",
        description: "Artisanal street food delicacies, piping hot jalebis, and celebratory snacks.",
        iconName: "UtensilsCrossed",
      },
    ],
  },
  {
    id: "sangeet",
    title: "Ladies Sangeet & Musical Night",
    category: "Music & Dance",
    shortDate: "29 NOV",
    dayOfWeek: "Sunday",
    fullDateText: "Sunday, 29th November 2026",
    timeRange: "7:00 PM Onwards",
    tagline: "An electrifying evening of family performances & dance battles",
    dressCode: "Glamorous Ethnic & Sparkle",
    venue: venuesList[2], // Shital Niwas
    calendarStartDate: "20261129T190000",
    calendarEndDate: "20261129T235900",
    milestones: [
      {
        time: "7:00",
        period: "PM",
        title: "Cocktails & Red Carpet Welcome",
        description: "Step in for evening mocktails and photo-ops with the couple.",
        iconName: "Sparkles",
      },
      {
        time: "8:00",
        period: "PM",
        title: "Family Performances & Couple Dance",
        description: "Choreographed family dance face-offs followed by the couple's signature romantic waltz.",
        iconName: "Music",
      },
      {
        time: "9:30",
        period: "PM",
        title: "Open DJ Floor & Midnight Feast",
        description: "The DJ takes over the dance floor while a grand multi-course festive dinner is served.",
        iconName: "UtensilsCrossed",
      },
    ],
  },
  {
    id: "wedding",
    title: "The Grand Wedding (Vivah Sanskar)",
    category: "The Auspicious Wedding",
    shortDate: "30 NOV",
    dayOfWeek: "Monday",
    fullDateText: "Monday, 30th November 2026",
    timeRange: "6:30 PM Onwards",
    tagline: "The sacred union, Vedic pheras, and royal wedding feast",
    dressCode: "Royal Indian Traditional / Formal Ethnic",
    venue: venuesList[0], // Krishna Lawn
    calendarStartDate: "20261130T183000",
    calendarEndDate: "20261130T235900",
    milestones: [
      {
        time: "6:30",
        period: "PM",
        title: "Baraat Swagat & Milni",
        description: "Grand welcome of the groom's procession with royal shehnai and traditional milni garlanding.",
        iconName: "Flame",
      },
      {
        time: "7:45",
        period: "PM",
        title: "Grand Varmala Ceremony",
        description: "The couple exchange wedding garlands amidst cold pyro cascades, rose petals, and applause.",
        iconName: "HeartHandshake",
      },
      {
        time: "8:45",
        period: "PM",
        title: "Royal Wedding Feast",
        description: "Exquisite celebratory spread featuring royal delicacies, Awadhi biryanis, and live sweet stations.",
        iconName: "UtensilsCrossed",
      },
      {
        time: "10:30",
        period: "PM",
        title: "Sacred Pheras & Kanyadaan",
        description: "The sacred circumambulations around the holy fire as seven vows of eternity are sealed.",
        iconName: "Sparkles",
      },
    ],
  },
];

export const eventData: EventDetails = {
  type: "The Grand Wedding",
  date: "2026-11-30",
  displayDate: "Monday, 30th November 2026",
  revealDateText: "30th November 2026",
  startTime: "18:30",
  endTime: "23:59",
  venue: venuesList[0], // Krishna Lawn
  whatsappGroupUrl: "https://chat.whatsapp.com/invite/wedding-celebration-updates",
  calendarEvent: {
    title: "Archita & Rajat's Grand Wedding",
    description: "Join us to celebrate the auspicious wedding of Archita and Rajat at Krishna Lawn, Gwalior!",
    location: "Krishna Lawn, Gwalior",
  },
};

export const storyData: StorySlide[] = [
  {
    id: "childhood",
    chapterNumber: "01",
    chapterBadge: "01 — CHILDHOOD CHRONICLES",
    title: "Two Worlds, Miles Apart",
    subtitle: "Before destiny brought them together",
    narration: "Long before their paths crossed, Archita was mastering the art of the perfect goofy pout, while Rajat was rocking school uniforms with his signature water bottle swag.",
    images: [
      {
        src: "/images/archita-childhood.jpg",
        caption: "Archita — The iconic drama queen expression",
        alt: "Archita childhood photo",
        rotation: 3,
      },
      {
        src: "/images/rajat-childhood.jpg",
        caption: "Rajat — Ready to conquer with his school bag",
        alt: "Rajat childhood photo",
        rotation: -3,
      },
    ],
  },
  {
    id: "independent-lives",
    chapterNumber: "02",
    chapterBadge: "02 — INDEPENDENT JOURNEYS",
    title: "Chasing Dreams Across Cities",
    subtitle: "From Delhi to Bengaluru",
    narration: "Building careers, navigating metropolitan chaos, coffee runs, and endless late-night brainstorms. Both were busy building their own worlds, completely unaware that their stories were about to intertwine.",
    images: [
      {
        src: "/images/couple-selfie.jpg",
        caption: "When casual coffee dates turned into infinite conversations",
        alt: "Archita and Rajat close selfie",
        rotation: -2,
      },
    ],
  },
  {
    id: "the-spark",
    chapterNumber: "03",
    chapterBadge: "03 — THE SPARK & CONNECTION",
    title: "A Shared Rhythm",
    subtitle: "When hours felt like minutes",
    narration: "What began with mutual interests and casual banter soon blossomed into late-night walks, shared playlists, and that rare sense of effortless comfort where silence is just as sweet as laughter.",
    images: [
      {
        src: "/images/couple-nightout.jpg",
        caption: "Unfiltered smiles, city lights, and magical nights",
        alt: "Archita and Rajat standing together smiling",
        rotation: 2,
      },
    ],
  },
  {
    id: "forever",
    chapterNumber: "04",
    chapterBadge: "04 — THE BIG PROMISE",
    title: "Saying Yes to Forever",
    subtitle: "Two families, one beautiful union",
    narration: "With smiles approved by both families and hearts fully aligned, here we are — stepping into our greatest adventure yet, hand in hand. And we cannot wait to celebrate with you!",
    images: [
      {
        src: "/images/couple-nightout.jpg",
        caption: "Together, forever and always",
        alt: "Archita and Rajat celebration portrait",
        rotation: -1,
      },
    ],
  },
];
