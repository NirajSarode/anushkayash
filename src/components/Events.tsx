import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Shirt, Music, X, Download } from 'lucide-react';

interface WeddingEvent {
  id: string;
  title: string;
  subTitle: string;
  cultureTheme: string;
  date: string;
  time: string;
  location: string;
  description: string;
  dressCodeTitle: string;
  dressCodeSuggestions: string[];
  swatches: string[];
  image: string;
  musicVibe: string;
}

export const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);

  const eventsList: WeddingEvent[] = [
    {
      id: 'mehendi',
      title: 'Mehendi & Sundowner Haldi',
      subTitle: 'Earthy Yellows & Fresh Flower Shower',
      cultureTheme: 'Daytime Sundowner Celebration',
      date: 'Monday, Feb 1, 2027',
      time: '11:00 AM onwards',
      location: 'Pine Orchard Lawns, Igatpuri Resort',
      description:
        'A sun-drenched afternoon celebration featuring live acoustic folk music, organic mehendi artists, refreshing cocktails, and a joyful flower petal shower.',
      dressCodeTitle: 'Earthy Mustard, Saffron & Sunny Pastel Floral',
      dressCodeSuggestions: [
        'Women: Floral Lehengas, Yellow Shararas, Elegant Silk Sarees',
        'Men: Kurta Pyjamas with Silk Jackets or Pastel Bandhgalas',
      ],
      swatches: ['#F59E0B', '#D97706', '#FEF08A', '#E11D48'],
      image: '/images/mehendi.png',
      musicVibe: 'Acoustic Fusion & Lively Sundowner Melodies',
    },
    {
      id: 'sangeet',
      title: 'Sangeet & Celebration Night',
      subTitle: 'Music, Dance & Glamour Night',
      cultureTheme: 'Evening Music Gala',
      date: 'Monday, Feb 1, 2027',
      time: '07:30 PM till late night',
      location: 'Grand Mountain Ballroom & Terrace',
      description:
        'Get ready to burn the dance floor! High-energy family dance performances, signature cocktails, interactive DJ sets, and late-night music under the stars.',
      dressCodeTitle: 'Indo-Western Glamour & Shimmering Elegance',
      dressCodeSuggestions: [
        'Women: Sequined Lehengas, Cocktail Gowns, Designer Anarkalis',
        'Men: Tuxedos, Velvet Bandhgalas, Modern Royal Sherwanis',
      ],
      swatches: ['#BE185D', '#D92672', '#D4AF37', '#1E1B4B'],
      image: '/images/sangeet.png',
      musicVibe: 'High-energy Dance Beats, Retro Hits & Party Anthems',
    },
    {
      id: 'pheranight',
      title: 'Mountain Sunset Wedding & Pheras',
      subTitle: 'Misty Ethereal Sunset Ceremony',
      cultureTheme: 'Sacred Mountain Vedic Ceremony',
      date: 'Tuesday, Feb 2, 2027',
      time: '04:30 PM (Sunset Saat Phere)',
      location: 'Mist Deck Mandap Overlooking Igatpuri Valley',
      description:
        'As twilight mist settles over the mountain peaks of Igatpuri, Anushka & Yash take their sacred seven vows around the holy fire, followed by a royal wedding feast.',
      dressCodeTitle: 'Royal Emerald Green, Ruby Red & Antique Gold',
      dressCodeSuggestions: [
        'Women: Royal Silk Lehengas, Kanjeevarams, Heavily Embroidered Dupattas',
        'Men: Classic Ivory/Royal Sherwanis with Turban & Dupatta',
      ],
      swatches: ['#047857', '#9F1239', '#D4AF37', '#0F172A'],
      image: '/images/pheras.png',
      musicVibe: 'Live Sitar, Bansuri & Soft Ambient Recital',
    },
  ];

  const handleDownloadCalendar = (ev: WeddingEvent) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Anushka & Yash Wedding//EN
BEGIN:VEVENT
SUMMARY:${ev.title} - Anushka & Yash Wedding
DESCRIPTION:${ev.description}
LOCATION:${ev.location}, Mahabaleshwar
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.id}-wedding-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/30 text-rose-300 text-xs tracking-widest uppercase font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Multi-Cultural Festivities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-tight gold-gradient-text"
          >
            The Itinerary of Celebrations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif-custom text-slate-300 text-lg sm:text-xl italic max-w-2xl mx-auto"
          >
            Three days filled with vibrant colors, live acoustic music, mountain sunset ceremony, and late-night party under the stars.
          </motion.p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventsList.map((ev, index) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-amber-500/30 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedEvent(ev)}
            >
              <div>
                {/* Event Cover Image */}
                <div className="h-52 w-full relative overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 border border-amber-400/40 text-amber-300 backdrop-blur-md">
                    {ev.cultureTheme}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <h3 className="font-royal-custom text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {ev.title}
                  </h3>
                  <p className="font-serif-custom text-rose-300 text-sm italic">
                    {ev.subTitle}
                  </p>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rose-400" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 pt-0">
                <button className="w-full py-2.5 rounded-xl border border-amber-400/40 bg-slate-900/60 text-amber-300 text-xs font-semibold uppercase tracking-wider group-hover:bg-amber-500 group-hover:text-slate-950 transition-all flex items-center justify-center gap-2">
                  <span>View Details & Outfit Guide</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expandable Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border-2 border-amber-400/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] text-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-amber-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-2 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/60 border border-rose-500/30 text-rose-300">
                  {selectedEvent.cultureTheme}
                </span>
                <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold text-amber-200">
                  {selectedEvent.title}
                </h3>
                <p className="font-serif-custom text-slate-300 text-base italic">
                  {selectedEvent.subTitle}
                </p>
              </div>

              {/* Event Info Pill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl glass-panel border border-amber-400/30 mb-6 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-400" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  About The Ceremony
                </h4>
                <p className="font-serif-custom text-slate-300 text-base leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Dress Code & Palette Swatches */}
              <div className="space-y-3 mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs uppercase tracking-wider">
                    <Shirt className="w-4 h-4 text-rose-400" />
                    <span>Dress Code Inspiration</span>
                  </div>
                  {/* Swatches */}
                  <div className="flex gap-1.5">
                    {selectedEvent.swatches.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-slate-700 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <p className="font-royal-custom text-sm font-bold text-amber-300">
                  {selectedEvent.dressCodeTitle}
                </p>

                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {selectedEvent.dressCodeSuggestions.map((sug, i) => (
                    <li key={i}>{sug}</li>
                  ))}
                </ul>
              </div>

              {/* Music Vibe */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 mb-6">
                <Music className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>Musical Vibe:</strong> {selectedEvent.musicVibe}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleDownloadCalendar(selectedEvent)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Add To Calendar (.ics)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
