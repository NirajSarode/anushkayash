import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StoryTeaserProps {
  onOpenStory: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const StoryTeaser: React.FC<StoryTeaserProps> = ({ onOpenStory }) => {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={fadeUp}
          className="relative"
        >
          {/* Breathing glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full animate-breathe pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(184,159,200,0.18) 0%, rgba(232,169,135,0.18) 50%, transparent 70%)' }} />

          <p className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-4 font-bold relative">
            Our Journey
          </p>

          <h2 className="font-royal-custom text-3xl sm:text-5xl font-bold gradient-text-blend mb-6 relative tracking-[0.05em]">
            Two States, One Story
          </h2>

          {/* Couple Transparent Figure */}
          <div className="relative flex justify-center my-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B89FC8]/40 via-[#FDE047]/30 to-[#E8A987]/40 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition duration-700 animate-pulse pointer-events-none" />
              <div className="relative w-44 h-48 sm:w-56 sm:h-60 flex items-center justify-center">
                <img
                  src="/images/couple_transparent.webp"
                  alt="Anushka & Yash"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(46,36,56,0.15)] transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>

          <p className="font-serif-custom text-[#2B2136] text-lg sm:text-xl italic max-w-xl mx-auto mb-8 relative leading-relaxed font-medium">
            From the bustling heritage lanes of Delhi to the tranquil hillscapes of Maharashtra &mdash; a love story written across two states.
          </p>

          {/* Two states indicators */}
          <div className="flex justify-center items-center gap-4 sm:gap-8 mb-10 relative">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#5E3D7A]">Delhi</span>
            <span className="text-sm text-[#C58F64]">&hearts;</span>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-black text-[#B0542C] font-royal-custom">#AnushKaYash</span>
            <span className="text-sm text-[#C58F64]">&hearts;</span>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#B0542C]">Maharashtra</span>
          </div>

          <button
            onClick={onOpenStory}
            className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-white text-xs uppercase tracking-[0.2em] font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
          >
            <span>Read Our Full Story</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
