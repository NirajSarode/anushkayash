import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle2, Sparkles, Utensils, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    attendingCount: '1',
    dietary: 'Gourmet Pure Vegetarian',
    events: ['mehendi', 'sangeet', 'pheranight'],
    songRequest: '',
  });

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.events.includes(eventId);
      return {
        ...prev,
        events: exists
          ? prev.events.filter((e) => e !== eventId)
          : [...prev.events, eventId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#e11d48', '#059669', '#fef08a'],
    });
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-slate-900 border-2 border-amber-400/60 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-[0_0_60px_rgba(245,158,11,0.3)] overflow-y-auto max-h-[90vh] text-slate-100"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-amber-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Title */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-amber-400" />
                  <span>RSVP Response</span>
                </div>
                <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold gold-gradient-text">
                  Will You Join Our Celebration?
                </h3>
                <p className="font-serif-custom text-slate-300 text-sm italic">
                  Please confirm your presence by January 10, 2027.
                </p>
              </div>

              {/* Guest Information */}
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-xs uppercase font-bold text-amber-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyesh & Family"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-amber-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="priyesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-amber-300 mb-1">
                      Attending Guests *
                    </label>
                    <select
                      value={formData.attendingCount}
                      onChange={(e) => setFormData({ ...formData, attendingCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4+">4+ Persons (Family)</option>
                    </select>
                  </div>
                </div>

                {/* Dietary Preference Selection */}
                <div>
                  <label className="block text-xs uppercase font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dietary Preference</span>
                  </label>
                  <select
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Gourmet Pure Vegetarian">Gourmet Pure Vegetarian</option>
                    <option value="Jain Pure Veg (No onion/garlic)">Jain Pure Veg (No onion/garlic)</option>
                    <option value="Multi-Cuisine Grand Banquet">Multi-Cuisine Grand Banquet</option>
                    <option value="Vegan / Gluten Free">Vegan / Gluten Free Options</option>
                  </select>
                </div>

                {/* Event Attendance Checkboxes */}
                <div>
                  <label className="block text-xs uppercase font-bold text-amber-300 mb-2">
                    Events You Will Attend
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'mehendi', label: 'Mehendi & Haldi' },
                      { id: 'sangeet', label: 'Sangeet Night' },
                      { id: 'pheranight', label: 'Sunset Pheras' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleEventToggle(item.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                          formData.events.includes(item.id)
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        {formData.events.includes(item.id) ? '✓ ' : ''}
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sangeet Song Request */}
                <div>
                  <label className="block text-xs uppercase font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-rose-400" />
                    <span>Sangeet Song Request (Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your favorite party or dance track"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Royal RSVP</span>
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <h3 className="font-royal-custom text-2xl sm:text-3xl font-bold text-amber-200">
                RSVP Received With Honor!
              </h3>

              <p className="font-serif-custom text-slate-300 text-base leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{formData.guestName}</strong>! We cannot wait to welcome you to the misty mountains of Igatpuri for Anushka & Yash's wedding.
              </p>

              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg"
              >
                Close & Return To Site
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
