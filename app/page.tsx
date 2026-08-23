"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- WEDDING CONFIGURATION ---
const WEDDING_DATA = {
  groom: "Usman",
  bride: "Fatima",
  parents: {
    father: "Muhammad Yousuf Khan (LATE)",
    mother: "Kishwer Jahan",
  },
  dateISO: "2026-12-25T17:00:00",
  displayDate: "Friday, December 25, 2026",
  hijriDate: "15 Jumada al-Thani 1448 AH",
  time: "5:00 PM – 9:00 PM",
  location: {
    name: "Civil Aviation Club",
    address: "Star Gate, Airport, Karachi",
    mapLink: "https://share.google/xRvJ2S7T7uqPUmNWV",
  },
  
  musicUrl: "/music.mp3",
  logoUrl: "/logo.png", // Your transparent logo in public/

  quranVerseArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  quranVerseEnglish: "“And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.”",
  surahRef: "Surah Ar-Rum • 30:21",

  itinerary: [
    { time: "05:00 PM", title: "Royal Welcome & Reception", desc: "Arrival of guests, welcome drinks & refreshments", icon: "✨" },
    { time: "05:45 PM", title: "Khutbah & Nikkah Ceremony", desc: "Solemnization of marriage & contract signing", icon: "📖" },
    { time: "06:30 PM", title: "Du'a & Family Greetings", desc: "Special prayers for the couple & photography session", icon: "🤲" },
    { time: "08:00 PM", title: "The Royal Feast", desc: "A curated traditional multi-course dinner & dessert bar", icon: "🍽️" },
  ],

  whatsappNumber: "+923212124555"
};

// Rich Botanical Background Frame for Invitation Slides & Cover
const LuxuryRoyalBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [-10, -90, -10],
          x: [0, (i % 2 === 0 ? 15 : -15), 0],
          opacity: [0.2, 0.8, 0.2],
          scale: [0.8, 1.4, 0.8],
        }}
        transition={{
          duration: 6 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.9,
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]"
        style={{
          top: `${10 + (i * 11)}%`,
          left: `${8 + (i * 12)}%`,
        }}
      />
    ))}

    <svg className="absolute -top-3 -left-3 w-36 h-36 text-[#4a6b4d]/25" viewBox="0 0 140 140" fill="currentColor">
      <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
      <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
      <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
      <path d="M48,28 C62,20 72,34 62,46 C52,50 42,40 48,28 Z" />
      <path d="M28,48 C20,62 34,72 46,62 C50,52 40,42 28,48 Z" />
      <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
      <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
    </svg>

    <svg className="absolute -top-3 -right-3 w-36 h-36 text-[#4a6b4d]/25 -scale-x-100" viewBox="0 0 140 140" fill="currentColor">
      <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
      <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
      <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
      <path d="M48,28 C62,20 72,34 62,46 C52,50 42,40 48,28 Z" />
      <path d="M28,48 C20,62 34,72 46,62 C50,52 40,42 28,48 Z" />
      <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
      <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
    </svg>

    <svg className="absolute -bottom-3 -left-3 w-36 h-36 text-[#4a6b4d]/25 -scale-y-100" viewBox="0 0 140 140" fill="currentColor">
      <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
      <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
      <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
      <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
      <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
    </svg>

    <svg className="absolute -bottom-3 -right-3 w-36 h-36 text-[#4a6b4d]/25 -scale-x-100 -scale-y-100" viewBox="0 0 140 140" fill="currentColor">
      <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
      <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
      <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
      <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
      <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
    </svg>

    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 text-[#c59e47]/15 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
      <circle cx="50" cy="50" r="48" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="40" strokeWidth="1.2" />
      <rect x="24" y="24" width="52" height="52" strokeWidth="0.8" transform="rotate(0 50 50)" />
      <rect x="24" y="24" width="52" height="52" strokeWidth="0.8" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="9" strokeWidth="1" />
    </svg>

    <div className="absolute inset-2 border-2 border-[#c59e47]/70 pointer-events-none rounded-sm shadow-[inset_0_0_15px_rgba(197,158,71,0.15)]" />
    <div className="absolute inset-3.5 border border-[#c59e47]/40 pointer-events-none rounded-sm" />
  </div>
);

// Clean Floating Logo Component
const CleanFloatingLogo = () => (
  <div className="relative flex items-center justify-center select-none my-auto">
    <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-[#fae09c]/30 blur-3xl pointer-events-none animate-pulse" />
    <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
      <img
        src={WEDDING_DATA.logoUrl}
        alt="Usman & Fatima Logo"
        className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(90,65,15,0.35)]"
      />
    </div>
  </div>
);

export default function RoyalCurtainNikkahInvite() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.dateISO).getTime();
    const timer = setInterval(() => {
      const diff = targetDate - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenCurtains = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Nikkah Ceremony of ${WEDDING_DATA.groom} & ${WEDDING_DATA.bride}`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the Nikkah ceremony of ${WEDDING_DATA.groom} & ${WEDDING_DATA.bride}.`);
    const loc = encodeURIComponent(`${WEDDING_DATA.location.name}, ${WEDDING_DATA.location.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261225T120000Z/20261225T160000Z&details=${details}&location=${loc}`;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#faf6ee] flex justify-center overflow-hidden text-[#2b241b] antialiased selection:bg-[#c59e47]/30">
      
      <audio ref={audioRef} src={WEDDING_DATA.musicUrl} preload="auto" loop />

      <main className="relative w-full max-w-[440px] h-full bg-[#faf6ee] overflow-hidden sm:border-x sm:border-[#c59e47]/40 shadow-2xl">

        {/* =========================================================================
            PHASE 1: MATCHING BOTANICAL COVER SCREEN (DOUBLE-PAGE ENVELOPE GATEFOLD)
            ========================================================================= */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="curtains"
              onClick={handleOpenCurtains}
              className="absolute inset-0 z-50 overflow-hidden cursor-pointer select-none bg-[#faf6ee]"
            >
              {/* Left Sliding Panel (Left Envelope Flap) */}
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: isOpen ? "-100%" : "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#faf6ee] z-20 shadow-[inset_-15px_0_25px_rgba(0,0,0,0.03)] overflow-hidden border-r border-[#c59e47]/30"
              >
                {/* Floating gold particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37] opacity-60"
                      style={{ top: `${15 + (i * 20)}%`, left: `${20 + (i * 15)}%` }}
                    />
                  ))}
                </div>
                {/* Left Panel Double Borders */}
                <div className="absolute inset-y-2 left-2 right-0 border-t-2 border-b-2 border-l-2 border-[#c59e47]/70 pointer-events-none rounded-l-sm" />
                <div className="absolute inset-y-3.5 left-3.5 right-0 border-t border-b border-l border-[#c59e47]/40 pointer-events-none rounded-l-sm" />

                {/* Top-Left Floral Corner */}
                <svg className="absolute -top-3 -left-3 w-36 h-36 text-[#4a6b4d]/25 pointer-events-none" viewBox="0 0 140 140" fill="currentColor">
                  <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
                  <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
                  <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
                  <path d="M48,28 C62,20 72,34 62,46 C52,50 42,40 48,28 Z" />
                  <path d="M28,48 C20,62 34,72 46,62 C50,52 40,42 28,48 Z" />
                  <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
                  <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
                </svg>

                {/* Bottom-Left Floral Corner */}
                <svg className="absolute -bottom-3 -left-3 w-36 h-36 text-[#4a6b4d]/25 -scale-y-100 pointer-events-none" viewBox="0 0 140 140" fill="currentColor">
                  <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
                  <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
                  <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
                  <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
                  <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
                </svg>
              </motion.div>

              {/* Right Sliding Panel (Right Envelope Flap) */}
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: isOpen ? "100%" : "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#faf6ee] z-20 shadow-[inset_15px_0_25px_rgba(0,0,0,0.03)] overflow-hidden border-l border-[#c59e47]/30"
              >
                {/* Floating gold particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37] opacity-60"
                      style={{ top: `${20 + (i * 20)}%`, right: `${20 + (i * 15)}%` }}
                    />
                  ))}
                </div>
                {/* Right Panel Double Borders */}
                <div className="absolute inset-y-2 left-0 right-2 border-t-2 border-b-2 border-r-2 border-[#c59e47]/70 pointer-events-none rounded-r-sm" />
                <div className="absolute inset-y-3.5 left-0 right-3.5 border-t border-b border-r border-[#c59e47]/40 pointer-events-none rounded-r-sm" />

                {/* Top-Right Floral Corner */}
                <svg className="absolute -top-3 -right-3 w-36 h-36 text-[#4a6b4d]/25 -scale-x-100 pointer-events-none" viewBox="0 0 140 140" fill="currentColor">
                  <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
                  <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
                  <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
                  <path d="M48,28 C62,20 72,34 62,46 C52,50 42,40 48,28 Z" />
                  <path d="M28,48 C20,62 34,72 46,62 C50,52 40,42 28,48 Z" />
                  <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
                  <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
                </svg>

                {/* Bottom-Right Floral Corner */}
                <svg className="absolute -bottom-3 -right-3 w-36 h-36 text-[#4a6b4d]/25 -scale-x-100 -scale-y-100 pointer-events-none" viewBox="0 0 140 140" fill="currentColor">
                  <path d="M0,0 Q60,15 95,95 Q15,60 0,0 Z" fillOpacity="0.12" />
                  <path d="M0,0 C30,10 60,35 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M25,12 C38,5 48,16 40,28 C30,30 20,20 25,12 Z" />
                  <path d="M12,25 C5,38 16,48 28,40 C30,30 20,20 12,25 Z" />
                  <circle cx="42" cy="18" r="3" fill="#d4af37" fillOpacity="0.9" />
                  <circle cx="18" cy="42" r="3" fill="#d4af37" fillOpacity="0.9" />
                </svg>
              </motion.div>

              {/* Center Content */}
              <motion.div 
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-between py-12 px-8 pointer-events-none"
              >
                <div className="pt-4 text-center space-y-2.5">
                  <span className="font-arabic text-[#8f681a] text-3xl sm:text-4xl font-bold block drop-shadow-sm">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-[1px] w-8 bg-[#c59e47]/60" />
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#705218] font-semibold">
                      Nikkah Ceremony
                    </span>
                    <span className="h-[1px] w-8 bg-[#c59e47]/60" />
                  </div>
                </div>

                <CleanFloatingLogo />

                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="py-3 px-8 rounded-full border-2 border-[#c59e47] bg-white shadow-[0_8px_25px_rgba(197,158,71,0.25)] flex items-center gap-2.5 pointer-events-auto"
                >
                  <span className="text-xs text-[#a67c2e]">✦</span>
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#45320c]">
                    Tap to Open Invitation
                  </span>
                  <span className="text-xs text-[#a67c2e]">✦</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            PHASE 2: FULLSCREEN STORYBOOK INVITATION (BEHIND COVER)
            ========================================================================= */}
        <div className="relative w-full h-full">
          
          <button 
            onClick={toggleMusic}
            aria-label="Toggle Sound"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-tr from-[#dfbe6d] to-[#faeed0] text-[#423211] shadow-xl flex items-center justify-center active:scale-90 border-2 border-white"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 animate-pulse text-[#423211]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#423211]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            )}
          </button>

          <div className="w-full h-full overflow-y-auto snap-container scrollbar-none">

            {/* -------------------------------------------------------------
                PAGE SLIDE 1: HERO & ROTATING ARCH (USMAN & FATIMA)
                ------------------------------------------------------------- */}
            <section className="w-full snap-card flex flex-col items-center justify-between py-6 px-4 relative bg-[#faf6ee] text-center overflow-hidden">
              <LuxuryRoyalBackground />

              <motion.div 
                initial={{ y: -15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="pt-2 z-10"
              >
                <span className="font-arabic text-3xl sm:text-4xl text-[#a87d27] block font-bold leading-tight drop-shadow-[0_1px_3px_rgba(168,125,39,0.25)]">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>

                <div className="mt-4 sm:mt-5 flex flex-col items-center">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#7a6850] font-semibold">
                    {WEDDING_DATA.parents.father}
                  </p>
                  
                  <span className="font-signature text-3xl sm:text-4xl text-[#b88c34] my-[-6px] select-none font-normal">
                    &amp;
                  </span>
                  
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#7a6850] font-semibold">
                    {WEDDING_DATA.parents.mother}
                  </p>
                  
                  <p className="text-[8.5px] uppercase tracking-[0.25em] text-[#a07c30] font-semibold mt-2">
                    Cordially request the pleasure of your company at the Nikkah of
                  </p>
                </div>
              </motion.div>

              <div className="relative w-full max-w-[340px] h-[340px] my-auto flex items-center justify-center z-10 -my-2">
                
                <svg 
                  className="absolute inset-0 w-full h-full text-[#527357]/20 pointer-events-none" 
                  viewBox="0 0 200 200" 
                  fill="currentColor"
                >
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.4" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                    <g key={idx} transform={`rotate(${angle} 100 100)`}>
                      <path d="M100,12 C106,6 114,14 108,22 C102,24 94,18 100,12 Z" />
                      <path d="M100,14 C94,8 86,16 92,24 C98,26 106,20 100,14 Z" fill="#d4af37" fillOpacity="0.7" />
                      <circle cx="100" cy="18" r="2.5" fill="#ffffff" stroke="#d4af37" strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>

                <motion.img 
                  src="/arch.png" 
                  alt=""
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.015, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 55, repeat: Infinity, ease: "linear" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_10px_25px_rgba(197,158,71,0.25)]"
                  onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative z-10 flex flex-col items-center justify-center px-4"
                >
                  <h1 className="text-lg sm:text-xl font-serif font-semibold tracking-[0.28em] uppercase bg-gradient-to-b from-[#1b2b20] via-[#2f4234] to-[#121c15] bg-clip-text text-transparent drop-shadow-sm">
                    {WEDDING_DATA.groom}
                  </h1>
                  
                  <span className="font-signature text-4xl sm:text-5xl text-[#b88c34] my-[-8px] drop-shadow-sm select-none font-normal">
                    &amp;
                  </span>
                  
                  <h1 className="text-lg sm:text-xl font-serif font-semibold tracking-[0.28em] uppercase bg-gradient-to-b from-[#1b2b20] via-[#2f4234] to-[#121c15] bg-clip-text text-transparent drop-shadow-sm">
                    {WEDDING_DATA.bride}
                  </h1>
                </motion.div>
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-full max-w-[310px] z-10 pb-1"
              >
                <div className="p-3 rounded-lg bg-[#ffffff]/95 border border-[#e2d0a8] shadow-sm space-y-1.5 backdrop-blur-[2px]">
                  <p className="font-arabic text-xs sm:text-[13px] text-[#8f681c] font-bold leading-relaxed" dir="rtl">
                    {WEDDING_DATA.quranVerseArabic}
                  </p>

                  <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#c59e47] to-transparent mx-auto opacity-70" />

                  <p className="text-[9.5px] sm:text-[10px] text-[#4a3b2c] font-serif tracking-wide leading-relaxed font-medium px-1">
                    {WEDDING_DATA.quranVerseEnglish}
                  </p>

                  <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#a07c30] block font-mono font-semibold pt-0.5">
                    — {WEDDING_DATA.surahRef} —
                  </span>
                </div>

                <div className="pt-2 flex flex-col items-center gap-0.5 text-[8px] uppercase tracking-[0.3em] text-[#a07c30] animate-bounce">
                  <span>Swipe to explore</span>
                  <span>↓</span>
                </div>
              </motion.div>
            </section>

            {/* -------------------------------------------------------------
                PAGE SLIDE 2: COUNTDOWN & EVENT DATE
                ------------------------------------------------------------- */}
            <section className="w-full snap-card flex flex-col items-center justify-between p-6 sm:p-8 bg-[#faf6ee] text-center relative overflow-hidden">
              <LuxuryRoyalBackground />

              <div className="pt-4 z-10">
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#8e7132] font-semibold block mb-1">When &amp; Where</span>
                <h3 className="text-3xl font-serif text-[#292015] font-semibold">{WEDDING_DATA.displayDate}</h3>
                <p className="text-xs text-[#5e513e] mt-1 font-light">{WEDDING_DATA.time}</p>
              </div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-xs space-y-3 z-10 my-auto"
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9c7b37] font-semibold block">Counting Down</span>
                <div className="grid grid-cols-4 gap-2.5">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col py-3 px-1 rounded-md bg-[#ffffff]/95 border-2 border-[#ddcaa4] shadow-sm backdrop-blur-[1px]">
                      <span className="text-2xl font-serif text-[#2e261a] font-semibold">{value}</span>
                      <span className="text-[8px] uppercase tracking-widest text-[#9c7b37] font-mono mt-1 font-semibold">{unit}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#73634e] tracking-widest font-mono font-medium">{WEDDING_DATA.hijriDate}</p>
              </motion.div>

              <div className="w-full max-w-xs space-y-3 pb-2 z-10">
                <div className="p-3.5 rounded-lg bg-[#ffffff]/95 border-2 border-[#e2d0a8] shadow-sm backdrop-blur-[1px]">
                  <h4 className="text-base font-serif text-[#292015] font-semibold">{WEDDING_DATA.location.name}</h4>
                  <p className="text-xs text-[#70614e] mt-0.5">{WEDDING_DATA.location.address}</p>
                </div>

                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded bg-gradient-to-r from-[#dcb458] via-[#e9c775] to-[#dcb458] text-[#332508] text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all"
                >
                  Add to Google Calendar
                </a>
              </div>
            </section>

            {/* -------------------------------------------------------------
                PAGE SLIDE 3: ITINERARY TIMELINE
                ------------------------------------------------------------- */}
            <section className="w-full snap-card flex flex-col items-center justify-center p-6 bg-[#faf6ee] relative overflow-hidden">
              <LuxuryRoyalBackground />

              <div className="w-full max-w-xs space-y-3 z-10">
                <div className="text-center">
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#8e7132] font-semibold block mb-0.5">Program Schedule</span>
                  
                  <h3 className="font-signature text-6xl sm:text-[68px] text-[#a87f28] leading-none py-1 drop-shadow-sm select-none">
                    Order Of Events
                  </h3>
                </div>

                <div className="relative pl-6 border-l-2 border-[#c59e47]/60 space-y-4 ml-2 mt-2">
                  {WEDDING_DATA.itinerary.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[32px] top-0.5 w-5 h-5 rounded-full bg-[#ffffff] border-2 border-[#c59e47] flex items-center justify-center text-[9px] shadow-sm">
                        {item.icon}
                      </div>

                      <div className="bg-[#ffffff]/95 p-3 rounded-md border-2 border-[#e2d0a8] shadow-sm backdrop-blur-[1px]">
                        <span className="text-[9px] font-mono text-[#8f681c] font-bold block">{item.time}</span>
                        <h4 className="text-xs font-serif text-[#292015] font-semibold">{item.title}</h4>
                        <p className="text-[11px] text-[#6e5e49] font-light mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* -------------------------------------------------------------
                PAGE SLIDE 4: PRAYERS & WHATSAPP
                ------------------------------------------------------------- */}
            <section className="w-full snap-card flex flex-col items-center justify-between p-6 sm:p-8 bg-[#faf6ee] text-center relative overflow-hidden">
              <LuxuryRoyalBackground />

              <div className="pt-6 space-y-2 z-10">
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#8e7132] font-semibold block">Prayers &amp; Gratitude</span>
                <h3 className="text-2xl font-serif text-[#292015] font-semibold">Your Du'as Are Our Greatest Gift</h3>
                <p className="text-xs text-[#63533e] max-w-xs mx-auto leading-relaxed pt-2">
                  We look forward to celebrating this blessed milestone in your presence. May Allah bless you and your family.
                </p>
              </div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-3.5 w-full max-w-xs z-10 my-auto"
              >
                <a
                  href={`https://wa.me/${WEDDING_DATA.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Barakallahu lakuma! Warm congratulations Usman & Fatima on your Nikkah! 🎉`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full border-2 border-[#25D366]/50 bg-[#ffffff]/95 text-[#128C7E] text-xs uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-[#f0fbf5] transition-colors"
                >
                  <span>💬</span>
                  <span>Send Du'as via WhatsApp</span>
                </a>

                <a
                  href={WEDDING_DATA.location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full border-2 border-[#c59e47]/70 text-[#7a5917] bg-[#ffffff]/95 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2"
                >
                  Open Location in Maps
                </a>
              </motion.div>

              <footer className="pb-2 space-y-0.5 z-10">
                <p className="font-signature text-3xl text-[#7d5e1e] font-normal">Usman &amp; Fatima</p>
                <p className="text-[9px] tracking-[0.35em] text-[#80705a] uppercase font-medium">25 • 12 • 2026</p>
              </footer>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}