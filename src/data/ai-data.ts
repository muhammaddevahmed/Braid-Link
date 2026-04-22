export const mockHealthReport = {
  hairHealthScore: 85,
  riskLevel: 'Low',
  safeStyling: true,
  recommendations: [
    'Use a leave-in conditioner before braiding.',
    'Avoid excessive tension on the edges.',
    'Moisturize your scalp every 2-3 days.',
  ],
  analysis: {
    texture: 'Curly',
    density: 'High',
    strength: 'Good',
    scalpSensitivity: 'Low',
    damage: 'None Detected',
  },
};

export const mockStyleSuggestion = {
  image: 'https://placehold.co/600x800/EEDD82/333?text=AI+Style',
  name: 'Goddess Braids with Curls',
  confidence: 92,
  safety: 'Hair-Safe',
  tension: 'Low',
  price: 180,
  duration: 240, // in minutes
  careNote: 'Keep curls moisturized with a light mousse.',
};
