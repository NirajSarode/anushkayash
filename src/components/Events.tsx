import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, Shirt, Music, X, Download, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { WEDDING_EVENTS, type WeddingEvent } from '../data/eventsData';
import { getStoredEventLayout, type EventLayoutStyle } from '../utils/themeStore';

interface EventsProps {
  layoutOverride?: EventLayoutStyle;
  hideHeader?: boolean;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const Events: React.FC<EventsProps> = ({ layoutOverride, hideHeader = false }) => {
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);
  const [selectedDay, setSelectedDay] = useState<'all' | 'jan31' | 'feb1' | 'feb2'>('all');
  const [currentLayout, setCurrentLayout] = useState<EventLayoutStyle>(
    () => layoutOverride || getStoredEventLayout()
  );

  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layoutOverride) {
      setCurrentLayout(layoutOverride);
      return;
    }
    const handleLayoutChange = () => setCurrentLayout(getStoredEventLayout());
    window.addEventListener('anushkayash_event_layout_changed', handleLayoutChange);
    return () => window.removeEventListener('anushkayash_event_layout_changed', handleLayoutChange);
  }, [layoutOverride]);

  const filteredEvents = selectedDay === 'all'
    ? WEDDING_EVENTS
    : WEDDING_EVENTS.filter((ev) => ev.day === selectedDay);

  const dayTabs = [
    { id: 'all', label: 'All Celebrations', count: 7 },
    { id: 'jan31', label: '31 Jan · Mehendi', count: 1 },
    { id: 'feb1', label: '1 Feb · Haldi, Mayera, Sangeet', count: 3 },
    { id: 'feb2', label: '2 Feb · Baraat, Phere, Reception', count: 3 },
  ] as const;

  const handleDownloadCalendar = (ev: WeddingEvent) => {
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Anushka & Yash Wedding//EN\nBEGIN:VEVENT\nSUMMARY:${ev.title} - Anushka & Yash Wedding\nDESCRIPTION:${ev.description}\nLOCATION:${ev.location}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.id}-wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollHorizontal = (dir: 'left' | 'right') => {
    if (!horizontalScrollRef.current) return;
    const scrollAmount = horizontalScrollRef.current.clientWidth * 0.75;
    horizontalScrollRef.current.scrollBy({
      left: dir === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="events" className={`section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden ${hideHeader ? 'pt-2 pb-6' : ''}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header (Optional if embedded in preview) */}
        {!hideHeader && (
          <div className="text-center mb-12 sm:mb-16">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-4 font-bold">
              The Wedding Itinerary
            </motion.p>
            <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
              Celebrations &amp; Festivities
            </motion.h2>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="font-serif-custom text-[#2B2136] text-lg sm:text-xl italic max-w-xl mx-auto font-medium mb-8">
              January 31 &ndash; February 3, 2027 &middot; Touchwood Bliss, Igatpuri
            </motion.p>

            {/* Day Navigation Tabs for grid & list layouts */}
            {currentLayout === 'arch-cards' && (
              <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#F7F3EE]/80 backdrop-blur-md border border-[#C8BEAF]/50 shadow-xs max-w-full">
                {dayTabs.map((tab) => {
                  const isActive = selectedDay === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedDay(tab.id)}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-bold transition-all duration-300 cursor-pointer ${isActive
                          ? 'bg-gradient-to-r from-[#5E3D7A] to-[#B0542C] text-white shadow-md scale-[1.02]'
                          : 'text-[#4B3E5B] hover:text-[#1A1222] hover:bg-white/60'
                        }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── LAYOUT OPTION 1: Royal Arch Cards (Classic Grid) ── */}
        {currentLayout === 'arch-cards' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredEvents.map((ev, index) => (
              <motion.div
                layout
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card-sheen rounded-3xl overflow-hidden cursor-pointer group bg-[#F7F3EE] border border-[#C8BEAF]/60 hover:shadow-2xl transition-all duration-500 hover:border-[#C58F64]/70 flex flex-col justify-between"
                onClick={() => setSelectedEvent(ev)}
              >
                <div className="h-52 w-full relative overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover img-film transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="font-royal-custom text-[11px] font-black px-3 py-1 rounded-full bg-white/95 shadow-sm border border-[#C8BEAF]/40 text-[#1A1222]">
                      {ev.dayLabel}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[0.16em] font-bold px-2.5 py-1 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: ev.accentColor }}
                    >
                      {ev.timeOfDay}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-royal-custom text-xl font-bold text-[#1A1222] mb-1 group-hover:text-[#5E3D7A] transition-colors tracking-[0.02em]">
                      {ev.title}
                    </h3>
                    <p className="font-serif-custom text-sm italic font-semibold text-[#B0542C] mb-4">
                      {ev.subTitle}
                    </p>

                    <div className="space-y-2 text-xs text-[#2B2136] font-medium">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 shrink-0" style={{ color: ev.accentColor }} />
                        <span>{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 shrink-0" style={{ color: ev.accentColor }} />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 shrink-0" style={{ color: ev.accentColor }} />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#C8BEAF]/30">
                    <div
                      className="btn-sheen w-full py-2.5 rounded-xl text-center text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 group-hover:shadow-md"
                      style={{
                        color: ev.accentColor,
                        backgroundColor: `${ev.accentColor}14`,
                        border: `1px solid ${ev.accentColor}50`,
                      }}
                    >
                      View Ceremony Details &rarr;
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── LAYOUT OPTION 2: Imperial Timeline Chronicle (Vertical Connected Thread) ── */}
        {currentLayout === 'royal-timeline' && (
          <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
            <div className="relative">
              {/* Center Vertical Golden Thread - same coordinate space as timeline nodes */}
              <div className="absolute top-6 bottom-6 left-6 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#C58F64] via-[#5E3D7A] to-[#B0542C] opacity-40 pointer-events-none rounded-full" />

              <div className="space-y-8 sm:space-y-10">
              {WEDDING_EVENTS.map((ev, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Center Jewel Node on Timeline (Exact Center) */}
                    <div
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FAF6F0] border-2 shadow-md flex items-center justify-center z-10"
                      style={{ borderColor: ev.accentColor }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: ev.accentColor }}
                      />
                    </div>

                    {/* Symmetric 2-Column Grid: Both columns are guaranteed 100% equal distance from the center line */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14 items-center">
                      {/* Left Column (Column 1) */}
                      {isEven ? (
                        /* Date Marker on Left */
                        <div className="hidden md:flex items-center justify-end pr-3 order-2 md:order-1">
                          <div className="flex flex-col items-end text-right">
                            <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#5E3D7A] mb-0.5">
                              {ev.date}
                            </span>
                            <span className="text-xs font-serif-custom italic text-[#B0542C] font-semibold">
                              {ev.timeOfDay} Celebration &bull; {ev.time}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Event Card on Left */
                        <div className="w-full pl-14 sm:pl-16 md:pl-0 order-1">
                          <div
                            onClick={() => setSelectedEvent(ev)}
                            className="card-sheen rounded-3xl p-5 sm:p-6 bg-[#FBF9F5] border border-[#C8BEAF]/80 shadow-md hover:shadow-xl hover:border-[#5E3D7A]/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden"
                          >
                            {/* Ceremony Thumbnail Image Banner */}
                            <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden shrink-0 relative mb-4 shadow-2xs">
                              <img
                                src={ev.image}
                                alt={ev.title}
                                className="w-full h-full object-cover img-film transition-transform duration-700 group-hover:scale-108"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                              <span
                                className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full text-white shadow-xs backdrop-blur-xs"
                                style={{ backgroundColor: ev.accentColor }}
                              >
                                {ev.timeOfDay}
                              </span>
                            </div>

                            {/* Event Information (Crisp, perfectly padded from all edges, zero overflow) */}
                            <div className="w-full text-left min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="font-royal-custom text-[11px] font-bold text-[#5E3D7A] bg-[#5E3D7A]/10 px-2.5 py-0.5 rounded-md">
                                  {ev.dayLabel}
                                </span>
                                <span className="text-[#C8BEAF]">&bull;</span>
                                <span className="text-xs font-semibold text-[#6D5F80] flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-[#C58F64] shrink-0" />
                                  <span>{ev.time}</span>
                                </span>
                              </div>

                              <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] group-hover:text-[#5E3D7A] transition-colors leading-snug mb-1 break-words">
                                {ev.title}
                              </h3>

                              <p className="font-serif-custom text-xs sm:text-sm italic text-[#B0542C] font-semibold mb-2.5 break-words">
                                {ev.subTitle}
                              </p>

                              <div className="space-y-1 mb-3.5 text-xs text-[#4A3F58]">
                                <div className="flex items-center gap-1.5 font-medium min-w-0">
                                  <Calendar className="w-3.5 h-3.5 text-[#B0542C] shrink-0" />
                                  <span className="truncate">{ev.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-medium min-w-0">
                                  <MapPin className="w-3.5 h-3.5 text-[#5E3D7A] shrink-0" />
                                  <span className="truncate">{ev.location}</span>
                                </div>
                              </div>

                              {/* Attire & Details Action */}
                              <div className="flex items-center justify-between pt-3 border-t border-[#C8BEAF]/40 text-xs gap-2">
                                <div className="flex items-center gap-1.5 text-[#6D5F80] font-medium text-[11px] min-w-0">
                                  <Sparkles className="w-3.5 h-3.5 text-[#C58F64] shrink-0" />
                                  <span className="truncate">{ev.dressCodeTitle}</span>
                                </div>
                                <span
                                  className="font-bold uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0"
                                  style={{ color: ev.accentColor }}
                                >
                                  <span>Details</span>
                                  <span>&rarr;</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Right Column (Column 2) */}
                      {isEven ? (
                        /* Event Card on Right */
                        <div className="w-full pl-14 sm:pl-16 md:pl-0 order-1 md:order-2">
                          <div
                            onClick={() => setSelectedEvent(ev)}
                            className="card-sheen rounded-3xl p-5 sm:p-6 bg-[#FBF9F5] border border-[#C8BEAF]/80 shadow-md hover:shadow-xl hover:border-[#5E3D7A]/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden"
                          >
                            {/* Ceremony Thumbnail Image Banner */}
                            <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden shrink-0 relative mb-4 shadow-2xs">
                              <img
                                src={ev.image}
                                alt={ev.title}
                                className="w-full h-full object-cover img-film transition-transform duration-700 group-hover:scale-108"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                              <span
                                className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full text-white shadow-xs backdrop-blur-xs"
                                style={{ backgroundColor: ev.accentColor }}
                              >
                                {ev.timeOfDay}
                              </span>
                            </div>

                            {/* Event Information (Crisp, perfectly padded from all edges, zero overflow) */}
                            <div className="w-full text-left min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="font-royal-custom text-[11px] font-bold text-[#5E3D7A] bg-[#5E3D7A]/10 px-2.5 py-0.5 rounded-md">
                                  {ev.dayLabel}
                                </span>
                                <span className="text-[#C8BEAF]">&bull;</span>
                                <span className="text-xs font-semibold text-[#6D5F80] flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-[#C58F64] shrink-0" />
                                  <span>{ev.time}</span>
                                </span>
                              </div>

                              <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] group-hover:text-[#5E3D7A] transition-colors leading-snug mb-1 break-words">
                                {ev.title}
                              </h3>

                              <p className="font-serif-custom text-xs sm:text-sm italic text-[#B0542C] font-semibold mb-2.5 break-words">
                                {ev.subTitle}
                              </p>

                              <div className="space-y-1 mb-3.5 text-xs text-[#4A3F58]">
                                <div className="flex items-center gap-1.5 font-medium min-w-0">
                                  <Calendar className="w-3.5 h-3.5 text-[#B0542C] shrink-0" />
                                  <span className="truncate">{ev.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-medium min-w-0">
                                  <MapPin className="w-3.5 h-3.5 text-[#5E3D7A] shrink-0" />
                                  <span className="truncate">{ev.location}</span>
                                </div>
                              </div>

                              {/* Attire & Details Action */}
                              <div className="flex items-center justify-between pt-3 border-t border-[#C8BEAF]/40 text-xs gap-2">
                                <div className="flex items-center gap-1.5 text-[#6D5F80] font-medium text-[11px] min-w-0">
                                  <Sparkles className="w-3.5 h-3.5 text-[#C58F64] shrink-0" />
                                  <span className="truncate">{ev.dressCodeTitle}</span>
                                </div>
                                <span
                                  className="font-bold uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0"
                                  style={{ color: ev.accentColor }}
                                >
                                  <span>Details</span>
                                  <span>&rarr;</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Date Marker on Right */
                        <div className="hidden md:flex items-center justify-start pl-3 order-2">
                          <div className="flex flex-col items-start text-left">
                            <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#5E3D7A] mb-0.5">
                              {ev.date}
                            </span>
                            <span className="text-xs font-serif-custom italic text-[#B0542C] font-semibold">
                              {ev.timeOfDay} Celebration &bull; {ev.time}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

        {/* ── LAYOUT OPTION 3: Palace Day-by-Day Folio (Structured Day Passes) ── */}
        {currentLayout === 'day-folio' && (
          <div className="space-y-8 sm:space-y-12 max-w-5xl mx-auto">
            {[
              { dayKey: 'jan31', title: 'Day 01 · The Welcoming & Henna', date: 'Sunday, January 31, 2027', accent: '#B0542C' },
              { dayKey: 'feb1', title: 'Day 02 · Festivities of Haldi, Mayera & Sangeet', date: 'Monday, February 1, 2027', accent: '#5E3D7A' },
              { dayKey: 'feb2', title: 'Day 03 · The Royal Baraat, Sunset Phere & Reception', date: 'Tuesday, February 2, 2027', accent: '#C58F64' },
            ].map((dayGroup) => {
              const dayEvents = WEDDING_EVENTS.filter((e) => e.day === dayGroup.dayKey);
              return (
                <div
                  key={dayGroup.dayKey}
                  className="rounded-3xl p-6 sm:p-10 bg-[#F7F3EE] border border-[#C8BEAF]/80 shadow-lg relative overflow-hidden"
                >
                  {/* Top Day Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#C8BEAF]/50 gap-2">
                    <div>
                      <span
                        className="text-[10px] uppercase font-bold tracking-[0.25em] px-3 py-1 rounded-full text-white shadow-2xs inline-block mb-2"
                        style={{ backgroundColor: dayGroup.accent }}
                      >
                        {dayGroup.date}
                      </span>
                      <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222]">
                        {dayGroup.title}
                      </h3>
                    </div>
                    <span className="text-xs font-serif-custom italic text-[#6D5F80]">
                      {dayEvents.length} {dayEvents.length === 1 ? 'Ceremony' : 'Ceremonies'}
                    </span>
                  </div>

                  {/* Day Events Sub-grid */}
                  <div className={`grid grid-cols-1 ${dayEvents.length === 1 ? 'max-w-md' : dayEvents.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-5`}>
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className="card-sheen rounded-2xl p-5 bg-white border border-[#C8BEAF]/50 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-40 rounded-xl overflow-hidden relative mb-4">
                            <img
                              src={ev.image}
                              alt={ev.title}
                              className="w-full h-full object-cover img-film transition-transform duration-700 group-hover:scale-108"
                            />
                            <span
                              className="absolute top-2 left-2 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full text-white shadow-xs"
                              style={{ backgroundColor: ev.accentColor }}
                            >
                              {ev.timeOfDay}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-[#5E3D7A] font-bold mb-1">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{ev.time}</span>
                          </div>

                          <h4 className="font-royal-custom text-lg font-bold text-[#1A1222] group-hover:text-[#5E3D7A] transition-colors mb-1">
                            {ev.title}
                          </h4>
                          <p className="font-serif-custom text-xs italic text-[#B0542C] font-semibold mb-3">
                            {ev.subTitle}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#C8BEAF]/30 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-[#6D5F80] truncate max-w-[120px]">
                            {ev.location}
                          </span>
                          <span
                            className="font-bold text-[10px] uppercase tracking-wider"
                            style={{ color: ev.accentColor }}
                          >
                            Details &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── LAYOUT OPTION 4: Cinematic Horizontal Strip (Panoramic Scroll) ── */}
        {currentLayout === 'magazine-horizontal' && (
          <div className="relative">
            {/* Scroll Navigation Arrows */}
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#5E3D7A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Swipe or Scroll Through the 7 Ceremonies</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollHorizontal('left')}
                  className="p-2 rounded-full border border-[#C8BEAF] bg-[#F7F3EE] hover:bg-white transition-all cursor-pointer shadow-2xs hover:shadow-md"
                  aria-label="Previous event"
                >
                  <ChevronLeft className="w-4 h-4 text-[#1A1222]" />
                </button>
                <button
                  onClick={() => scrollHorizontal('right')}
                  className="p-2 rounded-full border border-[#C8BEAF] bg-[#F7F3EE] hover:bg-white transition-all cursor-pointer shadow-2xs hover:shadow-md"
                  aria-label="Next event"
                >
                  <ChevronRight className="w-4 h-4 text-[#1A1222]" />
                </button>
              </div>
            </div>

            {/* Horizontal Track */}
            <div
              ref={horizontalScrollRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {WEDDING_EVENTS.map((ev, index) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 snap-center card-sheen rounded-3xl overflow-hidden bg-[#F7F3EE] border border-[#C8BEAF]/70 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-60 w-full relative overflow-hidden">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover img-film transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE] via-transparent to-transparent opacity-90" />

                    {/* Stylized Chapter Numeral */}
                    <div className="absolute top-4 right-4 font-royal-custom text-3xl font-black text-white/90 drop-shadow-md">
                      0{index + 1}
                    </div>

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="font-royal-custom text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-[#1A1222] shadow-xs">
                        {ev.dayLabel}
                      </span>
                      <span
                        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full text-white shadow-xs"
                        style={{ backgroundColor: ev.accentColor }}
                      >
                        {ev.timeOfDay}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] group-hover:text-[#5E3D7A] transition-colors mb-1">
                        {ev.title}
                      </h3>
                      <p className="font-serif-custom text-sm italic text-[#B0542C] font-semibold mb-4">
                        {ev.subTitle}
                      </p>

                      <div className="space-y-2 text-xs text-[#2B2136] font-medium mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: ev.accentColor }} />
                          <span>{ev.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" style={{ color: ev.accentColor }} />
                          <span>{ev.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" style={{ color: ev.accentColor }} />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#C8BEAF]/40">
                      <div
                        className="btn-sheen w-full py-2.5 rounded-xl text-center text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 group-hover:shadow-md"
                        style={{
                          color: ev.accentColor,
                          backgroundColor: `${ev.accentColor}14`,
                          border: `1px solid ${ev.accentColor}50`,
                        }}
                      >
                        View Ceremony Details &rarr;
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal with Smooth Spring Transition (Shared Across All Layouts) */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1222]/40 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="bg-[#F7F3EE] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] text-[#1A1222] border border-[#C8BEAF]"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#5E3D7A] hover:text-[#1A1222] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-royal-custom text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#C8BEAF]/40 text-[#5E3D7A]">
                    {selectedEvent.dayLabel}
                  </span>
                  <span
                    className="text-xs uppercase tracking-[0.18em] font-bold px-2.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: selectedEvent.accentColor }}
                  >
                    {selectedEvent.timeOfDay}
                  </span>
                </div>
                <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold text-[#1A1222] tracking-[0.03em]">
                  {selectedEvent.title}
                </h3>
                <p className="font-serif-custom text-[#B0542C] italic text-base mt-1 font-semibold">
                  {selectedEvent.subTitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 text-xs sm:text-sm text-[#2B2136] font-medium p-4 rounded-2xl bg-[#F0EBE3] border border-[#C8BEAF]/40">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#5E3D7A]" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B0542C]" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="w-4 h-4 text-[#C58F64]" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              <p className="font-serif-custom text-[#2B2136] text-base leading-relaxed mb-6 font-normal">
                {selectedEvent.description}
              </p>

              {/* Dress code */}
              <div className="bg-[#F0EBE3] rounded-2xl p-5 mb-6 border border-[#C8BEAF]/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[#B0542C] text-xs uppercase tracking-[0.1em] font-bold">
                    <Shirt className="w-4 h-4" />
                    <span>Dress Code</span>
                  </div>
                  <div className="flex gap-1.5">
                    {selectedEvent.swatches.map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full shadow-sm border border-black/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-royal-custom text-sm font-bold text-[#1A1222] mb-2">
                  {selectedEvent.dressCodeTitle}
                </p>
                <ul className="space-y-1.5 text-xs text-[#2B2136] list-disc list-inside font-serif-custom font-medium">
                  {selectedEvent.dressCodeSuggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#5E3D7A] mb-6 font-semibold">
                <Music className="w-4 h-4 text-[#5E3D7A]" />
                <span><strong>Music Vibe:</strong> {selectedEvent.musicVibe}</span>
              </div>

              <button
                onClick={() => handleDownloadCalendar(selectedEvent)}
                className="w-full py-3.5 rounded-full text-white text-xs uppercase tracking-[0.15em] font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
