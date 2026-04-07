"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden flex flex-col items-center justify-center text-center" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none blur-[100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-transparent pointer-events-none blur-[100px]" />
      
      {/* Subtle Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="container relative mx-auto px-4 max-w-5xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Logo / Icon with Wings at top */}
          <div className="relative flex items-center justify-center mb-12">
            {/* Abstract Wings */}
            <div className="absolute w-[280px] h-[60px] opacity-40 flex justify-between items-center pointer-events-none">
              <svg viewBox="0 0 100 50" className="w-[120px] h-full text-white/50 fill-current" preserveAspectRatio="none">
                <path d="M100 25 C70 5, 40 10, 0 30 C30 25, 60 35, 100 50 Z" />
                <path d="M90 20 C65 5, 35 15, 10 35 C40 28, 65 38, 90 45 Z" />
                <path d="M80 15 C55 5, 30 20, 20 40 C45 32, 65 40, 80 40 Z" />
              </svg>
              <svg viewBox="0 0 100 50" className="w-[120px] h-full text-white/50 fill-current" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)' }}>
                <path d="M100 25 C70 5, 40 10, 0 30 C30 25, 60 35, 100 50 Z" />
                <path d="M90 20 C65 5, 35 15, 10 35 C40 28, 65 38, 90 45 Z" />
                <path d="M80 15 C55 5, 30 20, 20 40 C45 32, 65 40, 80 40 Z" />
              </svg>
            </div>
            {/* Center Circle */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-b from-blue-900/80 to-black border border-blue-500/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <span className="text-2xl font-bold text-white tracking-tighter">PL</span>
              {/* Inner ring */}
              <div className="absolute inset-1 rounded-full border border-white/10" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="relative mb-12 w-full max-w-4xl mx-auto">
            <h2 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-sans text-neutral-300 tracking-tight leading-[1.1] uppercase">
              From concept to <span className="text-white font-extrabold">creation</span>
              <br />
              Let&apos;s make it <span className="text-white font-extrabold relative inline-block">
                happen!
                {/* Rotating Badge */}
                <div className="absolute -right-12 md:-right-24 -top-8 md:-top-12 w-24 h-24 md:w-32 md:h-32 pointer-events-none z-20">
                  <div className="relative w-full h-full rounded-full bg-blue-600/10 backdrop-blur-md border border-blue-500/20 shadow-[0_0_40px_rgba(37,99,235,0.2)] flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                        <path id="circlePath" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" fill="transparent" />
                        <text fontSize="10.5" fontWeight="600" letterSpacing="3.5" fill="currentColor">
                          <textPath href="#circlePath" startOffset="0%">
                            OPEN TO WORK • OPEN TO WORK •
                          </textPath>
                        </text>
                      </svg>
                    </motion.div>
                    {/* Center Star */}
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                  </div>
                </div>
              </span>
            </h2>
          </div>

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="mailto:pablolopez2001@outlook.es"
              className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <span className="text-sm font-semibold text-white">Get In Touch</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} strokeWidth={2.5} />
              </div>
            </Link>
          </motion.div>

          {/* Subtitle text */}
          <div className="mt-20 space-y-4 max-w-2xl">
            <h3 className="text-xl md:text-2xl font-serif text-white font-medium">
              I&apos;m available for full-time roles & freelance projects.
            </h3>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
              I thrive on crafting dynamic web applications, and<br className="hidden md:block" /> delivering seamless user experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
