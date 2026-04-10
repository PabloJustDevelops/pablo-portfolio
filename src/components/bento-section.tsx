"use client";

import { stack } from "@/data/stack";
import { profile } from "@/data/profile";
import { Copy, Search } from "lucide-react";
import { Globe } from "@/components/globe";
import { StatusBento } from "@/components/status-bento";
import { useRef, useEffect, type CSSProperties, type ComponentType, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BentoSection() {
  const globeRef = useRef<unknown>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bentoItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Only animate if items exist and match media queries for safe animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Filter out null refs and make sure we have DOM nodes
    const items = bentoItemsRef.current.filter((el): el is HTMLDivElement => el !== null);
    
    if (items.length > 0 && containerRef.current) {
      gsap.from(items, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all", // This is crucial! It removes GSAP inline styles after animation so hover states can work
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
        {/* 1. Collaboration Card (Top Left - Spans 2 Cols) */}
        <div ref={el => { bentoItemsRef.current[0] = el; }} className="md:col-span-2 group rounded-3xl p-[1px] bg-gradient-to-br from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0a0a0a] ring-1 ring-black/10 dark:ring-white/10 p-8 flex flex-col items-center justify-center text-center shadow-[inset_0_1px_1px_rgba(0,0,0,0.15),0_20px_60px_-40px_rgba(124,58,237,0.25)] transition-all duration-500 group-hover:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_30px_90px_-55px_rgba(59,130,246,0.4)]">
            {/* Ambient Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_60%)] transition-colors duration-500" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Diseño de círculos conectados */}
            <div className="relative z-10 mb-8 flex items-center justify-center -space-x-4 md:-space-x-8">
              {/* Círculo exterior izquierdo */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] opacity-40 scale-90" />
              
              {/* Círculo interior izquierdo */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-neutral-900/60 shadow-[inset_0_2px_15px_rgba(0,0,0,0.6)] backdrop-blur-sm opacity-70 scale-95 z-10" />
              
              {/* Círculo central (Principal) */}
              <div className="relative z-20">
                <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-black/20 dark:border-white/20 p-2 bg-gradient-to-b from-neutral-200 dark:from-neutral-800 to-white dark:to-black shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-200 dark:from-neutral-800 to-neutral-50 dark:to-neutral-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] overflow-hidden relative flex items-center justify-center">
                    {/* Avatar o Inicial */}
                    <div className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 dark:from-neutral-200 to-neutral-500 dark:to-neutral-500 font-bold text-3xl md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      {profile.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Círculo interior derecho */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-black/10 dark:border-white/10 bg-neutral-100/60 dark:bg-neutral-900/60 shadow-[inset_0_2px_15px_rgba(0,0,0,0.6)] backdrop-blur-sm opacity-70 scale-95 z-10" />
              
              {/* Círculo exterior derecho */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] opacity-40 scale-90" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] backdrop-blur-md mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                  Collaboration
                </h3>
              </div>
              <p className="text-xl md:text-2xl font-serif text-black dark:text-white max-w-lg mx-auto leading-relaxed drop-shadow-md">
                Open communication, async updates,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">zero surprises.</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Tech Stack Card (Right - Spans 2 Rows vertically if needed, here just 1 col wide) */}
        <div ref={el => { bentoItemsRef.current[1] = el; }} className="md:col-span-1 md:row-span-2 group/tech rounded-3xl p-[1px] bg-gradient-to-br from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl h-full">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0a0a0a] ring-1 ring-black/10 dark:ring-white/10 p-6 flex flex-col shadow-[inset_0_1px_1px_rgba(0,0,0,0.15),0_20px_60px_-40px_rgba(59,130,246,0.18)] transition-all duration-500 group-hover/tech:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_30px_90px_-55px_rgba(59,130,246,0.3)] h-full">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
              {/* Subtle Radial Glow & Noise Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05)_0%,transparent_70%)] group-hover/tech:bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1)_0%,transparent_80%)] transition-colors duration-500" />
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

              {/* Fine Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] group-hover/tech:opacity-70 transition-opacity duration-500" />
            </div>

            <div className="mb-6 relative z-10">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] backdrop-blur-md mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                  Tech Stack
                </h3>
              </div>
              <p className="text-xl font-medium text-black/90 dark:text-white/90 font-serif leading-tight drop-shadow-md">
                Tools I ship production code with
              </p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-hidden mask-gradient-x relative z-10 my-2">
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
              <div className="w-full bg-gradient-to-b from-neutral-200 dark:from-[#151515] to-white dark:to-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-t-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] translate-y-2 rotate-x-3 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/tech:translate-y-0 group-hover/tech:rotate-x-0 group-hover/tech:shadow-[0_-10px_40px_-15px_rgba(59,130,246,0.15),0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                {/* Browser Header */}
                <div className="h-8 bg-neutral-900/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 flex items-center px-3 relative shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]">
                  <div className="flex gap-1.5 absolute left-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/60 dark:bg-black/60 border border-black/5 dark:border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] text-[9px] text-neutral-500 dark:text-neutral-400 font-medium transition-all duration-500 group-hover/tech:bg-white/80 dark:group-hover/tech:bg-black/80 group-hover/tech:text-neutral-700 dark:group-hover/tech:text-neutral-300 group-hover/tech:border-black/10 dark:group-hover/tech:border-white/10 group-hover/tech:px-6">
                      <span className="opacity-50">🔒</span> pabloroga.dev
                    </div>
                  </div>
                </div>
                {/* Browser Body */}
                <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 bg-white dark:bg-[#050505] relative min-h-[140px] shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]">
                  {/* Cinematic Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none group-hover/tech:bg-blue-500/15 transition-colors duration-500" />

                  {/* Inner Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  <div className="relative z-10 p-2.5 rounded-xl bg-gradient-to-b from-black/10 dark:from-white/10 to-black/5 dark:to-white/5 border border-black/10 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_4px_10px_rgba(0,0,0,0.5)] group-hover/tech:scale-105 group-hover/tech:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-500">
                    <Search
                      size={16}
                      className="text-neutral-500 dark:text-neutral-400 group-hover/tech:text-blue-400 transition-colors"
                    />
                  </div>
                  <div className="relative z-10 space-y-1">
                    <h4 className="text-black dark:text-white font-bold text-base tracking-tight group-hover/tech:text-transparent group-hover/tech:bg-clip-text group-hover/tech:bg-gradient-to-r group-hover/tech:from-blue-400 group-hover/tech:to-purple-400 transition-all duration-500">
                      Built to Perform.
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-500 font-medium">
                      Websites that impact your business.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Time Zone Card (Bottom Left 1) */}
        <div ref={el => { bentoItemsRef.current[2] = el; }} className="md:col-span-1 md:row-span-2 group/time rounded-3xl p-[1px] bg-gradient-to-br from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative rounded-3xl bg-white dark:bg-[#0a0a0a] ring-1 ring-black/10 dark:ring-white/10 p-0 flex flex-col h-full min-h-[400px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15),0_20px_60px_-40px_rgba(59,130,246,0.20)] transition-all duration-500 group-hover/time:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_30px_90px_-55px_rgba(59,130,246,0.3)] overflow-hidden">
            
            {/* Atmospheric Background Glow & Noise Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.1)_0%,transparent_70%)] group-hover/time:bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.2)_0%,transparent_80%)] transition-colors duration-1000" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="p-6 pb-2 z-20 flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] backdrop-blur-md mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shadow-[0_0_5px_rgba(59,130,246,0.8)] animate-pulse" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                  Global Reach
                </h3>
              </div>
              <h3 className="text-base font-serif font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-3 leading-tight group-hover/time:from-white group-hover/time:to-blue-200 transition-all duration-500">
                Flexible with time zone communications
              </h3>
            </div>

            {/* Interactive Globe - Integrado directamente */}
            <div className="flex-1 flex items-center justify-center relative overflow-visible mt-4">
              {/* Globe ambient backlight */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none group-hover/time:bg-blue-400/30 transition-colors duration-1000" />
              
              <Globe globeRef={globeRef} className="scale-125 md:scale-150 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover/time:drop-shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-1000" />
              
              {/* Bottom gradient mask for the globe */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white/80 dark:via-[#0a0a0a]/80 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#0a0a0a] pointer-events-none z-10" />
            </div>

            <div className="p-4 pt-0 z-20 pointer-events-none relative bg-white dark:bg-[#0a0a0a] shadow-[0_-20px_40px_rgba(255,255,255,1)] dark:shadow-[0_-20px_40px_rgba(10,10,10,1)]">
              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-400 font-medium tracking-wide text-center">
                <span>📍 Based in Spain</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span className="text-neutral-300">Available globally</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Connect Card (Bottom Center) */}
        <div ref={el => { bentoItemsRef.current[3] = el; }} className="md:col-span-1 group/connect rounded-3xl p-[1px] bg-gradient-to-br from-black/20 dark:from-white/20 via-black/5 dark:via-white/5 to-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0a0a0a] ring-1 ring-black/10 dark:ring-white/10 p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15),0_20px_60px_-40px_rgba(59,130,246,0.18)] transition-all duration-500 group-hover/connect:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_30px_90px_-55px_rgba(59,130,246,0.3)]">
            
            {/* Base Radial Glow & Noise Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_60%)] group-hover/connect:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] transition-colors duration-500" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            
            {/* Stronger Hover Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-0 group-hover/connect:opacity-100 transition-opacity duration-500" />

          <div className="mb-8 relative z-10 group-hover/connect:scale-110 transition-transform duration-500">
            {/* Wing-like Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-12 bg-blue-600/30 blur-[40px] rounded-full pointer-events-none group-hover/connect:bg-blue-500/40 transition-colors duration-500" />

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
               <svg viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30 group-hover/connect:opacity-0 transition-opacity duration-500">
                  <defs>
                     <linearGradient id="wing-fade-l" x1="100%" y1="50%" x2="0%" y2="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                     </linearGradient>
                     <linearGradient id="wing-fade-r" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                     </linearGradient>
                  </defs>
                  <path d="M120 50 C 90 45, 60 20, 10 35" stroke="url(#wing-fade-l)" strokeWidth="1" strokeLinecap="round" />
                  <path d="M160 50 C 190 45, 220 20, 270 35" stroke="url(#wing-fade-r)" strokeWidth="1" strokeLinecap="round" />
               </svg>
            </div>

            {/* Logo Container */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-neutral-200 dark:from-neutral-800 to-white dark:to-black border border-black/20 dark:border-white/20 flex items-center justify-center text-3xl font-serif text-black dark:text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(0,0,0,0.3)] relative z-10 group-hover/connect:shadow-[0_20px_50px_-5px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(0,0,0,0.4)] transition-all duration-300">
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/10 dark:from-white/10 to-transparent pointer-events-none" />
              {profile.name.charAt(0)}
            </div>
          </div>

          <h3 className="text-2xl font-serif text-black dark:text-white mb-8 leading-tight relative z-10 drop-shadow-lg">
            Let&apos;s work together <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-500 dark:to-neutral-500 text-lg">
              on your next project
            </span>
          </h3>

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                profile.social.email.replace("mailto:", ""),
              )
            }
            className="relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-b from-neutral-200 dark:from-neutral-800 to-neutral-100 dark:to-neutral-900 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-black/20 dark:hover:border-white/20 hover:from-neutral-300 dark:hover:from-neutral-700 hover:to-neutral-200 dark:hover:to-neutral-800 transition-all duration-300 text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover/connect:text-black dark:group-hover/connect:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.1),0_4px_15px_rgba(0,0,0,0.5)] group-hover/connect:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(59,130,246,0.3)]"
          >
            <Copy size={15} />
            <span>Copy Email</span>
          </button>
          </div>
        </div>

        <div ref={el => { bentoItemsRef.current[4] = el; }} className="md:col-span-2">
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
  icon: ComponentType<{ size?: number; style?: CSSProperties; className?: string }>;
  color?: string;
}) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-b from-neutral-800/60 to-neutral-900/60 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.5)] hover:from-neutral-700/60 hover:to-neutral-800/60 hover:border-black/20 dark:hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 whitespace-nowrap group/badge cursor-default">
            <Icon size={14} style={{ color }} className="drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] group-hover/badge:scale-110 transition-transform duration-300" />
            <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium tracking-wide group-hover/badge:text-black dark:group-hover/badge:text-white transition-colors">{name}</span>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Use GSAP to animate the infinite scroll
    const tl = gsap.to(contentRef.current, {
      xPercent: reverse ? 0 : -33.333333,
      ease: "none",
      duration: duration,
      repeat: -1,
    });

    if (reverse) {
      gsap.set(contentRef.current, { xPercent: -33.333333 });
    }

    return () => {
      tl.kill();
    };
  }, [reverse, duration]);

  return (
    <div ref={containerRef} className="flex overflow-hidden w-full group mask-gradient">
      <div
        ref={contentRef}
        className="flex gap-3 flex-shrink-0 px-1.5 min-w-max"
      >
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
