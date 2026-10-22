import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Send, Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  fetchBlessingsFromSheet,
  postBlessingToSheet,
  getSheetApiUrl,
  STORAGE_KEY,
  LIKES_KEY,
  sideColors,
  sideLabels,
  isDemoBlessing,
  type Blessing,
} from '../services/blessingsService';

export interface BlessingsWallProps {
  onViewAll?: () => void;
  maxDisplay?: number;
}

interface FloatingHeartParticle {
  id: string;
  x: number;
  size: number;
  color: string;
  rotation: number;
  drift: number;
  rise: number;
  delay: number;
  duration: number;
  scale: number;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const BlessingsWall: React.FC<BlessingsWallProps> = ({ onViewAll, maxDisplay = 4 }) => {
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter((b) => !isDemoBlessing(b));
        }
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [likedIds, setLikedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(LIKES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newSide, setNewSide] = useState<'bride' | 'groom' | 'mutual'>('mutual');

  const [floatingHearts, setFloatingHearts] = useState<{ [cardId: string]: FloatingHeartParticle[] }>({});
  const [centerPulseId, setCenterPulseId] = useState<string | null>(null);

  const displayedBlessings = blessings.slice(0, maxDisplay);
  const hasMore = blessings.length > maxDisplay;

  // Sync from Google Sheet in background on load
  useEffect(() => {
    const url = getSheetApiUrl();
    if (!url) return;

    let isMounted = true;
    fetchBlessingsFromSheet().then((sheetBlessings) => {
      if (!isMounted || !sheetBlessings || sheetBlessings.length === 0) return;
      const validSheet = sheetBlessings.filter((b) => !isDemoBlessing(b));
      setBlessings((prev) => {
        const existingKeys = new Set(prev.map((b) => `${b.name}-${b.message.slice(0, 30)}`));
        const newFromSheet = validSheet.filter(
          (b) => !existingKeys.has(`${b.name}-${b.message.slice(0, 30)}`)
        );
        return [...newFromSheet, ...prev].filter((b) => !isDemoBlessing(b));
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage when blessings change
  useEffect(() => {
    try {
      const clean = blessings.filter((b) => !isDemoBlessing(b));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      // Storage unavailable
    }
  }, [blessings]);

  // Save liked IDs
  useEffect(() => {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds));
    } catch {
      // Storage unavailable
    }
  }, [likedIds]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: newName.trim(),
      relation: newRelation.trim() || 'Well Wisher',
      message: newMessage.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      side: newSide,
      likes: 1,
    };

    // Optimistically prepend to list immediately
    setBlessings([newBlessing, ...blessings]);
    setLikedIds([...likedIds, newBlessing.id]);
    setNewName('');
    setNewRelation('');
    setNewMessage('');
    setNewSide('mutual');

    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#8E0E16', '#D4AF37', '#C21D27'],
      disableForReducedMotion: true,
    });

    // Send to Google Sheet in background
    if (getSheetApiUrl()) {
      postBlessingToSheet(newBlessing);
    }
  };

  const triggerHeartAnimation = (id: string, targetEl?: HTMLElement | null) => {
    // 1. Confetti heart shower from click location
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      try {
        const heart1 = confetti.shapeFromText({ text: '❤️', scalar: 2.2 });
        const heart2 = confetti.shapeFromText({ text: '💖', scalar: 2.2 });
        const sparkle = confetti.shapeFromText({ text: '✨', scalar: 1.8 });

        confetti({
          shapes: [heart1, heart2, sparkle],
          particleCount: 26,
          spread: 70,
          origin: { x, y },
          startVelocity: 24,
          gravity: 0.65,
          ticks: 130,
          scalar: 1.8,
          disableForReducedMotion: true,
        });
      } catch {
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { x, y },
          colors: ['#8E0E16', '#C21D27', '#D4AF37', '#E6BD70', '#9A6C20', '#C58F64'],
          disableForReducedMotion: true,
        });
      }
    }

    // 2. Local floating hearts erupting from the button
    const HEART_COLORS = ['#8E0E16', '#C21D27', '#D4AF37', '#E6BD70', '#9A6C20', '#F43F5E', '#D97706'];
    const newHearts: FloatingHeartParticle[] = Array.from({ length: 14 }).map((_, idx) => ({
      id: `${id}-${Date.now()}-${idx}-${Math.random()}`,
      x: (Math.random() - 0.5) * 16,
      size: Math.floor(Math.random() * 16) + 14,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      rotation: (Math.random() - 0.5) * 50,
      drift: (Math.random() - 0.5) * 80,
      rise: Math.floor(Math.random() * 70) + 75,
      delay: idx * 0.03,
      duration: 0.95 + Math.random() * 0.4,
      scale: 0.85 + Math.random() * 0.5,
    }));

    setFloatingHearts((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []).slice(-10), ...newHearts],
    }));

    // Auto cleanup after animation ends
    setTimeout(() => {
      setFloatingHearts((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }, 1800);
  };

  const handleLike = (id: string, element?: HTMLElement | null) => {
    const isLiked = likedIds.includes(id);
    if (isLiked) {
      setLikedIds(likedIds.filter((likedId) => likedId !== id));
      setBlessings(
        blessings.map((b) => (b.id === id ? { ...b, likes: Math.max((b.likes || 1) - 1, 0) } : b))
      );
    } else {
      setLikedIds([...likedIds, id]);
      setBlessings(
        blessings.map((b) => (b.id === id ? { ...b, likes: (b.likes || 0) + 1 } : b))
      );
      triggerHeartAnimation(id, element);
    }
  };

  return (
    <section id="blessings" className="section-spacing px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-serif-custom text-[#8E0E16] text-xs tracking-[0.35em] uppercase mb-4 font-bold"
          >
            Heartfelt Wishes
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-[0.05em] gradient-text-blend mb-4"
          >
            Blessings Wall
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-serif-custom text-[#342226] text-lg sm:text-xl italic max-w-md mx-auto font-medium"
          >
            Leave a heartfelt note and blessing for Anushka &amp; Yash.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#DFCAB0]/70 shadow-xl lg:col-span-1"
          >
            <h3 className="font-royal-custom text-lg font-bold text-[#2E1015] flex items-center gap-2 mb-5">
              <Heart className="w-4 h-4 text-[#8E0E16] fill-[#8E0E16]" />
              <span>Send Your Wish</span>
            </h3>

            <form onSubmit={handleAdd} className="space-y-4 text-left">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold text-[#8E0E16] uppercase tracking-[0.15em] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uncle Rajesh & Family"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#DFCAB0] text-[#2E1015] text-sm focus:outline-none focus:border-[#8E0E16] focus:ring-1 focus:ring-[#8E0E16] transition-colors"
                />
              </div>

              {/* Relation */}
              <div>
                <label className="block text-[11px] font-bold text-[#8E0E16] uppercase tracking-[0.15em] mb-1.5">
                  Relation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groom's Cousin / Bride's Friend"
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#DFCAB0] text-[#2E1015] text-sm focus:outline-none focus:border-[#8E0E16] focus:ring-1 focus:ring-[#8E0E16] transition-colors"
                />
              </div>

              {/* Side of the Family Selector */}
              <div>
                <label className="block text-[11px] font-bold text-[#8E0E16] uppercase tracking-[0.15em] mb-1.5">
                  Which side are you on?
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['bride', 'groom', 'mutual'] as const).map((side) => {
                    const isSelected = newSide === side;
                    return (
                      <button
                        key={side}
                        type="button"
                        onClick={() => setNewSide(side)}
                        className={`py-2 px-1 text-center rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white shadow-xs border-2'
                            : 'bg-[#FAF6F0] border-[#DFCAB0] text-[#6E3840] hover:bg-white/60'
                        }`}
                        style={{
                          borderColor: isSelected ? sideColors[side] : undefined,
                          color: isSelected ? sideColors[side] : undefined,
                        }}
                      >
                        {side === 'bride' ? "Bride's Side" : side === 'groom' ? "Groom's Side" : 'Both'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-bold text-[#8E0E16] uppercase tracking-[0.15em] mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Your blessings, memories and love..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#DFCAB0] text-[#2E1015] text-sm focus:outline-none focus:border-[#8E0E16] focus:ring-1 focus:ring-[#8E0E16] resize-none transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-sheen w-full py-3.5 rounded-full text-white text-xs uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #8E0E16 0%, #C21D27 50%, #D4AF37 100%)' }}
              >
                <Send className="w-4 h-4" />
                <span>Post Blessing &rarr;</span>
              </button>
            </form>
          </motion.div>

          {/* Cards Wall */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs text-[#8E0E16] font-bold tracking-wider uppercase font-serif-custom">
                {blessings.length} Heartfelt Wishes
              </span>
            </div>

            {blessings.length === 0 ? (
              <div className="card-sheen bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 text-center border border-[#D4AF37]/50 shadow-xs">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8E0E16]/10 border border-[#8E0E16]/30 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-[#8E0E16] fill-[#8E0E16]/20" />
                </div>
                <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] mb-2">
                  Be the First to Send Blessings
                </h3>
                <p className="font-serif-custom text-sm sm:text-base text-[#8E0E16] leading-relaxed max-w-md mx-auto">
                  Your heartfelt thoughts will be cherished by Anushka &amp; Yash forever. Write your warm wishes in the form to start the celebration wall!
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {displayedBlessings.map((b) => {
                      const isLiked = likedIds.includes(b.id);
                  return (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -4 }}
                      onDoubleClick={(e) => {
                        e.preventDefault();
                        if (!likedIds.includes(b.id)) {
                          handleLike(b.id, e.currentTarget);
                        } else {
                          triggerHeartAnimation(b.id, e.currentTarget);
                        }
                        setCenterPulseId(b.id);
                        setTimeout(() => setCenterPulseId(null), 850);
                      }}
                      className="card-sheen bg-[#F7F3EE] rounded-2xl p-6 text-left flex flex-col justify-between hover:shadow-xl transition-all duration-500 border border-[#C8BEAF]/50 relative select-none"
                      style={{ borderLeft: `4px solid ${sideColors[b.side]}` }}
                    >
                      {/* Big Center Heart Flash on Double Click */}
                      <AnimatePresence>
                        {centerPulseId === b.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.3 }}
                            animate={{
                              opacity: [0, 0.95, 0.95, 0],
                              scale: [0.3, 1.3, 1.15, 1.4],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                          >
                            <div className="p-4 rounded-full bg-white/70 backdrop-blur-xs shadow-2xl">
                              <Heart className="w-16 h-16 fill-[#B0542C] text-[#B0542C] drop-shadow-md" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div>
                        {/* Side Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${sideColors[b.side]}15`,
                              color: sideColors[b.side],
                            }}
                          >
                            {sideLabels[b.side]}
                          </span>

                          {/* Heart Button with Animated Hearts Explosion */}
                          <div className="relative">
                            {/* Floating Hearts Shower Container */}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none z-30 overflow-visible w-0 h-0">
                              <AnimatePresence>
                                {(floatingHearts[b.id] || []).map((p) => (
                                  <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, scale: 0.2, x: p.x, y: 0, rotate: 0 }}
                                    animate={{
                                      opacity: [0, 1, 1, 0],
                                      scale: [0.2, p.scale, p.scale * 1.15, p.scale * 0.7],
                                      x: [p.x, p.drift * 0.4, p.drift],
                                      y: [0, -p.rise * 0.5, -p.rise],
                                      rotate: [0, p.rotation * 0.5, p.rotation],
                                    }}
                                    transition={{
                                      duration: p.duration,
                                      delay: p.delay,
                                      ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="absolute"
                                    style={{
                                      marginLeft: -p.size / 2,
                                      marginTop: -p.size / 2,
                                    }}
                                  >
                                    <Heart
                                      style={{
                                        width: p.size,
                                        height: p.size,
                                        fill: p.color,
                                        color: p.color,
                                        filter: `drop-shadow(0 2px 8px ${p.color}66)`,
                                      }}
                                    />
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>

                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(b.id, e.currentTarget);
                              }}
                              className={`relative flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer shadow-2xs select-none ${
                                isLiked
                                  ? 'bg-[#B0542C]/15 border-[#B0542C]/50 text-[#B0542C] shadow-sm'
                                  : 'bg-white/85 border-[#C8BEAF]/50 text-[#6D5F80] hover:text-[#B0542C] hover:border-[#B0542C]/40'
                              }`}
                              title={isLiked ? 'Loved! Click to undo' : 'Send Love (or double-click card)'}
                            >
                              {/* Expanding ripple ring on like */}
                              <AnimatePresence>
                                {isLiked && (
                                  <motion.span
                                    key={`ripple-${b.id}`}
                                    initial={{ scale: 0.8, opacity: 0.8 }}
                                    animate={{ scale: 2.2, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="absolute inset-0 rounded-full border-2 border-[#B0542C] pointer-events-none"
                                  />
                                )}
                              </AnimatePresence>

                              <motion.span
                                animate={isLiked ? { scale: [1, 1.45, 0.9, 1.15, 1] } : { scale: 1 }}
                                transition={{ duration: 0.45 }}
                                className="inline-flex items-center justify-center"
                              >
                                <Heart
                                  className={`w-3.5 h-3.5 transition-colors ${
                                    isLiked ? 'fill-[#B0542C] text-[#B0542C]' : 'text-[#6D5F80]'
                                  }`}
                                />
                              </motion.span>
                              <span className="font-bold">{b.likes || 0}</span>
                            </motion.button>
                          </div>
                        </div>

                        {/* Message */}
                        <p className="font-serif-custom text-[#2B2136] text-base sm:text-lg italic leading-relaxed font-normal mb-4">
                          &ldquo;{b.message}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3.5 border-t border-[#C8BEAF]/40 flex items-center justify-between text-xs">
                        <div>
                          <span className="block font-royal-custom font-bold text-[#1A1222] text-sm">
                            {b.name}
                          </span>
                          <span className="block text-[10px] text-[#8E0E16] font-medium tracking-wide">
                            {b.relation}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#9A6C20] font-semibold">{b.date}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* If there are more, link it to a new page */}
            {hasMore && (
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onViewAll}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FFFDF9] border-2 border-[#D4AF37]/60 hover:border-[#8E0E16] text-sm font-bold text-[#8E0E16] hover:text-[#1A1222] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <Heart className="w-4 h-4 fill-[#8E0E16] text-[#8E0E16] group-hover:scale-110 transition-transform" />
                  <span>View All {blessings.length} Wishes on Blessings Wall</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <p className="text-xs text-[#8E0E16] font-medium mt-2">
                  Showing {displayedBlessings.length} of {blessings.length} wishes
                </p>
              </div>
            )}

            {!hasMore && onViewAll && blessings.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={onViewAll}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E0E16] hover:text-[#9A6C20] transition-colors cursor-pointer"
                >
                  <span>Open Dedicated Blessings Wall Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </>
        )}
          </div>
        </div>
      </div>

    </section>
  );
};
export default BlessingsWall;
