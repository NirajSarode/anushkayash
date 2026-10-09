import React, { useState, useEffect } from 'react';
import { MistCanvas } from './components/MistCanvas';
import { FloatingDecor } from './components/FloatingDecor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { RoyalInvitation } from './components/RoyalInvitation';
import { Events } from './components/Events';
import { VenueTravel } from './components/VenueTravel';
import { BlessingsWall } from './components/BlessingsWall';
import { SaveTheDateBanner } from './components/SaveTheDateBanner';
import { Footer } from './components/Footer';
import { RSVPModal } from './components/RSVPModal';
import { StoryTeaser } from './components/StoryTeaser';
import { ThemePreview } from './components/ThemePreview';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'story' | 'themes'>('home');
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Secret theme page
  useEffect(() => {
    if (window.location.search.includes('themes')) {
      setCurrentPage('themes');
    }
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: 'home' | 'story', targetSection?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'home' && targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F0EBE3] text-[#4A3F58] selection:bg-[#B89FC8]/30 selection:text-[#2E2438] font-sans-custom">
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Film grain texture overlay */}
      <div className="film-grain" />

      {/* Soft ambient background */}
      <MistCanvas />
      <FloatingDecor />

      {/* Navigation */}
      <Navbar
        currentPage={currentPage === 'themes' ? 'home' : currentPage}
        onNavigate={handleNavigate}
        onOpenRSVP={() => setIsRSVPOpen(true)}
      />

      <main>
        {currentPage === 'themes' ? (
          <ThemePreview onBack={() => { setCurrentPage('home'); window.history.replaceState({}, '', window.location.pathname); }} />
        ) : currentPage === 'home' ? (
          <>
            <Hero onEnter={() => handleNavigate('home', 'invitation')} />
            <RoyalInvitation />
            <StoryTeaser onOpenStory={() => handleNavigate('story')} />
            <Events />
            <VenueTravel />
            <BlessingsWall />
            <SaveTheDateBanner
              onOpenRSVP={() => setIsRSVPOpen(true)}
              onNavigateToVenue={() => handleNavigate('home', 'venue')}
            />
          </>
        ) : (
          <OurStory onBackToHome={() => handleNavigate('home')} />
        )}
      </main>

      <Footer />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
};

export default App;
