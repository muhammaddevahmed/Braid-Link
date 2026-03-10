# Smart Matching System - Quick Start Guide

## 🚀 How to Use the Instant Match Feature

### For End Users (Customers)

#### Step 1: Access Instant Match

- Navigate to **Home Page** or **Find a Stylist** page
- Look for the **"Instant Match"** button (with sparkle icon ✨)

#### Step 2: Login (Required)

- If not logged in, you'll be redirected to login
- Demo credentials:
  - **Email**: customer@demo.com
  - **Password**: any value (demo accepts any password)

#### Step 3: Fill Your Preferences

1. **Select Hairstyle** - Choose from:
   - Box Braids, Knotless Braids, Cornrows
   - Fulani Braids, Lemonade Braids, Micro Braids
   - Senegalese Twists, Passion Twists, Flat Twists
   - Goddess Locs, Butterfly Locs, Crochet Braids

2. **Pick Your Date**
   - Select any date from tomorrow onwards
   - Calendar picker provided

3. **Choose Your Time**
   - 24-hour format available
   - Morning, afternoon, or evening slots

4. **Set Your Budget**
   - Use sliders for Min Price and Max Price
   - Range: $50 - $400
   - Your postal code is auto-populated from your profile

#### Step 4: Find Your Match

- Click **"Find My Perfect Match"** button
- System loads for ~2 seconds (animated spinner)
- Best matching stylist appears with:
  - Match Score (0-100%)
  - Photo & name
  - Rating & reviews
  - Response speed badge
  - Why they match (expertise, availability, price)

#### Step 5: Take Action

- **Book Now** → Go to booking confirmation
- **Find Another** → See next best match
- If stylist rejects, auto-shows next match

---

## 📊 How the Matching Algorithm Works

### What Gets Scored

For each stylist, the system checks:

✅ **Hard Requirements** (Must Have)

- Specializes in your chosen hairstyle
- Available on your selected date & time
- Price fits within your budget

🎯 **Soft Scoring** (Ranked by)

1. **Rating** (25% weight)
   - 4.8★ = 96 points
2. **Distance** (20% weight)
   - Closer = Higher score
   - Same postal code = Best score
3. **Price Match** (20% weight)
   - How close to your budget midpoint
4. **Response Speed** (15% weight)
   - Fast: 100 points
   - Medium: 70 points
   - Slow: 40 points
5. **Popularity** (20% weight)
   - Based on review count & featured status

### Example Match Calculation

```
Angela Johnson:
- Rating 4.8/5: 96 points × 25% = 24
- Distance 0.5mi: 100 points × 20% = 20
- Price $120 vs $125 target: 95 points × 20% = 19
- Response "Fast": 100 points × 15% = 15
- Popularity (120 reviews, featured): 85 × 20% = 17
─────────────────────────────────────
FINAL MATCH SCORE: 95/100 ⭐⭐⭐⭐⭐
```

---

## 🧪 Test Data Available

### Demo Customers

All demo customers have postal codes set:

| Name           | Email             | Postal Code             |
| -------------- | ----------------- | ----------------------- |
| Sarah Mitchell | customer@demo.com | 11201 (Brooklyn, NY)    |
| Lisa Thompson  | lisa@example.com  | 60601 (Chicago, IL)     |
| Kim Brown      | kim@example.com   | 90001 (Los Angeles, CA) |
| Aisha Patel    | aisha@example.com | 77001 (Houston, TX)     |

### Demo Stylists

6 stylists available in system:

| Name             | Location        | Specialty                     | Rating | Response Speed |
| ---------------- | --------------- | ----------------------------- | ------ | -------------- |
| Angela Johnson   | Brooklyn, NY    | Box/Knotless Braids, Cornrows | 4.8    | Fast ⚡        |
| Destiny Williams | Atlanta, GA     | Goddess Locs, Passion Twists  | 4.9    | Fast ⚡        |
| Jasmine Carter   | Houston, TX     | Fulani/Lemonade Braids        | 4.7    | Medium ⏱️      |
| Tiffany Moore    | Chicago, IL     | Crochet Braids, Flat Twists   | 4.6    | Medium ⏱️      |
| Maya Robinson    | Los Angeles, CA | Micro Braids, Cornrows        | 4.9    | Fast ⚡        |
| Nicole Davis     | Miami, FL       | Box Braids, Passion Twists    | 4.5    | Slow 🐢        |

### Available Services & Prices

- **Cornrows**: $75-$85
- **Box Braids**: $110-$130
- **Knotless Braids**: $150-$160
- **Flat Twists**: $90
- **Crochet Braids**: $100
- **Senegalese Twists**: $160
- **Fulani Braids**: $140
- **Lemonade Braids**: $130
- **Passion Twists**: $155-$170
- **Butterfly Locs**: $190
- **Goddess Locs**: $200
- **Micro Braids**: $250

---

## 💻 For Developers

### File Structure

```
src/
├── components/smart-match/
│   ├── InstantMatchButton.tsx      # Button to trigger matching
│   ├── MatchModal.tsx               # Main matching form & results
│   ├── MatchingLoader.tsx           # Loading animation
│   ├── StylistMatchCard.tsx         # Stylist result card
│   └── index.ts                     # Component exports
├── lib/
│   └── matchingEngine.ts            # Matching algorithm
├── pages/
│   ├── HomePage.tsx                 # Added Instant Match button
│   └── FindStylistPage.tsx          # Added Instant Match button
└── data/
    └── demo-data.ts                 # Updated with postal codes & speeds
```

### Using the Matching Engine

```typescript
import {
  matchStylists,
  MatchCriteria,
  MatchResult,
} from "@/lib/matchingEngine";
import { stylists } from "@/data/demo-data";

// Set up matching criteria
const criteria: MatchCriteria = {
  hairstyle: "Box Braids",
  date: "2026-03-15",
  time: "10:00",
  minPrice: 100,
  maxPrice: 150,
  customerPostalCode: "11201",
};

// Get ranked matches
const results = matchStylists(criteria, stylists);

// Get best match
const bestMatch = results[0];
console.log(
  `Best match: ${bestMatch.stylist.name} - Score: ${bestMatch.matchScore}%`,
);

// Iterate through matches
results.forEach((match, index) => {
  console.log(`#${index + 1}: ${match.stylist.name} - ${match.matchScore}%`);
});
```

### Customizing the Algorithm

Edit `src/lib/matchingEngine.ts`:

```typescript
// Change weight percentages (must sum to 100)
const matchScore =
  ratingScore * 0.3 + // Changed from 0.25
  distanceScore * 0.15 + // Changed from 0.20
  priceMatch * 0.2 +
  responseSpeedScore * 0.2 + // Changed from 0.15
  popularityScore * 0.15; // Changed from 0.20
```

### Customizing Distance Calculation

```typescript
const calculateDistance = (
  customerPostal: string,
  stylistPostal: string,
): number => {
  // Customize distance logic here
  // Replace with real geolocation API

  if (customerPostal === stylistPostal) return 0.5;
  // ... rest of logic
};
```

---

## 🎨 Styling & Customization

### Component Props

#### InstantMatchButton

```typescript
<InstantMatchButton
  onClick={() => setIsOpen(true)}
  size="md"              // 'sm' | 'md' | 'lg'
  variant="primary"      // 'primary' | 'secondary'
/>
```

#### MatchModal

```typescript
<MatchModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  customerPostalCode="11201"
/>
```

#### StylistMatchCard

```typescript
<StylistMatchCard
  stylist={stylistData}
  hairstyle="Box Braids"
  price={120}
  onBookNow={() => navigate('/booking')}
  onFindAnother={() => showNextMatch()}
  isRejected={false}
/>
```

### Tailwind Classes Used

- `rounded-xl` - Card borders
- `shadow-2xl` - Elevated shadows
- `backdrop-blur-sm` - Frosted glass effects
- `animate-` - Built-in animations
- `group-hover:` - Hover state groups

---

## 🐛 Troubleshooting

### "Please log in to use Instant Match"

- User not authenticated
- Solution: Click link to login page, then return

### "Please add your postal code to your profile"

- User postal code not set
- Solution: Update user profile with postal code
- Note: Demo users already have postal codes

### "Sorry, no stylists match your criteria"

- No stylists available for selected criteria
- Solutions:
  - Increase price budget
  - Select different date/time
  - Try another hairstyle

### Modal not opening

- Check if styled components are loading
- Verify framer-motion is installed
- Check browser console for errors

### Styling issues

- Clear browser cache
- Rebuild with `npm run build`
- Verify Tailwind CSS is loaded

---

## 📈 Performance Notes

- Algorithm runs in milliseconds (frontend only)
- 2-second loading pause is for UX (simulated API delay)
- Handles up to 6 stylists efficiently
- Scales well for 50+ stylists with same algorithm

---

## 🔒 Security Notes

- All matching happens on frontend (no data sent to server)
- Postal codes only used for distance calculation
- Algorithm is deterministic (same inputs = same results)
- No personal data stored beyond session

---

**Ready to use!** 🎉 Start matching customers with stylists instantly!
