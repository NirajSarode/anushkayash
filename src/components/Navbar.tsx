import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface NavbarProps {
  onOpenRSVP: () => void;
  currentPage: 'home' | 'story';
  onNavigate: (page: 'home' | 'story', targetSection?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRSVP, currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled
          ? 'bg-[#F0EBE3]/80 backdrop-blur-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Name on Top-Left */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center group cursor-pointer focus:outline-none"
          title="Anushka & Yash"
        >
          <span className="font-royal-custom text-lg sm:text-2xl tracking-[0.1em] font-bold transition-transform group-hover:scale-105 duration-300">
            <span className="text-[#5E3D7A]">Anush</span>
            <span className="text-[#C58F64]">Ka</span>
            <span className="text-[#B0542C]">Yash</span>
          </span>
        </button>

        {/* Desktop nav — minimal text links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', action: () => onNavigate('home'), active: currentPage === 'home' },
            { label: 'Story', action: () => onNavigate('story'), active: currentPage === 'story' },
            { label: 'Events', action: () => onNavigate('home', 'events') },
            { label: 'Venue', action: () => onNavigate('home', 'venue') },
            { label: 'Blessings', action: () => onNavigate('home', 'blessings') },
          ].map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${
                link.active
                  ? 'text-[#1A1222] font-bold border-b-2 border-[#5E3D7A] pb-0.5'
                  : 'text-[#4B3E5B] hover:text-[#1A1222] font-medium'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right — audio + RSVP */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { const a = audioSynth.toggle(); setIsPlaying(a); }}
            className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              isPlaying
                ? 'text-[#5E3D7A] bg-[#5E3D7A]/10 shadow-sm'
                : 'text-[#4B3E5B] hover:text-[#1A1222] hover:bg-black/5'
            }`}
            title="Toggle Music"
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenRSVP}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-white text-[11px] uppercase tracking-[0.2em] font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
          >
            <Heart className="w-3 h-3 fill-white" />
            <span>RSVP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
