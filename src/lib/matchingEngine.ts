import { Stylist } from "@/data/demo-data";

export interface MatchCriteria {
  hairstyle: string;
  date: string;
  time: string;
  minPrice: number;
  maxPrice: number;
  customerPostalCode: string;
}

export interface MatchResult {
  stylist: Stylist & { matchScore: number; distanceFromCustomer?: number };
  matchScore: number;
  matchDetails: {
    expertiseMatch: boolean;
    availabilityMatch: boolean;
    ratingScore: number;
    distanceScore: number;
    priceMatch: boolean;
    responseSpeedScore: number;
    popularityScore: number;
  };
}

// Distance calculation using postal code similarity (simulated)
const calculateDistance = (
  customerPostal: string,
  stylistPostal: string,
): number => {
  // Simplified distance calculation based on postal code proximity
  // In a real app, this would use geolocation services
  if (customerPostal === stylistPostal) return 0.5; // Same postal code

  const customerFirst3 = customerPostal.substring(0, 3);
  const stylistFirst3 = stylistPostal.substring(0, 3);

  if (customerFirst3 === stylistFirst3) return 2; // Same region
  return 5; // Different region
};

// Response speed score (0-100)
const getResponseSpeedScore = (responseSpeed?: string): number => {
  switch (responseSpeed) {
    case "fast":
      return 100;
    case "medium":
      return 70;
    case "slow":
      return 40;
    default:
      return 60;
  }
};

// Check if stylist is available for the given date and time
const isAvailableOnDateTime = (
  stylist: Stylist,
  date: string,
  time: string,
): boolean => {
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });

  const availability = stylist.availability[dayName];
  if (!availability) return false;

  // Parse time to compare
  const [hours, minutes] = time.split(":").map(Number);
  const appointmentTime = hours + minutes / 60;

  const [startHours, startMinutes] = availability.start.split(":").map(Number);
  const startTime = startHours + startMinutes / 60;

  const [endHours, endMinutes] = availability.end.split(":").map(Number);
  const endTime = endHours + endMinutes / 60;

  // Check if appointment time is within available hours (minimum 1.5 hours for appointment)
  return appointmentTime >= startTime && appointmentTime + 1.5 <= endTime;
};

// Check if stylist offers the requested hairstyle
const hasHairstyleExpertise = (
  stylist: Stylist,
  hairstyle: string,
): boolean => {
  return stylist.specialties.some(
    (s) =>
      s.toLowerCase().includes(hairstyle.toLowerCase()) ||
      hairstyle.toLowerCase().includes(s.toLowerCase()),
  );
};

// Check if stylist's price is within range (more flexible - allows 15% outside range)
const isPriceInRange = (
  stylist: Stylist,
  minPrice: number,
  maxPrice: number,
  hairstyle: string,
): boolean => {
  const service = stylist.services.find(
    (s) =>
      s.name.toLowerCase().includes(hairstyle.toLowerCase()) ||
      hairstyle.toLowerCase().includes(s.name.toLowerCase()),
  );

  const priceRange = maxPrice - minPrice;
  const flexibleMin = Math.max(0, minPrice - priceRange * 0.15);
  const flexibleMax = maxPrice + priceRange * 0.15;

  if (!service) {
    // Estimate based on average service price if specific service not found
    const avgPrice =
      stylist.services.reduce((sum, s) => sum + s.price, 0) /
      stylist.services.length;
    return avgPrice >= flexibleMin && avgPrice <= flexibleMax;
  }

  return service.price >= flexibleMin && service.price <= flexibleMax;
};

// Get the base price for calculation
const getStylistPrice = (stylist: Stylist, hairstyle: string): number => {
  const service = stylist.services.find(
    (s) =>
      s.name.toLowerCase().includes(hairstyle.toLowerCase()) ||
      hairstyle.toLowerCase().includes(s.name.toLowerCase()),
  );

  if (service) return service.price;

  return (
    stylist.services.reduce((sum, s) => sum + s.price, 0) /
    stylist.services.length
  );
};

// Main matching algorithm with fallback for better demo experience
export const matchStylists = (
  criteria: MatchCriteria,
  stylists: Stylist[],
): MatchResult[] => {
  // First attempt: Strict matching (hairstyle + availability + price)
  let matches = tryStrictMatching(criteria, stylists);

  // Fallback 1: Lenient matching (availability + flexible price, any hairstyle)
  if (matches.length === 0) {
    matches = tryLenientMatching(criteria, stylists);
  }

  // Fallback 2: Very lenient (any active stylist with flexible price)
  if (matches.length === 0) {
    matches = tryVeryLenientMatching(criteria, stylists);
  }

  // Sort by match score (highest first)
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

// Strict matching - requires all three filters
const tryStrictMatching = (
  criteria: MatchCriteria,
  stylists: Stylist[],
): MatchResult[] => {
  const matches: MatchResult[] = [];

  for (const stylist of stylists) {
    const hasExpertise = hasHairstyleExpertise(stylist, criteria.hairstyle);
    const isAvailable = isAvailableOnDateTime(
      stylist,
      criteria.date,
      criteria.time,
    );
    const isPriceMatch = isPriceInRange(
      stylist,
      criteria.minPrice,
      criteria.maxPrice,
      criteria.hairstyle,
    );

    if (!hasExpertise || !isAvailable || !isPriceMatch) continue;

    matches.push(createMatchResult(stylist, criteria));
  }

  return matches;
};

// Lenient matching - requires availability + flexible price, any hairstyle
const tryLenientMatching = (
  criteria: MatchCriteria,
  stylists: Stylist[],
): MatchResult[] => {
  const matches: MatchResult[] = [];

  for (const stylist of stylists) {
    if (stylist.status !== "active") continue;

    const isAvailable = isAvailableOnDateTime(
      stylist,
      criteria.date,
      criteria.time,
    );
    const isPriceMatch = isPriceInRange(
      stylist,
      criteria.minPrice,
      criteria.maxPrice,
      criteria.hairstyle,
    );

    if (!isAvailable || !isPriceMatch) continue;

    matches.push(createMatchResult(stylist, criteria, true));
  }

  return matches;
};

// Very lenient matching - any active stylist with flexible price
const tryVeryLenientMatching = (
  criteria: MatchCriteria,
  stylists: Stylist[],
): MatchResult[] => {
  const matches: MatchResult[] = [];
  const priceRange = criteria.maxPrice - criteria.minPrice;
  const flexibleMin = Math.max(0, criteria.minPrice - priceRange * 0.25);
  const flexibleMax = criteria.maxPrice + priceRange * 0.25;

  for (const stylist of stylists) {
    if (stylist.status !== "active") continue;

    // Check if average price is within flexible range
    const avgPrice =
      stylist.services.reduce((sum, s) => sum + s.price, 0) /
      stylist.services.length;
    if (avgPrice < flexibleMin || avgPrice > flexibleMax) continue;

    matches.push(createMatchResult(stylist, criteria, true));
  }

  return matches;
};

// Helper function to create match result
const createMatchResult = (
  stylist: Stylist,
  criteria: MatchCriteria,
  isLenient: boolean = false,
): MatchResult => {
  const ratingScore = (stylist.rating / 5) * 100;
  const distance = calculateDistance(
    criteria.customerPostalCode,
    stylist.postalCode,
  );
  const maxDistance = 5;
  const distanceScore = Math.max(0, (1 - distance / maxDistance) * 100);
  const responseSpeedScore = getResponseSpeedScore(stylist.responseSpeed);
  const popularityScore = Math.min(
    100,
    (stylist.reviewCount / 300) * 100 + (stylist.featured ? 20 : 0),
  );

  const stylistPrice = getStylistPrice(stylist, criteria.hairstyle);
  const midPrice = (criteria.minPrice + criteria.maxPrice) / 2;
  const priceMatch =
    100 - Math.min(100, (Math.abs(stylistPrice - midPrice) / midPrice) * 50);

  // Reduce price weight for lenient matches
  const priceWeight = isLenient ? 0.1 : 0.2;

  const matchScore =
    ratingScore * 0.25 +
    distanceScore * 0.2 +
    priceMatch * priceWeight +
    responseSpeedScore * 0.15 +
    popularityScore * 0.2;

  return {
    stylist: {
      ...stylist,
      matchScore: Math.round(matchScore),
      distanceFromCustomer: distance,
    },
    matchScore: Math.round(matchScore),
    matchDetails: {
      expertiseMatch: hasHairstyleExpertise(stylist, criteria.hairstyle),
      availabilityMatch: isAvailableOnDateTime(
        stylist,
        criteria.date,
        criteria.time,
      ),
      ratingScore: Math.round(ratingScore),
      distanceScore: Math.round(distanceScore),
      priceMatch: true,
      responseSpeedScore: responseSpeedScore,
      popularityScore: Math.round(popularityScore),
    },
  };
};

// Get single best match
export const getBestMatch = (
  criteria: MatchCriteria,
  stylists: Stylist[],
): MatchResult | null => {
  const matches = matchStylists(criteria, stylists);
  return matches.length > 0 ? matches[0] : null;
};
