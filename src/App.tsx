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
import { BlessingsPage } from './components/BlessingsPage';
import { AmbientCursorAura } from './components/AmbientCursorAura';
import { getStoredFontTheme, getStoredColorTheme, applyThemeToDom } from './utils/themeStore';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'story' | 'themes' | 'blessings'>('home');
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasUnveiledCurtain, setHasUnveiledCurtain] = useState(false);

  // Apply saved theme on boot
  useEffect(() => {
    applyThemeToDom(getStoredFontTheme(), getStoredColorTheme());
  }, []);

  // Theme page detection via query param (?themes) or hash (#themes)
  useEffect(() => {
    const checkThemeUrl = () => {
      const isTheme =
        window.location.search.includes('themes') ||
        window.location.hash.toLowerCase().includes('themes') ||
        window.location.pathname.toLowerCase().endsWith('/themes');

      if (isTheme) {
        setCurrentPage('themes');
        setHasUnveiledCurtain(true);
      }
    };

    checkThemeUrl();
    window.addEventListener('hashchange', checkThemeUrl);
    window.addEventListener('popstate', checkThemeUrl);
    return () => {
      window.removeEventListener('hashchange', checkThemeUrl);
      window.removeEventListener('popstate', checkThemeUrl);
    };
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

  const scrollToSectionWithRetry = (sectionId: string, retries = 8) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (retries > 0) {
      setTimeout(() => scrollToSectionWithRetry(sectionId, retries - 1), 60);
    }
  };

  const handleNavigate = (page: 'home' | 'story' | 'themes' | 'blessings', targetSection?: string) => {
    if (page === 'home' && targetSection) {
      setHasUnveiledCurtain(true);
      if (window.location.search.includes('themes')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          scrollToSectionWithRetry(targetSection);
        }, 80);
      } else {
        scrollToSectionWithRetry(targetSection);
      }
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'story' || page === 'themes' || page === 'blessings') {
      setHasUnveiledCurtain(true);
    }
    if (page === 'home' && window.location.search.includes('themes')) {
      window.history.replaceState({}, '', window.location.pathname);
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
      <AmbientCursorAura />

      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRSVP={() => setIsRSVPOpen(true)}
        hasUnveiled={hasUnveiledCurtain}
      />

      <main>
        {currentPage === 'themes' ? (
          <ThemePreview
            onBack={() => handleNavigate('home')}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentPage === 'blessings' ? (
          <BlessingsPage onBackToHome={() => handleNavigate('home')} />
        ) : currentPage === 'home' ? (
          <>
            <Hero
              onEnter={() => handleNavigate('home', 'invitation')}
              hasUnveiled={hasUnveiledCurtain}
              onUnveil={() => setHasUnveiledCurtain(true)}
            />
            <RoyalInvitation />
            <StoryTeaser onOpenStory={() => handleNavigate('story')} />
            <Events />
            <VenueTravel />
            <BlessingsWall onViewAll={() => handleNavigate('blessings')} />
            <SaveTheDateBanner
              onOpenRSVP={() => setIsRSVPOpen(true)}
              onNavigateToVenue={() => handleNavigate('home', 'venue')}
            />
          </>
        ) : (
          <OurStory
            onBackToHome={() => handleNavigate('home')}
            onNavigateToEvents={() => handleNavigate('home', 'events')}
          />
        )}
      </main>

      <Footer />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
};

export default App;
