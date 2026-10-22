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
    <section className="relative min-h-screen lg:min-h-0 w-full flex flex-col justify-center items-center text-center overflow-x-hidden overflow-y-visible pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-8 lg:pb-10">

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
                className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] lg:w-[420px] lg:h-[420px] rounded-full animate-breathe pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 235, 215, 0.35) 0%, rgba(230, 189, 112, 0.18) 45%, transparent 70%)',
                }}
              />

              {/* ── Couple Figure (scaled appropriately on laptop) ── */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                className="relative flex flex-col items-center justify-center pointer-events-none shrink-0"
              >
                {/* Soft warm champagne gold backlight glow */}
                <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-[#E6BD70]/25 via-[#FDE047]/30 to-[#D47B50]/25 rounded-full blur-2xl sm:blur-3xl opacity-75 animate-pulse" />

                <picture>
                  <source media="(max-width: 767px)" srcSet="/images/couple_mobile.webp" />
                  <img
                    src="/images/couple_transparent.webp"
                    alt="Anushka & Yash"
                    decoding="async"
                    fetchPriority="high"
                    className="relative z-10 h-[36vh] sm:h-[44vh] md:h-[40vh] lg:h-[38vh] max-h-[420px] w-auto object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.32)]"
                  />
                </picture>
              </motion.div>

              {/* Names: AnushKaYash directly below couple lehenga */}
              <div className="relative mt-3 sm:mt-3 lg:mt-3 flex items-center justify-center flex-nowrap max-w-full overflow-visible shrink-0">
                {/* Anushka side */}
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
                  className="inline-flex items-baseline"
                >
                  {/* Anush (Royal Crimson) */}
                  <span
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-[4.2rem] xl:text-[4.6rem] font-normal tracking-[0.01em] text-royal-crimson select-none leading-none"
                    style={{
                      fontFamily: "'Atavian', 'Bodoni Moda', serif",
                    }}
                  >
                    Anush
                  </span>

                  {/* 'Ka' (Radiant Royal Gold) */}
                  <span
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-[4.2rem] xl:text-[4.6rem] font-normal tracking-[0.01em] text-royal-gold select-none inline-block leading-none"
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
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-[4.2rem] xl:text-[4.6rem] font-normal tracking-[0.01em] text-royal-crimson select-none leading-none"
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
                className="flex items-center justify-center mt-2 sm:mt-2 lg:mt-2 shrink-0"
              >
                <p
                  className="text-xs sm:text-base md:text-base lg:text-lg xl:text-xl font-normal tracking-[0.04em]"
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
        className="relative z-10 w-full max-w-[96vw] md:max-w-2xl lg:max-w-[850px] xl:max-w-[880px] mx-auto px-3 sm:px-6 flex flex-col items-center"
      >
        {/* Names — horizontal royal typography matching reference */}
        <motion.div
          variants={fadeUp}
          className="flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-3.5 mt-2 sm:mt-2 lg:mt-1 mb-1.5 sm:mb-2 lg:mb-1 w-full overflow-hidden"
        >
          <h1
            className="font-royal-custom tracking-[0.08em] sm:tracking-[0.12em] font-bold leading-none shrink-0 text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem]"
            style={{
              color: 'var(--color-her, #941B26)',
            }}
          >
            ANUSHKA
          </h1>
          <span
            className="font-script-custom px-0.5 sm:px-1 select-none leading-none shrink-0 text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem]"
            style={{
              color: 'var(--color-accent, #D4AF37)',
            }}
          >
            &
          </span>
          <h1
            className="font-royal-custom tracking-[0.08em] sm:tracking-[0.12em] font-bold leading-none shrink-0 text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem]"
            style={{
              color: 'var(--color-her, #941B26)',
            }}
          >
            YASH
          </h1>
        </motion.div>

        {/* Auspicious Sanskrit / Marathi Inscription flanked by golden divider lines */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-1.5 sm:mb-2 lg:mb-1"
        >
          <span className="w-6 sm:w-10 lg:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
          <p className="font-serif-custom text-[11px] sm:text-xs lg:text-[0.8rem] tracking-[0.22em] sm:tracking-[0.26em] uppercase font-bold text-[#9A6C20]">
            ॥ शुभमंगल सावधान ॥
          </p>
          <span className="w-6 sm:w-10 lg:w-12 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
        </motion.div>

        {/* Date & Destination Banner — uniform warm golden bronze */}
        <motion.div variants={fadeUp} className="text-center mb-3 sm:mb-3.5 lg:mb-2 px-2">
          <p className="font-serif-custom text-[11px] sm:text-xs md:text-sm lg:text-[0.88rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase font-bold text-[#9A6C20] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span>JANUARY 31 &ndash; FEBRUARY 3, 2027</span>
            <span className="text-[#D4AF37]">&bull;</span>
            <span>IGATPURI, MAHARASHTRA</span>
          </p>
        </motion.div>

        {/* ── Authentic Ornate Cartouche Countdown Plaque ── */}
        <motion.div
          variants={fadeUp}
          className="my-1.5 sm:my-2 lg:my-1.5 relative flex items-center justify-center select-none"
        >
          {/* Cartouche Plaque Container — compact, matching reference (~52% width of date line) */}
          <div className="relative w-[220px] xs:w-[245px] sm:w-[265px] md:w-[280px] lg:w-[290px] aspect-[910/184] flex items-center justify-center">
            {/* The Authentic Ornate Plaque Frame Image from User */}
            <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
              <source srcSet="/images/timer_plaque_frame.webp" type="image/webp" />
              <img
                src="/images/timer_plaque_frame.png"
                alt="Ornate Royal Wedding Countdown Plaque"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(197,143,100,0.18)]"
                draggable={false}
              />
            </picture>

            {/* Countdown Content positioned inside the central region between filigree ends */}
            <div className="relative z-10 w-[72%] h-full flex items-center justify-between px-1 sm:px-1.5 pt-0.5 sm:pt-1 pb-1 sm:pb-1.5">
              {/* DAYS */}
              <div className="flex flex-col items-center justify-center min-w-[28px] sm:min-w-[34px]">
                <span
                  className="font-royal-custom text-base xs:text-lg sm:text-xl lg:text-[1.32rem] font-normal leading-none tracking-tight select-none text-[#2E1810]"
                >
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[6.5px] xs:text-[7px] sm:text-[7.5px] lg:text-[8px] font-sans-custom uppercase tracking-[0.20em] font-bold text-[#8A7565] mt-0.5 sm:mt-1">
                  DAYS
                </span>
              </div>

              {/* Colon 1 */}
              <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 -mt-2.5 sm:-mt-3 select-none">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C58F64]" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C58F64]" />
              </div>

              {/* HOURS */}
              <div className="flex flex-col items-center justify-center min-w-[28px] sm:min-w-[34px]">
                <span
                  className="font-royal-custom text-base xs:text-lg sm:text-xl lg:text-[1.32rem] font-normal leading-none tracking-tight select-none text-[#2E1810]"
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[6.5px] xs:text-[7px] sm:text-[7.5px] lg:text-[8px] font-sans-custom uppercase tracking-[0.20em] font-bold text-[#8A7565] mt-0.5 sm:mt-1">
                  HOURS
                </span>
              </div>

              {/* Colon 2 */}
              <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 -mt-2.5 sm:-mt-3 select-none">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C58F64]" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C58F64]" />
              </div>

              {/* MINS */}
              <div className="flex flex-col items-center justify-center min-w-[28px] sm:min-w-[34px]">
                <span
                  className="font-royal-custom text-base xs:text-lg sm:text-xl lg:text-[1.32rem] font-normal leading-none tracking-tight select-none text-[#2E1810]"
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[6.5px] xs:text-[7px] sm:text-[7.5px] lg:text-[8px] font-sans-custom uppercase tracking-[0.20em] font-bold text-[#8A7565] mt-0.5 sm:mt-1">
                  MINS
                </span>
              </div>

              {/* Colon 3 */}
              <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 -mt-2.5 sm:-mt-3 select-none">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C58F64]" />
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C58F64]" />
              </div>

              {/* SECS */}
              <div className="flex flex-col items-center justify-center min-w-[28px] sm:min-w-[34px]">
                <span
                  className="font-royal-custom text-base xs:text-lg sm:text-xl lg:text-[1.32rem] font-normal leading-none tracking-tight select-none text-[#8E0E16]"
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[6.5px] xs:text-[7px] sm:text-[7.5px] lg:text-[8px] font-sans-custom uppercase tracking-[0.20em] font-bold text-[#8A7565] mt-0.5 sm:mt-1">
                  SECS
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Wide Grand Wedding Family Gathering under the Older Mandap (Transparent Cutout) ── */}
        <motion.div
          variants={fadeUp}
          className="relative w-full max-w-[96vw] md:max-w-xl lg:max-w-[780px] xl:max-w-[820px] mt-4 sm:mt-5 lg:mt-3 px-1 flex flex-col items-center group cursor-pointer overflow-visible"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full flex justify-center overflow-visible"
          >
            <div
              className="w-full flex justify-center"
              style={{
                transform: 'translateX(11.215%)',
              }}
            >
              <picture className="w-full flex justify-center">
                <source srcSet="/images/family_with_older_mandap.webp" type="image/webp" />
                <img
                  src="/images/family_with_older_mandap.png"
                  alt="Anushka and Yash with Biyani and Verma families under the auspicious traditional wedding mandap"
                  decoding="async"
                  loading="lazy"
                  className="w-full h-auto object-contain filter drop-shadow-[0_18px_44px_rgba(46,36,56,0.15)] group-hover:scale-[1.015] transition-transform duration-700"
                />
              </picture>
            </div>
          </motion.div>
        </motion.div>

        {/* Family Names Banner */}
        <motion.div
          variants={fadeUp}
          className="mt-4 sm:mt-5 lg:mt-3 flex items-center justify-center gap-3 sm:gap-5 text-xs lg:text-[0.8rem] tracking-[0.22em] uppercase text-[#9A6C20] font-bold"
        >
          <span>BIYANI FAMILY</span>
          <span className="w-6 sm:w-8 h-[1px] bg-[#D4AF37]/60 inline-block" />
          <span>VERMA FAMILY</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
