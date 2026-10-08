import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle2, Utensils, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '', email: '', attendingCount: '1',
    dietary: 'Gourmet Pure Vegetarian',
    events: ['mehendi', 'sangeet', 'pheras'],
    songRequest: '',
  });

  const handleEventToggle = (id: string) => {
    setFormData((p) => ({
      ...p,
      events: p.events.includes(id) ? p.events.filter((e) => e !== id) : [...p.events, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#5E3D7A', '#B0542C', '#C58F64'] });
  };

  const resetAndClose = () => { setSubmitted(false); onClose(); };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-[#F0EBE3] border border-[#C8BEAF] text-[#1A1222] text-sm focus:outline-none focus:border-[#5E3D7A] focus:ring-1 focus:ring-[#5E3D7A] transition-colors";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1222]/35 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#F7F3EE] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] text-[#1A1222] border border-[#C8BEAF]"
        >
          <button onClick={resetAndClose} className="absolute top-4 right-4 p-2 rounded-full text-[#5E3D7A] hover:text-[#1A1222] hover:bg-black/5 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold gradient-text-blend mb-1">Will You Join Us?</h3>
                <p className="font-serif-custom text-[#5E3D7A] text-sm italic font-semibold">Please confirm by January 10, 2027.</p>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#5E3D7A] mb-1.5 tracking-[0.15em]">Full Name *</label>
                  <input type="text" required placeholder="e.g. Priyesh & Family" value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#5E3D7A] mb-1.5 tracking-[0.15em]">Email *</label>
                    <input type="email" required placeholder="email@example.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-[#5E3D7A] mb-1.5 tracking-[0.15em]">Guests</label>
                    <select value={formData.attendingCount} onChange={(e) => setFormData({ ...formData, attendingCount: e.target.value })} className={inputClass}>
                      <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#5E3D7A] mb-1.5 tracking-[0.15em] flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#B0542C]" />Dietary Preference
                  </label>
                  <select value={formData.dietary} onChange={(e) => setFormData({ ...formData, dietary: e.target.value })} className={inputClass}>
                    <option>Gourmet Pure Vegetarian</option><option>Jain (No onion/garlic)</option><option>Multi-Cuisine</option><option>Vegan / Gluten Free</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#5E3D7A] mb-2 tracking-[0.15em]">Events Attending</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'mehendi', label: 'Mehendi & Haldi', color: '#B0542C' },
                      { id: 'sangeet', label: 'Sangeet Night', color: '#5E3D7A' },
                      { id: 'pheras', label: 'Sunset Pheras', color: '#C58F64' },
                    ].map((ev) => (
                      <button key={ev.id} type="button" onClick={() => handleEventToggle(ev.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                          formData.events.includes(ev.id) ? 'bg-white shadow-md' : 'bg-[#F0EBE3] text-[#4B3E5B]/60'
                        }`}
                        style={formData.events.includes(ev.id) ? { border: `2px solid ${ev.color}`, color: ev.color } : { border: '1px solid #C8BEAF' }}>
                        {ev.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#5E3D7A] mb-1.5 tracking-[0.15em] flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-[#5E3D7A]" />Song Request
                  </label>
                  <input type="text" placeholder="Your favorite dance or celebration track" value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })} className={inputClass} />
                </div>
              </div>

              <button type="submit"
                className="w-full py-4 rounded-full text-white text-xs uppercase tracking-[0.2em] font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}>
                <Heart className="w-4 h-4 fill-white" />Confirm RSVP
              </button>
            </form>
          ) : (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#5E3D7A]/10 border-2 border-[#5E3D7A] flex items-center justify-center mx-auto text-[#5E3D7A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold gradient-text-blend">RSVP Received!</h3>
              <p className="font-serif-custom text-[#2B2136] max-w-sm mx-auto text-base">
                Thank you, <strong>{formData.guestName}</strong>! We cannot wait to celebrate with you in Igatpuri.
              </p>
              <button onClick={resetAndClose}
                className="px-8 py-3 rounded-full text-white text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-xl transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #6B4984, #B05B43, #A85630)' }}>
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
