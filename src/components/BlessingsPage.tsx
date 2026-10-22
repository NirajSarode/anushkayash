import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Send,
  Search,
  Sparkles,
  Plus,
  X,
  MessageSquareHeart,
  Check,
  TrendingUp,
  Clock,
} from 'lucide-react';
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

interface BlessingsPageProps {
  onBackToHome: () => void;
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

export const BlessingsPage: React.FC<BlessingsPageProps> = ({ onBackToHome }) => {
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
      // ignore
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

  // Filter & Search states
  const [selectedSide, setSelectedSide] = useState<'all' | 'bride' | 'groom' | 'mutual'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'likes'>('newest');
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newSide, setNewSide] = useState<'bride' | 'groom' | 'mutual'>('mutual');
  const [submittedToast, setSubmittedToast] = useState(false);

  // Animation states
  const [floatingHearts, setFloatingHearts] = useState<{ [cardId: string]: FloatingHeartParticle[] }>({});
  const [centerPulseId, setCenterPulseId] = useState<string | null>(null);

  // Sync from Google Sheet on load
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

  // Save to localStorage
  useEffect(() => {
    try {
      const clean = blessings.filter((b) => !isDemoBlessing(b));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      // ignore
    }
  }, [blessings]);

  useEffect(() => {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(likedIds));
    } catch {
      // ignore
    }
  }, [likedIds]);

  // Hearts Burst Animation
  const triggerHeartAnimation = (id: string, targetEl?: HTMLElement | null) => {
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

  const handleAddBlessing = (e: React.FormEvent) => {
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

    setBlessings([newBlessing, ...blessings]);
    setLikedIds([...likedIds, newBlessing.id]);
    setNewName('');
    setNewRelation('');
    setNewMessage('');
    setNewSide('mutual');
    setIsWriteOpen(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);

    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#8E0E16', '#D4AF37', '#C21D27'],
      disableForReducedMotion: true,
    });

    if (getSheetApiUrl()) {
      postBlessingToSheet(newBlessing);
    }
  };

  // Filtered and sorted list
  const filteredBlessings = useMemo(() => {
    return blessings
      .filter((b) => {
        if (selectedSide !== 'all' && b.side !== selectedSide) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = b.name.toLowerCase().includes(q);
          const matchMsg = b.message.toLowerCase().includes(q);
          const matchRel = b.relation.toLowerCase().includes(q);
          if (!matchName && !matchMsg && !matchRel) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') {
          return (b.likes || 0) - (a.likes || 0);
        }
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      });
  }, [blessings, selectedSide, searchQuery, sortBy]);

  const totalLikes = useMemo(
    () => blessings.reduce((sum, b) => sum + (b.likes || 0), 0),
    [blessings]
  );

  return (
    <div className="min-h-screen bg-[#F0EBE3] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-[#7C6090]/[0.08] blur-[120px]" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-[#B0542C]/[0.08] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#8E0E16] hover:text-[#1A1222] transition-colors cursor-pointer px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Celebration</span>
          </button>

          <button
            onClick={() => setIsWriteOpen(!isWriteOpen)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-bold text-white px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-linear-to-r from-[#8E0E16] to-[#C21D27] border border-[#D4AF37]/40"
          >
            {isWriteOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isWriteOpen ? 'Close Form' : 'Write Blessing'}</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#D4AF37]/50 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-royal-custom text-[11px] uppercase tracking-[0.25em] font-bold text-[#8E0E16]">
              Royal Guestbook Gallery
            </span>
          </div>

          <h1 className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1222] mb-3">
            Blessings &amp; Heartfelt Wishes
          </h1>
          <p className="font-serif-custom text-base sm:text-lg text-[#5A4F44] max-w-2xl mx-auto leading-relaxed">
            Every prayer, loving memory, and celebration wish for Anushka &amp; Yash. Double-click any wish to shower it with hearts!
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <div className="px-4 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/40 text-xs font-semibold text-[#8E0E16] shadow-2xs">
              <span className="font-bold text-[#1A1222]">{blessings.length}</span> Wishes Shared
            </div>
            <div className="px-4 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/40 text-xs font-semibold text-[#9A6C20] shadow-2xs flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#8E0E16] text-[#8E0E16]" />
              <span>
                <strong className="text-[#1A1222]">{totalLikes}</strong> Hearts Given
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Write Blessing Card */}
        <AnimatePresence>
          {isWriteOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.96 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mb-10 overflow-hidden"
            >
              <div className="card-sheen bg-[#F7F3EE] rounded-3xl p-6 sm:p-8 border border-[#C58F64]/40 shadow-xl max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquareHeart className="w-5 h-5 text-[#B0542C]" />
                    <h3 className="font-royal-custom text-lg sm:text-xl font-bold text-[#1A1222]">
                      Leave Your Heartfelt Blessing
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsWriteOpen(false)}
                    className="p-1 rounded-full text-[#6D5F80] hover:text-[#1A1222] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddBlessing} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#8E0E16] mb-1 font-serif-custom">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Jaswinder & Priya"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white/90 text-sm text-[#1A1222] focus:outline-none focus:border-[#8E0E16] focus:ring-1 focus:ring-[#8E0E16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#8E0E16] mb-1 font-serif-custom">
                        Your Relation
                      </label>
                      <input
                        type="text"
                        value={newRelation}
                        onChange={(e) => setNewRelation(e.target.value)}
                        placeholder="e.g. College Friend, Cousin"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white/90 text-sm text-[#1A1222] focus:outline-none focus:border-[#8E0E16] focus:ring-1 focus:ring-[#8E0E16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8E0E16] mb-1 font-serif-custom">
                      Which Side?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['bride', 'groom', 'mutual'] as const).map((side) => (
                        <button
                          key={side}
                          type="button"
                          onClick={() => setNewSide(side)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                            newSide === side
                              ? 'bg-white shadow-xs'
                              : 'bg-white/50 border-transparent text-[#6D5F80] hover:bg-white/80'
                          }`}
                          style={{
                            borderColor: newSide === side ? sideColors[side] : undefined,
                            color: newSide === side ? sideColors[side] : undefined,
                          }}
                        >
                          {side === 'bride' ? "Bride's Side" : side === 'groom' ? "Groom's Side" : 'Mutual / Friends'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8E0E16] mb-1 font-serif-custom">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Write your prayers, wishes, or memories for Anushka & Yash..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white/90 text-sm text-[#1A1222] focus:outline-none focus:border-[#8E0E16] focus:ring-1 focus:ring-[#8E0E16] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-white text-xs uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer bg-linear-to-r from-[#8E0E16] to-[#C21D27] border border-[#D4AF37]/40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Blessing on Wall</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter & Search Bar */}
        <div className="card-sheen bg-[#F7F3EE] rounded-2xl p-4 sm:p-5 border border-[#C8BEAF]/50 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Side Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {(
              [
                { id: 'all', label: 'All Wishes' },
                { id: 'bride', label: "Bride's Side" },
                { id: 'groom', label: "Groom's Side" },
                { id: 'mutual', label: 'Friends & Mutual' },
              ] as const
            ).map((tab) => {
              const isSelected = selectedSide === tab.id;
              const count =
                tab.id === 'all'
                  ? blessings.length
                  : blessings.filter((b) => b.side === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSide(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8E0E16] text-white shadow-xs'
                      : 'bg-white/80 text-[#8E0E16] hover:bg-white border border-[#D4AF37]/40'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-1.5 text-[10px] ${isSelected ? 'opacity-70' : 'text-[#9A6C20]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-[#9A6C20] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wishes..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/40 text-xs text-[#1A1222] focus:outline-none focus:border-[#8E0E16]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A6C20] hover:text-[#1A1222] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center bg-white/90 border border-[#D4AF37]/40 rounded-full p-0.5">
              <button
                onClick={() => setSortBy('newest')}
                className={`p-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  sortBy === 'newest' ? 'bg-[#8E0E16] text-white' : 'text-[#7A6C58] hover:text-[#1A1222]'
                }`}
                title="Sort by Newest"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSortBy('likes')}
                className={`p-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  sortBy === 'likes' ? 'bg-[#D4AF37] text-white' : 'text-[#7A6C58] hover:text-[#1A1222]'
                }`}
                title="Sort by Most Loved"
              >
                <TrendingUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredBlessings.length === 0 ? (
          <div className="card-sheen bg-[#FFFDF9] rounded-3xl p-10 sm:p-14 text-center border border-[#D4AF37]/40 shadow-xs max-w-xl mx-auto my-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#8E0E16]/10 border border-[#8E0E16]/30 flex items-center justify-center">
              <Heart className="w-8 h-8 text-[#8E0E16] fill-[#8E0E16]/20" />
            </div>
            <h3 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] mb-2">
              {blessings.length === 0
                ? 'Be the First to Send Blessings'
                : 'No Matching Blessings Found'}
            </h3>
            <p className="font-serif-custom text-sm sm:text-base text-[#8E0E16] leading-relaxed max-w-md mx-auto mb-6">
              {blessings.length === 0
                ? 'The guestbook is waiting for your warm thoughts. Tap below to write the very first blessing for Anushka & Yash!'
                : `No wishes matched "${searchQuery}". Try selecting "All Wishes" or clear the search filter.`}
            </p>
            {blessings.length === 0 ? (
              <button
                onClick={() => setIsWriteOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-[#8E0E16] to-[#C21D27] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md cursor-pointer border border-[#D4AF37]/40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Write a Blessing</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedSide('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#D4AF37]/50 text-xs font-bold text-[#8E0E16] hover:bg-[#FAF6F0] transition-all cursor-pointer"
              >
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredBlessings.map((b) => {
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
                      {/* Side Badge & Like Button */}
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
                      <p className="font-serif-custom text-[#2B2136] text-base leading-relaxed italic font-normal mb-4">
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
        )}

        {/* Bottom Back Button */}
        <div className="mt-16 text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#8E0E16] hover:text-[#1A1222] transition-colors cursor-pointer px-6 py-2.5 rounded-full bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Celebration</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {submittedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1A1222] text-white text-xs font-semibold shadow-2xl border border-[#C58F64]/40"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Your blessing has been posted to the wall!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
