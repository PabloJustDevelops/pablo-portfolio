"use client";

import { stack } from "@/data/stack";
import { profile } from "@/data/profile";
import { Copy, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Globe } from "@/components/globe";
import { StatusBento } from "@/components/status-bento";
import ES from "country-flag-icons/react/3x2/ES";
import GB from "country-flag-icons/react/3x2/GB";
import FR from "country-flag-icons/react/3x2/FR";
import { useRef, type CSSProperties, type ComponentType, type ReactNode } from "react";

export function BentoSection() {
  const globeRef = useRef<any>(null);

  const countries = [
    { name: "Spain", lat: 40.4168, lon: -3.7038, flag: ES },
    { name: "UK", lat: 51.5074, lon: -0.1278, flag: GB },
    { name: "France", lat: 48.8566, lon: 2.3522, flag: FR },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
        {/* 1. Collaboration Card (Top Left - Spans 2 Cols) */}
        <div className="md:col-span-2 group rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent transition-transform duration-500 hover:-translate-y-0.5">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-950/90 ring-1 ring-white/10 p-8 flex flex-col items-center justify-center text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-40px_rgba(124,58,237,0.25)] transition-all duration-500 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-55px_rgba(59,130,246,0.25)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Diseño de círculos conectados */}
            <div className="relative z-10 mb-8 flex items-center justify-center -space-x-4 md:-space-x-8">
              {/* Círculo exterior izquierdo */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 bg-white/5 opacity-20 scale-90" />
              
              {/* Círculo interior izquierdo */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/10 bg-white/5 opacity-50 scale-95 z-10" />
              
              {/* Círculo central (Principal) */}
              <div className="relative z-20">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white/20 p-2 bg-neutral-900 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-neutral-800 overflow-hidden relative flex items-center justify-center">
                    {/* Avatar o Inicial */}
                    <div className="text-neutral-500 font-bold text-3xl md:text-5xl">
                      {profile.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Círculo interior derecho */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/10 bg-white/5 opacity-50 scale-95 z-10" />
              
              {/* Círculo exterior derecho */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 bg-white/5 opacity-20 scale-90" />
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                Collaboration
              </h3>
              <p className="text-xl md:text-2xl font-serif text-white max-w-lg mx-auto leading-relaxed">
                Open communication, async updates,{" "}
                <span className="text-neutral-400 italic">zero surprises.</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Tech Stack Card (Right - Spans 2 Rows vertically if needed, here just 1 col wide) */}
        <div className="md:col-span-1 md:row-span-2 group/tech rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent transition-transform duration-500 hover:-translate-y-0.5 h-full">
          <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] ring-1 ring-white/10 p-6 flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-40px_rgba(59,130,246,0.18)] transition-all duration-500 group-hover/tech:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-55px_rgba(59,130,246,0.25)] h-full">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
              {/* Subtle Radial Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
              {/* Fine Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
            </div>

            <div className="mb-6 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                Tech Stack
              </h3>
              <p className="text-xl font-medium text-white/90 font-serif leading-tight">
                Tools I ship production code with
              </p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-hidden mask-gradient-x relative z-10">
              {/* Tech Items Rows */}
              <Marquee duration={25}>
                {stack.slice(0, 10).map((tech) => (
                  <TechBadge key={tech.name} name={tech.name} icon={tech.icon} color={tech.color} />
                ))}
              </Marquee>

              <Marquee duration={30} reverse>
                {stack.slice(10, 20).map((tech) => (
                  <TechBadge key={tech.name} name={tech.name} icon={tech.icon} color={tech.color} />
                ))}
              </Marquee>

              <Marquee duration={28}>
                {stack.slice(20, 30).map((tech) => (
                  <TechBadge key={tech.name} name={tech.name} icon={tech.icon} color={tech.color} />
                ))}
              </Marquee>
            </div>

            {/* Browser UI Mockup */}
            <div className="relative z-20 mt-auto -mx-6 -mb-6 px-4 pb-0 pt-6 perspective-[1000px]">
              <div className="w-full bg-[#0F0F0F] border border-white/10 rounded-t-xl overflow-hidden shadow-2xl translate-y-0 rotate-x-2 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/tech:translate-y-0 group-hover/tech:rotate-x-0 group-hover/tech:shadow-[0_-10px_40px_-15px_rgba(255,255,255,0.05)]">
                {/* Browser Header */}
                <div className="h-7 bg-[#1A1A1A] border-b border-white/5 flex items-center px-3 relative">
                  <div className="flex gap-1.5 absolute left-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A] border border-white/5" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A] border border-white/5" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A] border border-white/5" />
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/40 border border-white/5 text-[9px] text-neutral-500 font-medium transition-all duration-500 group-hover/tech:bg-black/60 group-hover/tech:text-neutral-400 group-hover/tech:border-white/10 group-hover/tech:px-6">
                      <span className="opacity-50">🔒</span> pablo.dev
                    </div>
                  </div>
                </div>
                {/* Browser Body */}
                <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 bg-[#050505] relative min-h-[140px]">
                  {/* Cinematic Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />

                  {/* Inner Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  <div className="relative z-10 p-2.5 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-lg group-hover/tech:scale-105 transition-transform duration-500">
                    <Search
                      size={16}
                      className="text-neutral-400 group-hover/tech:text-white transition-colors"
                    />
                  </div>
                  <div className="relative z-10 space-y-1">
                    <h4 className="text-white font-bold text-base tracking-tight group-hover/tech:text-indigo-200 transition-colors">
                      Built to Perform.
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      Websites that impact your business.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Time Zone Card (Bottom Left 1) */}
        <div className="md:col-span-1 md:row-span-2 group/time rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent transition-transform duration-500 hover:-translate-y-0.5">
          <div className="relative rounded-3xl bg-[#0b0b0e] ring-1 ring-white/10 p-0 flex flex-col h-full min-h-[400px] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-40px_rgba(59,130,246,0.20)] transition-all duration-500 group-hover/time:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-55px_rgba(59,130,246,0.25)]">
            <div className="p-6 pb-2 z-20 flex flex-col items-center text-center">
              <h3 className="text-base font-serif font font-light text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-3 leading-tight">
                Flexible with time zone communications
              </h3>
            </div>

            {/* Interactive Globe - Integrado directamente */}
            <div className="flex-1 flex items-center justify-center relative overflow-visible">
              <Globe globeRef={globeRef} className="scale-110" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/60 to-transparent pointer-events-none z-10" />
            </div>

            <div className="p-4 pt-0 z-20 pointer-events-none">
              <div className="text-[10px] text-neutral-500 font-medium tracking-wide text-center">
                Based in Spain, available globally
              </div>
            </div>
          </div>
        </div>

        {/* 4. Connect Card (Bottom Center) */}
        <div className="md:col-span-1 group/connect rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent transition-transform duration-500 hover:-translate-y-0.5">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-950/90 ring-1 ring-white/10 p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-40px_rgba(59,130,246,0.18)] transition-all duration-500 group-hover/connect:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-55px_rgba(59,130,246,0.22)]">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-0 group-hover/connect:opacity-100 transition-opacity duration-500" />

          <div className="mb-8 relative z-10 group-hover/connect:scale-110 transition-transform duration-500">
            {/* Wing-like Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-12 bg-blue-600/30 blur-[40px] rounded-full pointer-events-none" />

            {/* Wings SVG */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[100px] pointer-events-none mix-blend-screen">
               <svg viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-0 group-hover/connect:opacity-100 transition-all duration-700 ease-out">
                  <defs>
                     <linearGradient id="wing-l" x1="100%" y1="50%" x2="0%" y2="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                     </linearGradient>
                     <linearGradient id="wing-r" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                     </linearGradient>
                  </defs>
                  
                  {/* Left Wing */}
                  <path d="M120 50 C 90 45, 60 20, 10 35" stroke="url(#wing-l)" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <path d="M125 55 C 95 55, 65 35, 20 60" stroke="url(#wing-l)" strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                  <path d="M130 60 C 105 60, 80 50, 35 75" stroke="url(#wing-l)" strokeWidth="1" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]" />

                  {/* Right Wing */}
                  <path d="M160 50 C 190 45, 220 20, 270 35" stroke="url(#wing-r)" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <path d="M155 55 C 185 55, 215 35, 260 60" stroke="url(#wing-r)" strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                  <path d="M150 60 C 175 60, 200 50, 245 75" stroke="url(#wing-r)" strokeWidth="1" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]" />
               </svg>
            </div>

            {/* Static Wings (Subtle version for default state) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[100px] pointer-events-none">
               <svg viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20 group-hover/connect:opacity-0 transition-opacity duration-500">
                  <path d="M120 50 C 90 45, 60 20, 10 35" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  <path d="M160 50 C 190 45, 220 20, 270 35" stroke="white" strokeWidth="1" strokeLinecap="round" />
               </svg>
            </div>

            {/* Logo Container */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-neutral-800 to-black border border-white/10 flex items-center justify-center text-3xl font-serif text-white shadow-[0_0_30px_-10px_rgba(59,130,246,0.4)] relative z-10 group-hover/connect:shadow-[0_0_40px_-5px_rgba(59,130,246,0.6)] transition-all duration-300">
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              {profile.name.charAt(0)}
            </div>
          </div>

          <h3 className="text-2xl font-serif text-white mb-8 leading-tight relative z-10">
            Let&apos;s work together <br />
            <span className="text-neutral-400 text-lg">
              on your next project
            </span>
          </h3>

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                profile.social.email.replace("mailto:", ""),
              )
            }
            className="relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-white/20 hover:bg-neutral-800 transition-all duration-300 text-sm font-medium text-neutral-300 group-hover/connect:text-white group-hover/connect:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
          >
            <Copy size={15} />
            <span>Copy Email</span>
          </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <StatusBento />
        </div>
      </div>
    </section>
  );
}

function TechBadge({
  name,
  icon: Icon,
  color,
}: {
  name: string;
  icon: ComponentType<{ size?: number; style?: CSSProperties }>;
  color?: string;
}) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/40 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)] hover:bg-white/5 hover:border-white/20 transition-all duration-300 whitespace-nowrap group/badge">
            <Icon size={14} style={{ color }} />
            <span className="text-xs text-neutral-300 font-medium tracking-wide group-hover/badge:text-white transition-colors">{name}</span>
        </div>
    );
}

function Marquee({
  children,
  reverse = false,
  duration = 20,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="flex overflow-hidden w-full group mask-gradient">
      <motion.div
        initial={{ x: reverse ? "-100%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-100%" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-3 flex-shrink-0 px-1.5"
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
