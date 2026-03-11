import { Stylist } from "@/data/demo-data";

export interface MatchCriteria {
  hairstyle: string;
  date: string;
  time: string;
  postcode: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface MatchResult {
  stylist: Stylist & { matchScore: number; distanceFromCustomer?: number };
  matchScore: number;
  matchDetails: {
    expertiseMatch: boolean;
    availabilityMatch: boolean;
    timeMatch: boolean;
    ratingScore: number;
    distanceScore: number;
    priceMatch: boolean;
    priceInRange: boolean;
  };
  matchedService?: {
    name: string;
    price: number;
    duration: string;
  };
}

// Distance calculation using postal code similarity (simulated)
const calculateDistance = (
  customerPostal: string,
  stylistPostal: string,
): number => {
  // In a real app, this would use geolocation services
  if (!customerPostal || !stylistPostal) return 15; // Default distance if postal codes are missing

  const cPostal = customerPostal.toLowerCase().trim();
  const sPostal = stylistPostal.toLowerCase().trim();

  if (cPostal === sPostal) return 0.5;

  // Simulate distance based on postcode prefix (e.g., "SW1" vs "SW1A")
  const cPrefix = cPostal.substring(0, 3);
  const sPrefix = sPostal.substring(0, 3);

  if (cPrefix === sPrefix) return 2.5;
  return 12;
};

// Check if stylist is available on the given date
const isAvailableOnDate = (stylist: Stylist, date: string): boolean => {
  if (!date) return true; // No date specified, so all are considered available
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });
  return !!stylist.availability[dayName];
};

// Check if stylist is available at the given time
const isAvailableAtTime = (stylist: Stylist, date: string, time: string): boolean => {
  if (!date || !time) return true; // No date/time specified, so all are considered available
  
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });
  const dayAvailability = stylist.availability[dayName];
  
  if (!dayAvailability) return false;
  
  // Parse the time (e.g., "10:00" -> 10)
  const requestedHour = parseInt(time.split(":")[0], 10);
  
  // Parse availability hours
  const startHour = parseInt(dayAvailability.start.split(":")[0], 10);
  const endHour = parseInt(dayAvailability.end.split(":")[0], 10);
  
  return requestedHour >= startHour && requestedHour < endHour;
};

// Check if stylist offers the requested hairstyle
const hasHairstyleExpertise = (
  stylist: Stylist,
  hairstyle: string,
): boolean => {
  if (!hairstyle) return true;
  return stylist.specialties.some(
    (s) =>
      s.toLowerCase().includes(hairstyle.toLowerCase()) ||
      hairstyle.toLowerCase().includes(s.toLowerCase()),
  );
};

// Get the service for a specific hairstyle
const getServiceForHairstyle = (
  stylist: Stylist,
  hairstyle: string,
): { name: string; price: number; duration: string } | null => {
  const service = stylist.services.find(
    (s) => s.name.toLowerCase() === hairstyle.toLowerCase(),
  );
  return service ? { name: service.name, price: service.price, duration: service.duration } : null;
};

// Main matching algorithm
export const matchStylists = (
  criteria: MatchCriteria,
  stylists: Stylist[],
): { exactMatches: MatchResult[]; closestMatches: MatchResult[] } => {
  const allStylists = stylists.map((stylist) => {
    const distance = calculateDistance(criteria.postcode, stylist.postalCode);
    const expertiseMatch = hasHairstyleExpertise(stylist, criteria.hairstyle);
    const availabilityMatch = isAvailableOnDate(stylist, criteria.date);
    const timeMatch = isAvailableAtTime(stylist, criteria.date, criteria.time);
    const matchedService = getServiceForHairstyle(stylist, criteria.hairstyle);
    const price = matchedService?.price || null;

    // Filter: Price Range logic (Platform Commission Rule: uses exact stylist price)
    let priceInRange = true;
    if (criteria.minPrice !== undefined && criteria.maxPrice !== undefined) {
      if (price !== null) {
        priceInRange = price >= criteria.minPrice && price <= criteria.maxPrice;
      } else {
        // If price is missing, we can't confirm it's in range
        priceInRange = false;
      }
    } else {
      // If no price range set, we still require a valid price to book
      if (price === null) priceInRange = false;
    }

    // Scores
    // Distance Score: Prioritized in matching logic
    let distanceScore = 0;
    if (distance <= 1) distanceScore = 100;
    else if (distance <= 3) distanceScore = 80;
    else if (distance <= 5) distanceScore = 60;
    else if (distance <= 10) distanceScore = 40;
    else distanceScore = 20;

    const ratingScore = (stylist.rating / 5) * 100;

    // Price Score: Higher score for being closer to budget midpoint or lower price
    let priceScore = 0;
    if (price !== null) {
      if (criteria.minPrice !== undefined && criteria.maxPrice !== undefined) {
        const midpoint = (criteria.minPrice + criteria.maxPrice) / 2;
        priceScore = Math.max(0, 100 - (Math.abs(price - midpoint) / 50) * 100);
      } else {
        // If no price range, score based on being affordable
        priceScore = Math.max(0, 100 - (price / 300) * 100);
      }
    }

    // Weights - Adapted to user prioritization:
    // 1. Hairstyle & 2. Availability (Handled via filtering for exact matches)
    // 3. Distance > 4. Rating > 5. Price
    const weights = {
      expertise: 0.4,
      availability: 0.25,
      distance: 0.2,
      rating: 0.1,
      price: 0.05,
    };

    let matchScore = 0;
    if (expertiseMatch) matchScore += weights.expertise;
    if (availabilityMatch && timeMatch) matchScore += weights.availability;
    matchScore += (distanceScore / 100) * weights.distance;
    matchScore += (ratingScore / 100) * weights.rating;
    matchScore += (priceScore / 100) * weights.price;

    matchScore = Math.min(100, Math.round(matchScore * 100));

    return {
      stylist: {
        ...stylist,
        matchScore: Math.round(matchScore),
        distanceFromCustomer: distance,
      },
      matchScore: Math.round(matchScore),
      matchDetails: {
        expertiseMatch,
        availabilityMatch,
        timeMatch,
        ratingScore: Math.round(ratingScore),
        distanceScore: Math.round(distanceScore),
        priceMatch: price !== null,
        priceInRange,
      },
      matchedService: matchedService || undefined,
    };
  });

  const exactMatches = allStylists.filter(
    (m) =>
      m.matchDetails.expertiseMatch &&
      m.matchDetails.availabilityMatch &&
      m.matchDetails.timeMatch &&
      m.matchDetails.priceInRange,
  );

  const closestMatches = allStylists.filter((m) => !exactMatches.includes(m));

  const sortMatches = (a: MatchResult, b: MatchResult) =>
    b.matchScore - a.matchScore;

  return {
    exactMatches: exactMatches.sort(sortMatches),
    closestMatches: closestMatches.sort(sortMatches),
  };
};

// Get single best match (can be useful for other features)
export const getBestMatch = (
  criteria: MatchCriteria,
  stylists: Stylist[],
): MatchResult | null => {
  const { exactMatches, closestMatches } = matchStylists(criteria, stylists);
  if (exactMatches.length > 0) {
    return exactMatches[0];
  }
  if (closestMatches.length > 0) {
    return closestMatches[0];
  }
  return null;
};

