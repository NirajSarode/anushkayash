import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  onEnter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const [curtainRevealed] = useState(false);

  const targetDate = new Date('2027-02-02T16:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
      {!curtainRevealed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex pointer-events-auto overflow-y-auto overflow-x-hidden min-h-[100dvh]"
        >
          {/* Left — Delhi / Lavender side */}
          <motion.div
            initial={{ x: 0 }}
            animate={curtainRevealed ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="w-1/2 h-full min-h-[100dvh] relative overflow-hidden flex flex-col justify-between p-4 sm:p-10"
            style={{ background: 'linear-gradient(135deg, #7C6090 0%, #9478A8 40%, #B89FC8 100%)' }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img
                src="/images/delhi_side.webp"
                alt=""
                decoding="async"
                className="w-full h-full object-cover filter blur-[1px]"
              />
            </div>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.18) 0%, transparent 60%)' }} />
          </motion.div>

          {/* Right — Maharashtra / Peach side */}
          <motion.div
            initial={{ x: 0 }}
            animate={curtainRevealed ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="w-1/2 h-full min-h-[100dvh] relative overflow-hidden flex flex-col justify-between items-end p-4 sm:p-10"
            style={{ background: 'linear-gradient(225deg, #B56241 0%, #D08B68 40%, #E8A987 100%)' }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img
                src="/images/maharashtra_side.webp"
                alt=""
                decoding="async"
                className="w-full h-full object-cover filter blur-[1px]"
              />
            </div>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.18) 0%, transparent 60%)' }} />
          </motion.div>

          {/* Center — merging names, couple figures, and unveiling button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-20 px-3 py-6 my-auto">
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
              className="relative mb-2 sm:mb-3 flex flex-col items-center justify-center pointer-events-none"
            >
              {/* Soft ambient backlight glow behind the figures */}
              <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-[#B89FC8]/50 via-[#FDE047]/40 to-[#E8A987]/50 rounded-full blur-2xl sm:blur-3xl opacity-70 animate-pulse" />

              <img
                src="/images/couple_transparent.webp"
                alt="Anushka & Yash"
                decoding="async"
                className="relative z-10 w-36 h-40 sm:w-60 sm:h-64 md:w-72 md:h-76 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
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
                  className="font-royal-custom text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em]"
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
                  className="font-royal-custom text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em] inline-block"
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
                  className="font-royal-custom text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] sm:tracking-[0.04em]"
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
              className="flex items-center justify-center mb-6 sm:mb-8"
            >
              <p
                className="font-serif-custom text-[11px] sm:text-sm tracking-[0.3em] uppercase font-bold text-[#5E3D7A]"
                style={{
                  textShadow: '0 1px 6px rgba(255, 255, 255, 0.6)',
                }}
              >
                Two States &middot; One Love
              </p>
            </motion.div>

            {/* On Mobile: Small, graceful animated scroll-down cue */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="flex sm:hidden flex-col items-center gap-1.5 cursor-default mt-1"
            >
              <span className="font-serif-custom text-[10px] uppercase tracking-[0.25em] font-bold text-[#5E3D7A]">
                Scroll Down &darr;
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[1.5px] h-6 rounded-full bg-gradient-to-b from-[#8E68A8] via-[#D47B50] to-transparent"
              />
            </motion.div>

            {/* On Desktop / Tablet: Refined Glass Button (Unlinked for now) */}
            <motion.button
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.9 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:inline-flex group relative px-10 py-3.5 rounded-full overflow-hidden shadow-xl transition-all cursor-default border border-white/50 mt-1"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 40%, #FEF3C7 100%)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.4)',
              }}
            >
              {/* Golden shimmer highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span className="relative font-serif-custom text-xs tracking-[0.25em] uppercase font-bold text-[#2E2438] group-hover:text-[#6B5280] transition-colors">
                Unveil the Celebration &rarr;
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}

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
          className="font-serif-custom text-[#7A6D8E] text-xs sm:text-sm tracking-[0.35em] uppercase mb-6"
        >
          दो राज्य &middot; एक प्यार &middot; एक मंज़िल
        </motion.p>

        {/* Names — massive, editorial poster typography */}
        <motion.div variants={fadeUp} className="mb-2">
          <h1 className="font-royal-custom text-5xl sm:text-7xl lg:text-8xl tracking-[0.18em] text-[#2E2438] font-bold leading-none">
            ANUSHKA
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="my-1">
          <span className="font-script-custom text-4xl sm:text-6xl text-[#A06B55]">&</span>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-4">
          <h1 className="font-royal-custom text-5xl sm:text-7xl lg:text-8xl tracking-[0.18em] text-[#2E2438] font-bold leading-none">
            YASH
          </h1>
        </motion.div>

        {/* ── Animated Couple Centerpiece Figure (Transparent Floating Cutout) ── */}
        <motion.div
          variants={fadeUp}
          className="relative my-2 flex flex-col items-center justify-center group"
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
              className="w-64 h-72 sm:w-80 sm:h-92 md:w-96 md:h-[420px] object-contain filter drop-shadow-[0_18px_30px_rgba(46,36,56,0.18)] transform group-hover:scale-105 transition-transform duration-700"
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
          className="px-10 py-4 rounded-full text-white font-bold text-xs uppercase tracking-[0.25em] shadow-xl hover:shadow-2xl transition-all mb-12 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
        >
          Enter the Celebration
        </motion.button>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex flex-col items-center gap-3 cursor-pointer opacity-70 hover:opacity-100 transition-opacity mb-10"
          onClick={onEnter}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#3D2C50] font-bold">
            Scroll
          </span>
          <div className="w-[1.5px] h-8 bg-gradient-to-b from-[#8E68A8] via-[#B05B43] to-transparent" />
        </motion.div>

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
