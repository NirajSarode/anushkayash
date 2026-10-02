import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareHeart, Send, Heart } from 'lucide-react';

interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export const BlessingsWall: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>([
    {
      id: '1',
      name: 'Harpreet & Jaswinder Kapoor',
      relation: 'Parents of the Bride',
      message:
        'May the mountain breezes bless your sacred union with endless warmth, happiness, and laughter. Our dearest Anushka, you have found a wonderful life partner in Yash!',
      date: 'Jan 14, 2027',
    },
    {
      id: '2',
      name: 'Rameshwar & Sunita Maheshwari',
      relation: 'Parents of the Groom',
      message:
        'Warmest blessings to our children Yash & Anushka. Wishing you both a lifetime of mountain adventures and joy as you step into this new chapter!',
      date: 'Jan 15, 2027',
    },
    {
      id: '3',
      name: 'Rohan, Simran & Bengaluru Trekkers',
      relation: 'College Buddies & Trekkers',
      message:
        'From weekend filter coffee in Indiranagar to mountain peaks in Igatpuri, watching your love story bloom has been pure joy! See you on the Sangeet dance floor!',
      date: 'Jan 17, 2027',
    },
  ]);

  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleAddBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    const newEntry: Blessing = {
      id: Date.now().toString(),
      name: newName.trim(),
      relation: newRelation.trim() || 'Well Wisher',
      message: newMessage.trim(),
      date: 'Just now',
    };

    setBlessings([newEntry, ...blessings]);
    setNewName('');
    setNewRelation('');
    setNewMessage('');
  };

  return (
    <section id="blessings" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/30 text-rose-300 text-xs tracking-widest uppercase font-semibold"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-400" />
            <span>Digital Wishes Wall</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-tight gold-gradient-text"
          >
            Blessings & Warm Wishes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif-custom text-slate-300 text-lg sm:text-xl italic max-w-xl mx-auto"
          >
            Leave a heartfelt note or message for Anushka & Yash to cherish forever.
          </motion.p>
        </div>

        {/* Input Form & Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Submit Blessing Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 border border-amber-500/30 lg:col-span-1 space-y-4"
          >
            <h3 className="font-royal-custom text-xl font-bold text-amber-200 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-500" />
              <span>Send Your Wish</span>
            </h3>

            <form onSubmit={handleAddBlessing} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uncle Rajesh & Aunty Meena"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Relation / Connection
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groom's Cousin / Bride's School Friend"
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Warm Wish / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your blessings for Anushka & Yash..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Post Blessing</span>
              </button>
            </form>
          </motion.div>

          {/* Wall Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {blessings.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 border border-amber-500/20 text-left flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <p className="font-serif-custom text-slate-200 text-base italic leading-relaxed">
                      "{b.message}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="block font-royal-custom font-bold text-amber-300">
                        {b.name}
                      </span>
                      <span className="block font-sans-custom text-[11px] text-rose-300/80">
                        {b.relation}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{b.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
