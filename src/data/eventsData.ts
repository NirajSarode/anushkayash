export interface WeddingEvent {
  id: string;
  day: 'jan31' | 'feb1' | 'feb2';
  dayLabel: string;
  timeOfDay: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dressCodeTitle: string;
  dressCodeSuggestions: string[];
  swatches: string[];
  image: string;
  musicVibe: string;
  accentColor: string;
}

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'mehendi',
    day: 'jan31',
    dayLabel: 'Day 1 · Jan 31',
    timeOfDay: 'Evening',
    title: 'Evening Mehendi',
    subTitle: 'Henna, music & mountain sunset',
    date: 'Sunday, Jan 31, 2027',
    time: '04:30 PM onwards',
    location: 'Pine Orchard Lawns, Touchwood Bliss',
    description: 'A vibrant sundowner welcoming all guests to Igatpuri with organic henna artists, live folk melodies, bangle stalls, and festive mountain sunset vibes.',
    dressCodeTitle: 'Earthy Mustard, Saffron & Floral Green',
    dressCodeSuggestions: [
      'Women: Floral Lehengas, Mustard/Green Shararas, Lightweight Anarkalis',
      'Men: Kurta Pyjamas, Printed Silk Jackets, Pastel Bandhgalas',
    ],
    swatches: ['#4E6E58', '#D47B50', '#C58F64', '#F0EBE3'],
    image: '/images/mehendi.webp',
    musicVibe: 'Folk fusion, Rajasthani acoustic & dholak beats',
    accentColor: '#B0542C',
  },
  {
    id: 'haldi',
    day: 'feb1',
    dayLabel: 'Day 2 · Feb 1',
    timeOfDay: 'Morning',
    title: 'Morning Haldi',
    subTitle: 'Sunshine, turmeric & flower petal shower',
    date: 'Monday, Feb 1, 2027',
    time: '10:00 AM onwards',
    location: 'Sunshine Poolside Courtyard, Touchwood Bliss',
    description: 'A joyful morning filled with auspicious turmeric pastes, fragrant marigold petal showers, and playful dhol beats blessing Anushka and Yash.',
    dressCodeTitle: 'Sunshine Yellow, Ivory & Saffron',
    dressCodeSuggestions: [
      'Women: Yellow Sarees, Chiffon Lehengas, Floral Jewelry',
      'Men: Yellow/White Kurtas, Dhoti Kurta, Lightweight Silks',
    ],
    swatches: ['#E6A117', '#F2C14E', '#C58F64', '#FFFFFF'],
    image: '/images/couple_hero.webp',
    musicVibe: 'Traditional Haldi folk songs, dhol & celebratory brass',
    accentColor: '#D47B50',
  },
  {
    id: 'mayera',
    day: 'feb1',
    dayLabel: 'Day 2 · Feb 1',
    timeOfDay: 'Afternoon',
    title: 'Afternoon Mayera (Bhat)',
    subTitle: 'Maternal blessings, tradition & royal gifts',
    date: 'Monday, Feb 1, 2027',
    time: '02:30 PM onwards',
    location: 'Pine Orchard Banquet, Touchwood Bliss',
    description: 'The heartwarming Rajasthani tradition where the maternal uncles (Mama) and family arrive with celebratory thalis, royal gifts, and affectionate blessings for the family.',
    dressCodeTitle: 'Traditional Rajasthani & Festive Elegance',
    dressCodeSuggestions: [
      'Women: Bandhani, Leheriya Sarees, Rajputi Poshaks, Festive Lehengas',
      'Men: Silk Kurtas with Safa/Pheta, Embroidered Bandhgalas',
    ],
    swatches: ['#B83253', '#D47B50', '#C58F64', '#F0EBE3'],
    image: '/images/family_illustration.webp',
    musicVibe: 'Traditional Mayera songs & auspicious shehnai',
    accentColor: '#B83253',
  },
  {
    id: 'sangeet',
    day: 'feb1',
    dayLabel: 'Day 2 · Feb 1',
    timeOfDay: 'Evening',
    title: 'Evening Sangeet',
    subTitle: 'Music, dance & glamour under the stars',
    date: 'Monday, Feb 1, 2027',
    time: '07:30 PM till late',
    location: 'Grand Mountain Ballroom, Touchwood Bliss',
    description: 'Delhi beats meet Maharashtra energy! High-voltage family dance performances, cocktails, DJ sets, and celebration dancing under the mountain stars.',
    dressCodeTitle: 'Indo-Western Glamour & Midnight Shimmer',
    dressCodeSuggestions: [
      'Women: Sequined Lehengas, Cocktail Gowns, Modern Anarkalis',
      'Men: Tuxedos, Velvet Bandhgalas, Embroidered Sherwanis',
    ],
    swatches: ['#8E0E16', '#C21D27', '#D4AF37', '#2E1015'],
    image: '/images/sangeet.webp',
    musicVibe: 'Bollywood dance anthems, Punjabi beats & DJ sets',
    accentColor: '#8E0E16',
  },
  {
    id: 'baraat',
    day: 'feb2',
    dayLabel: 'Day 3 · Feb 2',
    timeOfDay: 'Morning',
    title: 'Morning Baraat',
    subTitle: 'The groom\'s royal mountain procession',
    date: 'Tuesday, Feb 2, 2027',
    time: '10:30 AM onwards',
    location: 'Grand Entrance to Mist Deck, Touchwood Bliss',
    description: 'The celebratory arrival of Yash and the groom\'s procession with energetic dhol tasha, royal safas, and spirited dancing winding up the scenic mountain avenue.',
    dressCodeTitle: 'Regal Festive Attire with Colourful Safas',
    dressCodeSuggestions: [
      'Women: Pastel Silk Lehengas, Paithanis, Benarasi Sarees',
      'Men: Classic Sherwanis or Kurtas with Royal Safa / Pheta',
    ],
    swatches: ['#D4AF37', '#9A6C20', '#8E0E16', '#FAF6F0'],
    image: '/images/maharashtra_side.webp',
    musicVibe: 'Live Dhol Tasha, brass band & celebratory procession beats',
    accentColor: '#D4AF37',
  },
  {
    id: 'phere',
    day: 'feb2',
    dayLabel: 'Day 3 · Feb 2',
    timeOfDay: 'Evening',
    title: 'Evening Phere',
    subTitle: 'Seven sacred vows where two states become one',
    date: 'Tuesday, Feb 2, 2027',
    time: '04:30 PM (Sunset)',
    location: 'Mist Deck Mandap, Touchwood Bliss',
    description: 'As golden twilight settles over the Sahyadri peaks, Anushka & Yash take their seven sacred vows around the holy fire — uniting Delhi and Maharashtra forever.',
    dressCodeTitle: 'Royal Elegance — Traditional Jewel Tones & Gold',
    dressCodeSuggestions: [
      'Women: Royal Silk Lehengas, Kanjeevarams, Heritage Jewelry',
      'Men: Regal Ivory/Gold Sherwanis with Traditional Turban',
    ],
    swatches: ['#8E0E16', '#C21D27', '#D4AF37', '#FAF6F0'],
    image: '/images/pheras.webp',
    musicVibe: 'Live shehnai, Vedic chants & sitar recital',
    accentColor: '#8E0E16',
  },
  {
    id: 'reception',
    day: 'feb2',
    dayLabel: 'Day 3 · Feb 2',
    timeOfDay: 'Night',
    title: 'Night Reception',
    subTitle: 'Dinner, toasts & celebration with the newlyweds',
    date: 'Tuesday, Feb 2, 2027',
    time: '08:00 PM onwards',
    location: 'Grand Mountain Ballroom & Lawns, Touchwood Bliss',
    description: 'An opulent banquet dinner and gala celebration honoring the newlyweds Mr. & Mrs. Yash & Anushka, accompanied by live acoustic music, heartfelt speeches, and celebration toasts.',
    dressCodeTitle: 'Black Tie / Royal Evening Finery',
    dressCodeSuggestions: [
      'Women: Contemporary Gowns, Elegant Silk Drapes, Diamond Accents',
      'Men: Black Tie Tuxedos, Modern Bandhgalas, Classic Suits',
    ],
    swatches: ['#2E1015', '#8E0E16', '#D4AF37', '#FFFDF9'],
    image: '/images/couple_animated.webp',
    musicVibe: 'Live jazz, acoustic strings & celebratory lounge',
    accentColor: '#D4AF37',
  },
];
