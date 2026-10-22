import React, { useState, useEffect } from 'react';
import { Heart, ArrowUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const targetDate = new Date('2027-01-31T06:00:00+05:30').getTime();
  const [sunrisesLeft, setSunrisesLeft] = useState(0);

  useEffect(() => {
    const calc = () => {
      const diff = targetDate - Date.now();
      setSunrisesLeft(diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0);
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <footer className="py-16 px-4 text-center">
      {/* Thin gradient line */}
      <div className="w-24 h-0.5 mx-auto mb-12 rounded-full" style={{ background: 'linear-gradient(to right, #8E0E16, #D4AF37, #C21D27)' }} />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Royal Hallmark Crest (Clickable to Enlarge) */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsEnlarged(true)}
            className="rounded-full border-4 border-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-zoom-in group focus:outline-none overflow-hidden"
            title="Click to view crest"
          >
            <img
              src="/images/logo.png"
              alt="Anushka & Yash Royal Hallmark"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
            />
          </button>
        </div>

        {/* Wedding hashtag */}
        <p className="font-royal-custom text-xl sm:text-2xl font-bold tracking-[0.15em] gradient-text-blend">
          #AnushKaYash
        </p>

        {/* Poetic Sunrise Countdown */}
        <div className="py-2 flex flex-col items-center">
          <span className="font-royal-custom text-5xl sm:text-6xl font-bold tracking-tight text-[#8E0E16]">
            {sunrisesLeft}
          </span>
          <span className="font-serif-custom text-sm sm:text-base tracking-[0.22em] uppercase text-[#9A6C20] font-bold mt-1">
            sunrises until we meet
          </span>
        </div>

        <p className="font-serif-custom text-base text-[#342226] italic font-medium">
          Two States &middot; One Love
        </p>

        {/* Action buttons row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#8E0E16] hover:text-[#2E1015] transition-colors cursor-pointer px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#DFCAB0]/70 shadow-xs hover:shadow-md"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 text-xs text-[#8E0E16] font-semibold flex flex-col sm:flex-row justify-center items-center gap-2 tracking-wider">
          <span>Jan 31 &ndash; Feb 3, 2027 &middot; Anushka & Yash</span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="flex items-center gap-1 text-[#9A6C20]">
            Igatpuri, Maharashtra <Heart className="w-3 h-3 text-[#8E0E16] fill-[#8E0E16]" />
          </span>
        </div>
      </div>

      {/* Enlarged Crest Lightbox Modal */}
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEnlarged(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1222]/70 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full p-4 sm:p-8 flex flex-col items-center"
            >
              {/* Close button */}
              <button
                onClick={() => setIsEnlarged(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#1A1222] shadow-lg transition-colors cursor-pointer z-10"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-res Crest Display */}
              <div className="relative rounded-full border-4 border-white shadow-2xl overflow-hidden">
                <img
                  src="/images/logo.png"
                  alt="Anushka & Yash Royal Logo - Enlarged"
                  className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] object-cover"
                />
              </div>

              <p className="font-serif-custom text-white/90 text-sm sm:text-base tracking-[0.2em] uppercase mt-6 font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                Anushka & Yash &middot; Royal Wedding Crest
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
