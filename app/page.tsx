"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- WEDDING CONFIGURATION ---
const WEDDING_DATA = {
  bride: "Fatima",
  groom: "Usman",
  parents: "Mr. & Mrs. Khan and Mr. & Mrs. Hassan",
  dateISO: "2026-12-25T17:00:00",
  displayDate: "Friday, December 25, 2026",
  hijriDate: "15 Jumada al-Thani 1448 AH",
  time: "5:00 PM – 9:00 PM",
  location: {
    name: "Civil Aviation Club",
    address: "Star Gate, Airport, Karachi",
    mapLink: "https://share.google/xRvJ2S7T7uqPUmNWV",
  },
  
  // High-reliability soft instrumental tone
  musicUrl: "https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg", // Smooth ambient tone

  quranVerseArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  quranVerseEnglish: "“And among His signs is that He created for you mates from among yourselves, that you may find peace in them; and He placed between you affection and mercy.”",
  surahRef: "Surah Ar-Rum • 30:21",

  itinerary: [
    { time: "05:00 PM", title: "Royal Welcome & Reception", desc: "Arrival of guests, welcome drinks & hors d'oeuvres", icon: "✨" },
    { time: "05:45 PM", title: "Khutbah & Nikkah Ceremony", desc: "Solemnization of marriage & signing of the contract", icon: "📖" },
    { time: "06:30 PM", title: "Du'a & Greetings", desc: "Special prayers for the couple & family photo session", icon: "🤲" },
    { time: "08:00 PM", title: "The Royal Feast", desc: "A curated multi-course traditional dinner & dessert bar", icon: "🍽️" },
  ],

  whatsappNumber: "+923212124555"
};

// Royal Gold Arch Corner Motif
const ArchCorner = ({ className }: { className?: string }) => (
  <svg className={`w-9 h-9 text-[#c59e47]/70 ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <path d="M0,0 L50,0 C30,20 20,30 20,50 L0,50 Z" fill="currentColor" fillOpacity="0.12" />
    <path d="M0,0 L65,0 C45,20 20,40 0,60" strokeWidth="1.5" />
    <path d="M0,0 L90,0 C60,30 30,60 0,90" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="32" cy="32" r="4" fill="currentColor" />
  </svg>
);

export default function RoyalWhiteGoldInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.dateISO).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenCurtains = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio playback gesture caught:", err);
      });
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
    const title = encodeURIComponent(`Nikkah Ceremony of ${WEDDING_DATA.bride} & ${WEDDING_DATA.groom}`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the Nikkah ceremony of ${WEDDING_DATA.bride} & ${WEDDING_DATA.groom}.`);
    const loc = encodeURIComponent(`${WEDDING_DATA.location.name}, ${WEDDING_DATA.location.address}`);
    // 5:00 PM to 9:00 PM PKT
    const dates = "20261225T120000Z/20261225T160000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${loc}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#f3ede3] flex items-center justify-center text-[#2b241b] antialiased selection:bg-[#c59e47]/30">
      
      {/* Native HTML5 Audio Element */}
      <audio 
        ref={audioRef} 
        src={WEDDING_DATA.musicUrl} 
        preload="auto" 
        loop 
      />

      {/* Background Soft Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffffff] via-[#f7f2e8] to-[#e6dccb]" />

      {/* Main Container Card Frame */}
      <main className="relative z-10 w-full max-w-[440px] min-h-[100dvh] bg-[#fdfbf7] shadow-[0_25px_70px_rgba(163,138,92,0.25)] flex flex-col justify-between overflow-hidden border-x border-[#d8c399]/40 scrollbar-none">

        {/* =========================================================================
            CURTAIN SLIDE REVEAL (ENTIRE SCREEN IS CLICKABLE TO OPEN)
            ========================================================================= */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div 
              key="curtain-container"
              onClick={handleOpenCurtains}
              exit={{ opacity: 0, transition: { delay: 1, duration: 0.5 } }}
              className="absolute inset-0 z-50 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Left Curtain */}
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: isOpened ? "-100%" : "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-[#f7f1e6] via-[#faf6ee] to-[#ece2ce] border-r border-[#d4af37]/60 shadow-[10px_0_30px_rgba(0,0,0,0.1)] z-40 flex flex-col justify-between p-4"
              >
                <ArchCorner className="top-2 left-2" />
                <div className="h-full flex items-center justify-end pr-2 opacity-30">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#9c7b37] [writing-mode:vertical-rl] rotate-180 font-serif">
                    Fatima &amp; Usman
                  </span>
                </div>
                <ArchCorner className="bottom-2 left-2 -rotate-90" />
              </motion.div>

              {/* Right Curtain */}
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: isOpened ? "100%" : "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-[#f7f1e6] via-[#faf6ee] to-[#ece2ce] border-l border-[#d4af37]/60 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-40 flex flex-col justify-between p-4"
              >
                <ArchCorner className="top-2 right-2 rotate-90 ml-auto" />
                <div className="h-full flex items-center justify-start pl-2 opacity-30">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#9c7b37] [writing-mode:vertical-rl] font-serif">
                    Nikkah Ceremony
                  </span>
                </div>
                <ArchCorner className="bottom-2 right-2 rotate-180 ml-auto" />
              </motion.div>

              {/* Center Seal and Tap Anywhere Indicator */}
              <motion.div 
                exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.4 } }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-between p-8"
              >
                {/* Header */}
                <div className="pt-6 text-center">
                  <span className="font-arabic text-[#a67c2e] text-2xl tracking-widest block font-bold">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#8e7132] mt-2 font-semibold">
                    The Wedding Invitation
                  </p>
                </div>

                {/* Central Wax Seal */}
                <div className="my-auto text-center space-y-4">
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#c59e47]/60 animate-spin-slow" />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f5df9e] via-[#cfa34b] to-[#8d6920] shadow-[0_10px_30px_rgba(197,158,71,0.45)] flex flex-col items-center justify-center border-2 border-[#fff8e7]">
                      <span className="font-serif text-2xl font-bold tracking-wider text-[#342407] drop-shadow-sm">F&amp;U</span>
                      <span className="text-[7px] uppercase tracking-[0.25em] font-bold text-[#45320c]">Nikkah</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-serif text-[#292218] tracking-wider">
                      {WEDDING_DATA.bride} <span className="font-script text-3xl text-[#a67c2e] mx-1">&amp;</span> {WEDDING_DATA.groom}
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d6438] mt-1 font-semibold">Friday • 25 Dec 2026</p>
                  </div>
                </div>

                {/* Tap Anywhere Indicator */}
                <div className="w-full text-center pb-6">
                  <div className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-[#c59e47]/60 bg-[#ffffff]/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(197,158,71,0.25)] animate-pulse">
                    <span className="text-xs text-[#a67c2e]">❖</span>
                    <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#45320c]">Tap anywhere to open</span>
                    <span className="text-xs text-[#a67c2e]">❖</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            MAIN INVITATION CONTENT
            ========================================================================= */}
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none pb-12">
          
          {/* Floating Music Control Button */}
          <button 
            onClick={toggleMusic}
            aria-label="Toggle Melody"
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-tr from-[#dfbe6d] to-[#faeed0] text-[#423211] shadow-[0_6px_25px_rgba(197,158,71,0.4)] flex items-center justify-center transition-transform active:scale-90 border-2 border-white"
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

          {/* -------------------------------------------------------------
              SECTION 1: HERO & ARABIC CALLIGRAPHY
              ------------------------------------------------------------- */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative pt-12 pb-12 px-6 text-center border-b border-[#e5d6b8] bg-gradient-to-b from-[#ffffff] via-[#faf6ed] to-[#f4ede1]"
          >
            <div className="relative max-w-[340px] mx-auto p-6 rounded-t-full border-t-2 border-x-2 border-[#c59e47]/60 bg-gradient-to-b from-[#ffffff] to-transparent pb-8 shadow-[0_8px_30px_rgba(197,158,71,0.08)]">
              
              {/* Bismillah */}
              <div className="mb-5 pt-3">
                <span className="font-arabic text-3xl text-[#a87d27] block leading-relaxed font-bold">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
                <p className="text-[8px] uppercase tracking-[0.4em] text-[#8e7132] mt-1 font-medium">In The Name of Allah, Most Merciful</p>
              </div>

              {/* Couple & Parents */}
              <div className="space-y-2 mb-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6e5e49] font-semibold">{WEDDING_DATA.parents}</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#9c7b37]">Request the pleasure of your company at the Nikkah of</p>
                
                <h1 className="text-4xl font-serif text-[#221c13] tracking-wider pt-2 font-semibold">
                  {WEDDING_DATA.bride}
                  <span className="font-script block font-normal my-1 text-4xl text-[#b88c34]">&amp;</span>
                  {WEDDING_DATA.groom}
                </h1>
              </div>

              {/* Quran Verse */}
              <div className="p-4 rounded-lg bg-[#ffffff]/95 border border-[#e2d0a8] space-y-2 shadow-sm">
                <p className="font-arabic text-base text-[#8f681c] leading-relaxed font-bold" dir="rtl">
                  {WEDDING_DATA.quranVerseArabic}
                </p>
                <p className="text-[10px] italic text-[#544837] font-light leading-relaxed">
                  {WEDDING_DATA.quranVerseEnglish}
                </p>
                <span className="text-[8px] uppercase tracking-widest text-[#a07c30] block font-mono font-medium">
                  — {WEDDING_DATA.surahRef}
                </span>
              </div>
            </div>
          </motion.section>

          {/* -------------------------------------------------------------
              SECTION 2: LIVE COUNTDOWN
              ------------------------------------------------------------- */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-10 px-6 bg-[#f8f3e8] border-b border-[#e5d6b8] text-center"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#8e7132] block mb-5 font-semibold">
              Counting Down the Moments
            </span>
            
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col py-3 px-1 rounded-md bg-[#ffffff] border border-[#ddcaa4] shadow-sm">
                  <span className="text-2xl font-serif text-[#2e261a] tracking-wider font-semibold">{value}</span>
                  <span className="text-[8px] uppercase tracking-widest text-[#9c7b37] mt-1 font-mono font-medium">{unit}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-[#73634e] mt-4 tracking-widest font-mono">
              {WEDDING_DATA.hijriDate}
            </p>
          </motion.section>

          {/* -------------------------------------------------------------
              SECTION 3: VENUE & GOOGLE CALENDAR
              ------------------------------------------------------------- */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-[#fdfbf7] border-b border-[#e5d6b8] text-center space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#9c7b37] font-semibold">When &amp; Where</span>
              <h3 className="text-2xl font-serif text-[#292015] font-semibold">{WEDDING_DATA.displayDate}</h3>
              <p className="text-xs text-[#5e513e] font-light">{WEDDING_DATA.time}</p>
            </div>

            {/* Venue Location Box */}
            <div className="p-5 rounded-lg bg-[#ffffff] border border-[#e2d0a8] space-y-1.5 shadow-sm">
              <h4 className="text-lg font-serif text-[#292015] font-semibold">{WEDDING_DATA.location.name}</h4>
              <p className="text-xs text-[#70614e]">{WEDDING_DATA.location.address}</p>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded bg-gradient-to-r from-[#dcb458] via-[#e9c775] to-[#dcb458] text-[#332508] text-xs font-semibold uppercase tracking-[0.25em] flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(197,158,71,0.25)] hover:brightness-105 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                Add to Google Calendar
              </a>

              <a
                href={WEDDING_DATA.location.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded border border-[#c59e47]/60 text-[#7a5917] bg-[#ffffff] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-[#f7f2e7] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Open in Google Maps
              </a>
            </div>
          </motion.section>

          {/* -------------------------------------------------------------
              SECTION 4: ITINERARY TIMELINE
              ------------------------------------------------------------- */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-[#f6f0e4] border-b border-[#e5d6b8]"
          >
            <div className="text-center mb-8">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#8e7132] block font-semibold">Event Program</span>
              <h3 className="text-2xl font-serif text-[#292015] mt-1 font-semibold">The Order of Events</h3>
              <div className="w-10 h-[1px] bg-[#c59e47]/50 mx-auto mt-3" />
            </div>

            <div className="relative pl-6 border-l border-[#c59e47]/40 space-y-7 ml-2">
              {WEDDING_DATA.itinerary.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot Icon */}
                  <div className="absolute -left-[37px] top-0 w-6 h-6 rounded-full bg-[#ffffff] border-2 border-[#c59e47] flex items-center justify-center text-[10px] shadow-sm">
                    {item.icon}
                  </div>

                  <div className="bg-[#ffffff] p-4 rounded-lg border border-[#e2d0a8] shadow-sm">
                    <span className="text-[10px] font-mono text-[#8f681c] font-bold block">{item.time}</span>
                    <h4 className="text-sm font-serif text-[#292015] mt-0.5 font-semibold">{item.title}</h4>
                    <p className="text-xs text-[#6e5e49] font-light mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* -------------------------------------------------------------
              SECTION 5: PRAYERS & WHATSAPP GREETINGS
              ------------------------------------------------------------- */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-[#faf7f0] text-center space-y-5"
          >
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#8e7132] block font-semibold">Prayers &amp; Gratitude</span>
              <h3 className="text-xl font-serif text-[#292015] font-semibold">Your Du'as Are Our Greatest Gift</h3>
              <p className="text-xs text-[#63533e] max-w-xs mx-auto leading-relaxed">
                We look forward to celebrating this blessed milestone with you. May Allah bless you abundantly with peace and barakah.
              </p>
            </div>

            <a
              href={`https://wa.me/${WEDDING_DATA.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Barakallahu lakuma! Warm congratulations Fatima & Usman on your Nikkah! 🎉`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-[#25D366]/40 bg-[#ffffff] text-[#128C7E] text-xs uppercase tracking-widest font-semibold shadow-sm hover:bg-[#f0fbf5] transition-colors"
            >
              <span>💬</span>
              <span>Send Du'as via WhatsApp</span>
            </a>
          </motion.section>

          {/* Footer */}
          <footer className="py-8 px-4 text-center bg-[#f0e7d5] border-t border-[#dfcfad] space-y-1">
            <p className="font-serif text-[#7d5e1e] text-sm tracking-widest font-semibold">Fatima &amp; Usman</p>
            <p className="text-[9px] tracking-[0.35em] text-[#80705a] uppercase">25 • 12 • 2026</p>
          </footer>
        </div>
      </main>
    </div>
  );
}