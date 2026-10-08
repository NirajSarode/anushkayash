import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface HeroProps {
  onEnter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const [curtainRevealed, setCurtainRevealed] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const targetDate = new Date('2027-02-02T16:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleUnveil = () => {
    if (curtainRevealed) return;
    setCurtainRevealed(true);
    setTimeout(() => {
      setShowCurtain(false);
    }, 1500);
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

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden pt-20 pb-20">

      {/* ── Left Side (Delhi Heritage Artwork) - Desktop Floating Frame ── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex flex-col items-center absolute left-6 xl:left-14 top-1/2 -translate-y-1/2 z-10 w-[220px] xl:w-[260px] pointer-events-none select-none"
      >
        <div className="relative p-2.5 rounded-3xl bg-[#F7F3EE]/80 backdrop-blur-md border border-[#B89FC8]/35 shadow-xl overflow-hidden">
          <div className="rounded-2xl overflow-hidden relative">
            <img
              src="/images/delhi_side.webp"
              alt="Delhi Heritage"
              decoding="async"
              className="w-full h-auto object-cover rounded-2xl filter saturate-[0.95]"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Right Side (Maharashtra Heritage Artwork) - Desktop Floating Frame ── */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex flex-col items-center absolute right-6 xl:right-14 top-1/2 -translate-y-1/2 z-10 w-[220px] xl:w-[260px] pointer-events-none select-none"
      >
        <div className="relative p-2.5 rounded-3xl bg-[#F7F3EE]/80 backdrop-blur-md border border-[#E8A987]/35 shadow-xl overflow-hidden">
          <div className="rounded-2xl overflow-hidden relative">
            <img
              src="/images/maharashtra_side.webp"
              alt="Maharashtra Heritage"
              decoding="async"
              className="w-full h-auto object-cover rounded-2xl filter saturate-[0.95]"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Curtain Reveal Overlay ── */}
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col md:flex-row pointer-events-auto overflow-hidden min-h-[100dvh]"
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
              transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
              className="w-full h-1/2 md:w-1/2 md:h-full md:min-h-[100dvh] relative overflow-hidden flex flex-col justify-between p-4 sm:p-10"
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
                className="absolute inset-0"
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
              transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
              className="w-full h-1/2 md:w-1/2 md:h-full md:min-h-[100dvh] relative overflow-hidden flex flex-col justify-between items-end p-4 sm:p-10"
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
                className="absolute inset-0"
                style={{
                  background: isMobile
                    ? 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.2) 0%, transparent 65%)'
                    : 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.18) 0%, transparent 60%)',
                }}
              />
            </motion.div>

            {/* Center — merging names, couple figures, and unveiling button */}
            <motion.div
              animate={curtainRevealed ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-20 px-3 py-6 my-auto"
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
                className="relative mb-3 sm:mb-4 flex flex-col items-center justify-center pointer-events-none"
              >
                {/* Soft ambient backlight glow behind the figures */}
                <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-[#B89FC8]/50 via-[#FDE047]/40 to-[#E8A987]/50 rounded-full blur-2xl sm:blur-3xl opacity-70 animate-pulse" />

                <img
                  src="/images/couple_transparent.webp"
                  alt="Anushka & Yash"
                  decoding="async"
                  className="relative z-10 w-44 h-52 sm:w-60 sm:h-64 md:w-72 md:h-76 object-contain filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
                />
              </motion.div>

              {/* Names Animation: Anushka enters together from left, Yash from right, then 'Ka' transforms after merge */}
              <div className="relative mb-3 sm:mb-4 flex items-center justify-center flex-nowrap max-w-full overflow-visible">
                {/* Anushka (Moves in together as a complete unit from Delhi side) */}
                <motion.div
                  initial={{ x: -120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
                  className="inline-flex items-baseline"
                >
                  {/* Anush (Deep Pastel Lavender) */}
                  <span
                    className="font-royal-custom text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em]"
                    style={{
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
                    className="font-royal-custom text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em] inline-block"
                    style={{
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
                    className="font-royal-custom text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em]"
                    style={{
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
                  className="font-serif-custom text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-[#5E3D7A]"
                  style={{
                    textShadow: '0 1px 6px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  Two States &middot; One Love
                </p>
              </motion.div>
            </motion.div>

            {/* ── Minimalist Unveil Button pinned at bottom, subtly blended with theme ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={curtainRevealed ? { opacity: 0, scale: 0.95 } : { opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center justify-center w-full px-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleUnveil}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/40 hover:border-white/60 text-[#2B2136] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 248, 240, 0.25) 100%)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-serif-custom text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#30223E]">
                  Unveil the Celebration
                </span>
                <span className="text-xs text-[#5E3D7A] font-light">&rarr;</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── The Regal Shadi Poster Content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Hindi Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-serif-custom text-[#7A6D8E] text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 font-semibold"
        >
          दो राज्य &middot; एक प्यार &middot; एक मंज़िल
        </motion.p>

        {/* Names — massive, editorial poster typography */}
        <motion.div variants={fadeUp} className="mb-2">
          <h1 className="font-royal-custom text-6xl sm:text-7xl lg:text-8xl tracking-[0.18em] text-[#2E2438] font-bold leading-none">
            ANUSHKA
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="my-1">
          <span className="font-script-custom text-5xl sm:text-6xl text-[#A06B55]">&</span>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-4">
          <h1 className="font-royal-custom text-6xl sm:text-7xl lg:text-8xl tracking-[0.18em] text-[#2E2438] font-bold leading-none">
            YASH
          </h1>
        </motion.div>

        {/* ── Animated Couple Centerpiece Figure (Transparent Floating Cutout) ── */}
        <motion.div
          variants={fadeUp}
          className="relative my-3 flex flex-col items-center justify-center group"
        >
          {/* Two-States Dual Colored Glow Halo */}
          <div className="absolute -inset-6 bg-gradient-to-r from-[#B89FC8]/35 via-[#FDE047]/25 to-[#E8A987]/35 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse pointer-events-none" />

          {/* Floating Transparent Cutout */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative cursor-pointer"
          >
            <img
              src="/images/couple_transparent.webp"
              alt="Anushka & Yash"
              decoding="async"
              className="w-72 h-80 sm:w-80 sm:h-92 md:w-96 md:h-[420px] object-contain filter drop-shadow-[0_18px_30px_rgba(46,36,56,0.18)] transform group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-serif-custom text-base sm:text-lg text-[#2B2136] italic mb-8 font-medium"
        >
          Two States. One Love. One Destination.
        </motion.p>

        {/* Thin ornamental divider */}
        <motion.div
          variants={fadeUp}
          className="w-28 h-px mb-8"
          style={{ background: 'linear-gradient(to right, #8E68A8, #B05B43, #D47B50)' }}
        />

        {/* Date & Destination */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p className="font-serif-custom text-base sm:text-xl tracking-[0.25em] text-[#1A1222] uppercase font-bold">
            February 1 &ndash; 3, 2027
          </p>
          <p className="font-serif-custom text-sm sm:text-base text-[#3D2C50] mt-1 font-semibold">
            Igatpuri, Maharashtra
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={fadeUp} className="flex items-center gap-6 sm:gap-10 mb-12">
          {[
            { label: 'Days', value: timeLeft.days, color: '#4A2E64' },
            { label: 'Hours', value: timeLeft.hours, color: '#633318' },
            { label: 'Min', value: timeLeft.minutes, color: '#4A2E64' },
            { label: 'Sec', value: timeLeft.seconds, color: '#633318' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <span
                className="block font-serif-custom text-3xl sm:text-5xl font-black tracking-tight"
                style={{ color: item.color }}
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#3D2C50] mt-1 font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnter}
          className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-[0.25em] shadow-lg hover:shadow-xl transition-all mb-10 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
        >
          <span>Enter the Celebration</span>
          <span className="text-sm font-light">&rarr;</span>
        </motion.button>

        {/* Family names */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 text-xs tracking-[0.2em] uppercase text-[#3D2C50] font-semibold"
        >
          <span>Verma Family</span>
          <span className="hidden sm:inline text-[#B05B43]">&mdash;</span>
          <span>Biyani Family</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
