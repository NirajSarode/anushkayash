import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface NavbarProps {
  onOpenRSVP: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRSVP }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const active = audioSynth.toggle();
    setIsPlaying(active);
  };

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Royal Sanman', href: '#invitation' },
    { name: 'Festivities', href: '#events' },
    { name: 'Venue & Travel', href: '#venue' },
    { name: 'Blessings', href: '#blessings' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-2xl shadow-amber-950/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-amber-400/50 bg-slate-900/80 flex items-center justify-center text-amber-400 font-royal-custom font-bold text-lg shadow-lg shadow-amber-500/10 group-hover:scale-105 group-hover:border-amber-300 transition-all duration-300">
            A&Y
          </div>
          <div className="hidden sm:block text-left">
            <span className="block font-royal-custom text-sm font-semibold tracking-widest text-amber-200">
              ANUSHKA & YASH
            </span>
            <span className="block font-serif-custom text-xs text-rose-300/80 tracking-wider">
              Mountain Destination Wedding
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest font-semibold text-slate-300 hover:text-amber-300 transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-rose-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Audio Toggle & RSVP Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Audio Visualizer Button */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
              isPlaying
                ? 'border-amber-400/80 bg-amber-950/40 text-amber-200 shadow-md shadow-amber-500/20'
                : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
            }`}
            title="Toggle Ambient Shehnai Melody"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">Shehnai Sound</span>
                {/* Audio Wave Bars */}
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-amber-400 animate-[bounce_1s_infinite_100ms]" />
                  <span className="w-0.5 h-2 bg-rose-400 animate-[bounce_1s_infinite_300ms]" />
                  <span className="w-0.5 h-3.5 bg-amber-300 animate-[bounce_1s_infinite_200ms]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Music Off</span>
              </>
            )}
          </button>

          {/* Quick RSVP Button */}
          <button
            onClick={onOpenRSVP}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-950/50 hover:shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Heart className="w-3.5 h-3.5 fill-slate-950" />
            <span>RSVP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
