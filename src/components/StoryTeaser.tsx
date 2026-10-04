import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, Coffee, Mountain } from 'lucide-react';

interface StoryTeaserProps {
  onOpenStory: () => void;
}

export const StoryTeaser: React.FC<StoryTeaserProps> = ({ onOpenStory }) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden border-y border-amber-500/20">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 sm:p-12 border-2 border-amber-400/40 text-center relative overflow-hidden backdrop-blur-2xl"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 text-xs tracking-widest uppercase font-semibold mb-6">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Dedicated Chapter</span>
          </div>

          {/* Heading */}
          <h2 className="font-royal-custom text-3xl sm:text-5xl font-bold gold-gradient-text mb-4">
            Discover Our Love Story
          </h2>

          <p className="font-serif-custom text-slate-300 text-lg sm:text-xl italic max-w-2xl mx-auto mb-8">
            From filter coffee chats in Indiranagar, Bengaluru to high-altitude mountain treks in Coorg and our sunset proposal in Igatpuri.
          </p>

          {/* Visual Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs text-amber-200">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-amber-500/20">
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>Bengaluru Coffee Spark</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-amber-500/20">
              <Mountain className="w-4 h-4 text-emerald-400" />
              <span>Western Ghats Treks</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-amber-500/20">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Igatpuri Proposal</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onOpenStory}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-98 transition-all"
          >
            <span>Read Our Full Story Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
