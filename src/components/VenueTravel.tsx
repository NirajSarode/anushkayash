import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
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
            className="font-serif-custom text-[#B5ADBF] text-xs tracking-[0.3em] uppercase mb-4">
            Destination
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
            The Mountain Retreat
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#8A7F99] text-lg italic max-w-xl mx-auto">
            Set in the misty Sahyadri slopes — where Delhi meets Maharashtra.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white shadow-md scale-105'
                  : 'bg-[#F7F3EE] border border-[#D6CCBF] text-[#8A7F99] hover:text-[#4A3F58]'
              }`}
              style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #B89FC8, #C9917E, #E8A987)' } : {}}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-[#F7F3EE] rounded-2xl p-6 sm:p-10 border border-[#D6CCBF]">
          {activeTab === 'venue' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6045] mb-2">Host Resort</p>
                  <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold text-[#2E2438] mb-3">
                    Tropicores Resort & Spa
                  </h3>
                  <p className="font-serif-custom text-[#4A3F58] leading-relaxed">
                    Surrounded by Sahyadri mountain peaks and waterfalls — luxury villas, infinity pools overlooking fog-covered valleys, and warm hospitality.
                  </p>
                </div>
                <div className="space-y-2 text-xs text-[#4A3F58]">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-4 h-4 text-[#B89FC8] flex-shrink-0" />
                    Mumbai-Nashik Expressway, Igatpuri, MH 422403
                  </div>
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-[#C9917E] flex-shrink-0" />
                    Complimentary valet & shuttle services provided
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Igatpuri+Resort+Maharashtra" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs uppercase tracking-[0.15em] font-semibold shadow-md"
                  style={{ background: 'linear-gradient(135deg, #B89FC8, #C9917E, #E8A987)' }}>
                  <MapPin className="w-4 h-4" />Google Maps
                </a>
              </div>
              <div className="h-72 sm:h-80 rounded-2xl overflow-hidden relative shadow-lg">
                <img src="/images/hero_mountain.png" alt="Resort" className="w-full h-full object-cover img-film img-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE]/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          )}

          {activeTab === 'flight' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { title: 'From Delhi (DEL)', icon: <Plane className="w-5 h-5 text-[#B89FC8]" />, text: 'Fly to Mumbai BOM (2 hrs) or directly to Nashik. Shuttle coaches from both airports.', color: '#B89FC8' },
                { title: 'From Maharashtra', icon: <Plane className="w-5 h-5 text-[#E8A987]" />, text: 'Mumbai BOM is ~120 km (2.5 hrs via expressway). Continuous wedding shuttles.', color: '#E8A987' },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-xl bg-[#F0EBE3] space-y-3">
                  <div className="flex items-center gap-3">{item.icon}
                    <h4 className="font-royal-custom text-base font-bold text-[#2E2438]">{item.title}</h4>
                  </div>
                  <p className="font-serif-custom text-[#4A3F58] text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'train' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { title: 'Igatpuri Station (IGP)', icon: <Train className="w-5 h-5 text-[#B89FC8]" />, text: '~5 km from resort (10 min). Major junction connecting Mumbai, Nashik, Delhi express trains. Pickups provided.' },
                { title: 'Scenic Highway Drive', icon: <Navigation className="w-5 h-5 text-[#E8A987]" />, text: 'Mumbai/Nashik via Kasara Ghat. Smooth 4-lane expressway with scenic mountain viewpoints.' },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-xl bg-[#F0EBE3] space-y-3">
                  <div className="flex items-center gap-3">{item.icon}
                    <h4 className="font-royal-custom text-base font-bold text-[#2E2438]">{item.title}</h4>
                  </div>
                  <p className="font-serif-custom text-[#4A3F58] text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'weather' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto space-y-6 text-left">
              <div className="p-6 rounded-xl bg-[#F0EBE3]">
                <h4 className="font-royal-custom text-lg font-bold text-[#2E2438] mb-3">Early February Weather</h4>
                <p className="font-serif-custom text-[#4A3F58] leading-relaxed">
                  Daytime: <strong>24°C</strong> with pleasant sunshine. Evenings: a crisp <strong>14°C</strong> with misty mountain breezes.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[#F0EBE3]">
                <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-[#6B5280] mb-3">Packing Tips</h4>
                <ul className="space-y-2 text-sm text-[#4A3F58] list-disc list-inside font-serif-custom">
                  <li>Light jackets or shawls for evening events</li>
                  <li>Comfortable shoes for lawn walkways</li>
                  <li>Sun protection for daytime Mehendi</li>
                  <li>Delhi guests: the mountain breeze is cooler than expected!</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
