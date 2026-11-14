import { CoupleProfile, EventDetails, StorySlide, WeddingEvent, VenueInfo } from '../types/wedding';

export const coupleData: CoupleProfile = {
  groom: {
    firstName: "Rajat",
    fullName: "Rajat Ranjan",
    parents: "Ritu Ranjan Prasad Sinha & Madhu Sinha",
    bio: "Tech enthusiast, passionate foodie, and the guy who fell hopelessly in love.",
  },
  bride: {
    firstName: "Archita",
    fullName: "Archita Srivastava",
    parents: "Pramendra Kumar Srivastava & Prem Lata Srivastava",
    bio: "Creative soul, travel lover, and the bride who stole Rajat's heart.",
  },
  hashtag: "#Rajita",
  monogram: "A & R",
  ceremonyTitle: "The Wedding Celebrations",
  formalSalutationDefault: "Family & Friends",
};

export const venuesList: VenueInfo[] = [
  {
    name: "Krishna Lawn",
    type: "The Grand Wedding Lawn",
    tagline: "Venue for The Grand Wedding (30 Nov)",
    address: "Krishna Lawn (Krishna Farms)",
    city: "Varanasi, Uttar Pradesh",
    landmark: "Main Road",
    googleMapsUrl: "https://maps.app.goo.gl/KPjgYH8gRwvL9UtQ6",
    appleMapsUrl: "https://maps.app.goo.gl/KPjgYH8gRwvL9UtQ6",
  },
  {
    name: "Shital Niwas",
    type: "Family Residence",
    tagline: "Venue for Haldi, Chowki, Mehndi & Ladies Sangeet (28 & 29 Nov)",
    address: "Shital Niwas",
    city: "Varanasi, Uttar Pradesh",
    landmark: "Our Home",
    googleMapsUrl: "https://maps.app.goo.gl/PK4cnn75HJJR46E16",
    appleMapsUrl: "https://maps.app.goo.gl/PK4cnn75HJJR46E16",
  },
];

export const weddingEvents: WeddingEvent[] = [
  {
    id: "haldi-chowki",
    title: "Haldi & Mata Ki Chowki",
    shortTitle: "Haldi & Chowki",
    category: "Sacred Pre-Wedding Ceremonies",
    shortDate: "28 NOV",
    dayOfWeek: "Saturday",
    fullDateText: "Saturday, 28th November 2026",
    tagline: "Auspicious turmeric blessings & divine devotional chowki",
    venue: venuesList[1], // Shital Niwas
    calendarStartDate: "20261128T110000",
    calendarEndDate: "20261128T210000",
    milestones: [
      {
        time: "11:00",
        period: "AM",
        title: "Haldi",
        description: "11:00 AM – 2:00 PM",
        iconName: "Flame",
      },
      {
        time: "7:00",
        period: "PM",
        title: "Mata Ki Chowki",
        description: "7:00 PM – 9:00 PM",
        iconName: "Sparkles",
      },
    ],
  },
  {
    id: "mehndi-sangeet",
    title: "Mehndi & Ladies Sangeet",
    shortTitle: "Mehndi & Sangeet",
    category: "Henna Art & Musical Night",
    shortDate: "29 NOV",
    dayOfWeek: "Sunday",
    fullDateText: "Sunday, 29th November 2026",
    tagline: "Intricate bridal henna & electrifying ladies sangeet musical night",
    venue: venuesList[1], // Shital Niwas
    calendarStartDate: "20261129T110000",
    calendarEndDate: "20261129T220000",
    milestones: [
      {
        time: "11:00",
        period: "AM",
        title: "Mehndi",
        description: "11:00 AM – 1:00 PM",
        iconName: "Sparkles",
      },
      {
        time: "7:00",
        period: "PM",
        title: "Ladies Sangeet",
        description: "7:00 PM – 10:00 PM",
        iconName: "Music",
      },
    ],
  },
  {
    id: "wedding",
    title: "The Wedding Ceremony — The Krishna Farms",
    shortTitle: "The Wedding",
    category: "The Auspicious Wedding",
    shortDate: "30 NOV",
    dayOfWeek: "Monday",
    fullDateText: "Monday, 30th November 2026",
    timeRange: "7:00 PM Onwards",
    tagline: "The sacred union, Vedic pheras, and royal wedding feast",
    venue: venuesList[0], // Krishna Lawn
    calendarStartDate: "20261130T200000",
    calendarEndDate: "20261130T235900",
    milestones: [
      {
        time: "8:00",
        period: "PM",
        title: "Baraat Swagat & Milni",
        description: "Grand welcome of the groom's procession with royal shehnai and traditional milni garlanding.",
        iconName: "Flame",
      },
      {
        time: "9:00",
        period: "PM",
        title: "Grand Varmala Ceremony",
        description: "The couple exchange wedding garlands amidst cold pyro cascades, rose petals, and applause.",
        iconName: "HeartHandshake",
      }
    ],
  },
];

export const eventData: EventDetails = {
  type: "The Grand Wedding",
  date: "2026-11-30",
  displayDate: "Monday, 30th November 2026",
  revealDateText: "30th November 2026",
  startTime: "20:00",
  endTime: "23:59",
  venue: venuesList[0], // Krishna Lawn
  whatsappGroupUrl: "https://chat.whatsapp.com/invite/wedding-celebration-updates",
  calendarEvent: {
    title: "Archita & Rajat's Grand Wedding",
    description: "Join us to celebrate the auspicious wedding of Archita and Rajat at Krishna Lawn, Varanasi!",
    location: "Krishna Lawn, Varanasi",
  },
};

export const storyData: StorySlide[] = [
  {
    id: "childhood",
    chapterNumber: "01",
    chapterBadge: "01 — CHILDHOOD CHRONICLES",
    title: "Where It All Began",
    subtitle: "Growing up miles apart with big dreams",
    narration: "Growing up miles apart, but destined to meet.",
    images: [
      {
        src: "/images/archita-childhood.jpg",
        caption: "Archita",
        alt: "Archita childhood photo",
        rotation: 0,
      },
      {
        src: "/images/rajat-childhood.jpg",
        caption: "Rajat",
        alt: "Rajat childhood photo",
        rotation: 0,
      },
    ],
  },
  {
    id: "the-spark",
    chapterNumber: "02",
    chapterBadge: "02 — WHEN PATHS CROSSED",
    title: "A Casual Hello",
    subtitle: "From strangers to best friends",
    narration: "One conversation turned into endless late-night talks.",
    images: [
      {
        src: "/images/couple-selfie.png",
        caption: "Unfiltered smiles & infinite coffee dates",
        alt: "Archita and Rajat selfie",
        rotation: 0,
      },
    ],
  },
];
