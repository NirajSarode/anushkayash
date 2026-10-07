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
          className="font-serif-custom text-[#B5ADBF] text-xs tracking-[0.3em] uppercase mb-4"
        >
          The Invitation
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
          className="font-serif-custom text-[#8A7F99] text-lg italic mb-14"
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
              className="max-w-lg w-full soft-card rounded-2xl p-10 sm:p-14 flex flex-col items-center gap-6 group cursor-pointer hover:shadow-lg transition-shadow duration-500"
            >
              {/* Monogram */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-royal-custom font-bold text-lg shadow-md group-hover:rotate-6 transition-transform duration-500"
                style={{ background: 'linear-gradient(135deg, #B89FC8, #E8A987)' }}
              >
                A&Y
              </div>

              <h3 className="font-royal-custom text-xl font-bold text-[#2E2438] tracking-[0.1em]">
                SHREE GANESHAYA NAMAH
              </h3>
              <p className="font-serif-custom text-[#8A7F99] text-base italic max-w-sm">
                With the blessings of our elders & almighty, we request the pleasure of your company.
              </p>

              <span
                className="px-8 py-3 rounded-full text-white text-xs uppercase tracking-[0.2em] font-semibold shadow-md"
                style={{ background: 'linear-gradient(135deg, #B89FC8, #C9917E, #E8A987)' }}
              >
                Tap to Unfurl
              </span>
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-2xl w-full bg-[#F7F3EE] rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-[#2E2438]"
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(to right, #B89FC8, #C9917E, #E8A987)' }} />

                <p className="font-serif-custom text-sm tracking-[0.2em] text-[#C9917E] uppercase mb-6">
                  || Shree Ganeshaya Namah ||
                </p>

                <h3 className="font-royal-custom text-3xl sm:text-4xl font-bold gradient-text-blend tracking-[0.05em] mb-2">
                  Wedding Invitation
                </h3>
                <p className="font-serif-custom text-[#8A7F99] text-base italic mb-10">
                  Two States, One Celebration
                </p>

                {/* Families — split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mb-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B5280] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B89FC8]" />
                      Bride's Family &middot; Delhi
                    </p>
                    <p className="font-serif-custom text-[#2E2438] text-base font-semibold">
                      Granddaughter of Late Sh. Surinder Verma
                    </p>
                    <p className="font-serif-custom text-[#4A3F58] text-sm">
                      Daughter of Mrs. Harpreet & Mr. Jaswinder Verma
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6045] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E8A987]" />
                      Groom's Family &middot; Maharashtra
                    </p>
                    <p className="font-serif-custom text-[#2E2438] text-base font-semibold">
                      Grandson of Late Seth Ratanlal Biyani
                    </p>
                    <p className="font-serif-custom text-[#4A3F58] text-sm">
                      Son of Mrs. Sunita & Mr. Rameshwar Biyani
                    </p>
                  </div>
                </div>

                {/* Couple */}
                <p className="font-serif-custom text-[#4A3F58] text-base mb-2">Cordially invite you to the marriage of</p>
                <h4 className="font-royal-custom text-3xl sm:text-5xl font-bold text-[#2E2438] mb-8">
                  ANUSHKA <span className="font-script-custom text-[#C9917E] text-4xl sm:text-6xl">&</span> YASH
                </h4>

                {/* Venue */}
                <div className="flex items-center justify-center gap-2 text-[#4A3F58] text-sm mb-2">
                  <MapPin className="w-4 h-4 text-[#C9917E]" />
                  <span className="font-serif-custom font-semibold">Tropicores Resort & Spa, Igatpuri</span>
                </div>
                <p className="text-xs text-[#8A7F99] mb-10">
                  2nd February, 2027 &middot; Igatpuri, Maharashtra
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-full border border-[#D6CCBF] text-[#8A7F99] text-xs uppercase tracking-[0.15em] hover:text-[#2E2438] hover:border-[#B89FC8] transition-all"
                >
                  Close
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
