import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { audioSynth } from '../utils/audioSynth';

interface HeroProps {
  onEnter?: () => void;
  hasUnveiled?: boolean;
  onUnveil?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter: _onEnter, hasUnveiled = false, onUnveil }) => {
  const [curtainRevealed, setCurtainRevealed] = useState(hasUnveiled);
  const [showCurtain, setShowCurtain] = useState(!hasUnveiled);
  const targetDate = new Date('2027-01-31T10:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const isRevealing = useRef(hasUnveiled);

  const handleUnveil = () => {
    if (curtainRevealed || isRevealing.current) return;
    isRevealing.current = true;
    setCurtainRevealed(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Play Mast Magan instrumental music as default sound on user gesture
    audioSynth.start().catch((err) => console.warn('Audio play:', err));

    setTimeout(() => {
      setShowCurtain(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (onUnveil) onUnveil();
    }, 1400);
  };

  // Lock background scroll completely until curtain is fully removed
  useEffect(() => {
    if (showCurtain) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      };
    }
  }, [showCurtain]);

  // Handle wheel, touch swipe, and keyboard gestures to unveil without scrolling background
  useEffect(() => {
    if (!showCurtain) return;

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      // Intercept and prevent the browser from scrolling the background website
      e.preventDefault();

      if (isRevealing.current || curtainRevealed) return;
      if (Math.abs(e.deltaY) > 8 || Math.abs(e.deltaX) > 8) {
        handleUnveil();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      // Prevent mobile drag / background scroll bounce
      if (e.cancelable) {
        e.preventDefault();
      }
      if (isRevealing.current || curtainRevealed) return;
      if (e.touches.length > 0) {
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        if (deltaY > 15) {
          handleUnveil();
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowDown', 'PageDown', 'Enter'].includes(e.code)) {
        e.preventDefault();
        handleUnveil();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showCurtain, curtainRevealed]);

  const handleCurtainTouchEnd = () => {
    handleUnveil();
  };

  useEffect(() => {
    const calc = () => {
      const diff = targetDate - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  // Ultra-smooth physical easing curve
  const curtainTransition = {
    duration: 1.4,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center overflow-x-hidden overflow-y-visible pt-16 pb-16 sm:pt-20 sm:pb-20">

      {/* ── Curtain Reveal Overlay ── */}
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleUnveil}
            onTouchEnd={handleCurtainTouchEnd}
            role="button"
            tabIndex={0}
            aria-label="Click or tap anywhere to unveil the wedding celebration"
            className="fixed inset-0 z-[100] bg-[#EFE8DD] pointer-events-auto overflow-hidden h-[100dvh] w-full touch-none select-none cursor-pointer overscroll-none"
          >
            {/* Left Division — Maharashtra Heritage */}
            <motion.div
              initial={{ x: 0 }}
              animate={curtainRevealed ? { x: '-102%' } : { x: 0 }}
              transition={curtainTransition}
              className="curtain-half-left"
            >
              <picture className="w-full h-full">
                <source media="(max-width: 767px)" srcSet="/images/landing_background_mobile.webp" />
                <img
                  src="/images/landing_background.webp"
                  alt=""
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </picture>
            </motion.div>

            {/* Right Division — Delhi Heritage */}
            <motion.div
              initial={{ x: 0 }}
              animate={curtainRevealed ? { x: '102%' } : { x: 0 }}
              transition={curtainTransition}
              className="curtain-half-right"
            >
              <picture className="w-full h-full">
                <source media="(max-width: 767px)" srcSet="/images/landing_background_mobile.webp" />
                <img
                  src="/images/landing_background.webp"
                  alt=""
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </picture>
            </motion.div>

            {/* Center — merging names, couple figures, and tagline (matching reference proportions) */}
            <motion.div
              animate={curtainRevealed ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 pt-[4vh] pb-[4vh]"
            >
              {/* Ambient radiant glow behind the couple */}
              <div
                className="absolute w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] rounded-full animate-breathe pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 235, 215, 0.35) 0%, rgba(230, 189, 112, 0.18) 45%, transparent 70%)',
                }}
              />

              {/* ── Couple Figure (52-54% of viewport height matching reference) ── */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                className="relative flex flex-col items-center justify-center pointer-events-none shrink-0"
              >
                {/* Soft warm champagne gold backlight glow */}
                <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-[#E6BD70]/25 via-[#FDE047]/30 to-[#D47B50]/25 rounded-full blur-2xl sm:blur-3xl opacity-75 animate-pulse" />

                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/couple_mobile.webp" />
                  <img
                    src="/images/couple_transparent.webp"
                    alt="Anushka & Yash"
                    decoding="async"
                    fetchPriority="high"
                    className="relative z-10 h-[36vh] sm:h-[44vh] md:h-[50vh] lg:h-[52vh] max-h-[560px] w-auto object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.32)]"
                  />
                </picture>
              </motion.div>

              {/* Names: AnushKaYash directly below couple lehenga */}
              <div className="relative mt-2 sm:mt-3 lg:mt-4 flex items-center justify-center flex-nowrap max-w-full overflow-visible shrink-0">
                {/* Anushka side */}
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
                  className="inline-flex items-baseline"
                >
                  {/* Anush (Royal Crimson) */}
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.8rem] xl:text-[6.4rem] font-normal tracking-[0.01em] text-royal-crimson select-none leading-none"
                    style={{
                      fontFamily: "'Atavian', 'Bodoni Moda', serif",
                    }}
                  >
                    Anush
                  </span>

                  {/* 'Ka' (Radiant Royal Gold) */}
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.8rem] xl:text-[6.4rem] font-normal tracking-[0.01em] text-royal-gold select-none inline-block leading-none"
                    style={{
                      fontFamily: "'Atavian', 'Bodoni Moda', serif",
                    }}
                  >
                    Ka
                  </span>
                </motion.div>

                {/* Yash side */}
                <motion.div
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
                  className="inline-flex items-baseline"
                >
                  {/* Yash (Royal Crimson) */}
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.8rem] xl:text-[6.4rem] font-normal tracking-[0.01em] text-royal-crimson select-none leading-none"
                    style={{
                      fontFamily: "'Atavian', 'Bodoni Moda', serif",
                    }}
                  >
                    Yash
                  </span>
                </motion.div>
              </div>

              {/* Tagline matching reference: "Two states • One love" in rich bronze gold */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1.0 }}
                className="flex items-center justify-center mt-1 sm:mt-2 lg:mt-3 shrink-0"
              >
                <p
                  className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal tracking-[0.04em]"
                  style={{
                    fontFamily: "'Atavian', 'Bodoni Moda', serif",
                    color: '#764309',
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
                  }}
                >
                  Two states &bull; One love
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── The Regal Shadi Poster Content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center w-full"
      >
        {/* Names — horizontal royal typography, close & natural spacing */}
        <motion.div
          variants={fadeUp}
          className="flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2 mb-1.5 sm:mb-2.5 w-full overflow-hidden"
        >
          <h1
            className="font-royal-custom tracking-[0.08em] sm:tracking-[0.12em] font-bold leading-none shrink-0"
            style={{
              fontSize: 'clamp(1.5rem, 4.4vw, 4.2rem)',
              color: 'var(--color-her-deep, #5E3D7A)',
            }}
          >
            ANUSHKA
          </h1>
          <span
            className="font-script-custom px-0.5 sm:px-1 select-none leading-none shrink-0"
            style={{
              fontSize: 'clamp(1.5rem, 4.2vw, 4.2rem)',
              color: 'var(--color-accent, #C58F64)',
            }}
          >
            &
          </span>
          <h1
            className="font-royal-custom tracking-[0.08em] sm:tracking-[0.12em] font-bold leading-none shrink-0"
            style={{
              fontSize: 'clamp(1.5rem, 4.4vw, 4.2rem)',
              color: 'var(--color-him-deep, #B0542C)',
            }}
          >
            YASH
          </h1>
        </motion.div>

        {/* Auspicious Sanskrit / Marathi Inscription */}
        <motion.p
          variants={fadeUp}
          className="font-serif-custom text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase mb-1.5 sm:mb-2 font-bold"
        >
          ॥ शुभमंगल सावधान ॥
        </motion.p>

        {/* Date & Destination Banner — distinct colors for Date and Location (+10% font size) */}
        <motion.div variants={fadeUp} className="text-center mb-3 sm:mb-4 px-2">
          <p className="font-serif-custom text-sm sm:text-base md:text-[1.125rem] tracking-[0.20em] sm:tracking-[0.24em] uppercase font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <span style={{ color: 'var(--color-her-deep, #5E3D7A)' }}>JANUARY 31 &ndash; FEBRUARY 3, 2027</span>
            <span style={{ color: 'var(--color-accent, #C58F64)' }}>&bull;</span>
            <span style={{ color: 'var(--color-him-deep, #B0542C)' }}>IGATPURI, MAHARASHTRA</span>
          </p>
        </motion.div>

        {/* ── Filigree Ornamental Countdown Plaque ── */}
        <motion.div
          variants={fadeUp}
          className="my-1 sm:my-2 flex items-center justify-center gap-1 sm:gap-3"
        >
          {/* Left Filigree Scroll */}
          <svg
            className="w-8 sm:w-12 md:w-16 h-8 sm:h-12 text-[#B89267] opacity-80 shrink-0 hidden xs:block"
            viewBox="0 0 64 48"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M60 24 H42 C36 24 30 14 22 14 C14 14 10 20 12 28 C14 34 22 34 24 28 C26 20 18 16 10 20 C4 23 2 30 6 36 C10 40 18 38 22 34"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path d="M38 24 C34 16 26 8 18 8" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <path d="M44 24 C40 32 32 38 24 40" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <circle cx="62" cy="24" r="2" fill="currentColor" />
            <circle cx="22" cy="14" r="1.5" fill="currentColor" />
            <circle cx="6" cy="36" r="1.5" fill="currentColor" />
          </svg>

          {/* Elegant Filigree Framed Plaque */}
          <div className="relative px-5 py-2.5 sm:px-8 sm:py-3 rounded-xl border border-[#C58F64]/45 bg-[#FDFBF7]/85 backdrop-blur-md shadow-[0_4px_25px_rgba(197,143,100,0.18)] hover:shadow-[0_8px_32px_rgba(197,143,100,0.28)] transition-all duration-500">
            {/* Fine Inner Accent Border */}
            <div className="absolute inset-1 rounded-lg border border-[#C58F64]/20 pointer-events-none" />

            {/* Countdown Grid */}
            <div className="relative flex items-center justify-center gap-2.5 sm:gap-5 md:gap-6 text-[#2E2438]">
              <div className="flex flex-col items-center min-w-[34px] sm:min-w-[48px]">
                <span className="font-royal-custom text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans-custom uppercase tracking-[0.22em] text-[#6D5F80] font-bold mt-0.5">
                  Days
                </span>
              </div>

              <span className="font-royal-custom text-xl sm:text-2xl md:text-3xl font-bold text-[#C58F64] -mt-3.5">:</span>

              <div className="flex flex-col items-center min-w-[34px] sm:min-w-[48px]">
                <span className="font-royal-custom text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans-custom uppercase tracking-[0.22em] text-[#6D5F80] font-bold mt-0.5">
                  Hours
                </span>
              </div>

              <span className="font-royal-custom text-xl sm:text-2xl md:text-3xl font-bold text-[#C58F64] -mt-3.5">:</span>

              <div className="flex flex-col items-center min-w-[34px] sm:min-w-[48px]">
                <span className="font-royal-custom text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans-custom uppercase tracking-[0.22em] text-[#6D5F80] font-bold mt-0.5">
                  Mins
                </span>
              </div>

              <span className="font-royal-custom text-xl sm:text-2xl md:text-3xl font-bold text-[#C58F64] -mt-3.5">:</span>

              <div className="flex flex-col items-center min-w-[34px] sm:min-w-[48px]">
                <span className="font-royal-custom text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#8E4A28]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans-custom uppercase tracking-[0.22em] text-[#6D5F80] font-bold mt-0.5">
                  Secs
                </span>
              </div>
            </div>
          </div>

          {/* Right Filigree Scroll (Mirrored) */}
          <svg
            className="w-8 sm:w-12 md:w-16 h-8 sm:h-12 text-[#B89267] opacity-80 shrink-0 hidden xs:block -scale-x-100"
            viewBox="0 0 64 48"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M60 24 H42 C36 24 30 14 22 14 C14 14 10 20 12 28 C14 34 22 34 24 28 C26 20 18 16 10 20 C4 23 2 30 6 36 C10 40 18 38 22 34"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path d="M38 24 C34 16 26 8 18 8" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <path d="M44 24 C40 32 32 38 24 40" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <circle cx="62" cy="24" r="2" fill="currentColor" />
            <circle cx="22" cy="14" r="1.5" fill="currentColor" />
            <circle cx="6" cy="36" r="1.5" fill="currentColor" />
          </svg>
        </motion.div>

        {/* ── Wide Grand Wedding Family Illustration Gathering (Transparent Cutout) ── */}
        <motion.div
          variants={fadeUp}
          className="relative w-full max-w-4xl lg:max-w-5xl mt-2 sm:mt-4 flex flex-col items-center group cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full flex justify-center"
          >
            <img
              src="/images/family_illustration_transparent.webp"
              alt="Anushka and Yash with Biyani and Verma families under the auspicious wedding mandap"
              decoding="async"
              className="w-full h-auto object-contain filter drop-shadow-[0_14px_30px_rgba(46,36,56,0.12)] group-hover:scale-[1.015] transition-transform duration-700"
            />
          </motion.div>
        </motion.div>

        {/* Family Names Banner */}
        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#3D2C50] font-semibold"
        >
          <span>Biyani Family</span>
          <span className="hidden sm:inline text-[#B05B43]">&mdash;</span>
          <span>Verma Family</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
