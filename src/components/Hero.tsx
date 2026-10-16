import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface HeroProps {
  onEnter?: () => void;
  hasUnveiled?: boolean;
  onUnveil?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter: _onEnter, hasUnveiled = false, onUnveil }) => {
  const [curtainRevealed, setCurtainRevealed] = useState(hasUnveiled);
  const [showCurtain, setShowCurtain] = useState(!hasUnveiled);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const targetDate = new Date('2027-01-31T10:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const isRevealing = useRef(hasUnveiled);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleUnveil = () => {
    if (curtainRevealed || isRevealing.current) return;
    isRevealing.current = true;
    setCurtainRevealed(true);
    if (onUnveil) onUnveil();
    setTimeout(() => {
      setShowCurtain(false);
    }, 1400);
  };

  // Lock background scroll when curtain is active so screen doesn't scroll
  useEffect(() => {
    if (showCurtain && !curtainRevealed) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [showCurtain, curtainRevealed]);

  // Keyboard and desktop wheel support to unveil
  useEffect(() => {
    if (!showCurtain || curtainRevealed) return;

    const onWheel = (e: WheelEvent) => {
      if (isRevealing.current || curtainRevealed) return;
      if (Math.abs(e.deltaY) > 18) {
        handleUnveil();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowDown', 'PageDown', 'Enter'].includes(e.code)) {
        handleUnveil();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
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
            className="fixed inset-0 z-50 flex flex-col md:flex-row pointer-events-auto overflow-hidden h-[100dvh] w-full touch-none select-none cursor-pointer"
          >
            {/* Top (Mobile) / Left (Desktop) — Delhi / Lavender side */}
            <motion.div
              initial={{ x: 0, y: 0 }}
              animate={
                curtainRevealed
                  ? isMobile
                    ? { y: '-105%' }
                    : { x: '-105%' }
                  : { x: 0, y: 0 }
              }
              transition={curtainTransition}
              className="w-full h-1/2 md:w-1/2 md:h-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-10 pointer-events-none"
              style={{
                background: isMobile
                  ? 'linear-gradient(180deg, #7C6090 0%, #9478A8 45%, #B89FC8 100%)'
                  : 'linear-gradient(135deg, #7C6090 0%, #9478A8 40%, #B89FC8 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay">
                <img
                  src="/images/delhi_side.webp"
                  alt=""
                  decoding="async"
                  className="w-full h-full object-cover filter blur-[0.5px]"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isMobile
                    ? 'radial-gradient(circle at 50% 65%, rgba(255,255,255,0.2) 0%, transparent 65%)'
                    : 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.18) 0%, transparent 60%)',
                }}
              />
            </motion.div>

            {/* Bottom (Mobile) / Right (Desktop) — Maharashtra / Peach side */}
            <motion.div
              initial={{ x: 0, y: 0 }}
              animate={
                curtainRevealed
                  ? isMobile
                    ? { y: '105%' }
                    : { x: '105%' }
                  : { x: 0, y: 0 }
              }
              transition={curtainTransition}
              className="w-full h-1/2 md:w-1/2 md:h-full relative overflow-hidden flex flex-col justify-between items-end p-4 sm:p-10 pointer-events-none"
              style={{
                background: isMobile
                  ? 'linear-gradient(180deg, #E8A987 0%, #D08B68 55%, #B56241 100%)'
                  : 'linear-gradient(225deg, #B56241 0%, #D08B68 40%, #E8A987 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay">
                <img
                  src="/images/maharashtra_side.webp"
                  alt=""
                  decoding="async"
                  className="w-full h-full object-cover filter blur-[0.5px]"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isMobile
                    ? 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.2) 0%, transparent 65%)'
                    : 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.18) 0%, transparent 60%)',
                }}
              />
            </motion.div>

            {/* Center — merging names, couple figures, and unveiling button */}
            <motion.div
              animate={curtainRevealed ? { opacity: 0, scale: 0.94, y: isMobile ? -20 : 0 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-3 py-6 my-auto"
            >
              {/* Ambient radiant glow behind the union */}
              <div
                className="absolute w-[280px] h-[280px] sm:w-[580px] sm:h-[580px] rounded-full animate-breathe pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 235, 215, 0.35) 0%, rgba(184, 159, 200, 0.2) 45%, transparent 70%)',
                }}
              />

              {/* ── Animated Couple Figure on Animation Banner (Transparent Cutout) ── */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                className="relative mb-2 sm:mb-4 flex flex-col items-center justify-center pointer-events-none"
              >
                {/* Soft ambient backlight glow behind the figures */}
                <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-[#B89FC8]/50 via-[#FDE047]/40 to-[#E8A987]/50 rounded-full blur-2xl sm:blur-3xl opacity-70 animate-pulse" />

                <img
                  src="/images/couple_transparent.webp"
                  alt="Anushka & Yash"
                  decoding="async"
                  className="relative z-10 w-36 h-44 sm:w-56 sm:h-60 md:w-72 md:h-76 object-contain filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
                />
              </motion.div>

              {/* Names Animation: Anushka enters together from left, Yash from right, then 'Ka' transforms after merge */}
              <div className="relative mb-2 sm:mb-4 flex items-center justify-center flex-nowrap max-w-full overflow-visible">
                {/* Anushka (Moves in together as a complete unit from Delhi side) */}
                <motion.div
                  initial={{ x: -120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
                  className="inline-flex items-baseline"
                >
                  {/* Anush (Deep Pastel Lavender) */}
                  <span
                    className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em]"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: '#5E3D7A',
                      textShadow: '0 2px 10px rgba(255, 255, 255, 0.6), 0 4px 16px rgba(94, 61, 122, 0.15)',
                    }}
                  >
                    Anush
                  </span>

                  {/* 'Ka' — starts in Anushka's pastel lavender theme, then upon merging transforms into shimmering Rose Gold */}
                  <motion.span
                    initial={{
                      color: '#5E3D7A',
                      scale: 1,
                    }}
                    animate={{
                      color: ['#5E3D7A', '#5E3D7A', '#C58F64', '#C58F64'],
                      scale: [1, 1, 1.25, 1],
                    }}
                    transition={{
                      duration: 3.0,
                      times: [0, 0.65, 0.82, 1],
                      delay: 0.2,
                      ease: 'easeInOut',
                    }}
                    className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em] inline-block"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      textShadow: '0 0 16px rgba(254, 240, 138, 0.85), 0 2px 10px rgba(217, 119, 6, 0.35), 0 4px 16px rgba(197, 143, 100, 0.25)',
                    }}
                  >
                    Ka
                  </motion.span>
                </motion.div>

                {/* Yash (Deep Pastel Peach / Terracotta) */}
                <motion.div
                  initial={{ x: 120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
                  className="inline-flex items-baseline"
                >
                  <span
                    className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em]"
                    style={{
                      fontFamily: "'Cinzel Decorative', serif",
                      color: '#B0542C',
                      textShadow: '0 2px 10px rgba(255, 255, 255, 0.6), 0 4px 16px rgba(176, 84, 44, 0.15)',
                    }}
                  >
                    Yash
                  </span>
                </motion.div>
              </div>

              {/* Tagline directly rendered without background box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 1.2 }}
                className="flex items-center justify-center"
              >
                <p
                  className="text-[10px] sm:text-sm tracking-[0.3em] uppercase font-bold text-[#5E3D7A]"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    textShadow: '0 1px 6px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  Two States &middot; One Love
                </p>
              </motion.div>
            </motion.div>

            {/* ── Minimalist Unveil Button pinned at bottom with Tap Anywhere cue ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={curtainRevealed ? { opacity: 0, scale: 0.95 } : { opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex flex-col items-center justify-center w-full px-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnveil();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/40 hover:border-white/60 text-[#2B2136] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 248, 240, 0.25) 100%)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#30223E]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Unveil the Celebration
                </span>
                <span className="text-xs text-[#5E3D7A] font-light">&rarr;</span>
              </motion.button>

              {/* Tap anywhere cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={curtainRevealed ? { opacity: 0 } : { opacity: 0.95 }}
                transition={{ delay: 3.0, duration: 0.8 }}
                className="flex items-center justify-center gap-1.5 mt-2.5 text-[#5E3D7A] pointer-events-none select-none"
              >
                <motion.span
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-xs text-[#B0542C]"
                >
                  ✦
                </motion.span>
                <span
                  className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Tap anywhere to open
                </span>
                <motion.span
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  className="text-xs text-[#5E3D7A]"
                >
                  ✦
                </motion.span>
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
