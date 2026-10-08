import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const RoyalInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="invitation" className="section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={fadeUp}
          className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-4 font-bold"
        >
          The Sacred Invitation
        </motion.p>

        <motion.h2
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={fadeUp}
          className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4"
        >
          Nimantran Patrika
        </motion.h2>

        <motion.p
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={fadeUp}
          className="font-serif-custom text-[#2B2136] text-lg sm:text-xl italic mb-14"
        >
          Tap below to unfurl the sacred wedding invitation.
        </motion.p>

        <div className="flex justify-center">
          {!isOpen ? (
            <motion.button
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(true)}
              className="max-w-lg w-full soft-card rounded-3xl p-10 sm:p-14 flex flex-col items-center gap-6 group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-[#C8BEAF]"
            >
              {/* Monogram */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-royal-custom font-bold text-lg shadow-md group-hover:rotate-6 transition-transform duration-500"
                style={{ background: 'linear-gradient(135deg, #7C6090 0%, #B0542C 100%)' }}
              >
                A&Y
              </div>

              <h3 className="font-royal-custom text-xl font-bold text-[#1A1222] tracking-[0.1em]">
                SHREE GANESHAYA NAMAH
              </h3>
              <p className="font-serif-custom text-[#4B3E5B] text-base italic max-w-sm">
                With the blessings of our elders & almighty, we request the pleasure of your company.
              </p>

              <span
                className="px-8 py-3.5 rounded-full text-white text-xs uppercase tracking-[0.2em] font-semibold shadow-md group-hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}
              >
                Tap to Unfurl &rarr;
              </span>
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-2xl w-full bg-[#F7F3EE] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-[#2E2438] border border-[#C8BEAF]"
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, #7C6090, #C58F64, #B0542C)' }} />

                <p className="font-serif-custom text-sm tracking-[0.25em] text-[#B0542C] uppercase font-bold mb-6">
                  || Shree Ganeshaya Namah ||
                </p>

                <h3 className="font-royal-custom text-3xl sm:text-4xl font-bold text-[#1A1222] tracking-[0.05em] mb-2">
                  Wedding Invitation
                </h3>
                <p className="font-serif-custom text-[#4B3E5B] text-base italic mb-10">
                  Two States, One Celebration
                </p>

                {/* Families — split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mb-10">
                  <div className="p-5 rounded-2xl bg-[#F0EBE3]/70 border border-[#B89FC8]/30">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5E3D7A] mb-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7C6090]" />
                      Bride's Family &middot; Delhi
                    </p>
                    <p className="font-serif-custom text-[#1A1222] text-base font-semibold">
                      Granddaughter of Late Sh. Surinder Verma
                    </p>
                    <p className="font-serif-custom text-[#4B3E5B] text-sm mt-0.5">
                      Daughter of Mrs. Harpreet & Mr. Jaswinder Verma
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#F0EBE3]/70 border border-[#E8A987]/30">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#B0542C] mb-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B0542C]" />
                      Groom's Family &middot; Maharashtra
                    </p>
                    <p className="font-serif-custom text-[#1A1222] text-base font-semibold">
                      Grandson of Late Seth Ratanlal Biyani
                    </p>
                    <p className="font-serif-custom text-[#4B3E5B] text-sm mt-0.5">
                      Son of Mrs. Sunita & Mr. Rameshwar Biyani
                    </p>
                  </div>
                </div>

                {/* Couple */}
                <p className="font-serif-custom text-[#4B3E5B] text-base mb-2">Cordially invite you to the marriage of</p>
                <h4 className="font-royal-custom text-3xl sm:text-5xl font-bold mb-8">
                  <span className="text-[#5E3D7A]">ANUSHKA</span>{' '}
                  <span className="font-script-custom text-[#C58F64] text-4xl sm:text-6xl mx-2">&</span>{' '}
                  <span className="text-[#B0542C]">YASH</span>
                </h4>

                {/* Venue */}
                <div className="flex items-center justify-center gap-2 text-[#1A1222] text-sm sm:text-base mb-2 font-semibold">
                  <MapPin className="w-4 h-4 text-[#B0542C]" />
                  <span className="font-serif-custom">Tropicores Resort & Spa, Igatpuri</span>
                </div>
                <p className="text-xs text-[#5E3D7A] font-medium mb-10 uppercase tracking-wider">
                  2nd February, 2027 &middot; Igatpuri, Maharashtra
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-2.5 rounded-full border border-[#C8BEAF] text-[#4B3E5B] text-xs uppercase tracking-[0.15em] font-semibold hover:text-[#1A1222] hover:border-[#5E3D7A] transition-all cursor-pointer"
                >
                  Close Invitation
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
