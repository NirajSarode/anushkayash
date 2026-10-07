import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, Shirt, Music, X, Download } from 'lucide-react';

interface WeddingEvent {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dressCodeTitle: string;
  dressCodeSuggestions: string[];
  swatches: string[];
  image: string;
  musicVibe: string;
  accentColor: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);

  const eventsList: WeddingEvent[] = [
    {
      id: 'mehendi',
      title: 'Mehendi & Haldi',
      subTitle: 'Earthy yellows, flowers & sunshine',
      date: 'Monday, Feb 1, 2027',
      time: '11:00 AM onwards',
      location: 'Pine Orchard Lawns',
      description: 'A sun-drenched afternoon blending Delhi\'s vibrant Mehendi traditions with Maharashtra\'s Haldi warmth. Live folk music, organic mehendi artists, and a joyful flower petal shower.',
      dressCodeTitle: 'Earthy Mustard, Saffron & Pastel Floral',
      dressCodeSuggestions: [
        'Women: Floral Lehengas, Yellow Shararas, Silk Sarees',
        'Men: Kurta Pyjamas, Silk Jackets, Pastel Bandhgalas',
      ],
      swatches: ['#E8A987', '#C9917E', '#B89FC8', '#D6CCBF'],
      image: '/images/mehendi.png',
      musicVibe: 'Folk fusion & acoustic sundowner melodies',
      accentColor: '#E8A987',
    },
    {
      id: 'sangeet',
      title: 'Sangeet Night',
      subTitle: 'Music, dance & glamour under the stars',
      date: 'Monday, Feb 1, 2027',
      time: '07:30 PM till late',
      location: 'Grand Mountain Ballroom',
      description: 'Delhi beats meet Maharashtra energy! Family dance performances, cocktails, DJ sets, and late-night music under the mountain stars.',
      dressCodeTitle: 'Indo-Western Glamour & Shimmer',
      dressCodeSuggestions: [
        'Women: Sequined Lehengas, Cocktail Gowns, Anarkalis',
        'Men: Tuxedos, Velvet Bandhgalas, Modern Sherwanis',
      ],
      swatches: ['#B89FC8', '#6B5280', '#C9917E', '#2E2438'],
      image: '/images/sangeet.png',
      musicVibe: 'Delhi party anthems & Bollywood dance beats',
      accentColor: '#B89FC8',
    },
    {
      id: 'pheras',
      title: 'Sunset Pheras',
      subTitle: 'Where two states become one',
      date: 'Tuesday, Feb 2, 2027',
      time: '04:30 PM',
      location: 'Mist Deck Mandap',
      description: 'As twilight mist settles over the Sahyadri peaks, Anushka & Yash take their seven sacred vows — Delhi and Maharashtra becoming one family, one love, one future.',
      dressCodeTitle: 'Royal Elegance — Jewel Tones & Gold',
      dressCodeSuggestions: [
        'Women: Royal Silk Lehengas, Kanjeevarams, Embroidered Dupattas',
        'Men: Ivory/Royal Sherwanis with Turban',
      ],
      swatches: ['#B89FC8', '#E8A987', '#C9917E', '#2E2438'],
      image: '/images/pheras.png',
      musicVibe: 'Live shehnai, sitar & ambient recital',
      accentColor: '#C9917E',
    },
  ];

  const handleDownloadCalendar = (ev: WeddingEvent) => {
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Anushka & Yash Wedding//EN\nBEGIN:VEVENT\nSUMMARY:${ev.title} - Anushka & Yash Wedding\nDESCRIPTION:${ev.description}\nLOCATION:${ev.location}, Igatpuri\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.id}-wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#B5ADBF] text-xs tracking-[0.3em] uppercase mb-4">
            The Festivities
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
            Three Days of Celebration
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#8A7F99] text-lg italic max-w-xl mx-auto">
            Where Delhi's vibrance meets Maharashtra's warmth.
          </motion.p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {eventsList.map((ev, index) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.8, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="rounded-2xl overflow-hidden cursor-pointer group bg-[#F7F3EE] border border-[#D6CCBF] hover:shadow-xl transition-all duration-500"
              onClick={() => setSelectedEvent(ev)}
            >
              {/* Image with Ken Burns + film treatment */}
              <div className="h-56 w-full relative overflow-hidden">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover img-film img-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE] via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-royal-custom text-lg font-bold text-[#2E2438] mb-1 group-hover:text-[#6B5280] transition-colors tracking-[0.03em]">
                  {ev.title}
                </h3>
                <p className="font-serif-custom text-sm italic text-[#C9917E] mb-5">
                  {ev.subTitle}
                </p>

                <div className="space-y-2 text-xs text-[#4A3F58]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" style={{ color: ev.accentColor }} />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" style={{ color: ev.accentColor }} />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" style={{ color: ev.accentColor }} />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div
                  className="w-full py-2.5 rounded-xl text-center text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300"
                  style={{
                    color: ev.accentColor,
                    border: `1px solid ${ev.accentColor}40`,
                  }}
                >
                  View Details
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E2438]/20 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#F7F3EE] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] text-[#2E2438]"
            >
              <button onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#B5ADBF] hover:text-[#2E2438] transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold gradient-text-blend tracking-[0.03em]">
                  {selectedEvent.title}
                </h3>
                <p className="font-serif-custom text-[#8A7F99] italic mt-1">{selectedEvent.subTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-[#4A3F58]">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B89FC8]" />{selectedEvent.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C9917E]" />{selectedEvent.time}</div>
                <div className="flex items-center gap-2 col-span-2"><MapPin className="w-4 h-4 text-[#E8A987]" />{selectedEvent.location}, Igatpuri</div>
              </div>

              <p className="font-serif-custom text-[#4A3F58] text-base leading-relaxed mb-6">{selectedEvent.description}</p>

              {/* Dress code */}
              <div className="bg-[#F0EBE3] rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[#8B6045] text-xs uppercase tracking-[0.1em] font-semibold">
                    <Shirt className="w-4 h-4" />Dress Code
                  </div>
                  <div className="flex gap-1.5">
                    {selectedEvent.swatches.map((c, i) => <span key={i} className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: c }} />)}
                  </div>
                </div>
                <p className="font-royal-custom text-sm font-bold text-[#2E2438] mb-2">{selectedEvent.dressCodeTitle}</p>
                <ul className="space-y-1 text-xs text-[#4A3F58] list-disc list-inside">
                  {selectedEvent.dressCodeSuggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#6B5280] mb-6">
                <Music className="w-4 h-4 text-[#B89FC8]" />
                <span><strong>Vibe:</strong> {selectedEvent.musicVibe}</span>
              </div>

              <button onClick={() => handleDownloadCalendar(selectedEvent)}
                className="w-full py-3 rounded-xl text-white text-xs uppercase tracking-[0.15em] font-semibold shadow-md flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #B89FC8, #C9917E, #E8A987)' }}>
                <Download className="w-4 h-4" />Add to Calendar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
