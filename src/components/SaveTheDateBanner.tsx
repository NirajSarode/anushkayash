import React from 'react';
import { motion } from 'framer-motion';

interface SaveTheDateBannerProps {
  onNavigateToVenue?: () => void;
}

export const SaveTheDateBanner: React.FC<SaveTheDateBannerProps> = ({
  onNavigateToVenue,
}) => {
  const handleVenueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToVenue) {
      onNavigateToVenue();
    } else {
      const el = document.getElementById('venue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle floating background petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 left-[8%] text-[#B05B43]/30 text-2xl select-none"
        >
          ❀
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.5, 0.2], rotate: [0, -20, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-[6%] text-[#8E68A8]/30 text-3xl select-none"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.25, 0.55, 0.25], rotate: [0, 25, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 left-[12%] text-[#D47B50]/35 text-xl select-none"
        >
          ✨
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Top Decorative Filigree Crest */}
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <svg className="w-28 sm:w-36 h-6 text-[#C58F64] opacity-80" viewBox="0 0 160 24" fill="none" stroke="currentColor">
            <path d="M80 12 C60 12, 50 4, 30 4 C18 4, 10 10, 2 12" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M80 12 C100 12, 110 4, 130 4 C142 4, 150 10, 158 12" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="80" cy="12" r="3" fill="currentColor" />
            <circle cx="30" cy="4" r="1.5" fill="currentColor" />
            <circle cx="130" cy="4" r="1.5" fill="currentColor" />
            <path d="M72 12 C68 8, 62 6, 56 6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M88 12 C92 8, 98 6, 104 6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* ── Main Arch Framed Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="card-sheen relative rounded-3xl sm:rounded-[36px] overflow-hidden border-2 border-[#C58F64]/45 bg-[#F7F3EE] shadow-[0_20px_60px_rgba(46,36,56,0.18)]"
        >
          {/* Inner Accent Hairline Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl sm:rounded-[28px] border border-[#C58F64]/30 pointer-events-none z-20" />

          {/* ── Corner Filigree SVG Ornaments ── */}
          {/* Top Left */}
          <svg className="absolute top-3 left-3 sm:top-5 sm:left-5 w-10 sm:w-16 h-10 sm:h-16 text-[#C58F64] opacity-85 z-20 pointer-events-none" viewBox="0 0 60 60" fill="none" stroke="currentColor">
            <path d="M4 24 C4 13 13 4 24 4 H56" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 24 V56" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" />
            <path d="M14 14 C20 8 30 8 36 14 C42 20 42 30 36 36 C30 42 20 42 14 36" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          </svg>

          {/* Top Right */}
          <svg className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 sm:w-16 h-10 sm:h-16 text-[#C58F64] opacity-85 z-20 pointer-events-none -scale-x-100" viewBox="0 0 60 60" fill="none" stroke="currentColor">
            <path d="M4 24 C4 13 13 4 24 4 H56" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 24 V56" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" />
            <path d="M14 14 C20 8 30 8 36 14 C42 20 42 30 36 36 C30 42 20 42 14 36" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          </svg>

          {/* Bottom Left */}
          <svg className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-10 sm:w-16 h-10 sm:h-16 text-[#C58F64] opacity-85 z-20 pointer-events-none -scale-y-100" viewBox="0 0 60 60" fill="none" stroke="currentColor">
            <path d="M4 24 C4 13 13 4 24 4 H56" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 24 V56" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" />
            <path d="M14 14 C20 8 30 8 36 14 C42 20 42 30 36 36 C30 42 20 42 14 36" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          </svg>

          {/* Bottom Right */}
          <svg className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-10 sm:w-16 h-10 sm:h-16 text-[#C58F64] opacity-85 z-20 pointer-events-none scale-x-[-1] scale-y-[-1]" viewBox="0 0 60 60" fill="none" stroke="currentColor">
            <path d="M4 24 C4 13 13 4 24 4 H56" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 24 V56" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" />
            <path d="M14 14 C20 8 30 8 36 14 C42 20 42 30 36 36 C30 42 20 42 14 36" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          </svg>

          {/* ── Marigold Toran Garlands (Swags & Vertical Drops) ── */}
          <div className="absolute inset-x-0 top-0 z-20 pointer-events-none flex justify-between px-6 sm:px-14">
            {/* Left Hanging Garlands */}
            <div className="flex gap-2 -mt-1 sm:-mt-2">
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EA580C] shadow-sm animate-pulse" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#EA580C] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#EA580C] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-100 -mt-0.5 shadow-sm" />
                <span className="w-3 h-4 rounded-b-full bg-[#D97706] -mt-0.5 shadow-sm" />
              </div>
              <div className="flex flex-col items-center hidden sm:flex">
                <span className="w-3 h-3 rounded-full bg-amber-100 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-100 -mt-1 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-100 -mt-1 shadow-sm" />
                <span className="w-2.5 h-3.5 rounded-b-full bg-[#EA580C] -mt-0.5 shadow-sm" />
              </div>
            </div>

            {/* Top Scalloped Garland Swag Overlay */}
            <div className="flex-1 px-4 hidden md:block">
              <svg className="w-full h-12 text-[#FACC15]" viewBox="0 0 600 48" fill="none">
                {/* Left Swag */}
                <path d="M40 0 Q150 42 260 0" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 10" />
                <path d="M40 4 Q150 46 260 4" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 9" />
                {/* Right Swag */}
                <path d="M340 0 Q450 42 560 0" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 10" />
                <path d="M340 4 Q450 46 560 4" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 9" />
              </svg>
            </div>

            {/* Right Hanging Garlands */}
            <div className="flex gap-2 -mt-1 sm:-mt-2">
              <div className="flex flex-col items-center hidden sm:flex">
                <span className="w-3 h-3 rounded-full bg-amber-100 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-100 -mt-1 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-100 -mt-1 shadow-sm" />
                <span className="w-2.5 h-3.5 rounded-b-full bg-[#EA580C] -mt-0.5 shadow-sm" />
              </div>
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EA580C] shadow-sm animate-pulse" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#EA580C] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#EA580C] -mt-1 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] -mt-1 shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-100 -mt-0.5 shadow-sm" />
                <span className="w-3 h-4 rounded-b-full bg-[#D97706] -mt-0.5 shadow-sm" />
              </div>
            </div>
          </div>

          {/* ── Background Photo of Couple in Lake Palace ── */}
          <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between">
            <img
              src="/images/rsvp_banner_couple.webp"
              alt="Anushka and Yash at The Palace Resort"
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-[1.01]"
              loading="lazy"
            />

            {/* Top & Bottom Warm Radiant Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/90 via-transparent via-45% to-[#F5EFE6]/95 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#F5EFE6]/40 pointer-events-none" />

            {/* ── Top Header Text ── */}
            <div className="relative z-20 text-center pt-8 sm:pt-12 px-6">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-serif-custom text-xs sm:text-sm tracking-[0.32em] uppercase text-[#3D2C50] font-bold"
              >
                The Grand Celebration
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="font-royal-custom text-2xl xs:text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] font-bold mt-1 sm:mt-2 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]"
              >
                <span className="text-[var(--color-her,#941B26)]">ANUSHKA</span>{' '}
                <span className="font-serif-custom text-[var(--color-accent,#D4AF37)] italic font-light">&amp;</span>{' '}
                <span className="text-[var(--color-him,#941B26)]">YASH</span>
              </motion.h2>
            </div>

            {/* ── Bottom Save the Date Details ── */}
            <div className="relative z-20 px-6 sm:px-12 pb-6 sm:pb-8 pt-6">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <p className="font-serif-custom text-sm sm:text-base md:text-lg tracking-[0.12em] text-[#2B2136] font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
                  Save the Date &mdash;{' '}
                  <span className="text-[#8E0E16]">January 31 &ndash; February 3, 2027</span>{' '}
                  &bull;{' '}
                  <span className="text-[#9A6C20]">Touchwood Bliss, Igatpuri</span>
                </p>

                <div className="flex items-center justify-center gap-4 text-xs tracking-[0.25em] uppercase font-bold text-[#6E3840]">
                  <button
                    onClick={handleVenueClick}
                    className="hover:text-[#8E0E16] underline underline-offset-4 decoration-[#D4AF37]/60 transition-colors cursor-pointer"
                  >
                    EXPLORE VENUE &amp; TRAVEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Filigree Flourish Accent */}
        <div className="flex items-center justify-center mt-3 sm:mt-4">
          <svg className="w-28 sm:w-36 h-6 text-[#C58F64] opacity-80 -scale-y-100" viewBox="0 0 160 24" fill="none" stroke="currentColor">
            <path d="M80 12 C60 12, 50 4, 30 4 C18 4, 10 10, 2 12" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M80 12 C100 12, 110 4, 130 4 C142 4, 150 10, 158 12" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="80" cy="12" r="3" fill="currentColor" />
            <circle cx="30" cy="4" r="1.5" fill="currentColor" />
            <circle cx="130" cy="4" r="1.5" fill="currentColor" />
            <path d="M72 12 C68 8, 62 6, 56 6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M88 12 C92 8, 98 6, 104 6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDateBanner;
