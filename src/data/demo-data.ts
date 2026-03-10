export interface Stylist {
  id: string;
  name: string;
  photo: string;
  bio: string;
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  postalCode: string;
  services: Service[];
  specialties: string[];
  portfolio: string[];
  availability: Record<string, { start: string; end: string }>;
  joinDate: string;
  status: "active" | "pending" | "suspended";
  totalEarnings: number;
  monthlyEarnings: number;
  featured: boolean;
  subscriptionPlan: "starter" | "growth" | "pro";
  responseSpeed?: "fast" | "medium" | "slow";
  distanceFromCustomer?: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  image: string;
}

export interface Hairstyle {
  id: string;
  name: string;
  description: string;
  avgPrice: number;
  duration: string;
  image: string;
  category: string;
}

export interface HairstyleItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface HairstyleCategory {
  id: string;
  name: string;
  hairstyles: HairstyleItem[];
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  stylistId: string;
  stylistName: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status:
    | "pending-approval"
    | "approved"
    | "upcoming"
    | "completed"
    | "cancelled"
    | "rejected";
  notes?: string;
  bookingType?: "instant-match" | "stylist" | "hairstyle" | "location";
  searchCriteria?: {
    hairstyle: string;
    minPrice: number;
    maxPrice: number;
  };
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  stylistId: string;
  stylistName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "stylist" | "admin";
  phone: string;
  avatar: string;
  joinDate: string;
  status: "active" | "suspended" | "pending";
  postalCode?: string;
}

export const hairstyles: Hairstyle[] = [
  {
    id: "h1",
    name: "Box Braids",
    description:
      "Classic protective style with individual braids parted in box-shaped sections. Versatile and long-lasting.",
    avgPrice: 150,
    duration: "4-6 hours",
    image:
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&h=400&fit=crop",
    category: "Braids",
  },
  {
    id: "h2",
    name: "Knotless Braids",
    description:
      "A gentler alternative to box braids using a feed-in technique for a more natural look.",
    avgPrice: 180,
    duration: "5-7 hours",
    image:
      "https://images.unsplash.com/photo-1595959183082-7b570b7e1e21?w=400&h=400&fit=crop",
    category: "Braids",
  },
  {
    id: "h3",
    name: "Cornrows",
    description:
      "Traditional African braiding style with braids close to the scalp in straight or curved rows.",
    avgPrice: 80,
    duration: "2-4 hours",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop",
    category: "Braids",
  },
  {
    id: "h4",
    name: "Senegalese Twists",
    description:
      "Two-strand twists using synthetic hair for a sleek, rope-like finish.",
    avgPrice: 160,
    duration: "4-6 hours",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
    category: "Twists",
  },
  {
    id: "h5",
    name: "Crochet Braids",
    description:
      "Pre-made hair extensions looped through cornrows using a crochet needle.",
    avgPrice: 100,
    duration: "2-3 hours",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    category: "Crochet",
  },
  {
    id: "h6",
    name: "Fulani Braids",
    description:
      "Cultural braiding pattern with a central braid and side cornrows decorated with beads.",
    avgPrice: 140,
    duration: "3-5 hours",
    image:
      "https://images.unsplash.com/photo-1611175694938-0c451bce30e7?w=400&h=400&fit=crop",
    category: "Braids",
  },
  {
    id: "h7",
    name: "Lemonade Braids",
    description:
      "Side-swept cornrows inspired by Beyoncé, creating a cascading effect.",
    avgPrice: 130,
    duration: "3-5 hours",
    image:
      "https://images.unsplash.com/photo-1634302086887-13b5281d1a77?w=400&h=400&fit=crop",
    category: "Braids",
  },
  {
    id: "h8",
    name: "Passion Twists",
    description:
      "Bohemian-style twists with a soft, wavy texture using passion twist hair.",
    avgPrice: 170,
    duration: "4-6 hours",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
    category: "Twists",
  },
  {
    id: "h9",
    name: "Goddess Locs",
    description: "Faux locs with curly accents for a bohemian goddess look.",
    avgPrice: 200,
    duration: "5-8 hours",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    category: "Locs",
  },
  {
    id: "h10",
    name: "Flat Twists",
    description:
      "Two-strand twists that lie flat against the scalp in decorative patterns.",
    avgPrice: 90,
    duration: "2-3 hours",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    category: "Twists",
  },
  {
    id: "h11",
    name: "Micro Braids",
    description: "Tiny, thin braids that offer maximum versatility in styling.",
    avgPrice: 250,
    duration: "8-12 hours",
    image:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
    category: "Braids",
  },
  {
    id: "h12",
    name: "Butterfly Locs",
    description: "Distressed faux locs with a looped, bohemian texture.",
    avgPrice: 190,
    duration: "5-7 hours",
    image:
      "https://images.unsplash.com/photo-1595959183082-7b570b7e1e21?w=400&h=400&fit=crop",
    category: "Locs",
  },
];

export const hairstyleCategories: HairstyleCategory[] = [
  {
    id: "cat-braids",
    name: "Braids",
    hairstyles: [
      {
        id: "h1",
        name: "Box Braids",
        description:
          "Classic protective style with individual braids parted in box-shaped sections. Versatile and long-lasting.",
        image:
          "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&h=400&fit=crop",
      },
      {
        id: "h2",
        name: "Knotless Braids",
        description:
          "A gentler alternative to box braids using a feed-in technique for a more natural look.",
        image:
          "https://images.unsplash.com/photo-1595959183082-7b570b7e1e21?w=400&h=400&fit=crop",
      },
      {
        id: "h3",
        name: "Cornrows",
        description:
          "Traditional African braiding style with braids close to the scalp in straight or curved rows.",
        image:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop",
      },
      {
        id: "h6",
        name: "Fulani Braids",
        description:
          "Cultural braiding pattern with a central braid and side cornrows decorated with beads.",
        image:
          "https://images.unsplash.com/photo-1611175694938-0c451bce30e7?w=400&h=400&fit=crop",
      },
      {
        id: "h7",
        name: "Lemonade Braids",
        description:
          "Side-swept cornrows inspired by Beyoncé, creating a cascading effect.",
        image:
          "https://images.unsplash.com/photo-1634302086887-13b5281d1a77?w=400&h=400&fit=crop",
      },
      {
        id: "h11",
        name: "Micro Braids",
        description:
          "Tiny, thin braids that offer maximum versatility in styling.",
        image:
          "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    id: "cat-twists",
    name: "Twists",
    hairstyles: [
      {
        id: "h4",
        name: "Senegalese Twists",
        description:
          "Two-strand twists using synthetic hair for a sleek, rope-like finish.",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
      },
      {
        id: "h8",
        name: "Passion Twists",
        description:
          "Bohemian-style twists with a soft, wavy texture using passion twist hair.",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
      },
      {
        id: "h10",
        name: "Flat Twists",
        description:
          "Two-strand twists that lie flat against the scalp in decorative patterns.",
        image:
          "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    id: "cat-locs",
    name: "Locs",
    hairstyles: [
      {
        id: "h9",
        name: "Goddess Locs",
        description:
          "Faux locs with curly accents for a bohemian goddess look.",
        image:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      },
      {
        id: "h12",
        name: "Butterfly Locs",
        description: "Distressed faux locs with a looped, bohemian texture.",
        image:
          "https://images.unsplash.com/photo-1595959183082-7b570b7e1e21?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    id: "cat-crochet",
    name: "Crochet",
    hairstyles: [
      {
        id: "h5",
        name: "Crochet Braids",
        description:
          "Pre-made hair extensions looped through cornrows using a crochet needle.",
        image:
          "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
      },
    ],
  },
];

export const stylists: Stylist[] = [
  {
    id: "s1",
    name: "Angela Johnson",
    photo:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    bio: "Award-winning braiding specialist with 5 years of experience. Known for intricate cornrow designs and knotless braids that last for weeks.",
    experience: 5,
    rating: 4.8,
    reviewCount: 120,
    location: "Brooklyn, NY",
    postalCode: "11201",
    services: [
      {
        id: "sv1",
        name: "Box Braids",
        price: 120,
        duration: "4-5 hours",
        description: "Classic box braids with premium synthetic hair",
        image: "",
      },
      {
        id: "sv2",
        name: "Knotless Braids",
        price: 150,
        duration: "5-6 hours",
        description: "Gentle feed-in knotless braids",
        image: "",
      },
      {
        id: "sv3",
        name: "Cornrows",
        price: 75,
        duration: "2-3 hours",
        description: "Traditional straight-back or custom designs",
        image: "",
      },
    ],
    specialties: ["Box Braids", "Knotless Braids", "Cornrows"],
    portfolio: [
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595959183082-7b570b7e1e21?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
    ],
    availability: {
      Monday: { start: "10:00", end: "18:00" },
      Tuesday: { start: "10:00", end: "18:00" },
      Wednesday: { start: "10:00", end: "18:00" },
      Thursday: { start: "10:00", end: "18:00" },
      Friday: { start: "12:00", end: "20:00" },
      Saturday: { start: "09:00", end: "16:00" },
    },
    joinDate: "2023-03-15",
    status: "active",
    totalEarnings: 45200,
    monthlyEarnings: 3800,
    featured: true,
    subscriptionPlan: "growth",
    responseSpeed: "fast",
  },
  {
    id: "s2",
    name: "Destiny Williams",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    bio: "Creative stylist passionate about bringing your vision to life. Specializing in goddess locs and passion twists.",
    experience: 7,
    rating: 4.9,
    reviewCount: 215,
    location: "Atlanta, GA",
    postalCode: "30301",
    services: [
      {
        id: "sv4",
        name: "Goddess Locs",
        price: 200,
        duration: "5-7 hours",
        description: "Beautiful goddess locs with curly accents",
        image: "",
      },
      {
        id: "sv5",
        name: "Passion Twists",
        price: 170,
        duration: "4-5 hours",
        description: "Bohemian passion twists",
        image: "",
      },
      {
        id: "sv6",
        name: "Butterfly Locs",
        price: 190,
        duration: "5-6 hours",
        description: "Trendy distressed butterfly locs",
        image: "",
      },
    ],
    specialties: ["Goddess Locs", "Passion Twists", "Butterfly Locs"],
    portfolio: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    ],
    availability: {
      Monday: { start: "09:00", end: "17:00" },
      Tuesday: { start: "09:00", end: "17:00" },
      Wednesday: { start: "09:00", end: "17:00" },
      Thursday: { start: "09:00", end: "17:00" },
      Friday: { start: "09:00", end: "15:00" },
    },
    joinDate: "2022-08-10",
    status: "active",
    totalEarnings: 68400,
    monthlyEarnings: 5200,
    featured: true,
    subscriptionPlan: "pro",
    responseSpeed: "fast",
  },
  {
    id: "s3",
    name: "Jasmine Carter",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Detail-oriented braider with a passion for Fulani braids and lemonade braids. Every braid is a work of art.",
    experience: 4,
    rating: 4.7,
    reviewCount: 89,
    location: "Houston, TX",
    postalCode: "77001",
    services: [
      {
        id: "sv7",
        name: "Fulani Braids",
        price: 140,
        duration: "3-4 hours",
        description: "Cultural Fulani braids with beads",
        image: "",
      },
      {
        id: "sv8",
        name: "Lemonade Braids",
        price: 130,
        duration: "3-4 hours",
        description: "Side-swept lemonade style braids",
        image: "",
      },
      {
        id: "sv9",
        name: "Senegalese Twists",
        price: 160,
        duration: "4-5 hours",
        description: "Sleek Senegalese rope twists",
        image: "",
      },
    ],
    specialties: ["Fulani Braids", "Lemonade Braids", "Senegalese Twists"],
    portfolio: [
      "https://images.unsplash.com/photo-1611175694938-0c451bce30e7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1634302086887-13b5281d1a77?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
    ],
    availability: {
      Tuesday: { start: "10:00", end: "18:00" },
      Wednesday: { start: "10:00", end: "18:00" },
      Thursday: { start: "10:00", end: "18:00" },
      Friday: { start: "12:00", end: "20:00" },
      Saturday: { start: "09:00", end: "17:00" },
    },
    joinDate: "2023-06-20",
    status: "active",
    totalEarnings: 32100,
    monthlyEarnings: 2900,
    featured: false,
    subscriptionPlan: "starter",
    responseSpeed: "medium",
  },
  {
    id: "s4",
    name: "Tiffany Moore",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Experienced crochet braids and flat twist specialist. Making natural hair care fun and accessible.",
    experience: 6,
    rating: 4.6,
    reviewCount: 156,
    location: "Chicago, IL",
    postalCode: "60601",
    services: [
      {
        id: "sv10",
        name: "Crochet Braids",
        price: 100,
        duration: "2-3 hours",
        description: "Quick and versatile crochet braids",
        image: "",
      },
      {
        id: "sv11",
        name: "Flat Twists",
        price: 90,
        duration: "2-3 hours",
        description: "Decorative flat twist patterns",
        image: "",
      },
      {
        id: "sv12",
        name: "Box Braids",
        price: 130,
        duration: "4-5 hours",
        description: "Medium to jumbo box braids",
        image: "",
      },
    ],
    specialties: ["Crochet Braids", "Flat Twists", "Box Braids"],
    portfolio: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
    ],
    availability: {
      Monday: { start: "11:00", end: "19:00" },
      Wednesday: { start: "11:00", end: "19:00" },
      Thursday: { start: "11:00", end: "19:00" },
      Saturday: { start: "10:00", end: "18:00" },
      Sunday: { start: "10:00", end: "15:00" },
    },
    joinDate: "2022-11-05",
    status: "active",
    totalEarnings: 51800,
    monthlyEarnings: 4100,
    featured: false,
    subscriptionPlan: "growth",
    responseSpeed: "medium",
  },
  {
    id: "s5",
    name: "Maya Robinson",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Micro braids expert and protective styling guru. Precision is my superpower.",
    experience: 8,
    rating: 4.9,
    reviewCount: 302,
    location: "Los Angeles, CA",
    postalCode: "90001",
    services: [
      {
        id: "sv13",
        name: "Micro Braids",
        price: 250,
        duration: "8-10 hours",
        description: "Ultra-fine micro braids",
        image: "",
      },
      {
        id: "sv14",
        name: "Knotless Braids",
        price: 160,
        duration: "5-6 hours",
        description: "Silky knotless braids",
        image: "",
      },
      {
        id: "sv15",
        name: "Cornrows",
        price: 85,
        duration: "2-3 hours",
        description: "Custom cornrow patterns",
        image: "",
      },
    ],
    specialties: ["Micro Braids", "Knotless Braids", "Cornrows"],
    portfolio: [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595959183082-7b570b7e1e21?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&h=400&fit=crop",
    ],
    availability: {
      Monday: { start: "08:00", end: "16:00" },
      Tuesday: { start: "08:00", end: "16:00" },
      Wednesday: { start: "08:00", end: "16:00" },
      Thursday: { start: "08:00", end: "16:00" },
      Friday: { start: "08:00", end: "14:00" },
    },
    joinDate: "2021-05-12",
    status: "active",
    totalEarnings: 89600,
    monthlyEarnings: 6700,
    featured: true,
    subscriptionPlan: "pro",
    responseSpeed: "fast",
  },
  {
    id: "s6",
    name: "Nicole Davis",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    bio: "New to the platform but bringing 3 years of salon experience. Fresh styles, great vibes!",
    experience: 3,
    rating: 4.5,
    reviewCount: 42,
    location: "Miami, FL",
    postalCode: "33101",
    services: [
      {
        id: "sv16",
        name: "Box Braids",
        price: 110,
        duration: "4-5 hours",
        description: "Trendy box braids with color options",
        image: "",
      },
      {
        id: "sv17",
        name: "Passion Twists",
        price: 155,
        duration: "4-5 hours",
        description: "Spring passion twists",
        image: "",
      },
    ],
    specialties: ["Box Braids", "Passion Twists"],
    portfolio: [
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
    ],
    availability: {
      Tuesday: { start: "10:00", end: "18:00" },
      Wednesday: { start: "10:00", end: "18:00" },
      Friday: { start: "12:00", end: "20:00" },
      Saturday: { start: "09:00", end: "17:00" },
    },
    joinDate: "2024-01-10",
    status: "active",
    totalEarnings: 12400,
    monthlyEarnings: 2100,
    featured: false,
    subscriptionPlan: "starter",
    responseSpeed: "slow",
  },
];

export const bookings: Booking[] = [
  {
    id: "b1",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    service: "Box Braids",
    date: "2026-03-12",
    time: "10:00 AM",
    price: 120,
    status: "upcoming",
  },
  {
    id: "b2",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    stylistId: "s2",
    stylistName: "Destiny Williams",
    service: "Passion Twists",
    date: "2026-02-28",
    time: "2:00 PM",
    price: 170,
    status: "completed",
  },
  {
    id: "b3",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    stylistId: "s3",
    stylistName: "Jasmine Carter",
    service: "Fulani Braids",
    date: "2026-02-15",
    time: "11:00 AM",
    price: 140,
    status: "completed",
  },
  {
    id: "b4",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    service: "Cornrows",
    date: "2026-01-20",
    time: "3:00 PM",
    price: 75,
    status: "cancelled",
  },
  {
    id: "b5",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    stylistId: "s5",
    stylistName: "Maya Robinson",
    service: "Knotless Braids",
    date: "2026-03-15",
    time: "9:00 AM",
    price: 160,
    status: "upcoming",
  },
  {
    id: "b6",
    customerId: "c2",
    customerName: "Lisa Thompson",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    service: "Knotless Braids",
    date: "2026-03-10",
    time: "11:00 AM",
    price: 150,
    status: "upcoming",
  },
  {
    id: "b7",
    customerId: "c2",
    customerName: "Lisa Thompson",
    stylistId: "s4",
    stylistName: "Tiffany Moore",
    service: "Crochet Braids",
    date: "2026-02-22",
    time: "1:00 PM",
    price: 100,
    status: "completed",
  },
  {
    id: "b8",
    customerId: "c3",
    customerName: "Kim Brown",
    stylistId: "s2",
    stylistName: "Destiny Williams",
    service: "Goddess Locs",
    date: "2026-03-14",
    time: "10:00 AM",
    price: 200,
    status: "pending-approval",
  },
  {
    id: "b9",
    customerId: "c3",
    customerName: "Kim Brown",
    stylistId: "s5",
    stylistName: "Maya Robinson",
    service: "Micro Braids",
    date: "2026-03-20",
    time: "8:00 AM",
    price: 250,
    status: "upcoming",
  },
  {
    id: "b10",
    customerId: "c4",
    customerName: "Aisha Patel",
    stylistId: "s3",
    stylistName: "Jasmine Carter",
    service: "Lemonade Braids",
    date: "2026-03-11",
    time: "12:00 PM",
    price: 130,
    status: "approved",
  },
  {
    id: "b11",
    customerId: "c2",
    customerName: "Lisa Thompson",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    service: "Box Braids",
    date: "2026-02-05",
    time: "10:00 AM",
    price: 120,
    status: "completed",
  },
  {
    id: "b12",
    customerId: "c3",
    customerName: "Kim Brown",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    service: "Cornrows",
    date: "2026-02-12",
    time: "2:00 PM",
    price: 75,
    status: "completed",
  },
  {
    id: "b13",
    customerId: "c4",
    customerName: "Aisha Patel",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    service: "Knotless Braids",
    date: "2026-03-18",
    time: "11:00 AM",
    price: 150,
    status: "pending-approval",
  },
  {
    id: "b14",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    service: "Box Braids",
    date: "2026-01-10",
    time: "9:00 AM",
    price: 120,
    status: "completed",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    customerAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    rating: 5,
    comment:
      "Angela is amazing! My box braids look absolutely stunning and lasted for 6 weeks. She was gentle and the atmosphere was so relaxing.",
    date: "2026-02-28",
    service: "Box Braids",
  },
  {
    id: "r2",
    customerId: "c2",
    customerName: "Lisa Thompson",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    stylistId: "s1",
    stylistName: "Angela Johnson",
    rating: 5,
    comment:
      "Best knotless braids I've ever had! Angela really takes her time and the results are flawless.",
    date: "2026-02-15",
    service: "Knotless Braids",
  },
  {
    id: "r3",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    customerAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    stylistId: "s2",
    stylistName: "Destiny Williams",
    rating: 5,
    comment:
      "Destiny's passion twists are a dream! So beautiful and lightweight. Will definitely be back.",
    date: "2026-02-28",
    service: "Passion Twists",
  },
  {
    id: "r4",
    customerId: "c3",
    customerName: "Kim Brown",
    customerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    stylistId: "s2",
    stylistName: "Destiny Williams",
    rating: 4,
    comment:
      "Beautiful goddess locs! Took a bit longer than expected but the results were worth the wait.",
    date: "2026-02-10",
    service: "Goddess Locs",
  },
  {
    id: "r5",
    customerId: "c4",
    customerName: "Aisha Patel",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    stylistId: "s3",
    stylistName: "Jasmine Carter",
    rating: 5,
    comment:
      "Jasmine did the most beautiful Fulani braids with gold beads. So many compliments!",
    date: "2026-02-20",
    service: "Fulani Braids",
  },
  {
    id: "r6",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    customerAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    stylistId: "s3",
    stylistName: "Jasmine Carter",
    rating: 4,
    comment:
      "Great lemonade braids! Jasmine is professional and skilled. My only note is parking can be tricky.",
    date: "2026-02-15",
    service: "Lemonade Braids",
  },
  {
    id: "r7",
    customerId: "c2",
    customerName: "Lisa Thompson",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    stylistId: "s4",
    stylistName: "Tiffany Moore",
    rating: 5,
    comment:
      "Tiffany's crochet braids are incredible! Done in just 2 hours and look so natural.",
    date: "2026-02-22",
    service: "Crochet Braids",
  },
  {
    id: "r8",
    customerId: "c3",
    customerName: "Kim Brown",
    customerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    stylistId: "s5",
    stylistName: "Maya Robinson",
    rating: 5,
    comment:
      "Maya is a micro braid genius! Each braid is perfect. Worth every penny and every hour.",
    date: "2026-01-30",
    service: "Micro Braids",
  },
  {
    id: "r9",
    customerId: "c4",
    customerName: "Aisha Patel",
    customerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    stylistId: "s5",
    stylistName: "Maya Robinson",
    rating: 5,
    comment:
      "Best cornrows in LA! Maya's designs are always creative and neat.",
    date: "2026-02-05",
    service: "Cornrows",
  },
  {
    id: "r10",
    customerId: "c2",
    customerName: "Lisa Thompson",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    stylistId: "s6",
    stylistName: "Nicole Davis",
    rating: 4,
    comment:
      "Nicole did a great job on my box braids! She's newer but very talented. Recommend!",
    date: "2026-02-18",
    service: "Box Braids",
  },
];

export const users: User[] = [
  {
    id: "c1",
    name: "Sarah Mitchell",
    email: "customer@demo.com",
    role: "customer",
    phone: "(555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    joinDate: "2024-06-15",
    status: "active",
    postalCode: "11201",
  },
  {
    id: "c2",
    name: "Lisa Thompson",
    email: "lisa@example.com",
    role: "customer",
    phone: "(555) 234-5678",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    joinDate: "2024-08-20",
    status: "active",
    postalCode: "60601",
  },
  {
    id: "c3",
    name: "Kim Brown",
    email: "kim@example.com",
    role: "customer",
    phone: "(555) 345-6789",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    joinDate: "2024-09-10",
    status: "active",
    postalCode: "90001",
  },
  {
    id: "c4",
    name: "Aisha Patel",
    email: "aisha@example.com",
    role: "customer",
    phone: "(555) 456-7890",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    joinDate: "2024-10-05",
    status: "active",
    postalCode: "77001",
  },
  {
    id: "s1",
    name: "Angela Johnson",
    email: "stylist@demo.com",
    role: "stylist",
    phone: "(555) 567-8901",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    joinDate: "2023-03-15",
    status: "active",
  },
  {
    id: "s2",
    name: "Destiny Williams",
    email: "destiny@example.com",
    role: "stylist",
    phone: "(555) 678-9012",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    joinDate: "2022-08-10",
    status: "active",
  },
  {
    id: "s3",
    name: "Jasmine Carter",
    email: "jasmine@example.com",
    role: "stylist",
    phone: "(555) 789-0123",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    joinDate: "2023-06-20",
    status: "active",
  },
  {
    id: "a1",
    name: "Admin User",
    email: "admin@demo.com",
    role: "admin",
    phone: "(555) 000-0000",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    joinDate: "2022-01-01",
    status: "active",
  },
];

export const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "Perfect for new stylists just getting started",
    features: [
      "Profile listing",
      "Up to 10 bookings/month",
      "Email support",
      "1 portfolio image",
    ],
    notIncluded: ["Priority listing", "Unlimited bookings", "Featured badge"],
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 39,
    yearlyPrice: 390,
    popular: true,
    description: "Best for growing stylists building their clientele",
    features: [
      "Profile listing",
      "Unlimited bookings",
      "Priority support",
      "Up to 20 portfolio images",
      "Priority listing",
    ],
    notIncluded: ["Featured badge"],
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 69,
    yearlyPrice: 690,
    description: "For established stylists who want maximum visibility",
    features: [
      "Profile listing",
      "Unlimited bookings",
      "Priority support",
      "30 portfolio images",
      "Priority listing",
      "Featured badge",
    ],
    notIncluded: [],
  },
];

export const faqData = [
  {
    question: "How do I book a hair braiding appointment?",
    answer:
      "Simply search for stylists in your area, browse their profiles and services, select your preferred hairstyle and time slot, and complete the booking. You'll receive a confirmation email with all the details.",
  },
  {
    question: "How much does hair braiding typically cost?",
    answer:
      "Prices vary depending on the style and stylist. Simple cornrows start around $75-$100, while more complex styles like micro braids can range from $150-$300. Each stylist sets their own prices which you can view on their profile.",
  },
  {
    question: "How long do braided hairstyles last?",
    answer:
      "Most braided styles last 4-8 weeks with proper care. Box braids and knotless braids typically last 6-8 weeks, while cornrows may last 2-4 weeks. Your stylist will provide care instructions after your appointment.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes! You can cancel or reschedule up to 24 hours before your appointment at no charge. Cancellations within 24 hours may be subject to a cancellation fee as set by the stylist.",
  },
  {
    question: "How do I become a stylist on the platform?",
    answer:
      "Click 'Become a Stylist' and complete our simple 5-step application process. You'll need to provide your experience details, services, portfolio images, and availability. Our team reviews applications within 48 hours.",
  },
  {
    question: "Is there a subscription fee for customers?",
    answer:
      "No! BraidBook is completely free for customers. You only pay for the services you book. Subscription plans are available for stylists who want enhanced visibility and features.",
  },
  {
    question: "How are stylists vetted?",
    answer:
      "All stylists go through a verification process that includes identity verification, portfolio review, and experience validation. We also monitor ratings and reviews to ensure quality service.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards, PayPal, Apple Pay, and Google Pay. Payment is processed securely through our platform after your appointment is completed.",
  },
  {
    question: "What if I'm not satisfied with my service?",
    answer:
      "Customer satisfaction is our priority. If you're not happy with your service, contact us within 48 hours and we'll work with you and the stylist to resolve the issue. Our dispute resolution team handles all complaints fairly.",
  },
  {
    question: "Do stylists come to my location?",
    answer:
      "Many stylists offer mobile services and will come to your home or preferred location. You can filter for mobile stylists when searching. Some stylists work from a home studio or salon — check their profile for details.",
  },
  {
    question: "How do stylists get paid?",
    answer:
      "Stylists receive payment within 3-5 business days after completing a service. Payments can be withdrawn to a bank account or PayPal. There's a small platform fee deducted from each booking.",
  },
  {
    question: "Can I save my favorite stylists?",
    answer:
      "Yes! Simply click the heart icon on any stylist's profile to add them to your favorites. Access your saved stylists anytime from your dashboard for quick rebooking.",
  },
];
