import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Send, Heart } from 'lucide-react';

interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
  side: 'bride' | 'groom' | 'mutual';
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const sideColors = {
  bride: '#B89FC8',
  groom: '#E8A987',
  mutual: '#C9917E',
};

export const BlessingsWall: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>([
    { id: '1', name: 'Harpreet & Jaswinder Verma', relation: 'Parents of the Bride', message: 'May the mountain breezes bless your sacred union with endless warmth, happiness, and laughter. Our dearest Anushka, you have found a wonderful partner in Yash!', date: 'Jan 14, 2027', side: 'bride' },
    { id: '2', name: 'Rameshwar & Sunita Biyani', relation: 'Parents of the Groom', message: 'Warmest blessings to Yash & Anushka. Wishing you both a lifetime of mountain adventures and joy as you step into this beautiful chapter!', date: 'Jan 15, 2027', side: 'groom' },
    { id: '3', name: 'Rohan, Simran & Friends', relation: 'College Friends', message: 'From two different states to one beautiful love story — watching your journey has been pure joy! Can\'t wait to dance at the Sangeet!', date: 'Jan 17, 2027', side: 'mutual' },
  ]);

  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;
    setBlessings([{ id: Date.now().toString(), name: newName.trim(), relation: newRelation.trim() || 'Well Wisher', message: newMessage.trim(), date: 'Just now', side: 'mutual' }, ...blessings]);
    setNewName(''); setNewRelation(''); setNewMessage('');
  };

  return (
    <section id="blessings" className="section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#B5ADBF] text-xs tracking-[0.3em] uppercase mb-4">
            Wishes
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
            Blessings Wall
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#8A7F99] text-lg italic max-w-md mx-auto">
            Leave a heartfelt note for Anushka & Yash.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-[#F7F3EE] rounded-2xl p-6 border border-[#D6CCBF] lg:col-span-1">
            <h3 className="font-royal-custom text-lg font-bold text-[#2E2438] flex items-center gap-2 mb-5">
              <Heart className="w-4 h-4 text-[#C9917E] fill-[#C9917E]" />Send Your Wish
            </h3>
            <form onSubmit={handleAdd} className="space-y-4 text-left">
              {[
                { label: 'Your Name *', value: newName, set: setNewName, placeholder: 'e.g. Uncle Rajesh & Family', required: true },
                { label: 'Relation', value: newRelation, set: setNewRelation, placeholder: 'e.g. Groom\'s Cousin' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-bold text-[#6B5280] uppercase tracking-[0.15em] mb-1">{f.label}</label>
                  <input type="text" required={f.required} placeholder={f.placeholder} value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F0EBE3] border border-[#D6CCBF] text-[#2E2438] text-sm focus:outline-none focus:border-[#B89FC8] transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold text-[#6B5280] uppercase tracking-[0.15em] mb-1">Message *</label>
                <textarea required rows={3} placeholder="Your blessings..." value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F0EBE3] border border-[#D6CCBF] text-[#2E2438] text-sm focus:outline-none focus:border-[#B89FC8] resize-none transition-colors" />
              </div>
              <button type="submit"
                className="w-full py-3 rounded-xl text-white text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 shadow-md"
                style={{ background: 'linear-gradient(135deg, #B89FC8, #C9917E, #E8A987)' }}>
                <Send className="w-4 h-4" />Post Blessing
              </button>
            </form>
          </motion.div>

          {/* Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {blessings.map((b) => (
                <motion.div key={b.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-[#F7F3EE] rounded-xl p-5 text-left flex flex-col justify-between hover:shadow-lg transition-shadow duration-500"
                  style={{ borderLeft: `3px solid ${sideColors[b.side]}` }}>
                  <p className="font-serif-custom text-[#4A3F58] text-base italic leading-relaxed">
                    "{b.message}"
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#E6DED3] flex items-center justify-between text-xs">
                    <div>
                      <span className="block font-royal-custom font-bold text-[#2E2438] text-sm">{b.name}</span>
                      <span className="block text-[10px] text-[#8A7F99]">{b.relation}</span>
                    </div>
                    <span className="text-[10px] text-[#B5ADBF]">{b.date}</span>
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
