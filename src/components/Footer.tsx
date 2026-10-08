import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 text-center">
      {/* Thin gradient line */}
      <div className="w-24 h-0.5 mx-auto mb-12 rounded-full" style={{ background: 'linear-gradient(to right, #7C6090, #C58F64, #B0542C)' }} />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Monogram */}
        <div className="font-royal-custom text-base tracking-[0.25em] font-bold">
          <span className="text-[#5E3D7A]">A</span>
          <span className="text-[#C58F64] mx-1">&</span>
          <span className="text-[#B0542C]">Y</span>
        </div>

        {/* Two states tagline */}
        <p className="font-serif-custom text-xs tracking-[0.25em] uppercase font-bold text-[#5E3D7A]">
          Delhi &mdash; <span className="font-royal-custom text-base font-black text-[#B0542C] tracking-[0.1em]">#AnushKaYash</span> &mdash; Maharashtra
        </p>

        <p className="font-serif-custom text-base text-[#2B2136] italic font-medium">
          Two States &middot; One Love &middot; One Destination
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#5E3D7A] hover:text-[#1A1222] transition-colors cursor-pointer px-4 py-2 rounded-full bg-[#F7F3EE] border border-[#C8BEAF]/60 shadow-sm hover:shadow-md"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <div className="pt-8 text-xs text-[#5E3D7A] font-semibold flex flex-col sm:flex-row justify-center items-center gap-2 tracking-wider">
          <span>February 2027 &middot; Anushka & Yash</span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="flex items-center gap-1 text-[#B0542C]">
            Igatpuri, Maharashtra <Heart className="w-3 h-3 text-[#B0542C] fill-[#B0542C]" />
          </span>
        </div>
      </div>
    </footer>
  );
};
