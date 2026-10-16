export interface FontOption {
  id: string;
  name: string;
  tag: string;
  description: string;
  titleFont: string;
  subtitleFont: string;
  scriptFont: string;
  titleFamilyName: string;
  samplePairing: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  tag: string;
  description: string;
  herColor: string;       // Delhi / Anushka accent
  himColor: string;       // Maharashtra / Yash accent
  accentColor: string;    // Gold / connecting accent
  bgCanvas: string;       // Page background
  headingColor: string;   // Main dark text
  cardBg: string;         // Card background
  borderTone: string;     // Hairline border
}

export interface BackgroundOption {
  id: string;
  name: string;
  tag: string;
  color: string;
  description: string;
  isDark?: boolean;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'prata-chic',
    name: 'Contemporary Palace',
    tag: 'Minimalist Luxe (Active)',
    description: 'Refined teardrop serifs with ultra-crisp modern sans geometric details.',
    titleFont: "'Prata', serif",
    subtitleFont: "'Plus Jakarta Sans', sans-serif",
    scriptFont: "'Great Vibes', cursive",
    titleFamilyName: 'Prata',
    samplePairing: 'Prata + Plus Jakarta Sans + Great Vibes',
  },
  {
    id: 'cinzel-royal',
    name: 'Initial Royal Poster',
    tag: 'Original Initial Font',
    description: 'The original first poster typography: Cinzel Decorative bold names, Cormorant Garamond Sanskrit inscriptions, and Great Vibes script ampersand.',
    titleFont: "'Cinzel Decorative', serif",
    subtitleFont: "'Cormorant Garamond', Georgia, serif",
    scriptFont: "'Great Vibes', cursive",
    titleFamilyName: 'Cinzel Decorative',
    samplePairing: 'Cinzel Decorative + Cormorant Garamond + Great Vibes',
  },
  {
    id: 'bodoni-haute',
    name: 'Editorial Haute',
    tag: 'Modern Vogue',
    description: 'Dramatic high-contrast fashion serifs with clean modernist subtitle typography.',
    titleFont: "'Bodoni Moda', serif",
    subtitleFont: "'Montserrat', sans-serif",
    scriptFont: "'Allura', cursive",
    titleFamilyName: 'Bodoni Moda',
    samplePairing: 'Bodoni Moda + Montserrat + Allura',
  },
  {
    id: 'rozha-sanskrit',
    name: 'Sanskrit Heritage',
    tag: 'Vedic Royal',
    description: 'Traditional Devanagari-inspired regal thick-and-thin serifs with historic temple gravitas.',
    titleFont: "'Rozha One', serif",
    subtitleFont: "'Marcellus', serif",
    scriptFont: "'Parisienne', cursive",
    titleFamilyName: 'Rozha One',
    samplePairing: 'Rozha One + Marcellus + Parisienne',
  },
  {
    id: 'playfair-romantic',
    name: 'Romantic Literature',
    tag: 'Poetic Serenade',
    description: 'Warm literary transitional serifs with timeless editorial lyricism.',
    titleFont: "'Playfair Display', serif",
    subtitleFont: "'Cormorant Garamond', Georgia, serif",
    scriptFont: "'Alex Brush', cursive",
    titleFamilyName: 'Playfair Display',
    samplePairing: 'Playfair Display + Cormorant Garamond',
  },
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'two-states',
    name: 'Two States Original',
    tag: 'Signature Palette',
    description: 'Delhi royal lavender and Maharashtra warm terracotta unified by antique rose gold.',
    herColor: '#5E3D7A',
    himColor: '#B0542C',
    accentColor: '#C58F64',
    bgCanvas: '#F0EBE3',
    headingColor: '#2E2438',
    cardBg: '#FDFBF7',
    borderTone: '#C8BEAF',
  },
  {
    id: 'saffron-peacock',
    name: 'Royal Saffron & Peacock',
    tag: 'Grand Durbar',
    description: 'Majestic peacock navy and auspicious saffron amber with royal vintage gold.',
    herColor: '#1E3A5F',
    himColor: '#D97706',
    accentColor: '#D4AF37',
    bgCanvas: '#FAF7F0',
    headingColor: '#182A42',
    cardBg: '#FFFFFF',
    borderTone: '#DACABA',
  },
  {
    id: 'emerald-rose',
    name: 'Imperial Emerald & Rose',
    tag: 'Botanical Romance',
    description: 'Deep Sahyadri hill emerald with blooming Delhi garden rose and champagne filigree.',
    herColor: '#1C4430',
    himColor: '#B75367',
    accentColor: '#DFBA73',
    bgCanvas: '#F8F6F2',
    headingColor: '#143022',
    cardBg: '#FFFFFF',
    borderTone: '#C9D3C8',
  },
  {
    id: 'ruby-sandalwood',
    name: 'Ruby Crimson & Sandalwood',
    tag: 'Auspicious Mandap',
    description: 'Royal bridal crimson with fragrant sandalwood terracotta and marigold gold.',
    herColor: '#7E2A3C',
    himColor: '#C47D42',
    accentColor: '#CCA46B',
    bgCanvas: '#FAF5EC',
    headingColor: '#3A141D',
    cardBg: '#FFFFFF',
    borderTone: '#E0D2C3',
  },
  {
    id: 'sunset-lilac',
    name: 'Sunset Lilac & Terracotta',
    tag: 'Mountain Twilight',
    description: 'Dusk mountain twilight lilac with warm sunbaked terracotta and desert bronze.',
    herColor: '#6D4C82',
    himColor: '#A84B29',
    accentColor: '#B8860B',
    bgCanvas: '#F4EEE6',
    headingColor: '#2B1D3A',
    cardBg: '#FFFDF9',
    borderTone: '#D1C4B5',
  },
];

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: 'original-ivory',
    name: 'Original Ivory Canvas',
    tag: 'Classic Two States',
    color: '#F0EBE3',
    description: 'Warm analog ivory film aesthetic — the original website background tone.',
  },
  {
    id: 'pearl-silk',
    name: 'Pearl Silk',
    tag: 'Crisp & Luminous',
    color: '#FAF7F2',
    description: 'Ultra-clean luminous bridal cream with maximum typography clarity.',
  },
  {
    id: 'sandalwood-cream',
    name: 'Sandalwood Parchment',
    tag: 'Warm & Earthy',
    color: '#EFE7DC',
    description: 'Earthy golden sandalwood tint inspired by traditional wedding papyrus.',
  },
  {
    id: 'dawn-lavender',
    name: 'Dawn Lavender Mist',
    tag: 'Delhi Tonal',
    color: '#EAE4ED',
    description: 'Delicate pastel lilac tint highlighting Anushka’s Delhi lavender palette.',
  },
  {
    id: 'sunset-peach',
    name: 'Sunset Peach Bisque',
    tag: 'Maharashtra Tonal',
    color: '#F5ECE3',
    description: 'Warm sunset peach glow highlighting Yash’s Maharashtra terracotta palette.',
  },
  {
    id: 'royal-velvet-dark',
    name: 'Royal Velvet Night',
    tag: 'Evening Palace Dark',
    color: '#1E1627',
    description: 'Opulent midnight plum dark backdrop making gold and pastel text radiantly glow.',
    isDark: true,
  },
];

export const getStoredFontTheme = (): string => {
  if (typeof window === 'undefined') return 'prata-chic';
  return localStorage.getItem('anushkayash_font_theme') || 'prata-chic';
};

export const getStoredColorTheme = (): string => {
  if (typeof window === 'undefined') return COLOR_PALETTES[0].id;
  return localStorage.getItem('anushkayash_color_theme') || COLOR_PALETTES[0].id;
};

export const getStoredBgTheme = (): string => {
  if (typeof window === 'undefined') return BACKGROUND_OPTIONS[0].color;
  return localStorage.getItem('anushkayash_bg_theme') || BACKGROUND_OPTIONS[0].color;
};

export const applyThemeToDom = (fontId: string, colorId: string, customBg?: string) => {
  if (typeof document === 'undefined') return;
  const font = FONT_OPTIONS.find((f) => f.id === fontId) || FONT_OPTIONS[0];
  const color = COLOR_PALETTES.find((c) => c.id === colorId) || COLOR_PALETTES[0];
  const activeBg = customBg || color.bgCanvas;

  const root = document.documentElement;
  // Apply font families
  root.style.setProperty('--font-royal', font.titleFont);
  root.style.setProperty('--font-serif', font.subtitleFont);
  root.style.setProperty('--font-script', font.scriptFont);

  // Apply color tokens
  root.style.setProperty('--color-her-deep', color.herColor);
  root.style.setProperty('--color-him-deep', color.himColor);
  root.style.setProperty('--color-accent', color.accentColor);
  root.style.setProperty('--color-bg', activeBg);
  root.style.setProperty('--color-heading', color.headingColor);
  root.style.setProperty('--color-card', color.cardBg);
  root.style.setProperty('--color-border', color.borderTone);

  // Save in local storage
  localStorage.setItem('anushkayash_font_theme', font.id);
  localStorage.setItem('anushkayash_color_theme', color.id);
  if (customBg) {
    localStorage.setItem('anushkayash_bg_theme', customBg);
  }
};

export type EventLayoutStyle = 'arch-cards' | 'royal-timeline' | 'day-folio' | 'magazine-horizontal';

export interface EventLayoutOption {
  id: EventLayoutStyle;
  name: string;
  tag: string;
  badge: string;
  description: string;
  highlight: string;
}

export const EVENT_LAYOUT_OPTIONS: EventLayoutOption[] = [
  {
    id: 'royal-timeline',
    name: 'Imperial Timeline Chronicle',
    tag: 'Royal Gazette / Itinerary',
    badge: 'Selected Edition',
    description: 'A connected golden vertical thread with royal day seals, time nodes, and alternating ceremony cards as a continuous celebration journey.',
    highlight: 'Flowing chronological journey, day milestone badges, authentic palace chronicle look.',
  },
  {
    id: 'arch-cards',
    name: 'Royal Arch Cards',
    tag: 'Classic Gilded Grid',
    badge: 'Classical',
    description: 'Bespoke masonry cards with day selector tabs, arched imagery, dress code swatches, and ceremony details modal.',
    highlight: 'Filterable Day tabs (31 Jan / 1 Feb / 2 Feb), clean 3-column desktop layout.',
  },
  {
    id: 'day-folio',
    name: 'Palace Day-by-Day Folio',
    tag: 'Royal Day Passes',
    badge: 'Structured',
    description: 'Structured day-by-day royal folios grouping Morning, Afternoon, Evening & Night ceremonies with time-of-day badges and accordion views.',
    highlight: 'Organized by Day (1, 2, 3), expandable ceremony schedules, structured palace itinerary.',
  },
  {
    id: 'magazine-horizontal',
    name: 'Cinematic Horizontal Strip',
    tag: 'High-Fashion Editorial',
    badge: 'Modern',
    description: 'Full-bleed cinematic horizontal strip with bold typography, film treatment, and side-scrolling ceremony spotlight cards.',
    highlight: 'Horizontal scroll, large cinematic cards, fashion editorial look.',
  },
];

export const getStoredEventLayout = (): EventLayoutStyle => {
  if (typeof window === 'undefined') return 'royal-timeline';
  return (localStorage.getItem('anushkayash_event_layout') as EventLayoutStyle) || 'royal-timeline';
};

export const setStoredEventLayout = (layout: EventLayoutStyle) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('anushkayash_event_layout', layout);
  window.dispatchEvent(new Event('anushkayash_event_layout_changed'));
};

