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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full animate-breathe" style={{ background: 'radial-gradient(circle, rgba(201,145,126,0.08) 0%, transparent 70%)' }} />

          <p className="font-serif-custom text-[#B5ADBF] text-xs tracking-[0.3em] uppercase mb-4 relative">
            Our Journey
          </p>

          <h2 className="font-royal-custom text-3xl sm:text-5xl font-bold gradient-text-blend mb-6 relative tracking-[0.05em]">
            Two States, One Story
          </h2>

          {/* Couple Animated Figure */}
          <div className="relative flex justify-center my-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#B89FC8] via-[#C9917E] to-[#E8A987] rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-700 animate-pulse" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#B89FC8] via-[#F7F3EE] to-[#E8A987] shadow-xl overflow-hidden">
                <img
                  src="/images/couple_animated.webp"
                  alt="Anushka & Yash"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>

          <p className="font-serif-custom text-[#8A7F99] text-lg sm:text-xl italic max-w-xl mx-auto mb-8 relative">
            From the bustling streets of Delhi to the serene hills of Maharashtra — a love story written across two states.
          </p>

          {/* Two states indicators */}
          <div className="flex justify-center items-center gap-6 sm:gap-8 mb-10 relative">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#6B5280]">Delhi</span>
            <span className="text-xs text-[#C9917E]">&hearts;</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9917E]">#AnushKaYash</span>
            <span className="text-xs text-[#C9917E]">&hearts;</span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B6045]">Maharashtra</span>
          </div>

          <button
            onClick={onOpenStory}
            className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-white text-xs uppercase tracking-[0.2em] font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #B89FC8, #C9917E, #E8A987)' }}
          >
            <span>Read Our Full Story</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
