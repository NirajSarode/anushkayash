import React, { useRef, useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Heart, Coffee, Mountain, Sparkles, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

interface Milestone {
  id: number;
  chapter: string;
  date: string;
  title: string;
  location: string;
  stateBadge: string;
  narrative: string;
  icon: React.ReactNode;
  tag: string;
  image: string;
  accent: string;
}

interface OurStoryProps {
  onBackToHome?: () => void;
  onNavigateToEvents?: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const OurStory: React.FC<OurStoryProps> = ({ onBackToHome, onNavigateToEvents }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const milestones: Milestone[] = [
    {
      id: 1,
      chapter: '01',
      date: 'October 2022',
      title: 'The First Meeting',
      location: 'Delhi',
      stateBadge: 'Delhi Capital',
      narrative: 'What started as a casual introduction through mutual friends turned into hours of effortless conversation about travel, food, and mountains. Two different states, perfectly aligned on the same wavelength.',
      icon: <Coffee className="w-5 h-5" />,
      tag: 'The Spark',
      image: '/images/delhi_side.webp',
      accent: '#5E3D7A',
    },
    {
      id: 2,
      chapter: '02',
      date: 'December 2023',
      title: 'Growing Closer',
      location: 'Delhi & Maharashtra',
      stateBadge: 'Two States',
      narrative: 'From the historic lanes of Old Delhi to the Western Ghats — every trip brought them closer. Yash introduced Anushka to his world in the Sahyadris, while she brought the vibrant warmth of Delhi into his life.',
      icon: <Mountain className="w-5 h-5" />,
      tag: 'The Adventure',
      image: '/images/couple_hero.webp',
      accent: '#B0542C',
    },
    {
      id: 3,
      chapter: '03',
      date: 'February 2025',
      title: 'Sunset Proposal',
      location: 'Igatpuri, Maharashtra',
      stateBadge: 'Sahyadri Hills',
      narrative: 'Overlooking the misty valleys of Igatpuri at golden hour, Yash dropped to one knee. The mountain breeze carried Anushka\'s joyful "YES!" — two states sealed into one forever.',
      icon: <Sparkles className="w-5 h-5" />,
      tag: 'The Proposal',
      image: '/images/maharashtra_side.webp',
      accent: '#C58F64',
    },
    {
      id: 4,
      chapter: '04',
      date: 'November 2026',
      title: 'The Union & Forever',
      location: 'Delhi & Maharashtra',
      stateBadge: 'The Wedding',
      narrative: 'The Vermas from Delhi and the Biyanis from Maharashtra came together to celebrate this blessed bond and plan the royal mountain destination wedding in Igatpuri.',
      icon: <Heart className="w-5 h-5" />,
      tag: 'The Union',
      image: '/images/couple_animated.webp',
      accent: '#7C6090',
    },
  ];

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const cards = scrollContainerRef.current.children;
    if (cards.length > 0) {
      const containerCenter = scrollLeft + clientWidth / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = i;
        }
      }
      setActiveIndex(closestIdx);
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const scrollToMilestone = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const handleScrollBy = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen overflow-x-hidden">
      {/* Ambient blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-[#7C6090]/[0.08] blur-[120px]" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-[#B0542C]/[0.08] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#5E3D7A] hover:text-[#1A1222] transition-colors cursor-pointer px-4 py-2 rounded-full bg-[#F7F3EE] border border-[#C8BEAF] shadow-xs hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}

          {/* Desktop Left / Right Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScrollBy('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border border-[#C8BEAF] transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-[#F7F3EE] text-[#2B2136] hover:bg-white hover:shadow-md active:scale-95'
                  : 'bg-[#F7F3EE]/50 text-[#C8BEAF] cursor-not-allowed opacity-50'
              }`}
              title="Previous milestone"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScrollBy('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border border-[#C8BEAF] transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-[#F7F3EE] text-[#2B2136] hover:bg-white hover:shadow-md active:scale-95'
                  : 'bg-[#F7F3EE]/50 text-[#C8BEAF] cursor-not-allowed opacity-50'
              }`}
              title="Next milestone"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Crest and Title */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex justify-center mb-5"
          >
            <div className="p-1.5 sm:p-2 rounded-full bg-white/95 border border-[#C58F64]/40 shadow-2xl hover:scale-105 transition-transform duration-500">
              <img
                src="/images/wedding_crest.png"
                alt="Two States Royal Crest"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-2 font-bold"
          >
            Our Journey &bull; The Chronology
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-3"
          >
            Two States, One Love Story
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-serif-custom text-[#2B2136] text-base sm:text-lg italic max-w-lg mx-auto font-medium"
          >
            From the historic heart of Delhi to the tranquil hills of Maharashtra.
          </motion.p>
        </div>

        {/* ── Interactive Horizontal Timeline Scrubber ── */}
        <div className="mb-8 px-2 max-w-3xl mx-auto">
          {/* Timeline Track Line */}
          <div className="relative flex items-center justify-between">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#7C6090]/30 via-[#C58F64]/40 to-[#B0542C]/30 z-0" />

            {milestones.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToMilestone(index)}
                  className="group relative z-10 flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  {/* Badge Node */}
                  <motion.div
                    animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isActive
                        ? 'bg-white border-2 shadow-lg ring-4 ring-[#C58F64]/20'
                        : 'bg-[#F7F3EE] border border-[#C8BEAF] hover:border-[#5E3D7A] hover:bg-white'
                    }`}
                    style={{
                      borderColor: isActive ? item.accent : undefined,
                      color: isActive ? item.accent : '#5E3D7A',
                    }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Chapter label below */}
                  <span
                    className={`mt-2 text-[10px] sm:text-xs font-serif-custom tracking-wider font-bold transition-colors whitespace-nowrap ${
                      isActive ? 'text-[#1A1222]' : 'text-[#6D5F80] group-hover:text-[#2B2136]'
                    }`}
                  >
                    {item.date.split(' ')[1] || item.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Horizontal Scroll Milestone Cards Container ── */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollState}
            className="flex gap-5 sm:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-2 pb-8 px-2 sm:px-4 no-scrollbar"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollPaddingLeft: '1rem',
              scrollPaddingRight: '1rem',
            }}
          >
            {milestones.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-[86vw] sm:w-[420px] md:w-[460px] lg:w-[480px] shrink-0 snap-center"
                >
                  <div
                    className={`card-sheen relative rounded-3xl bg-[#F7F3EE] p-5 sm:p-7 border transition-all duration-500 overflow-hidden flex flex-col justify-between h-full ${
                      isActive
                        ? 'border-[#C58F64]/70 shadow-[0_16px_40px_rgba(46,36,56,0.12)]'
                        : 'border-[#C8BEAF]/60 shadow-[0_8px_25px_rgba(46,36,56,0.06)] hover:shadow-xl'
                    }`}
                  >
                    {/* Top gradient accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: `linear-gradient(90deg, ${item.accent}, #C58F64)`,
                      }}
                    />

                    <div>
                      {/* Chapter Pill & Tag Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-royal-custom text-xs font-black px-2.5 py-1 rounded-full bg-white/90 shadow-2xs border border-[#C8BEAF]/40"
                            style={{ color: item.accent }}
                          >
                            Chapter {item.chapter}
                          </span>
                          <span
                            className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full bg-white/80 shadow-2xs"
                            style={{ color: item.accent }}
                          >
                            {item.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#5E3D7A] font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] mb-1.5 tracking-[0.02em]">
                        {item.title}
                      </h3>

                      {/* Location Badge */}
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[#B0542C] font-bold mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>

                      {/* Narrative */}
                      <p className="font-serif-custom text-[#2B2136] text-base sm:text-lg leading-relaxed mb-6 font-normal">
                        {item.narrative}
                      </p>
                    </div>

                    {/* Image with Ken Burns / film treatment */}
                    <div className="rounded-2xl overflow-hidden h-48 sm:h-52 relative shadow-md group/img mt-auto">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover img-film img-kenburns group-hover/img:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2B2136]/30 via-transparent to-transparent pointer-events-none" />

                      {/* State Badge bottom corner */}
                      <div className="absolute bottom-3 left-3 bg-[#F7F3EE]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 shadow-xs">
                        <span className="font-serif-custom text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#2B2136]">
                          {item.stateBadge}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Final Chapter Card: The Wedding Celebrations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-[85vw] sm:w-[420px] md:w-[460px] shrink-0 snap-center flex flex-col"
            >
              <div className="card-sheen bg-gradient-to-br from-[#F7F3EE] via-[#F2ECE4] to-[#EAE0D5] rounded-3xl p-6 sm:p-8 border border-[#C58F64]/50 shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#5E3D7A]/10 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-[#B0542C]/10 blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-royal-custom text-xs font-black px-3 py-1 rounded-full bg-white/90 text-[#5E3D7A] shadow-2xs border border-[#C8BEAF]/40">
                      The Next Chapter
                    </span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full bg-[#5E3D7A]/10 text-[#5E3D7A]">
                      Jan 31 – Feb 3, 2027
                    </span>
                  </div>

                  <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold text-[#1A1222] mb-3 tracking-[0.02em]">
                    The Wedding Celebrations
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[#B0542C] font-bold mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Igatpuri, Maharashtra</span>
                  </div>

                  <p className="font-serif-custom text-[#2B2136] text-base sm:text-lg leading-relaxed mb-6 font-normal">
                    The journey culminates in Igatpuri — from the sundowner Mehendi, morning Haldi &amp; afternoon Mayera to the high-energy Sangeet, royal Baraat, sunset Phere, and gala Night Reception.
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-[#C8BEAF]/40">
                  <button
                    onClick={onNavigateToEvents}
                    className="w-full btn-sheen py-3.5 px-6 rounded-2xl text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #5E3D7A, #B0542C, #C58F64)' }}
                  >
                    <span>Explore Wedding Events</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Swipe Guidance & Indicators */}
          <div className="flex sm:hidden items-center justify-between px-2 pt-2 text-xs text-[#6D5F80]">
            <button
              onClick={() => handleScrollBy('left')}
              disabled={!canScrollLeft}
              className="p-1.5 rounded-full bg-[#F7F3EE] border border-[#C8BEAF] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {[...milestones, { id: 'events-cta' }].map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToMilestone(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i ? 'w-6 bg-[#5E3D7A]' : 'w-2 bg-[#C8BEAF]'
                  }`}
                  aria-label={`Jump to milestone ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => handleScrollBy('right')}
              disabled={!canScrollRight}
              className="p-1.5 rounded-full bg-[#F7F3EE] border border-[#C8BEAF] disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Completion Banner -> Go to Events */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#F7F3EE]/90 backdrop-blur-md border border-[#C8BEAF]/60 shadow-lg"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-[#5E3D7A]/10 flex items-center justify-center text-[#5E3D7A] mb-4">
            <Sparkles className="w-6 h-6 text-[#5E3D7A]" />
          </div>
          <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold text-[#1A1222] mb-3 tracking-[0.02em]">
            The Journey Leads to the Mandap
          </h3>
          <p className="font-serif-custom text-[#2B2136] text-base sm:text-lg mb-6 max-w-xl mx-auto font-normal">
            Our story has brought us here — join us for the celebrations, ceremonies, and unforgettable memories from January 31st to February 3rd.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateToEvents}
              className="w-full sm:w-auto btn-sheen py-3.5 px-8 rounded-full text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #5E3D7A, #B0542C, #C58F64)' }}
            >
              <span>Explore Wedding Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full text-[#4B3E5B] hover:text-[#1A1222] font-semibold text-xs uppercase tracking-[0.2em] border border-[#C8BEAF] hover:bg-white/60 transition-all cursor-pointer"
              >
                Back to Home
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
