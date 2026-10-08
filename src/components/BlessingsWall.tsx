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
  bride: '#5E3D7A',
  groom: '#B0542C',
  mutual: '#C58F64',
};

export const BlessingsWall: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>([
    { id: '1', name: 'Harpreet & Jaswinder Verma', relation: 'Parents of the Bride (Delhi)', message: 'May the mountain breezes bless your sacred union with endless warmth, happiness, and laughter. Our dearest Anushka, you have found a wonderful partner in Yash!', date: 'Jan 14, 2027', side: 'bride' },
    { id: '2', name: 'Rameshwar & Sunita Biyani', relation: 'Parents of the Groom (Maharashtra)', message: 'Warmest blessings to Yash & Anushka. Wishing you both a lifetime of mountain adventures and joy as you step into this beautiful chapter!', date: 'Jan 15, 2027', side: 'groom' },
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
            className="font-serif-custom text-[#5E3D7A] text-xs tracking-[0.35em] uppercase mb-4 font-bold">
            Heartfelt Wishes
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4">
            Blessings Wall
          </motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="font-serif-custom text-[#2B2136] text-lg sm:text-xl italic max-w-md mx-auto font-medium">
            Leave a heartfelt note and blessing for Anushka & Yash.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="bg-[#F7F3EE] rounded-3xl p-6 sm:p-8 border border-[#C8BEAF]/60 shadow-xl lg:col-span-1">
            <h3 className="font-royal-custom text-lg font-bold text-[#1A1222] flex items-center gap-2 mb-5">
              <Heart className="w-4 h-4 text-[#B0542C] fill-[#B0542C]" />Send Your Wish
            </h3>
            <form onSubmit={handleAdd} className="space-y-4 text-left">
              {[
                { label: 'Your Name *', value: newName, set: setNewName, placeholder: 'e.g. Uncle Rajesh & Family', required: true },
                { label: 'Relation', value: newRelation, set: setNewRelation, placeholder: 'e.g. Groom\'s Cousin / Bride\'s Friend' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[11px] font-bold text-[#5E3D7A] uppercase tracking-[0.15em] mb-1.5">{f.label}</label>
                  <input type="text" required={f.required} placeholder={f.placeholder} value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F0EBE3] border border-[#C8BEAF] text-[#1A1222] text-sm focus:outline-none focus:border-[#5E3D7A] focus:ring-1 focus:ring-[#5E3D7A] transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-bold text-[#5E3D7A] uppercase tracking-[0.15em] mb-1.5">Message *</label>
                <textarea required rows={3} placeholder="Your blessings and love..." value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F0EBE3] border border-[#C8BEAF] text-[#1A1222] text-sm focus:outline-none focus:border-[#5E3D7A] focus:ring-1 focus:ring-[#5E3D7A] resize-none transition-colors" />
              </div>
              <button type="submit"
                className="w-full py-3.5 rounded-full text-white text-xs uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}>
                <Send className="w-4 h-4" />Post Blessing &rarr;
              </button>
            </form>
          </motion.div>

          {/* Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {blessings.map((b) => (
                <motion.div key={b.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-[#F7F3EE] rounded-2xl p-6 text-left flex flex-col justify-between hover:shadow-xl transition-all duration-500 border border-[#C8BEAF]/50"
                  style={{ borderLeft: `4px solid ${sideColors[b.side]}` }}>
                  <p className="font-serif-custom text-[#2B2136] text-base sm:text-lg italic leading-relaxed font-normal">
                    "{b.message}"
                  </p>
                  <div className="mt-5 pt-3.5 border-t border-[#C8BEAF]/40 flex items-center justify-between text-xs">
                    <div>
                      <span className="block font-royal-custom font-bold text-[#1A1222] text-sm">{b.name}</span>
                      <span className="block text-[10px] text-[#5E3D7A] font-medium tracking-wide">{b.relation}</span>
                    </div>
                    <span className="text-[10px] text-[#B0542C] font-semibold">{b.date}</span>
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
