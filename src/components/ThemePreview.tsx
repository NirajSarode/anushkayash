import React from 'react';
import { Heart, MapPin, Calendar, Sparkles, ArrowLeft } from 'lucide-react';

interface ThemeOption {
  id: string;
  name: string;
  subtitle: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  primary: string;
  primaryText: string;
  secondary: string;
  secondaryText: string;
  accent: string;
  accentText: string;
  heading: string;
  body: string;
  muted: string;
  buttonBg: string;
  buttonText: string;
  glowColor: string;
}

const themes: ThemeOption[] = [
  {
    id: 'blush-sage',
    name: 'Blush & Sage',
    subtitle: 'Romantic Garden',
    bg: '#FDF8F4',
    cardBg: '#FFFFFF',
    cardBorder: '#E8B4B8',
    primary: '#E8B4B8',
    primaryText: '#9B6B6F',
    secondary: '#A8C5A0',
    secondaryText: '#5A7A52',
    accent: '#C9A96E',
    accentText: '#8B7340',
    heading: '#3D3535',
    body: '#5C4F4F',
    muted: '#9B8E8E',
    buttonBg: '#E8B4B8',
    buttonText: '#3D3535',
    glowColor: 'rgba(232,180,184,0.3)',
  },
  {
    id: 'lavender-peach',
    name: 'Lavender & Peach',
    subtitle: 'Dreamy Sunset',
    bg: '#FAF6F0',
    cardBg: '#FFFFFF',
    cardBorder: '#C4B1D4',
    primary: '#C4B1D4',
    primaryText: '#7B6490',
    secondary: '#F5C6AA',
    secondaryText: '#A0745A',
    accent: '#D4A89A',
    accentText: '#8B6558',
    heading: '#3B2E4A',
    body: '#5A4D6A',
    muted: '#9B8EAA',
    buttonBg: '#C4B1D4',
    buttonText: '#3B2E4A',
    glowColor: 'rgba(196,177,212,0.3)',
  },
  {
    id: 'mint-blush',
    name: 'Mint & Blush',
    subtitle: 'Fresh & Airy',
    bg: '#F9FAFB',
    cardBg: '#FFFFFF',
    cardBorder: '#A7D7C5',
    primary: '#A7D7C5',
    primaryText: '#4A8B73',
    secondary: '#F4C2C2',
    secondaryText: '#B07070',
    accent: '#D4C17F',
    accentText: '#8B7E40',
    heading: '#374151',
    body: '#4B5563',
    muted: '#9CA3AF',
    buttonBg: '#A7D7C5',
    buttonText: '#374151',
    glowColor: 'rgba(167,215,197,0.3)',
  },
  {
    id: 'dusty-rose-champagne',
    name: 'Dusty Rose & Champagne',
    subtitle: 'Classic Elegance',
    bg: '#F5EFE6',
    cardBg: '#FFFBF5',
    cardBorder: '#D4A0A0',
    primary: '#D4A0A0',
    primaryText: '#8B5E5E',
    secondary: '#C9B1BD',
    secondaryText: '#7A6070',
    accent: '#B8976A',
    accentText: '#6B5530',
    heading: '#3E3636',
    body: '#5C5050',
    muted: '#9B8E8E',
    buttonBg: '#D4A0A0',
    buttonText: '#3E3636',
    glowColor: 'rgba(212,160,160,0.3)',
  },
];

interface ThemePreviewProps {
  onBack: () => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all shadow-sm mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back To Home</span>
        </button>

        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs tracking-widest uppercase font-semibold mb-4 shadow-sm">
            Theme Selector
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
            Choose Your Pastel Palette
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Each theme shows a preview of how the wedding website will look. Pick the one that feels right for Anushka & Yash.
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Theme Label Bar */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: theme.bg }}
              >
                <div>
                  <h3 className="font-bold text-lg" style={{ color: theme.heading, fontFamily: 'Cinzel Decorative, serif' }}>
                    {theme.name}
                  </h3>
                  <p className="text-sm italic" style={{ color: theme.muted, fontFamily: 'Cormorant Garamond, serif' }}>
                    {theme.subtitle}
                  </p>
                </div>
                {/* Color Swatches */}
                <div className="flex gap-2">
                  {[theme.primary, theme.secondary, theme.accent, theme.bg].map((color, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Mini Website Preview */}
              <div className="p-6" style={{ background: theme.bg }}>
                {/* Mini Navbar */}
                <div
                  className="rounded-2xl px-5 py-3 flex items-center justify-between mb-6 shadow-sm"
                  style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}40` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: theme.primary, color: theme.cardBg }}
                    >
                      A&Y
                    </div>
                    <span className="text-xs font-semibold tracking-wider" style={{ color: theme.heading, fontFamily: 'Cinzel Decorative, serif' }}>
                      ANUSHKA & YASH
                    </span>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                    style={{ background: theme.buttonBg, color: theme.buttonText }}
                  >
                    <Heart className="w-3 h-3" />
                    RSVP
                  </div>
                </div>

                {/* Mini Hero Section */}
                <div
                  className="rounded-2xl p-6 mb-5 text-center shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
                    border: `1px solid ${theme.cardBorder}30`,
                  }}
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold mb-3"
                    style={{ background: `${theme.primary}25`, color: theme.primaryText, border: `1px solid ${theme.primary}40` }}
                  >
                    Mountain Destination Wedding
                  </span>
                  <div className="mb-1">
                    <span
                      className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest"
                      style={{ background: `${theme.accent}20`, color: theme.accentText, border: `1px solid ${theme.accent}40` }}
                    >
                      #AnushKaYash
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: theme.heading, fontFamily: 'Cinzel Decorative, serif' }}>
                    Anushka <span style={{ color: theme.primary, fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem' }}>&</span> Yash
                  </h2>
                  <p className="text-sm italic mb-4" style={{ color: theme.muted, fontFamily: 'Great Vibes, cursive' }}>
                    A Celebration Amongst The Misty Hills
                  </p>

                  {/* Mini Info Pills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium"
                      style={{ background: theme.cardBg, color: theme.body, border: `1px solid ${theme.cardBorder}40` }}
                    >
                      <Calendar className="w-3 h-3" style={{ color: theme.accent }} />
                      Feb 1-3, 2027
                    </span>
                    <span
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium"
                      style={{ background: theme.cardBg, color: theme.body, border: `1px solid ${theme.cardBorder}40` }}
                    >
                      <MapPin className="w-3 h-3" style={{ color: theme.primary }} />
                      Igatpuri, Maharashtra
                    </span>
                  </div>

                  {/* Mini Countdown */}
                  <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                    {['Days', 'Hrs', 'Min', 'Sec'].map((label, i) => (
                      <div
                        key={label}
                        className="rounded-xl py-2 text-center"
                        style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}40` }}
                      >
                        <div className="text-lg font-bold" style={{ color: theme.primaryText }}>
                          {['118', '04', '32', '17'][i]}
                        </div>
                        <div className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: theme.muted }}>
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Event Cards Row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { name: 'Mehendi', icon: <Sparkles className="w-3.5 h-3.5" />, color: theme.accent },
                    { name: 'Sangeet', icon: <Heart className="w-3.5 h-3.5" />, color: theme.primary },
                    { name: 'Pheras', icon: <Sparkles className="w-3.5 h-3.5" />, color: theme.secondary },
                  ].map((ev) => (
                    <div
                      key={ev.name}
                      className="rounded-xl p-3 text-center shadow-sm"
                      style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}30` }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                        style={{ background: `${ev.color}20`, color: ev.color }}
                      >
                        {ev.icon}
                      </div>
                      <div className="text-xs font-bold" style={{ color: theme.heading }}>
                        {ev.name}
                      </div>
                      <div className="text-[10px]" style={{ color: theme.muted }}>
                        Feb {ev.name === 'Pheras' ? '2' : '1'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini Blessings Card */}
                <div
                  className="rounded-xl p-4 shadow-sm"
                  style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}30` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    <span className="text-xs font-bold" style={{ color: theme.heading }}>
                      Blessings Wall
                    </span>
                  </div>
                  <p className="text-[11px] italic leading-relaxed" style={{ color: theme.body, fontFamily: 'Cormorant Garamond, serif' }}>
                    "May the mountain breezes bless your sacred union with endless warmth and happiness..."
                  </p>
                  <div className="mt-2 pt-2 text-[10px] font-semibold" style={{ color: theme.primaryText, borderTop: `1px solid ${theme.cardBorder}25` }}>
                    — Parents of the Bride
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
