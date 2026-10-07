import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 text-center">
      {/* Thin gradient line */}
      <div className="w-20 h-px mx-auto mb-12" style={{ background: 'linear-gradient(to right, #B89FC8, #C9917E, #E8A987)' }} />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Monogram */}
        <div className="font-royal-custom text-sm tracking-[0.2em] text-[#B5ADBF]">
          <span className="text-[#6B5280]">A</span>
          <span className="mx-1">&</span>
          <span className="text-[#8B6045]">Y</span>
        </div>

        {/* Two states tagline */}
        <p className="font-serif-custom text-xs tracking-[0.2em] text-[#B5ADBF] uppercase">
          Delhi &mdash; <span className="gradient-text-blend font-royal-custom text-base font-bold tracking-[0.1em]">#AnushKaYash</span> &mdash; Maharashtra
        </p>

        <p className="font-serif-custom text-sm text-[#8A7F99] italic">
          Two States, One Love, One Destination
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#B5ADBF] hover:text-[#4A3F58] transition-colors"
        >
          <span>Top</span>
          <ArrowUp className="w-3 h-3" />
        </button>

        <div className="pt-8 text-[10px] text-[#B5ADBF] flex flex-col sm:flex-row justify-center items-center gap-2 tracking-wider">
          <span>2027 Anushka & Yash</span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="flex items-center gap-1">
            Igatpuri <Heart className="w-2.5 h-2.5 text-[#C9917E] fill-[#C9917E]" />
          </span>
        </div>
      </div>
    </footer>
  );
};
