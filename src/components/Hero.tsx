import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const [curtainRevealed, setCurtainRevealed] = useState(false);
  const { scrollY } = useScroll();

  // Parallax transform for hero background
  const yBg = useTransform(scrollY, [0, 800], [0, 250]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  // Target Wedding Date: February 2, 2027
  const targetDate = new Date('2027-02-02T16:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden bg-slate-950 pt-20 pb-12">
      {/* Background Parallax Mountain Image */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 w-full h-[120%]"
      >
        <img
          src="/images/hero_mountain.png"
          alt="Mahabaleshwar Mountain Resort"
          className="w-full h-full object-cover brightness-[0.45] contrast-[1.1] scale-105"
        />
        {/* Deep Jewel Tone Misty Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-rose-950/40" />
      </motion.div>

      {/* Dramatic Curtain Reveal Overlay with Slow AnushKaYash Merging Animation */}
      {!curtainRevealed && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: curtainRevealed ? 0 : 1 }}
          className="fixed inset-0 z-50 flex pointer-events-auto overflow-hidden bg-slate-950"
        >
          {/* Left Velvet Curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={curtainRevealed ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-gradient-to-r from-rose-950 via-amber-950 to-slate-950 border-r border-amber-400/40 shadow-2xl relative"
          />

          {/* Right Velvet Curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={curtainRevealed ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-gradient-to-l from-rose-950 via-amber-950 to-slate-950 border-l border-amber-400/40 shadow-2xl relative"
          />

          {/* Center Stage: Merging Names & Rectangle Card Cover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-20 px-4">
            {/* Merging Names - Anushka from left, Yash from right */}
            <div className="relative flex items-center justify-center mb-6 tracking-tight flex-wrap">
              {/* Anushka sliding from left */}
              <motion.div
                initial={{ x: '-40vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-royal-custom text-4xl sm:text-7xl font-extrabold flex items-center"
              >
                <span className="gold-gradient-text">Anush</span>
                {/* 'KA' with distinct bright glowing amber-coral color that stands out distinctly */}
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.4, 1.25],
                    filter: [
                      'drop-shadow(0 0 0px rgba(251,191,36,0))',
                      'drop-shadow(0 0 45px rgba(255,215,0,1))',
                      'drop-shadow(0 0 25px rgba(245,158,11,0.9))',
                    ],
                  }}
                  transition={{ duration: 1.0, delay: 2.0, ease: 'easeOut' }}
                  className="inline-block font-extrabold text-amber-200 mx-1 drop-shadow-[0_0_20px_rgba(245,158,11,1)]"
                  style={{
                    color: '#FFE066',
                    WebkitTextFillColor: '#FFE066',
                  }}
                >
                  KA
                </motion.span>
              </motion.div>

              {/* Yash sliding from right */}
              <motion.div
                initial={{ x: '40vw', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-royal-custom text-4xl sm:text-7xl font-extrabold rani-gradient-text inline-block"
              >
                Yash
              </motion.div>
            </div>

            {/* Rectangle Card that smoothly expands to cover/enclose the merged AnushKaYash */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 3.1, type: 'spring', stiffness: 90 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurtainRevealed(true)}
                className="w-full max-w-lg px-8 py-6 rounded-3xl bg-slate-900/90 border-2 border-amber-400 shadow-[0_0_90px_rgba(245,158,11,0.6)] text-amber-200 flex flex-col items-center gap-3 group backdrop-blur-2xl"
              >
                {/* Monogram Seal */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-rose-600 to-amber-400 flex items-center justify-center text-slate-950 font-royal-custom font-extrabold text-xl shadow-xl group-hover:rotate-12 transition-transform">
                  A&Y
                </div>

                <div className="space-y-1 text-center">
                  <span className="font-royal-custom text-xl sm:text-2xl tracking-widest font-extrabold gold-gradient-text block">
                    #AnushKaYash
                  </span>
                  <span className="font-serif-custom text-xs text-rose-300 italic block">
                    Two Souls Joined In The Mountains of Igatpuri
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-xl mt-1 group-hover:shadow-amber-500/40 transition-all">
                  <Sparkles className="w-4 h-4" />
                  <span>Click To Unveil Celebration</span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Content Area */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-10 max-w-4xl mx-auto px-4 my-auto flex flex-col items-center"
      >
        {/* Royal Crest Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-amber-400/30 bg-slate-900/60 backdrop-blur-md mb-6 shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="font-serif-custom text-xs sm:text-sm tracking-widest text-amber-200 uppercase font-semibold">
            Mountain Destination Wedding
          </span>
        </motion.div>

        {/* Couple Names & AnushKaYash Joining Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-3 mb-6"
        >
          {/* Joining Hashtag Pill */}
          <div className="inline-block px-4 py-1 rounded-full border border-amber-400/40 bg-amber-950/40 font-royal-custom text-sm font-bold gold-gradient-text tracking-widest shadow-inner">
            #AnushKaYash
          </div>

          <h1 className="font-royal-custom text-4xl sm:text-7xl lg:text-8xl tracking-tight text-slate-100 font-bold drop-shadow-2xl">
            Anushka <span className="font-script-custom text-amber-400 font-normal text-5xl sm:text-8xl lg:text-9xl mx-1 inline-block text-rose-400">&</span> Yash
          </h1>
          <p className="font-script-custom text-2xl sm:text-4xl text-rose-300/90 font-light">
            A Destination Wedding Amongst The Misty Hills of Igatpuri
          </p>
        </motion.div>

        {/* Date & Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm text-slate-300 mb-10 font-medium"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/70 border border-amber-500/20 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>February 1 – 3, 2027</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/70 border border-amber-500/20 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Igatpuri, Maharashtra</span>
          </div>
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-xl mx-auto mb-10"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-3 sm:p-4 text-center border border-amber-400/30 flex flex-col justify-center items-center shadow-lg group hover:border-amber-400/60 transition-all"
            >
              <span className="font-serif-custom text-2xl sm:text-4xl font-bold gold-gradient-text tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mt-1 font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Smooth Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative z-10 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        onClick={onEnter}
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-300">
          Scroll To Explore
        </span>
        <div className="w-8 h-12 rounded-full border-2 border-amber-400/50 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1.5 h-3 bg-amber-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
