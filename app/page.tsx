"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION (Change your details here) ---
const WEDDING_DATA = {
  couple: { groom: "Julian", bride: "Sophia" },
  date: "2027-09-18T16:00:00", // ISO Format
  location: {
    name: "The Grand Greenhouse, Berlin",
    address: "Heidestraße 42, 10557 Berlin",
    mapLink: "https://maps.google.com"
  },
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with yours
};

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Initialize Audio & Countdown
  useEffect(() => {
    const music = new Audio(WEDDING_DATA.musicUrl);
    music.loop = true;
    setAudio(music);

    const targetDate = new Date(WEDDING_DATA.date).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      music.pause();
    };
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    if (audio) {
      audio.play().catch(() => console.log("Autoplay blocked by browser. Ready on interaction."));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen w-full bg-[#121612] flex items-center justify-center text-[#E6E8E6] overflow-x-hidden font-sans antialiased selection:bg-[#c2a685]/30">
      
      {/* Absolute background branding details */}
      <div className="absolute top-8 left-8 text-xs tracking-[0.25em] text-[#c2a685]/40 uppercase hidden md:block">
        J & S — 18.09.2027
      </div>

      {/* Main Container - Framed exactly like a high-end mobile micro-site */}
      <main className="relative w-full max-w-[440px] min-h-[100dvh] bg-[#1a1f1a] shadow-2xl flex flex-col justify-between overflow-y-auto border-x border-[#c2a685]/10 scrollbar-none">
        
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* --- PHASE 1: THE INTERACTIVE INTRO CARD / ENVELOPE --- */
            <motion.div
              key="envelope"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#1c221c] to-[#121612]"
            >
              <div className="my-auto text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 border border-[#c2a685]/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-[#c2a685] font-light text-xl tracking-wider">J&S</span>
                </motion.div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#c2a685]">You are invited to the wedding of</p>
                <h1 className="text-4xl font-serif tracking-wide text-[#E6E8E6]">
                  {WEDDING_DATA.couple.groom} <span className="italic block font-light my-1 text-2xl text-[#c2a685]">&amp;</span> {WEDDING_DATA.couple.bride}
                </h1>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenEnvelope}
                className="w-full py-4 border border-[#c2a685] text-xs uppercase tracking-[0.25em] text-[#c2a685] bg-[#c2a685]/5 hover:bg-[#c2a685]/10 transition-colors duration-300 backdrop-blur-sm"
              >
                Open Invitation
              </motion.button>
            </motion.div>
          ) : (
            /* --- PHASE 2: THE MAIN DIGITAL SITE CONTENT --- */
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col flex-1"
            >
              {/* Sticky Music Player Control */}
              <button 
                onClick={toggleMusic}
                className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#c2a685] text-[#121612] shadow-lg flex items-center justify-center transition-transform active:scale-90"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                )}
              </button>

              {/* Section 1: Hero Cover Photo/Vibe */}
              <section className="relative h-[80vh] flex flex-col justify-end p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#232c23] via-[#1a1f1a] to-[#121612] border-b border-[#c2a685]/10">
                <div className="space-y-4 mb-12">
                  <span className="text-xs tracking-[0.4em] text-[#c2a685] uppercase block">Save The Date</span>
                  <h2 className="text-5xl font-serif font-light tracking-wide text-white">
                    {WEDDING_DATA.couple.groom} <br />
                    <span className="font-serif italic font-normal text-3xl text-[#c2a685]">&amp;</span> {WEDDING_DATA.couple.bride}
                  </h2>
                  <div className="w-12 h-[1px] bg-[#c2a685]" />
                  <p className="text-sm tracking-wider text-gray-400 font-light">September 18, 2027 — Berlin, DE</p>
                </div>
              </section>

              {/* Section 2: Countdown Timer */}
              <section className="p-8 bg-[#121612] flex flex-col items-center justify-center border-b border-[#c2a685]/10 py-12">
                <span className="text-[10px] tracking-[0.3em] text-[#c2a685] uppercase mb-6 block">Counting Down the Moments</span>
                <div className="grid grid-cols-4 gap-4 max-w-xs w-full text-center">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col p-2 bg-[#1a1f1a] border border-[#c2a685]/10 rounded-sm">
                      <span className="text-2xl font-serif text-white">{value}</span>
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">{unit}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Event Details */}
              <section className="p-8 space-y-12 bg-[#1a1f1a] py-16">
                <div className="space-y-4 text-center">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[#c2a685]">The Celebration</h3>
                  <div className="space-y-1 text-sm font-light text-gray-300">
                    <p className="text-white font-serif text-lg">Saturday, September 18, 2027</p>
                    <p>Ceremony begins promptly at 4:00 PM</p>
                    <p>Followed by dinner, drinks & dancing</p>
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[#c2a685]">The Venue</h3>
                  <div className="space-y-2 text-sm font-light text-gray-300">
                    <p className="text-white font-serif text-lg">{WEDDING_DATA.location.name}</p>
                    <p className="text-xs text-gray-400">{WEDDING_DATA.location.address}</p>
                    <a
                      href={WEDDING_DATA.location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#c2a685] mt-4 border-b border-[#c2a685]/30 pb-1 hover:text-white hover:border-white transition-colors"
                    >
                      View Map &amp; Directions
                    </a>
                  </div>
                </div>
              </section>

              {/* Section 4: Premium RSVP Form */}
              <section className="p-8 bg-[#121612] py-16 border-t border-[#c2a685]/10">
                <div className="max-w-sm mx-auto space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#c2a685]">R.S.V.P</h3>
                    <p className="text-xs text-gray-400">Kindly respond by August 1, 2027</p>
                  </div>

                  {!formSubmitted ? (
                    <form 
                      onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                      className="space-y-6 text-sm"
                    >
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider text-gray-400 block">Full Name</label>
                        <input required type="text" className="w-full bg-[#1a1f1a] border border-[#c2a685]/20 text-white p-3 rounded-none focus:outline-none focus:border-[#c2a685] transition-colors" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-wider text-gray-400 block">Will you attend?</label>
                        <div className="grid grid-cols-2 gap-4">
                          <label className="flex items-center justify-center p-3 border border-[#c2a685]/20 bg-[#1a1f1a] cursor-pointer has-[:checked]:border-[#c2a685] has-[:checked]:bg-[#c2a685]/10 transition-all">
                            <input type="radio" name="attendance" value="yes" required className="sr-only" />
                            <span className="text-xs uppercase tracking-wider text-gray-300">Joyfully Accept</span>
                          </label>
                          <label className="flex items-center justify-center p-3 border border-[#c2a685]/20 bg-[#1a1f1a] cursor-pointer has-[:checked]:border-[#c2a685] has-[:checked]:bg-[#c2a685]/10 transition-all">
                            <input type="radio" name="attendance" value="no" className="sr-only" />
                            <span className="text-xs uppercase tracking-wider text-gray-300">Regretfully Decline</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-wider text-gray-400 block">Dietary Restrictions (Optional)</label>
                        <input type="text" placeholder="e.g., Vegan, Nut Allergy" className="w-full bg-[#1a1f1a] border border-[#c2a685]/20 text-white p-3 rounded-none placeholder:text-gray-600 focus:outline-none focus:border-[#c2a685] transition-colors" />
                      </div>

                      <button type="submit" className="w-full py-4 bg-[#c2a685] text-[#121612] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#d6ba99] transition-colors duration-300">
                        Submit Response
                      </button>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-[#1a1f1a] border border-[#c2a685]/30 text-center space-y-3"
                    >
                      <p className="text-sm text-white font-serif">Thank you for your response!</p>
                      <p className="text-xs text-gray-400">We are looking forward to sharing this magical day with you.</p>
                    </motion.div>
                  )}
                </div>
              </section>

              {/* Footer */}
              <footer className="p-8 text-center bg-[#0d100d] border-t border-[#c2a685]/5">
                <p className="text-[10px] tracking-[0.4em] text-gray-600 uppercase">Julian &amp; Sophia — 2027</p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}