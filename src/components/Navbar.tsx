import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Menu, X } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface NavbarProps {
  onOpenRSVP: () => void;
  currentPage: 'home' | 'story' | 'themes' | 'blessings';
  onNavigate: (page: 'home' | 'story' | 'themes' | 'blessings', targetSection?: string) => void;
  hasUnveiled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRSVP, currentPage, onNavigate, hasUnveiled = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const unsubscribeAudio = audioSynth.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribeAudio();
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', action: () => { onNavigate('home'); setMobileMenuOpen(false); }, active: currentPage === 'home' },
    { id: 'story', label: 'Story', action: () => { onNavigate('story'); setMobileMenuOpen(false); }, active: currentPage === 'story' },
    { id: 'events', label: 'Events', action: () => { onNavigate('home', 'events'); setMobileMenuOpen(false); } },
    { id: 'venue', label: 'Venue', action: () => { onNavigate('home', 'venue'); setMobileMenuOpen(false); } },
    { id: 'blessings', label: 'Blessings', action: () => { onNavigate('home', 'blessings'); setMobileMenuOpen(false); }, active: currentPage === 'blessings' },
  ];

  // Do not show navigation on the landing page
  if (currentPage === 'home' && !hasUnveiled) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#F0EBE3]/85 backdrop-blur-2xl py-3 border-b border-[#C8BEAF]/40 shadow-[0_4px_25px_rgba(46,36,56,0.06)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Name on Top-Left with gentle glow & hover scale */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('home')}
          className="flex items-center group cursor-pointer focus:outline-none"
          title="Anushka & Yash"
        >
          <span className="font-royal-custom text-lg sm:text-2xl tracking-[0.1em] font-bold transition-all duration-300">
            <span className="text-[#5E3D7A] group-hover:text-[#4A2E64]">Anush</span>
            <span className="text-[#C58F64]">Ka</span>
            <span className="text-[#B0542C] group-hover:text-[#8E4A28]">Yash</span>
          </span>
        </motion.button>

        {/* Desktop Nav — modern animated floating capsule bar */}
        <nav className="hidden md:flex items-center p-1.5 rounded-full bg-[#F7F3EE]/60 backdrop-blur-md border border-[#C8BEAF]/40 shadow-xs">
          {navLinks.map((link) => {
            const isCurrent = link.active;
            const isHovered = hoveredNav === link.id;

            return (
              <button
                key={link.id}
                onClick={link.action}
                onMouseEnter={() => setHoveredNav(link.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 cursor-pointer ${
                  isCurrent ? 'text-[#1A1222] font-bold' : 'text-[#4B3E5B] hover:text-[#1A1222]'
                }`}
              >
                {/* Active Indicator Pill */}
                {isCurrent && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white/90 rounded-full shadow-sm border border-[#C58F64]/30 pointer-events-none -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Indicator Pill */}
                {!isCurrent && isHovered && (
                  <motion.div
                    layoutId="hoverNavPill"
                    className="absolute inset-0 bg-black/5 rounded-full pointer-events-none -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right — audio + RSVP + Mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Music Toggle with Animated Soundwave Bars */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              const a = audioSynth.toggle();
              setIsPlaying(a);
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer ${
              isPlaying
                ? 'text-[#5E3D7A] bg-[#5E3D7A]/12 shadow-sm border border-[#5E3D7A]/25'
                : 'text-[#4B3E5B] hover:text-[#1A1222] hover:bg-black/5 border border-transparent'
            }`}
            title="Toggle Wedding Sangeet Music"
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}

            {/* Micro Equalizer Animation when playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                <span className="w-0.5 bg-[#5E3D7A] rounded-full equalizer-bar-1" />
                <span className="w-0.5 bg-[#B0542C] rounded-full equalizer-bar-2" />
                <span className="w-0.5 bg-[#C58F64] rounded-full equalizer-bar-3" />
              </div>
            )}
          </motion.button>

          {/* RSVP Button with Sheen Sweep */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenRSVP}
            className="btn-sheen flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-full text-white text-[11px] uppercase tracking-[0.2em] font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
          >
            <Heart className="w-3 h-3 fill-white" />
            <span>RSVP</span>
          </motion.button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#4B3E5B] hover:text-[#1A1222] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#F7F3EE]/95 backdrop-blur-2xl border-b border-[#C8BEAF]/50 shadow-xl"
          >
            <div className="px-6 py-5 flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={link.action}
                  className={`text-left text-xs uppercase tracking-[0.22em] font-semibold py-2 px-3 rounded-xl transition-colors cursor-pointer ${
                    link.active
                      ? 'bg-[#5E3D7A]/10 text-[#5E3D7A] font-bold'
                      : 'text-[#4B3E5B] hover:text-[#1A1222] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

