import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Navigation, Plane, Train, CloudSun, Compass, Hotel } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const VenueTravel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'venue' | 'flight' | 'train' | 'weather'>('venue');

  const tabs = [
    { id: 'venue' as const, label: 'Resort', icon: <Hotel className="w-4 h-4" /> },
    { id: 'flight' as const, label: 'By Air', icon: <Plane className="w-4 h-4" /> },
    { id: 'train' as const, label: 'By Road', icon: <Train className="w-4 h-4" /> },
    { id: 'weather' as const, label: 'Weather', icon: <CloudSun className="w-4 h-4" /> },
  ];

  return (
    <section id="venue" className="section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-4 font-bold">
            Destination
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
            The Mountain Retreat
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#2B2136] text-lg sm:text-xl italic max-w-xl mx-auto font-medium">
            Set in the misty Sahyadri slopes &mdash; where Delhi meets Maharashtra.
          </motion.p>
        </div>

        {/* Tabs with Smooth Sliding Layout Pill */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 p-1.5 rounded-full bg-[#F7F3EE]/80 border border-[#C8BEAF]/50 max-w-fit mx-auto shadow-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-white' : 'text-[#4B3E5B] hover:text-[#1A1222]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="venueActiveTabPill"
                    className="absolute inset-0 rounded-full shadow-md -z-10"
                    style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content with AnimatePresence */}
        <div className="card-sheen bg-[#F7F3EE] rounded-3xl p-6 sm:p-10 border border-[#C8BEAF]/60 shadow-xl min-h-[380px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeTab === 'venue' && (
              <motion.div
                key="venue"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6 text-left">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#B0542C] mb-2">Host Resort</p>
                    <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold text-[#1A1222] mb-3">
                      Tropicores Resort &amp; Spa
                    </h3>
                    <p className="font-serif-custom text-[#2B2136] text-base leading-relaxed font-normal">
                      Surrounded by Sahyadri mountain peaks and waterfalls &mdash; luxury villas, infinity pools overlooking fog-covered valleys, and warm hospitality.
                    </p>
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm text-[#2B2136] font-medium">
                    <div className="flex items-center gap-3">
                      <Navigation className="w-4 h-4 text-[#5E3D7A] flex-shrink-0" />
                      Mumbai-Nashik Expressway, Igatpuri, MH 422403
                    </div>
                    <div className="flex items-center gap-3">
                      <Compass className="w-4 h-4 text-[#B0542C] flex-shrink-0" />
                      Complimentary valet &amp; shuttle services provided
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Igatpuri+Resort+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sheen inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-xs uppercase tracking-[0.15em] font-bold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
                  >
                    <MapPin className="w-4 h-4" />Open in Google Maps
                  </a>
                </div>
                <div className="h-72 sm:h-80 rounded-2xl overflow-hidden relative shadow-lg">
                  <img src="/images/hero_mountain.webp" alt="Resort" className="w-full h-full object-cover img-film img-kenburns" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE]/40 via-transparent to-transparent" />
                </div>
              </motion.div>
            )}

            {activeTab === 'flight' && (
              <motion.div
                key="flight"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                {[
                  { title: 'From Delhi (DEL)', icon: <Plane className="w-5 h-5 text-[#5E3D7A]" />, text: 'Fly to Mumbai BOM (2 hrs) or directly to Nashik. Dedicated wedding shuttle coaches run continuously from both airports.', color: '#5E3D7A' },
                  { title: 'From Maharashtra', icon: <Plane className="w-5 h-5 text-[#B0542C]" />, text: 'Mumbai BOM is ~120 km (2.5 hrs via expressway). Regular pickup coaches will escort all arriving guests.', color: '#B0542C' },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-[#F0EBE3] space-y-3 border border-[#C8BEAF]/40 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <h4 className="font-royal-custom text-base font-bold text-[#1A1222]">{item.title}</h4>
                    </div>
                    <p className="font-serif-custom text-[#2B2136] text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'train' && (
              <motion.div
                key="train"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                {[
                  { title: 'Igatpuri Station (IGP)', icon: <Train className="w-5 h-5 text-[#5E3D7A]" />, text: '~5 km from resort (10 min). Major junction connecting Mumbai, Nashik, and Delhi express trains. Station pickups provided.' },
                  { title: 'Scenic Highway Drive', icon: <Navigation className="w-5 h-5 text-[#B0542C]" />, text: 'Mumbai/Nashik via Kasara Ghat. Smooth 4-lane expressway with scenic mountain viewpoints.' },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-[#F0EBE3] space-y-3 border border-[#C8BEAF]/40 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <h4 className="font-royal-custom text-base font-bold text-[#1A1222]">{item.title}</h4>
                    </div>
                    <p className="font-serif-custom text-[#2B2136] text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'weather' && (
              <motion.div
                key="weather"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="max-w-2xl mx-auto space-y-6 text-left"
              >
                <div className="p-6 rounded-2xl bg-[#F0EBE3] border border-[#C8BEAF]/40 hover:shadow-md transition-shadow">
                  <h4 className="font-royal-custom text-lg font-bold text-[#1A1222] mb-3">Early February Weather</h4>
                  <p className="font-serif-custom text-[#2B2136] leading-relaxed">
                    Daytime: <strong>24&deg;C</strong> with pleasant sunshine. Evenings: a crisp <strong>14&deg;C</strong> with misty mountain breezes.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F0EBE3] border border-[#C8BEAF]/40 hover:shadow-md transition-shadow">
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#5E3D7A] mb-3">Packing Tips</h4>
                  <ul className="space-y-2 text-sm text-[#2B2136] list-disc list-inside font-serif-custom font-medium">
                    <li>Light jackets or shawls for evening outdoor events</li>
                    <li>Comfortable footwear for lawn walkways</li>
                    <li>Sun protection for daytime Mehendi</li>
                    <li>Delhi guests: the mountain breeze gets wonderfully cool at night!</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
