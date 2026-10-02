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

export const App: React.FC = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  const handleScrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans-custom">
      {/* Background Mist & Gold Particle Canvas */}
      <MistCanvas />

      {/* Navigation Header */}
      <Navbar onOpenRSVP={() => setIsRSVPOpen(true)} />

      {/* Main Single Page Sections */}
      <main>
        <Hero onEnter={handleScrollToStory} />
        <OurStory />
        <RoyalInvitation />
        <Events />
        <VenueTravel />
        <BlessingsWall />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive RSVP Modal */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
};

export default App;
