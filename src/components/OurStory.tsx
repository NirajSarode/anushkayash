import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Mountain, Sparkles } from 'lucide-react';

interface Milestone {
  id: number;
  year: string;
  date: string;
  title: string;
  location: string;
  narrative: string;
  icon: React.ReactNode;
  tag: string;
  image: string;
}

export const OurStory: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: 1,
      year: '2022',
      date: 'October 14, 2022',
      title: 'First Coffee & Filter Kaapi in Indiranagar',
      location: 'Bengaluru, Karnataka',
      narrative:
        'What started as a quick Sunday coffee in Indiranagar turned into a 5-hour conversation about technology, mountain treks, artisanal coffee, and a shared love for exploring misty hill stations.',
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      tag: 'The Spark',
      image: '/images/hero_mountain.png',
    },
    {
      id: 2,
      year: '2023',
      date: 'December 24, 2023',
      title: 'Weekend Mountain Treks in Western Ghats',
      location: 'Coorg & Nandi Hills, Karnataka',
      narrative:
        'From sunrise views at Nandi Hills to foggy coffee estate treks in Coorg, Yash handed Anushka his windcheater while Anushka shared hot flasks of ginger tea. They knew they had found their lifelong travel partner.',
      icon: <Mountain className="w-5 h-5 text-emerald-400" />,
      tag: 'The Adventure',
      image: '/images/pheras.png',
    },
    {
      id: 3,
      year: '2025',
      date: 'February 14, 2025',
      title: 'Sunset Mountain Peak Proposal in Igatpuri',
      location: 'Bhavali Dam Peak, Igatpuri',
      narrative:
        'Overlooking the serene misty waters and green valleys of Igatpuri at golden hour, Yash dropped to one knee with a ring. The mountain breeze echoed Anushka’s emotional "YES!"',
      icon: <Sparkles className="w-5 h-5 text-rose-400" />,
      tag: 'The Proposal',
      image: '/images/sangeet.png',
    },
    {
      id: 4,
      year: '2026',
      date: 'November 18, 2026',
      title: 'Family Engagement & Ring Ceremony',
      location: 'Bengaluru, Karnataka',
      narrative:
        'Surrounded by close family and lifelong friends in Bengaluru, two wonderful families united to celebrate their upcoming mountain destination wedding in Igatpuri.',
      icon: <Heart className="w-5 h-5 text-amber-300" />,
      tag: 'The Union',
      image: '/images/mehendi.png',
    },
  ];

  return (
    <section id="story" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-rose-600/30 blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-amber-600/30 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/30 text-amber-300 text-xs tracking-widest uppercase font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-tight gold-gradient-text"
          >
            How Two Souls Met in Bengaluru
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif-custom text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto italic"
          >
            From the garden city of Bengaluru to the misty mountain peaks of Igatpuri—our love story written in coffee chats and mountain views.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Central Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-amber-500/80 via-rose-500/80 to-emerald-500/80 rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-16 sm:space-y-24">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 18,
                    delay: 0.1,
                  }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      className="w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center"
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Card Content Block */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-amber-400/20 group relative overflow-hidden">
                      {/* Subtle Top Glow Accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 opacity-60" />

                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/60 border border-rose-500/30 text-rose-300">
                          {item.tag}
                        </span>
                        <span className="text-xs font-mono text-amber-300 font-semibold tracking-wider">
                          {item.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>

                      {/* Location */}
                      <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                        📍 {item.location}
                      </div>

                      {/* Narrative */}
                      <p className="font-serif-custom text-slate-300 text-base sm:text-lg leading-relaxed">
                        "{item.narrative}"
                      </p>

                      {/* Thumbnail Photo Card */}
                      <div className="mt-5 rounded-2xl overflow-hidden h-40 w-full relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer Column for Alignment */}
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
