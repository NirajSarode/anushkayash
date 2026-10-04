import React, { useState } from 'react';
import { MistCanvas } from './components/MistCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { RoyalInvitation } from './components/RoyalInvitation';
import { Events } from './components/Events';
import { VenueTravel } from './components/VenueTravel';
import { BlessingsWall } from './components/BlessingsWall';
import { Footer } from './components/Footer';
import { RSVPModal } from './components/RSVPModal';
import { StoryTeaser } from './components/StoryTeaser';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'story'>('home');
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  const handleNavigate = (page: 'home' | 'story', targetSection?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home' && targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans-custom">
      {/* Background Mist & Gold Particle Canvas */}
      <MistCanvas />

      {/* Navigation Header with Page Switcher */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRSVP={() => setIsRSVPOpen(true)}
      />

      {/* Conditional Page Rendering */}
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onEnter={() => handleNavigate('home', 'invitation')} />
            <RoyalInvitation />
            <StoryTeaser onOpenStory={() => handleNavigate('story')} />
            <Events />
            <VenueTravel />
            <BlessingsWall />
          </>
        ) : (
          <OurStory onBackToHome={() => handleNavigate('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive RSVP Modal */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
};

export default App;
