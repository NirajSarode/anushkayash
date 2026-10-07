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
      narrative: 'What started as a casual introduction through mutual friends turned into hours of conversation about travel, food, and mountains. Two different states, same wavelength.',
      icon: <Coffee className="w-5 h-5" />, tag: 'The Spark', image: '/images/delhi_side.png', accent: '#B89FC8',
    },
    {
      id: 2, date: 'December 2023', title: 'Growing Closer', location: 'Delhi & Maharashtra',
      narrative: 'From the lanes of Old Delhi to the Western Ghats — every trip brought them closer. Yash showed Anushka his world in the mountains, she brought the energy of her city into his life.',
      icon: <Mountain className="w-5 h-5" />, tag: 'The Adventure', image: '/images/couple_hero.png', accent: '#C9917E',
    },
    {
      id: 3, date: 'February 2025', title: 'Sunset Proposal', location: 'Igatpuri, Maharashtra',
      narrative: 'Overlooking the misty valleys of Igatpuri at golden hour, Yash dropped to one knee. The mountain breeze carried Anushka\'s emotional "YES!" — two states became one story.',
      icon: <Sparkles className="w-5 h-5" />, tag: 'The Proposal', image: '/images/maharashtra_side.png', accent: '#E8A987',
    },
    {
      id: 4, date: 'November 2026', title: 'The Engagement & Forever', location: 'Delhi & Maharashtra',
      narrative: 'The Vermas from Delhi and the Biyanis from Maharashtra came together to bless this union and plan the mountain destination wedding in Igatpuri.',
      icon: <Heart className="w-5 h-5" />, tag: 'The Union', image: '/images/couple_animated.png', accent: '#C9917E',
    },
  ];

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden">
      {/* Ambient blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#B89FC8]/[0.05] blur-[120px]" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-[#E8A987]/[0.05] blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {onBackToHome && (
          <div className="mb-12">
            <button onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#B5ADBF] hover:text-[#2E2438] transition-colors">
              <ArrowLeft className="w-4 h-4" />Back
            </button>
          </div>
        )}

        <div className="text-center mb-24">
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#B5ADBF] text-xs tracking-[0.3em] uppercase mb-4">
            Our Journey
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
            Two States, One Love Story
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#8A7F99] text-lg italic max-w-lg mx-auto">
            From the heart of Delhi to the hills of Maharashtra.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-px"
            style={{ background: 'linear-gradient(to bottom, #B89FC8, #C9917E, #E8A987)' }} />

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
                    <div className="w-10 h-10 rounded-full bg-[#F7F3EE] border-2 shadow-md flex items-center justify-center"
                      style={{ borderColor: item.accent, color: item.accent }}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${isEven ? 'sm:pr-16' : 'sm:pl-16'}`}>
                    <div className="bg-[#F7F3EE] rounded-2xl p-6 sm:p-8 group hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-50" style={{ background: item.accent }} />

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: item.accent }}>{item.tag}</span>
                        <span className="text-[10px] font-mono text-[#B5ADBF] tracking-wider">{item.date}</span>
                      </div>

                      <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#2E2438] mb-1 group-hover:text-[#6B5280] transition-colors tracking-[0.02em]">
                        {item.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7F99] font-semibold mb-4">{item.location}</p>
                      <p className="font-serif-custom text-[#4A3F58] text-base sm:text-lg leading-relaxed mb-5">
                        {item.narrative}
                      </p>

                      {/* Image with film treatment */}
                      <div className="rounded-xl overflow-hidden h-40 relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover img-film img-kenburns" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EE]/50 via-transparent to-transparent" />
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
