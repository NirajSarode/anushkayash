import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Crown, MapPin } from 'lucide-react';

export const RoyalInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="invitation" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background Decorative Mandala Accent */}
      <div className="absolute inset-0 royal-pattern pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 text-xs tracking-widest uppercase font-semibold">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Royal Invitation</span>
          </div>

          <h2 className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-tight gold-gradient-text">
            Royal Sanman & Nimantran Patrika
          </h2>
          <p className="font-serif-custom text-slate-300 text-lg sm:text-xl italic max-w-xl mx-auto">
            Click the golden royal wax seal below to unfurl the sacred wedding scroll.
          </p>
        </motion.div>

        {/* Sealed Royal Envelope / Unfurl Container */}
        <div className="relative flex justify-center items-center">
          {!isOpen ? (
            /* Closed Wax Sealed Envelope Card */
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(true)}
              className="w-full max-w-xl glass-panel rounded-3xl p-8 sm:p-12 border-2 border-amber-400/50 shadow-[0_0_60px_rgba(245,158,11,0.25)] cursor-pointer flex flex-col items-center gap-6 group backdrop-blur-2xl"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 via-rose-700 to-amber-800 border-2 border-amber-300 flex items-center justify-center text-amber-100 shadow-xl shadow-amber-900/50 group-hover:rotate-12 transition-transform duration-500">
                <Crown className="w-10 h-10 text-amber-200" />
              </div>

              <div className="space-y-2">
                <h3 className="font-royal-custom text-2xl font-bold text-amber-200 tracking-wider">
                  SHREE GANESHAYA NAMAH
                </h3>
                <p className="font-serif-custom text-slate-300 text-base italic">
                  With the blessings of our elders & almighty, we request the pleasure of your company.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-lg group-hover:shadow-amber-500/30 transition-all">
                <Scroll className="w-4 h-4" />
                <span>Tap To Unfurl Royal Scroll</span>
              </div>
            </motion.div>
          ) : (
            /* Unfurled Royal Patrika Card */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl bg-gradient-to-b from-amber-950/90 via-slate-900/95 to-rose-950/90 rounded-3xl p-8 sm:p-12 border-2 border-amber-400/60 shadow-[0_0_80px_rgba(245,158,11,0.35)] relative overflow-hidden backdrop-blur-2xl text-slate-100"
              >
                {/* Decorative Scroll Handles Top & Bottom */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 shadow-md" />
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 shadow-md" />

                {/* Auspicious Mantra */}
                <div className="text-amber-400 font-serif-custom text-sm font-bold tracking-widest uppercase mb-4">
                  || ॐ श्री गणेशाय नमः || || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ||
                </div>

                {/* Cultural Heritage Header */}
                <h3 className="font-royal-custom text-3xl sm:text-4xl font-extrabold gold-gradient-text tracking-wide mb-2">
                  ROYAL SANMAN & INVITATION
                </h3>
                <p className="font-serif-custom text-rose-300 text-lg italic mb-8">
                  Celebration of Love in the Western Ghats
                </p>

                {/* Family Host Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-8 border-y border-amber-500/30 py-6">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      BRIDE'S FAMILY (BENGALURU)
                    </span>
                    <p className="font-serif-custom text-slate-200 text-base font-semibold">
                      Granddaughter of Late Sh. Surinder Kapoor
                    </p>
                    <p className="font-serif-custom text-slate-300 text-sm">
                      Daughter of Mrs. Harpreet & Mr. Jaswinder Kapoor
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">
                      GROOM'S FAMILY (BENGALURU)
                    </span>
                    <p className="font-serif-custom text-slate-200 text-base font-semibold">
                      Grandson of Late Seth Ratanlal Maheshwari
                    </p>
                    <p className="font-serif-custom text-slate-300 text-sm">
                      Son of Mrs. Sunita & Mr. Rameshwar Maheshwari
                    </p>
                  </div>
                </div>

                {/* Couple Names Big Announcement */}
                <div className="space-y-2 mb-8">
                  <span className="font-serif-custom text-slate-300 text-lg">Cordially invite you to celebrate the marriage of</span>
                  <div className="font-royal-custom text-3xl sm:text-5xl font-bold text-amber-200">
                    ANUSHKA <span className="font-script-custom text-rose-400 text-4xl sm:text-6xl">&</span> YASH
                  </div>
                </div>

                {/* Event Venue Summary */}
                <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-amber-400/30 mb-8 space-y-2">
                  <div className="flex justify-center items-center gap-2 text-amber-300 font-semibold text-sm">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>Tropicores Resort & Spa, Igatpuri</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    2nd February, 2027 · Igatpuri Mountain Valley, Maharashtra
                  </p>
                </div>

                {/* Close / Re-seal Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-full border border-amber-400/50 bg-slate-900/80 text-amber-300 font-semibold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all"
                >
                  Roll Up Royal Scroll
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
