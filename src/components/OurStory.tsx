import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Heart, Coffee, Mountain, Sparkles, ArrowLeft } from 'lucide-react';

interface Milestone {
  id: number;
  date: string;
  title: string;
  location: string;
  narrative: string;
  icon: React.ReactNode;
  tag: string;
  image: string;
  accent: string;
}

interface OurStoryProps {
  onBackToHome?: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const OurStory: React.FC<OurStoryProps> = ({ onBackToHome }) => {
  const milestones: Milestone[] = [
    {
      id: 1, date: 'October 2022', title: 'The First Meeting', location: 'Delhi',
      narrative: 'What started as a casual introduction through mutual friends turned into hours of effortless conversation about travel, food, and mountains. Two different states, perfectly aligned on the same wavelength.',
      icon: <Coffee className="w-5 h-5" />, tag: 'The Spark', image: '/images/delhi_side.webp', accent: '#5E3D7A',
    },
    {
      id: 2, date: 'December 2023', title: 'Growing Closer', location: 'Delhi & Maharashtra',
      narrative: 'From the historic lanes of Old Delhi to the Western Ghats &mdash; every trip brought them closer. Yash introduced Anushka to his world in the Sahyadris, while she brought the vibrant warmth of Delhi into his life.',
      icon: <Mountain className="w-5 h-5" />, tag: 'The Adventure', image: '/images/couple_hero.webp', accent: '#B0542C',
    },
    {
      id: 3, date: 'February 2025', title: 'Sunset Proposal', location: 'Igatpuri, Maharashtra',
      narrative: 'Overlooking the misty valleys of Igatpuri at golden hour, Yash dropped to one knee. The mountain breeze carried Anushka\'s joyful "YES!" &mdash; two states sealed into one forever.',
      icon: <Sparkles className="w-5 h-5" />, tag: 'The Proposal', image: '/images/maharashtra_side.webp', accent: '#C58F64',
    },
    {
      id: 4, date: 'November 2026', title: 'The Union & Forever', location: 'Delhi & Maharashtra',
      narrative: 'The Vermas from Delhi and the Biyanis from Maharashtra came together to celebrate this blessed bond and plan the royal mountain destination wedding in Igatpuri.',
      icon: <Heart className="w-5 h-5" />, tag: 'The Union', image: '/images/couple_animated.webp', accent: '#7C6090',
    },
  ];

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
      {/* Ambient blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#7C6090]/[0.08] blur-[120px]" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-[#B0542C]/[0.08] blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {onBackToHome && (
          <div className="mb-12">
            <button onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#5E3D7A] hover:text-[#1A1222] transition-colors cursor-pointer px-4 py-2 rounded-full bg-[#F7F3EE] border border-[#C8BEAF]">
              <ArrowLeft className="w-4 h-4" />Back to Home
            </button>
          </div>
        )}

        <div className="text-center mb-24">
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-4 font-bold">
            Our Journey
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
            Two States, One Love Story
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#2B2136] text-lg sm:text-xl italic max-w-lg mx-auto font-medium">
            From the heart of Delhi to the tranquil hills of Maharashtra.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-1 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #7C6090, #C58F64, #B0542C)' }} />

          <div className="space-y-20 sm:space-y-32">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div key={item.id}
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center ${isEven ? 'sm:flex-row-reverse' : ''}`}>

                  {/* Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20">
                    <div className="w-12 h-12 rounded-full bg-[#F7F3EE] border-2 shadow-lg flex items-center justify-center"
                      style={{ borderColor: item.accent, color: item.accent }}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${isEven ? 'sm:pr-16' : 'sm:pl-16'}`}>
                    <div className="bg-[#F7F3EE] rounded-3xl p-6 sm:p-8 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-[#C8BEAF]/60">
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: item.accent }} />

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full bg-white/80 shadow-sm" style={{ color: item.accent }}>{item.tag}</span>
                        <span className="text-xs font-mono text-[#5E3D7A] font-bold tracking-wider">{item.date}</span>
                      </div>

                      <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] mb-1 group-hover:text-[#5E3D7A] transition-colors tracking-[0.02em]">
                        {item.title}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#B0542C] font-bold mb-4">{item.location}</p>
                      <p className="font-serif-custom text-[#2B2136] text-base sm:text-lg leading-relaxed mb-5 font-normal">
                        {item.narrative}
                      </p>

                      {/* Image with film treatment */}
                      <div className="rounded-2xl overflow-hidden h-44 relative shadow-md">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover img-film img-kenburns" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE]/40 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
