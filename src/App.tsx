import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MistCanvas } from './components/MistCanvas';
import { FloatingDecor } from './components/FloatingDecor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoyalInvitation } from './components/RoyalInvitation';
import { Events } from './components/Events';
import { VenueTravel } from './components/VenueTravel';
import { BlessingsWall } from './components/BlessingsWall';
import { SaveTheDateBanner } from './components/SaveTheDateBanner';
import { Footer } from './components/Footer';
import { StoryTeaser } from './components/StoryTeaser';
import { getStoredFontTheme, getStoredColorTheme, applyThemeToDom } from './utils/themeStore';

// Code-split auxiliary pages & modals so mobile phone loads landing instantaneously
const OurStory = lazy(() => import('./components/OurStory').then(m => ({ default: m.OurStory })));
const BlessingsPage = lazy(() => import('./components/BlessingsPage').then(m => ({ default: m.BlessingsPage })));

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'story' | 'blessings'>('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasUnveiledCurtain, setHasUnveiledCurtain] = useState(false);

  // Apply saved theme on boot
  useEffect(() => {
    applyThemeToDom(getStoredFontTheme(), getStoredColorTheme());
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

  const handleNavigate = (page: 'home' | 'story' | 'blessings', targetSection?: string) => {
    if (page === 'home' && targetSection) {
      setHasUnveiledCurtain(true);
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
    if (page === 'story' || page === 'blessings') {
      setHasUnveiledCurtain(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-body)] selection:bg-[#D4AF37]/30 selection:text-[#560309] font-sans-custom">
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Film grain texture overlay */}
      <div className="film-grain" />

      {/* Soft ambient background */}
      <MistCanvas />
      {hasUnveiledCurtain && <FloatingDecor />}

      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        hasUnveiled={hasUnveiledCurtain}
      />

      <main>
        <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg)]" />}>
          {currentPage === 'blessings' ? (
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
                onNavigateToVenue={() => handleNavigate('home', 'venue')}
              />
            </>
          ) : (
            <OurStory
              onBackToHome={() => handleNavigate('home')}
              onNavigateToEvents={() => handleNavigate('home', 'events')}
            />
          )}
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
