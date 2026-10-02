import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-amber-500/20 py-12 px-4 text-center text-slate-400 text-xs">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Monogram Crest */}
        <div className="w-12 h-12 rounded-full border border-amber-400/50 bg-slate-900 mx-auto flex items-center justify-center text-amber-300 font-royal-custom font-bold text-xl shadow-lg">
          A&Y
        </div>

        {/* Wedding Hashtag */}
        <div>
          <span className="font-royal-custom text-2xl font-bold gold-gradient-text tracking-wider block">
            #AnushkaFoundHerYash
          </span>
          <p className="font-serif-custom text-rose-300 text-sm italic mt-1">
            Mountain Destination Wedding Celebration
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-all"
        >
          <span>Back To Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <div className="pt-6 border-t border-slate-900 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2027 Anushka & Yash. Crafted with love for our wedding guests.</span>
          <span className="flex items-center gap-1">
            Igatpuri, Maharashtra <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </span>
        </div>
      </div>
    </footer>
  );
};
