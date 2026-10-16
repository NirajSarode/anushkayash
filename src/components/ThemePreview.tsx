import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, RefreshCw, Type, Palette, Eye, ArrowRight, Layers, CalendarDays } from 'lucide-react';
import {
  FONT_OPTIONS,
  COLOR_PALETTES,
  BACKGROUND_OPTIONS,
  EVENT_LAYOUT_OPTIONS,
  getStoredFontTheme,
  getStoredColorTheme,
  getStoredBgTheme,
  getStoredEventLayout,
  setStoredEventLayout,
  applyThemeToDom,
  type FontOption,
  type ColorPalette,
  type BackgroundOption,
  type EventLayoutStyle,
} from '../utils/themeStore';
import { Events } from './Events';

interface ThemePreviewProps {
  onBack: () => void;
  onNavigateHome?: () => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ onBack, onNavigateHome }) => {
  const [selectedFontId, setSelectedFontId] = useState<string>('prata-chic');
  const [selectedColorId, setSelectedColorId] = useState<string>(COLOR_PALETTES[0].id);
  const [selectedBgColor, setSelectedBgColor] = useState<string>(BACKGROUND_OPTIONS[0].color);
  const [appliedFontId, setAppliedFontId] = useState<string>('prata-chic');
  const [appliedColorId, setAppliedColorId] = useState<string>(COLOR_PALETTES[0].id);
  const [selectedEventLayout, setSelectedEventLayout] = useState<EventLayoutStyle>(getStoredEventLayout());
  const [appliedEventLayout, setAppliedEventLayout] = useState<EventLayoutStyle>(getStoredEventLayout());
  const [toastMessage, setToastMessage] = useState<string>(
    'Theme applied! First page typography, palette & background are live.'
  );
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  useEffect(() => {
    const fId = getStoredFontTheme();
    const cId = getStoredColorTheme();
    const bColor = getStoredBgTheme();
    const eLayout = getStoredEventLayout();
    setSelectedFontId(fId);
    setSelectedColorId(cId);
    setSelectedBgColor(bColor);
    setAppliedFontId(fId);
    setAppliedColorId(cId);
    setSelectedEventLayout(eLayout);
    setAppliedEventLayout(eLayout);
  }, []);

  const currentFont: FontOption =
    FONT_OPTIONS.find((f) => f.id === selectedFontId) || FONT_OPTIONS[0];
  const currentColor: ColorPalette =
    COLOR_PALETTES.find((c) => c.id === selectedColorId) || COLOR_PALETTES[0];
  const currentBgOption: BackgroundOption =
    BACKGROUND_OPTIONS.find((b) => b.color === selectedBgColor) || BACKGROUND_OPTIONS[0];

  const isCurrentBgDark = currentBgOption.isDark || selectedBgColor === '#1E1627';

  const handleApplyTheme = () => {
    applyThemeToDom(selectedFontId, selectedColorId, selectedBgColor);
    setAppliedFontId(selectedFontId);
    setAppliedColorId(selectedColorId);
    setToastMessage('Theme applied! First page typography, palette & background are live.');
    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 4500);
  };

  const handleReset = () => {
    setSelectedFontId('cinzel-royal');
    setSelectedColorId(COLOR_PALETTES[0].id);
    setSelectedBgColor(BACKGROUND_OPTIONS[0].color);
    applyThemeToDom('cinzel-royal', COLOR_PALETTES[0].id, BACKGROUND_OPTIONS[0].color);
    setAppliedFontId('cinzel-royal');
    setAppliedColorId(COLOR_PALETTES[0].id);
    setToastMessage('Reset to original royal poster.');
    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 3000);
  };

  const handleQuickApply = (fontId: string, colorId: string, bgCol: string) => {
    setSelectedFontId(fontId);
    setSelectedColorId(colorId);
    setSelectedBgColor(bgCol);
    applyThemeToDom(fontId, colorId, bgCol);
    setAppliedFontId(fontId);
    setAppliedColorId(colorId);
    setToastMessage('Designer edition applied to website!');
    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 4500);
  };

  const handleApplyEventLayout = (layoutId: EventLayoutStyle) => {
    setStoredEventLayout(layoutId);
    setSelectedEventLayout(layoutId);
    setAppliedEventLayout(layoutId);
    const layoutObj = EVENT_LAYOUT_OPTIONS.find((o) => o.id === layoutId);
    setToastMessage(
      `Event layout "${layoutObj?.name || layoutId}" is now live on the wedding website!`
    );
    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 4500);
  };

  return (
    <div className="min-h-screen bg-[#F0EBE3] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background ambient light */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-8 w-80 h-80 rounded-full bg-[#7C6090]/[0.08] blur-[120px]" />
        <div className="absolute bottom-1/3 right-8 w-96 h-96 rounded-full bg-[#B0542C]/[0.08] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#5E3D7A] hover:text-[#1A1222] transition-colors cursor-pointer px-4 py-2 rounded-full bg-[#F7F3EE] border border-[#C8BEAF] shadow-xs hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Celebration</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C8BEAF] text-xs font-semibold text-[#5E3D7A] bg-[#F7F3EE] hover:bg-white transition-all cursor-pointer shadow-2xs"
              title="Reset to original initial poster"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Original Poster</span>
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#C58F64]/40 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C58F64]" />
            <span className="font-serif-custom text-[11px] uppercase tracking-[0.25em] font-bold text-[#5E3D7A]">
              Theme & Typography Studio
            </span>
          </div>
          <h1 className="font-royal-custom text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1222] mb-3">
            First Page Fonts & Background Harmony
          </h1>
          <p className="font-serif-custom text-base sm:text-lg text-[#4A3F58] max-w-2xl mx-auto leading-relaxed">
            Test how different fonts and couple colors match against different background tones in real time.
          </p>
        </div>

        {/* ── Section 1: Live First Page Simulator with Background Switcher ── */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#C58F64]" />
              <h2 className="font-royal-custom text-lg sm:text-xl font-bold text-[#1A1222]">
                Live First Page Simulator
              </h2>
            </div>
            <div className="text-xs text-[#6D5F80] font-sans-custom font-medium">
              Font: <span className="font-bold text-[#1A1222]">{currentFont.titleFamilyName}</span> &bull;{' '}
              Palette: <span className="font-bold text-[#1A1222]">{currentColor.name}</span> &bull;{' '}
              Background: <span className="font-bold text-[#1A1222]">{currentBgOption.name}</span>
            </div>
          </div>

          {/* Background Tone Selector Bar */}
          <div className="p-3 mb-4 rounded-2xl bg-white border border-[#C8BEAF]/50 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A1222] pl-1">
              <Layers className="w-4 h-4 text-[#5E3D7A]" />
              <span>Select Background Tone:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {BACKGROUND_OPTIONS.map((bg) => {
                const isSelected = selectedBgColor === bg.color;
                return (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBgColor(bg.color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#5E3D7A] bg-[#5E3D7A] text-white shadow-xs scale-105'
                        : 'border-[#C8BEAF]/60 bg-[#F7F3EE] text-[#2B2136] hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs inline-block"
                      style={{ backgroundColor: bg.color }}
                    />
                    <span>{bg.name.split(' ')[0]}</span>
                    {bg.isDark && <span className="text-[10px] opacity-75">(Dark)</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* First Page Live Card Preview */}
          <div
            className="rounded-3xl p-6 sm:p-12 border shadow-[0_20px_60px_rgba(46,36,56,0.14)] relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: selectedBgColor,
              borderColor: currentColor.accentColor,
            }}
          >
            {/* Subtle inner accent border */}
            <div
              className="absolute inset-2 sm:inset-3 rounded-2xl border pointer-events-none"
              style={{ borderColor: `${currentColor.accentColor}35` }}
            />

            {/* Corner Ornaments */}
            <div
              className="absolute top-4 left-4 text-xs font-serif-custom opacity-40 select-none"
              style={{ color: currentColor.accentColor }}
            >
              ✦
            </div>
            <div
              className="absolute top-4 right-4 text-xs font-serif-custom opacity-40 select-none"
              style={{ color: currentColor.accentColor }}
            >
              ✦
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
              {/* Couple Cutout Illustration */}
              <div className="mb-4">
                <img
                  src="/images/couple_transparent.webp"
                  alt="Anushka & Yash"
                  className="w-28 h-32 sm:w-36 sm:h-40 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
                />
              </div>

              {/* Names — in Selected Title Font */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-2">
                <span
                  className="text-3xl sm:text-5xl md:text-6xl font-bold leading-none transition-all duration-300"
                  style={{
                    fontFamily: currentFont.titleFont,
                    color: isCurrentBgDark ? '#D8B8FF' : currentColor.herColor,
                    textShadow: isCurrentBgDark
                      ? '0 0 25px rgba(216,184,255,0.4), 0 2px 10px rgba(0,0,0,0.8)'
                      : '0 2px 10px rgba(255,255,255,0.6)',
                  }}
                >
                  ANUSHKA
                </span>

                <span
                  className="text-3xl sm:text-5xl md:text-6xl leading-none px-1 transition-all duration-300"
                  style={{
                    fontFamily: currentFont.scriptFont,
                    color: currentColor.accentColor,
                  }}
                >
                  &
                </span>

                <span
                  className="text-3xl sm:text-5xl md:text-6xl font-bold leading-none transition-all duration-300"
                  style={{
                    fontFamily: currentFont.titleFont,
                    color: isCurrentBgDark ? '#FFB088' : currentColor.himColor,
                    textShadow: isCurrentBgDark
                      ? '0 0 25px rgba(255,176,136,0.4), 0 2px 10px rgba(0,0,0,0.8)'
                      : '0 2px 10px rgba(255,255,255,0.6)',
                  }}
                >
                  YASH
                </span>
              </div>

              {/* Auspicious Sanskrit Inscription */}
              <p
                className="text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase mb-3 font-bold transition-all duration-300"
                style={{
                  fontFamily: currentFont.subtitleFont,
                  color: isCurrentBgDark ? '#F5EBE0' : currentColor.headingColor,
                }}
              >
                ॥ शुभमंगल सावधान ॥
              </p>

              {/* Date & Destination Banner */}
              <div className="mb-5 px-2">
                <p
                  className="text-xs sm:text-sm md:text-base tracking-[0.22em] uppercase font-bold flex flex-wrap items-center justify-center gap-2"
                  style={{ fontFamily: currentFont.subtitleFont }}
                >
                  <span style={{ color: isCurrentBgDark ? '#D8B8FF' : currentColor.herColor }}>
                    JANUARY 31 &ndash; FEBRUARY 3, 2027
                  </span>
                  <span style={{ color: currentColor.accentColor }}>&bull;</span>
                  <span style={{ color: isCurrentBgDark ? '#FFB088' : currentColor.himColor }}>
                    IGATPURI, MAHARASHTRA
                  </span>
                </p>
              </div>

              {/* Filigree Countdown Plaque Simulation */}
              <div
                className="px-5 py-2 sm:px-7 sm:py-2.5 rounded-xl border backdrop-blur-md shadow-sm mb-6"
                style={{
                  backgroundColor: isCurrentBgDark ? 'rgba(30,22,39,0.7)' : `${currentColor.cardBg}EE`,
                  borderColor: `${currentColor.accentColor}60`,
                }}
              >
                <div
                  className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base font-bold"
                  style={{
                    color: isCurrentBgDark ? '#FAF7F0' : currentColor.headingColor,
                    fontFamily: currentFont.subtitleFont,
                  }}
                >
                  <span>108 Days</span>
                  <span style={{ color: currentColor.accentColor }}>&bull;</span>
                  <span>14 Hours</span>
                  <span style={{ color: currentColor.accentColor }}>&bull;</span>
                  <span>26 Mins</span>
                </div>
              </div>

              {/* Two States Tagline */}
              <p
                className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-bold"
                style={{
                  fontFamily: currentFont.subtitleFont,
                  color: isCurrentBgDark ? '#E5D6FF' : currentColor.herColor,
                }}
              >
                Two States &bull; One Love
              </p>
            </div>

            {/* Action Bar inside Preview Card */}
            <div
              className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ borderColor: `${currentColor.accentColor}30` }}
            >
              <div
                className="text-xs text-left"
                style={{ color: isCurrentBgDark ? '#E5D6FF' : currentColor.headingColor }}
              >
                <span className="font-bold">Active Font:</span> {currentFont.titleFamilyName} &bull;{' '}
                <span className="font-bold">Palette:</span> {currentColor.name} &bull;{' '}
                <span className="font-bold">Canvas:</span> {currentBgOption.name}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleApplyTheme}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-[0.18em] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.herColor}, ${currentColor.himColor})`,
                  }}
                >
                  <Check className="w-4 h-4" />
                  <span>Apply to Website</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Background Match & Harmony Inspector (Side-by-Side Matrix) ── */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-[#5E3D7A]" />
            <h2 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222]">
              Background Matching Matrix
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A3F58] mb-6 font-serif-custom">
            See how your chosen typography ({currentFont.titleFamilyName}) and colors ({currentColor.name}) render on each background canvas. Click any card to apply that background.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BACKGROUND_OPTIONS.map((bg) => {
              const isSelected = selectedBgColor === bg.color;
              const isDark = bg.isDark;
              return (
                <div
                  key={`bg-preview-${bg.id}`}
                  onClick={() => setSelectedBgColor(bg.color)}
                  className={`rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'border-[#5E3D7A] ring-2 ring-[#5E3D7A]/30 scale-[1.02]'
                      : 'border-[#C8BEAF]/50 hover:border-[#5E3D7A]/40'
                  }`}
                  style={{ backgroundColor: bg.color }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                          color: isDark ? '#FFF' : '#1A1222',
                          borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                        }}
                      >
                        {bg.tag}
                      </span>
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: isDark ? '#D8B8FF' : '#5E3D7A' }}
                      >
                        {bg.color}
                      </span>
                    </div>

                    <h3
                      className="font-bold text-base mb-1"
                      style={{ color: isDark ? '#FFF' : '#1A1222' }}
                    >
                      {bg.name}
                    </h3>
                    <p
                      className="text-xs mb-4"
                      style={{ color: isDark ? '#CCC' : '#5C5050' }}
                    >
                      {bg.description}
                    </p>

                    {/* Live Font Sample on this background */}
                    <div
                      className="p-3.5 rounded-xl border text-center mb-3"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)',
                        borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                      }}
                    >
                      <div
                        className="text-xl font-bold leading-tight"
                        style={{
                          fontFamily: currentFont.titleFont,
                          color: isDark ? '#D8B8FF' : currentColor.herColor,
                        }}
                      >
                        ANUSHKA <span style={{ fontFamily: currentFont.scriptFont, color: currentColor.accentColor }}>&</span> YASH
                      </div>
                      <p
                        className="text-[10px] tracking-widest uppercase font-bold mt-1"
                        style={{
                          fontFamily: currentFont.subtitleFont,
                          color: isDark ? '#FFB088' : currentColor.himColor,
                        }}
                      >
                        ॥ शुभमंगल सावधान ॥ &bull; IGATPURI
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between text-[11px] pt-2 border-t"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)' }}
                  >
                    <span style={{ color: isDark ? '#AAA' : '#666' }}>
                      {isSelected ? '✓ Currently Selected' : 'Click to select canvas'}
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: isDark ? '#E5D6FF' : '#5E3D7A' }}
                    >
                      {isSelected ? 'Active' : 'Preview'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section 3: Wedding Ceremonies & Events Layout Studio ── */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-[#5E3D7A]" />
              <h2 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222]">
                Wedding Events Layout Options
              </h2>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B0542C] bg-[#B0542C]/10 px-3 py-1 rounded-full self-start sm:self-auto">
              7 Ceremonies &bull; Jan 31 &ndash; Feb 3
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4A3F58] mb-6 font-serif-custom">
            Choose how your 7 ceremonies are showcased. Preview each royal design instantly below, then apply your preferred edition to the website.
          </p>

          {/* Layout Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {EVENT_LAYOUT_OPTIONS.map((layout) => {
              const isSelected = selectedEventLayout === layout.id;
              const isCurrentlyApplied = appliedEventLayout === layout.id;
              return (
                <div
                  key={layout.id}
                  onClick={() => setSelectedEventLayout(layout.id)}
                  className={`rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-white border-[#5E3D7A] shadow-lg ring-2 ring-[#5E3D7A]/25'
                      : 'bg-[#F7F3EE] border-[#C8BEAF]/60 hover:bg-white hover:border-[#5E3D7A]/50'
                  }`}
                >
                  <div>
                    {/* Badge row */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-[#5E3D7A]/10 text-[#5E3D7A]">
                        {layout.badge}
                      </span>
                      {isCurrentlyApplied && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                          Live on Site
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#1A1222] mb-1 font-serif-custom">
                      {layout.name}
                    </h3>
                    <p className="text-xs text-[#6D5F80] mb-3 leading-relaxed">
                      {layout.description}
                    </p>

                    {/* Highlight callout */}
                    <div className="p-2.5 rounded-xl bg-[#ECE5DA]/80 border border-[#C8BEAF]/40 text-[11px] text-[#4A3F58] mb-4 leading-relaxed font-medium">
                      &bull; {layout.highlight}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-[#C8BEAF]/40 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEventLayout(layout.id);
                      }}
                      className={`w-full py-1.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#5E3D7A] text-white shadow-xs'
                          : 'bg-[#ECE5DA] text-[#5E3D7A] hover:bg-[#5E3D7A]/10'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Previewing Below' : 'Preview Layout'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyEventLayout(layout.id);
                      }}
                      className={`w-full py-1.5 px-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isCurrentlyApplied
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-gradient-to-r from-[#C58F64] to-[#B0542C] text-white hover:opacity-95 shadow-xs'
                      }`}
                    >
                      {isCurrentlyApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Active on Site</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Apply to Site</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Layout Stage */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#C58F64]/40 shadow-2xl bg-[#0F0A18] p-3 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-3 border-b border-white/10 px-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber-200">
                  Live Stage &bull; {EVENT_LAYOUT_OPTIONS.find((o) => o.id === selectedEventLayout)?.name}
                </span>
                <span className="text-[10px] text-white/50 hidden md:inline">
                  (Interactive demonstration with full detail modals)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyEventLayout(selectedEventLayout)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                    appliedEventLayout === selectedEventLayout
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#1A1222] hover:opacity-90'
                  }`}
                >
                  {appliedEventLayout === selectedEventLayout ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Active on Website</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Apply This Layout to Site</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Embedded Events Component with Layout Override */}
            <div className="rounded-2xl overflow-hidden bg-[#0A0612]/95 border border-white/5">
              <Events layoutOverride={selectedEventLayout} hideHeader={false} />
            </div>
          </div>
        </div>

        {/* ── Section 4: Font Options (Featuring Initial Poster & Contemporary Palace) ── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-5 h-5 text-[#5E3D7A]" />
            <h2 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222]">
              Choose First Page Font Suite
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A3F58] mb-6 font-serif-custom">
            Select the typography mood for the names, sacred inscriptions, and date details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FONT_OPTIONS.map((font) => {
              const isSelected = selectedFontId === font.id;
              const isCurrentlyApplied = appliedFontId === font.id;
              const isInitialPoster = font.id === 'cinzel-royal';
              return (
                <div
                  key={font.id}
                  onClick={() => setSelectedFontId(font.id)}
                  className={`rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-white border-[#5E3D7A] shadow-md ring-2 ring-[#5E3D7A]/20'
                      : 'bg-[#F7F3EE] border-[#C8BEAF]/60 hover:bg-white hover:border-[#5E3D7A]/50'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-full ${
                          isInitialPoster
                            ? 'bg-[#B0542C]/10 text-[#B0542C]'
                            : 'bg-[#5E3D7A]/10 text-[#5E3D7A]'
                        }`}
                      >
                        {font.tag}
                      </span>
                      {isCurrentlyApplied && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                          Live on Site
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1A1222] mb-1">
                      {font.name}
                    </h3>
                    <p className="text-xs text-[#6D5F80] mb-4">
                      {font.description}
                    </p>

                    {/* Typography Sample Preview */}
                    <div className="p-4 rounded-xl bg-[#FBF9F6] border border-[#C8BEAF]/30 mb-3 text-center">
                      <div
                        className="text-xl sm:text-2xl font-bold text-[#1A1222] mb-1 leading-tight"
                        style={{ fontFamily: font.titleFont }}
                      >
                        ANUSHKA <span style={{ fontFamily: font.scriptFont, color: '#C58F64' }}>&</span> YASH
                      </div>
                      <p
                        className="text-xs tracking-widest uppercase text-[#5E3D7A]"
                        style={{ fontFamily: font.subtitleFont }}
                      >
                        ॥ शुभमंगल सावधान ॥
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#6D5F80] pt-2 border-t border-[#C8BEAF]/30">
                    <span className="font-mono">{font.titleFamilyName}</span>
                    <span className={`font-bold ${isSelected ? 'text-[#5E3D7A]' : 'text-gray-400'}`}>
                      {isSelected ? 'Selected' : 'Click to preview'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section 4: Color Palette Options ── */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-[#B0542C]" />
            <h2 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222]">
              Choose First Page Color Palette
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A3F58] mb-6 font-serif-custom">
            Select the cultural color harmony balancing Delhi and Maharashtra tones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {COLOR_PALETTES.map((color) => {
              const isSelected = selectedColorId === color.id;
              const isCurrentlyApplied = appliedColorId === color.id;
              return (
                <div
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)}
                  className={`rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-white border-[#B0542C] shadow-md ring-2 ring-[#B0542C]/20'
                      : 'bg-[#F7F3EE] border-[#C8BEAF]/60 hover:bg-white hover:border-[#B0542C]/50'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#B0542C]/10 text-[#B0542C]">
                        {color.tag}
                      </span>
                      {isCurrentlyApplied && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                          Live on Site
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1A1222] mb-1">
                      {color.name}
                    </h3>
                    <p className="text-xs text-[#6D5F80] mb-4">
                      {color.description}
                    </p>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBF9F6] border border-[#C8BEAF]/30 mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full shadow-sm border border-white"
                          style={{ backgroundColor: color.herColor }}
                          title={`Delhi: ${color.herColor}`}
                        />
                        <div
                          className="w-7 h-7 rounded-full shadow-sm border border-white"
                          style={{ backgroundColor: color.accentColor }}
                          title={`Accent: ${color.accentColor}`}
                        />
                        <div
                          className="w-7 h-7 rounded-full shadow-sm border border-white"
                          style={{ backgroundColor: color.himColor }}
                          title={`Maharashtra: ${color.himColor}`}
                        />
                        <div
                          className="w-7 h-7 rounded-full shadow-sm border border-gray-300"
                          style={{ backgroundColor: color.bgCanvas }}
                          title={`Canvas: ${color.bgCanvas}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[#6D5F80]">
                        {color.herColor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#6D5F80] pt-2 border-t border-[#C8BEAF]/30">
                    <span className="capitalize">{color.id.replace('-', ' ')}</span>
                    <span className={`font-bold ${isSelected ? 'text-[#B0542C]' : 'text-gray-400'}`}>
                      {isSelected ? 'Selected' : 'Click to preview'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section 5: Curated Concept Editions (Including Initial Poster Edition) ── */}
        <div>
          <div className="mb-6">
            <h2 className="font-royal-custom text-xl sm:text-2xl font-bold text-[#1A1222] mb-1">
              Curated First Page Concept Editions
            </h2>
            <p className="text-xs sm:text-sm text-[#4A3F58] font-serif-custom">
              Hand-picked combinations pairing each font style with harmonious background and palette.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FONT_OPTIONS.map((f, idx) => {
              const matchedColor = COLOR_PALETTES[idx % COLOR_PALETTES.length];
              const matchedBg = BACKGROUND_OPTIONS[idx % BACKGROUND_OPTIONS.length].color;
              const isMatchActive = appliedFontId === f.id && appliedColorId === matchedColor.id;
              return (
                <div
                  key={`curated-${f.id}`}
                  className="rounded-3xl p-6 border border-[#C8BEAF]/60 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-1 rounded-full bg-[#5E3D7A]/10 text-[#5E3D7A]">
                        {f.id === 'cinzel-royal' ? 'Original Poster' : `Edition 0${idx + 1}`}
                      </span>
                      <div className="flex gap-1.5">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: matchedColor.herColor }} />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: matchedColor.accentColor }} />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: matchedColor.himColor }} />
                        <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: matchedBg }} />
                      </div>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-[#1A1222] mb-1">
                      {f.name} &bull; {matchedColor.name}
                    </h3>
                    <p className="text-xs text-[#6D5F80] mb-4">
                      {f.samplePairing}
                    </p>

                    {/* Preview Badge */}
                    <div
                      className="p-4 rounded-2xl mb-5 text-center border"
                      style={{
                        backgroundColor: matchedBg,
                        borderColor: `${matchedColor.accentColor}40`,
                      }}
                    >
                      <div
                        className="text-lg font-bold mb-1 leading-tight"
                        style={{
                          fontFamily: f.titleFont,
                          color: matchedColor.herColor,
                        }}
                      >
                        ANUSHKA <span style={{ fontFamily: f.scriptFont, color: matchedColor.accentColor }}>&</span> YASH
                      </div>
                      <p
                        className="text-[10px] tracking-widest uppercase font-bold"
                        style={{
                          fontFamily: f.subtitleFont,
                          color: matchedColor.himColor,
                        }}
                      >
                        JANUARY 31 &ndash; FEBRUARY 3, 2027
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleQuickApply(f.id, matchedColor.id, matchedBg)}
                    className={`w-full py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isMatchActive
                        ? 'bg-[#2E7D32] text-white shadow-sm'
                        : 'bg-[#F0EBE3] hover:bg-[#5E3D7A] text-[#1A1222] hover:text-white border border-[#C8BEAF]'
                    }`}
                  >
                    {isMatchActive ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active on Website</span>
                      </>
                    ) : (
                      <>
                        <span>Select This Edition</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Fixed Floating Toast Confirmation ── */}
      <AnimatePresence>
        {showAppliedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1222] text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-[#C58F64]" />
            <span className="text-xs font-semibold tracking-wide">
              {toastMessage}
            </span>
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="ml-2 text-xs font-bold text-[#C58F64] underline hover:text-white transition-colors cursor-pointer"
              >
                View First Page &rarr;
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ThemePreview;
