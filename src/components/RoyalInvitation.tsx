import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MapPin, Sparkles, ChevronUp, ScrollText } from 'lucide-react';
import confetti from 'canvas-confetti';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

// Ornate Wooden / Gilded Scroll Rod with Turned Finials and Silk Tassels
const ScrollRod: React.FC<{ isBottom?: boolean }> = ({ isBottom }) => (
  <div className="relative w-full flex items-center justify-center select-none z-30">
    {/* Left Turned Finial Knob */}
    <div className="relative flex items-center">
      {/* Outer spherical bead */}
      <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-[#734A2E] via-[#D4AF37] to-[#8C5A3C] shadow-md border border-[#F3E5AB]/50" />
      {/* Turned collar rings */}
      <div className="w-2.5 h-7 sm:w-3.5 sm:h-9 rounded-xs bg-gradient-to-b from-[#B8860B] via-[#F3E5AB] to-[#8C5A3C] shadow-xs -ml-1 border-y border-[#5C3D2E]" />
      <div className="w-1.5 h-8 sm:w-2 sm:h-10 rounded-xs bg-gradient-to-b from-[#734A2E] to-[#D4AF37] -ml-0.5" />
      {/* Hanging silk tassel */}
      <div className={`absolute ${isBottom ? 'top-full pt-1' : 'top-full pt-1'} left-1 flex flex-col items-center pointer-events-none`}>
        <div className="w-0.5 h-3 sm:h-5 bg-gradient-to-b from-[#D4AF37] to-[#B0542C]" />
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#B0542C] border border-[#F3E5AB]/70 shadow-xs" />
        <div className="w-2.5 sm:w-3.5 h-5 sm:h-7 bg-gradient-to-b from-[#B0542C] via-[#D4AF37] to-[#7C2D12] rounded-b-md shadow-xs opacity-90" />
      </div>
    </div>

    {/* Main Cylindrical Gilded Rod */}
    <div className="flex-1 h-5 sm:h-6 bg-gradient-to-b from-[#68402B] via-[#E6C665] via-[#FFF2C2] to-[#4A2D1E] shadow-[0_4px_14px_rgba(0,0,0,0.35)] relative mx-[-4px] z-10 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] opacity-50" />
      <div className="h-[1px] w-full bg-[#FFF5D0] opacity-80 absolute top-0.5" />
      <div className="h-[1px] w-full bg-[#2A160A] opacity-70 absolute bottom-0.5" />
    </div>

    {/* Right Turned Finial Knob */}
    <div className="relative flex items-center">
      <div className="w-1.5 h-8 sm:w-2 sm:h-10 rounded-xs bg-gradient-to-b from-[#734A2E] to-[#D4AF37] -mr-0.5" />
      <div className="w-2.5 h-7 sm:w-3.5 sm:h-9 rounded-xs bg-gradient-to-b from-[#B8860B] via-[#F3E5AB] to-[#8C5A3C] shadow-xs -mr-1 border-y border-[#5C3D2E]" />
      <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-l from-[#734A2E] via-[#D4AF37] to-[#8C5A3C] shadow-md border border-[#F3E5AB]/50" />
      {/* Hanging silk tassel */}
      <div className={`absolute ${isBottom ? 'top-full pt-1' : 'top-full pt-1'} right-1 flex flex-col items-center pointer-events-none`}>
        <div className="w-0.5 h-3 sm:h-5 bg-gradient-to-b from-[#D4AF37] to-[#B0542C]" />
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#B0542C] border border-[#F3E5AB]/70 shadow-xs" />
        <div className="w-2.5 sm:w-3.5 h-5 sm:h-7 bg-gradient-to-b from-[#B0542C] via-[#D4AF37] to-[#7C2D12] rounded-b-md shadow-xs opacity-90" />
      </div>
    </div>
  </div>
);

export const RoyalInvitation: React.FC = () => {
  const [isUnfurled, setIsUnfurled] = useState(true);

  const handleUnfurl = () => {
    setIsUnfurled(true);
    confetti({
      particleCount: 65,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#5E3D7A', '#B0542C', '#C58F64', '#F3E5AB'],
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="invitation" className="section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Pre-title & Title */}
        <motion.p
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={fadeUp}
          className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-3 font-bold"
        >
          Royal Farman &middot; शाही निमंत्रण
        </motion.p>

        <motion.h2
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={fadeUp}
          className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-3"
        >
          Nimantran Patrika
        </motion.h2>

        <motion.p
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={fadeUp}
          className="font-serif-custom text-[#2B2136] text-base sm:text-lg italic mb-10 max-w-lg mx-auto font-medium"
        >
          {isUnfurled
            ? 'The auspicious royal farman from the Biyani & Verma families.'
            : 'Tap the royal scroll roll below to unfurl the sacred wedding invitation.'}
        </motion.p>

        {/* ── THE ROYAL SCROLL CONTAINER ── */}
        <div className="flex justify-center w-full">
          <div className="max-w-2xl w-full flex flex-col items-center">

            {/* ROLLED STATE (Click to Unfurl) */}
            {!isUnfurled ? (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="w-full flex flex-col items-center"
              >
                {/* Scroll Roll interactive card */}
                <motion.div
                  whileHover={{ scale: 1.025, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUnfurl}
                  className="w-full cursor-pointer relative group flex flex-col items-center py-4"
                  title="Click to unfurl royal scroll"
                >
                  {/* Ambient Royal Gold Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5E3D7A]/15 via-[#C58F64]/25 to-[#B0542C]/15 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top Scroll Rod */}
                  <ScrollRod />

                  {/* Tightly Rolled Parchment Cylinder */}
                  <div className="w-[96%] relative py-8 sm:py-10 px-6 sm:px-10 bg-gradient-to-b from-[#F2ECE4] via-[#F8F5EF] to-[#E9DFD3] border-x-2 border-[#D4AF37]/50 shadow-[0_15px_35px_rgba(0,0,0,0.18)] flex flex-col items-center justify-center my-[-2px] z-10 rounded-sm">
                    {/* Parchment Cylinder 3D Cylindrical lighting overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.12)_0%,rgba(255,255,255,0.7)_25%,rgba(255,255,255,0.9)_50%,rgba(0,0,0,0.08)_75%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />

                    {/* Royal Red & Gold Velvet Ribbon wrapping around roll */}
                    <div className="absolute inset-y-0 w-24 sm:w-28 bg-gradient-to-r from-[#7A1E2E] via-[#9B2C3E] to-[#7A1E2E] border-x border-[#F3E5AB]/60 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center z-10">
                      {/* Gold thread stitching */}
                      <div className="absolute inset-y-0 left-1 w-0.5 border-r border-dashed border-[#F3E5AB]/70" />
                      <div className="absolute inset-y-0 right-1 w-0.5 border-l border-dashed border-[#F3E5AB]/70" />
                    </div>

                    {/* Embossed Royal Wax Seal (Center) */}
                    <div className="relative z-20 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
                      <div className="relative p-1.5 rounded-full bg-gradient-to-br from-[#E2B755] via-[#C58F64] to-[#8C5A3C] shadow-2xl">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white/95 border-2 border-white shadow-inner flex items-center justify-center">
                          <img
                            src="/images/wedding_crest.png"
                            alt="Royal Wedding Crest Seal"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Golden Unfurl Cue Pill */}
                      <div className="mt-4 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#C58F64]/70 shadow-lg flex items-center gap-2 text-[#5E3D7A] font-bold text-xs uppercase tracking-[0.2em] group-hover:bg-[#5E3D7A] group-hover:text-white transition-colors duration-300">
                        <Sparkles className="w-3.5 h-3.5 text-[#C58F64] group-hover:text-white" />
                        <span>Tap to Unfurl Farman</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Scroll Rod */}
                  <ScrollRod isBottom />
                </motion.div>

                {/* Subtext instruction */}
                <p className="text-xs uppercase tracking-[0.25em] text-[#6D5F80] font-semibold mt-6 flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-[#B0542C]" />
                  <span>An auspicious royal scroll sealed for you</span>
                </p>
              </motion.div>
            ) : (
              /* UNFURLED STATE (The Open Scroll) */
              <AnimatePresence>
                <div className="w-full flex flex-col items-center">
                  {/* Top Scroll Rod */}
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <ScrollRod />
                  </motion.div>

                  {/* Unfurling Parchment Paper Body */}
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0.7 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: 'top center' }}
                    className="w-[96%] relative bg-gradient-to-b from-[#FBF8F2] via-[#FAF6EF] to-[#F5EFE6] border-x-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.22)] py-8 sm:py-14 px-5 sm:px-12 my-[-2px] z-10 text-[#2E2438] overflow-hidden"
                  >
                    {/* Authentic Subtle Parchment Texture & Deckle Border */}
                    <div className="absolute inset-2 sm:inset-4 border-2 border-[#C58F64]/40 rounded-sm pointer-events-none" />
                    <div className="absolute inset-3 sm:inset-5 border border-[#C58F64]/20 rounded-sm pointer-events-none" />

                    {/* Corner Ornaments */}
                    <div className="absolute top-3 left-3 sm:top-5 sm:left-5 w-4 h-4 border-t-2 border-l-2 border-[#B0542C]" />
                    <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-4 h-4 border-t-2 border-r-2 border-[#B0542C]" />
                    <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-4 h-4 border-b-2 border-l-2 border-[#B0542C]" />
                    <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-4 h-4 border-b-2 border-r-2 border-[#B0542C]" />

                    {/* Inner Content - Fades up gently as the scroll unrolls */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.8 }}
                      className="relative z-10 flex flex-col items-center"
                    >
                      {/* Sanskrit Auspicious Shloka */}
                      <p className="font-serif-custom text-xs sm:text-sm tracking-[0.25em] text-[#B0542C] uppercase font-bold mb-1">
                        ॥ श्री गणेशाय नमः ॥
                      </p>
                      <p className="font-serif-custom text-[11px] sm:text-xs text-[#6D5F80] italic mb-6 max-w-md">
                        वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                      </p>

                      {/* Royal Crest Medallion */}
                      <div className="mb-6 p-1.5 rounded-full bg-white/90 border border-[#C58F64]/40 shadow-lg">
                        <img
                          src="/images/wedding_crest.png"
                          alt="Royal Wedding Crest"
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                        />
                      </div>

                      {/* Header */}
                      <h3 className="font-royal-custom text-2xl sm:text-4xl font-bold text-[#1A1222] tracking-[0.06em] mb-6">
                        शाही निमंत्रण पत्रिका
                      </h3>

                      {/* Elder Invocation */}
                      <p className="font-serif-custom text-[#4B3E5B] text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-medium">
                        With the auspicious blessings of our elders and the almighty, the families cordially request the honor of your presence and warm blessings to celebrate the wedding ceremonies of
                      </p>

                      {/* Couple Calligraphy */}
                      <div className="my-2 sm:my-4 text-center">
                        <h4 className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.08em] leading-tight">
                          <span className="text-[#5E3D7A]">ANUSHKA</span>
                          <span className="font-script-custom text-[#C58F64] text-4xl sm:text-6xl mx-2 sm:mx-3">&amp;</span>
                          <span className="text-[#B0542C]">YASH</span>
                        </h4>
                      </div>

                      {/* Two Families Split */}
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left my-8">
                        {/* Groom's Family */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#F0EBE3]/80 border border-[#E8A987]/40 shadow-2xs">
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#B0542C] mb-2 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#B0542C]" />
                            Biyani Family
                          </p>
                          <p className="font-serif-custom text-[#1A1222] text-sm sm:text-base font-bold">
                            Grandson of Madanlal Biyani &amp; Kachribai Biyani
                          </p>
                          <p className="font-serif-custom text-[#4B3E5B] text-xs sm:text-sm mt-0.5">
                            Son of Jugalkishor Biyani &amp; Meena Biyani
                          </p>
                        </div>

                        {/* Bride's Family */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#F0EBE3]/80 border border-[#B89FC8]/40 shadow-2xs">
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#5E3D7A] mb-2 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#5E3D7A]" />
                            Verma Family
                          </p>
                          <p className="font-serif-custom text-[#1A1222] text-sm sm:text-base font-bold">
                            Granddaughter of Krishan Lal Verma &amp; Shakuntala Devi
                          </p>
                          <p className="font-serif-custom text-[#4B3E5B] text-xs sm:text-sm mt-0.5">
                            Daughter of G K Verma &amp; Rajni Verma
                          </p>
                        </div>
                      </div>

                      {/* Venue & Dates Banner */}
                      <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#F0EBE3]/60 border border-[#C8BEAF]/50 text-center mb-8">
                        <div className="flex items-center justify-center gap-2 text-[#1A1222] text-sm sm:text-base font-bold mb-1">
                          <MapPin className="w-4 h-4 text-[#B0542C]" />
                          <span className="font-serif-custom">Touchwood Bliss, Igatpuri</span>
                        </div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#5E3D7A] font-bold">
                          January 31 &ndash; February 3, 2027
                        </p>
                      </div>

                      {/* Re-roll Scroll Button */}
                      <button
                        onClick={() => setIsUnfurled(false)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C8BEAF] text-[#4B3E5B] text-xs uppercase tracking-[0.18em] font-bold hover:text-[#1A1222] hover:bg-white/80 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                      >
                        <ChevronUp className="w-4 h-4 text-[#C58F64]" />
                        <span>Roll Up Invitation</span>
                      </button>
                    </motion.div>
                  </motion.div>

                  {/* Bottom Scroll Rod */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <ScrollRod isBottom />
                  </motion.div>
                </div>
              </AnimatePresence>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
