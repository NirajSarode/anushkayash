import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Plane, Train, CloudSun, Compass, Hotel } from 'lucide-react';

export const VenueTravel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'venue' | 'flight' | 'train' | 'weather'>('venue');

  return (
    <section id="venue" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 text-xs tracking-widest uppercase font-semibold"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Destination Guide</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-tight gold-gradient-text"
          >
            The Mountain Retreat & Travel Info
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif-custom text-slate-300 text-lg sm:text-xl italic max-w-2xl mx-auto"
          >
            Set in the foggy Sahyadri mountain slopes of Igatpuri at 2,000 ft altitude.
          </motion.p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'venue', label: 'Resort & Venue', icon: <Hotel className="w-4 h-4" /> },
            { id: 'flight', label: 'By Air (Airports)', icon: <Plane className="w-4 h-4" /> },
            { id: 'train', label: 'By Road & Train', icon: <Train className="w-4 h-4" /> },
            { id: 'weather', label: 'Climate & Packing', icon: <CloudSun className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'glass-panel text-slate-300 hover:text-amber-300 border-amber-500/20'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30">
          {activeTab === 'venue' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                    Host Resort
                  </span>
                  <h3 className="font-royal-custom text-2xl sm:text-4xl font-bold text-slate-100">
                    Tropicores Resort & Spa, Igatpuri
                  </h3>
                  <p className="font-serif-custom text-slate-300 text-base leading-relaxed">
                    Surrounded by lush green Sahyadri mountain peaks and waterfalls, offering luxury private villas, infinity pools overlooking fog-covered valleys, and world-class hospitality for our wedding guests.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Mumbai-Nashik Expressway, Igatpuri, Maharashtra 422403</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Complimentary Valet Parking & Airport/Station Shuttle Services Provided</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Igatpuri+Resort+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-amber-400 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Venue Preview Image */}
              <div className="h-80 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="/images/hero_mountain.png"
                  alt="Resort View"
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 font-serif-custom text-sm text-amber-200 italic">
                  Igatpuri Mountain Valley View
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === 'flight' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
            >
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-3">
                  <Plane className="w-6 h-6 text-amber-400" />
                  <h4 className="font-royal-custom text-lg font-bold text-amber-200">
                    Nashik Airport (ISK) / Ozar
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Distance:</strong> ~50 km (approx. 1 hour drive via NH 160).
                </p>
                <p className="font-serif-custom text-slate-300 text-sm">
                  Nearest domestic airport with direct flights connecting major hubs like Bengaluru and Hyderabad. Private cabs available.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-3">
                  <Plane className="w-6 h-6 text-rose-400" />
                  <h4 className="font-royal-custom text-lg font-bold text-rose-200">
                    Mumbai Airport (BOM)
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Distance:</strong> ~120 km (approx. 2.5 hours smooth drive via Mumbai-Samruddhi Expressway / NH 160).
                </p>
                <p className="font-serif-custom text-slate-300 text-sm">
                  Ideal for guests flying in from Bengaluru and international hubs into Mumbai. Wedding shuttle coaches will operate continuously.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'train' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
            >
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-3">
                  <Train className="w-6 h-6 text-emerald-400" />
                  <h4 className="font-royal-custom text-lg font-bold text-emerald-200">
                    Igatpuri Railway Station (IGP)
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Distance:</strong> ~5 km (approx. 10 mins drive to resort).
                </p>
                <p className="font-serif-custom text-slate-300 text-sm">
                  Major railway junction on Central Railway connecting Mumbai, Nashik, Pune, and Bengaluru express trains. Pickups provided.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-3">
                  <Navigation className="w-6 h-6 text-amber-400" />
                  <h4 className="font-royal-custom text-lg font-bold text-amber-200">
                    Scenic Highway Drive
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Route:</strong> Mumbai / Nashik → Kasara Ghat → Igatpuri.
                </p>
                <p className="font-serif-custom text-slate-300 text-sm">
                  Smooth 4-lane expressway through Kasara Ghats with scenic mountain viewpoints.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'weather' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-left max-w-3xl mx-auto"
            >
              <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-400/30 space-y-3">
                <div className="flex items-center gap-3">
                  <CloudSun className="w-6 h-6 text-amber-400" />
                  <h4 className="font-royal-custom text-xl font-bold text-amber-200">
                    Early February Mountain Weather
                  </h4>
                </div>
                <p className="font-serif-custom text-slate-300 text-base leading-relaxed">
                  Early February in Igatpuri brings cool mountain weather. Daytime temperatures average <strong>24°C (75°F)</strong> with pleasant sunshine. Evenings drop to a crisp <strong>14°C (57°F)</strong> with misty mountain breezes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  🧥 Packing Recommendations
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                  <li>Light jackets, shawls, or blazers for cool outdoor evening events (Sangeet & Pheras).</li>
                  <li>Comfortable shoes for lawn walkways and terrace viewpoints.</li>
                  <li>Sun protection for daytime Mehendi by the pine orchards.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
