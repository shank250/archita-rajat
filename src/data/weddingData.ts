import { CoupleProfile, EventDetails, StorySlide, ItineraryItem } from '../types/wedding';

export const coupleData: CoupleProfile = {
  groom: {
    firstName: "Rajat",
    fullName: "Rajat Sharma",
    parents: "Mrs. Sunita & Mr. Rakesh Sharma",
    grandparents: "Late Smt. Krishna & Late Shri Om Prakash Sharma",
    bio: "Tech enthusiast, passionate foodie, and the guy who fell hopelessly in love.",
  },
  bride: {
    firstName: "Archita",
    fullName: "Archita Verma",
    parents: "Mrs. Rekha & Mr. Ashok Verma",
    grandparents: "Smt. Shanti & Late Shri Brij Mohan Verma",
    bio: "Creative soul, travel lover, and the one whose laughter lights up any room.",
  },
  hashtag: "#RajatWedsArchita",
  monogram: "R & A",
  ceremonyTitle: "Engagement & Sangeet Celebration",
  formalSalutationDefault: "Family & Friends",
};

export const eventData: EventDetails = {
  type: "Engagement Ceremony",
  date: "2026-11-30",
  displayDate: "Monday, 30th November 2026",
  revealDateText: "30th November 2026",
  startTime: "18:30",
  endTime: "23:59",
  venue: {
    name: "The Grand MB Clarks Inn",
    tagline: "Royal Banquet & Lawn",
    address: "Rampur Road, Civil Lines",
    city: "Moradabad, Uttar Pradesh",
    landmark: "Near Gandhi Murti",
    googleMapsUrl: "https://maps.google.com/?q=MB+Clarks+Inn+Rampur+Road",
    appleMapsUrl: "https://maps.apple.com/?q=MB+Clarks+Inn+Rampur+Road",
  },
  whatsappGroupUrl: "https://chat.whatsapp.com/invite/wedding-celebration-updates",
  calendarEvent: {
    title: "Rajat & Archita's Engagement Celebration",
    description: "Join us to celebrate the joyous engagement of Rajat and Archita with love, music, and royal feast!",
    location: "The Grand MB Clarks Inn, Rampur Road, Moradabad",
  },
};

export const storyData: StorySlide[] = [
  {
    id: "childhood",
    chapterNumber: "01",
    chapterBadge: "01 — CHILDHOOD CHRONICLES",
    title: "Two Worlds, Miles Apart",
    subtitle: "Before destiny brought them together",
    narration: "Long before their paths crossed, Rajat was rocking school uniforms with his signature water bottle swag, while Archita was mastering the art of the perfect goofy pout.",
    images: [
      {
        src: "/images/rajat-childhood.jpg",
        caption: "Rajat — Ready to conquer with his school bag",
        alt: "Rajat childhood photo",
        rotation: -3,
      },
      {
        src: "/images/archita-childhood.jpg",
        caption: "Archita — The iconic drama queen expression",
        alt: "Archita childhood photo",
        rotation: 4,
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
        alt: "Rajat and Archita close selfie",
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
        alt: "Rajat and Archita standing together smiling",
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
        alt: "Rajat and Archita celebration portrait",
        rotation: -1,
      },
    ],
  },
];

export const itineraryData: ItineraryItem[] = [
  {
    id: "welcome",
    time: "6:30",
    period: "PM",
    title: "Welcome & Guest Arrival",
    subtitle: "Shehnai & Welcome Drinks",
    description: "Step into an evening of royal hospitality, fragrant floral garlands, and refreshing welcome mocktails.",
    iconName: "Sparkles",
    highlight: false,
  },
  {
    id: "entry",
    time: "7:15",
    period: "PM",
    title: "Grand Couple Entry",
    subtitle: "Under Cold Pyro & Rose Petals",
    description: "Witness Rajat and Archita make their grand, dazzling entrance amidst music, fireworks, and applause.",
    iconName: "Flame",
    highlight: true,
  },
  {
    id: "ceremony",
    time: "8:00",
    period: "PM",
    title: "Ring Exchange Ceremony",
    subtitle: "The Sacred Promise",
    description: "The moment of forever — the exchange of rings, blessings from elders, and heartfelt family speeches.",
    iconName: "HeartHandshake",
    highlight: true,
  },
  {
    id: "dance",
    time: "9:15",
    period: "PM",
    title: "Cake Cutting & Dance Floor",
    subtitle: "Celebrations Unleashed",
    description: "Sweet slices of celebratory cake followed by foot-tapping Bollywood rhythms. Time to hit the dance floor!",
    iconName: "Music",
    highlight: false,
  },
  {
    id: "dinner",
    time: "10:00",
    period: "PM",
    title: "Royal Feast & Dinner Buffet",
    subtitle: "A Culinary Extravaganza",
    description: "Indulge in an exquisite multi-course royal spread of Awadhi, Mughlai, and continental delicacies.",
    iconName: "UtensilsCrossed",
    highlight: false,
  },
];
