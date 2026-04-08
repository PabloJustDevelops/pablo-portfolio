"use client";

import { ArrowRight, Github, Linkedin, Twitter, GraduationCap } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Logo } from "@/components/logo";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left column elements stagger
    const leftElements = leftColRef.current?.children;
    if (leftElements) {
      gsap.from(leftElements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Right column visual card reveal
    gsap.from(rightColRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: 60,
      opacity: 0,
      rotationY: 15,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Column: Text Content */}
        <div 
          ref={leftColRef}
          className="space-y-10"
        >
          <div className="space-y-6">
            <div 
              className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-300">
                Know About Me
              </span>
            </div>
            
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight"
            >
              Full-Stack Developer and <br />
              a little bit of{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 italic pr-2">
                  everything
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-500/20 -z-10 -rotate-2" />
              </span>
            </h2>
          </div>

          <div 
            className="space-y-6 text-neutral-400 text-lg leading-relaxed font-light max-w-xl"
          >
            <p>
              I&apos;m <span className="text-white font-medium">{profile.name}</span>, a proactive full-stack developer
              passionate about creating dynamic web experiences. From frontend
              to backend, I thrive on solving complex problems with clean,
              efficient code. My expertise spans React, Next.js, and Node.js,
              and I&apos;m always eager to learn more.
            </p>
            <p>
              When I&apos;m not immersed in work, I&apos;m exploring new ideas
              and staying curious. Life&apos;s about balance, and I love
              embracing every part of it.
            </p>
            <p className="text-indigo-200 font-medium italic border-l-2 border-indigo-500/50 pl-4 py-1">
              &quot;I believe in waking up each day eager to make a difference!&quot;
            </p>
          </div>

          <div 
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            <div className="flex gap-4">
              <Link
                href={profile.social.linkedin}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href={profile.social.github}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <Github size={18} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <Twitter size={18} />
              </Link>
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/experience"
                className="group flex items-center justify-between sm:justify-start gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 uppercase tracking-widest"
              >
                <span>Work Experience</span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight size={12} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </Link>

              <Link
                href="/education"
                className="group flex items-center justify-between sm:justify-start gap-3 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-200 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 uppercase tracking-widest"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-indigo-400" />
                  Education
                </span>
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/40 transition-colors">
                  <ArrowRight size={12} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Card */}
        <div 
          ref={rightColRef}
          className="relative group perspective-[1000px] w-full max-w-md mx-auto lg:max-w-none"
        >
          {/* Card Container */}
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] bg-[#0A0A0A] overflow-hidden border border-white/10 shadow-2xl transform-gpu transition-all duration-700 group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg]">
            
            {/* Background Grid & Patterns */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-60" />
            
            {/* Inner Border Effect */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />
            
            {/* Animated Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div 
                className="absolute top-[10%] right-[10%] w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-[float_4s_ease-in-out_infinite]" 
              />
              <div 
                className="absolute bottom-[20%] left-[10%] w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-[float-delayed_5s_ease-in-out_infinite]" 
              />
            </div>

            {/* Logo Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 group/logo">
                {/* 3D Layered Cards */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl border border-white/10 backdrop-blur-md z-10 transition-all duration-500 ease-out group-hover/logo:-rotate-6 group-hover/logo:scale-105"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-tl from-indigo-600/30 to-purple-600/30 rounded-3xl border border-white/5 z-0 transition-all duration-500 ease-out group-hover/logo:rotate-6 group-hover/logo:scale-95 group-hover/logo:translate-x-2 group-hover/logo:translate-y-2"
                  style={{ transform: "rotate(-3deg)" }}
                />
                
                {/* The Logo Text / SVG */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <Logo className="w-40 h-40 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
                </div>
              </div>
            </div>

            {/* Decorative Tech Corner Marks */}
            <div className="absolute top-6 right-6 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="absolute bottom-6 left-6 text-[10px] font-mono text-white/20 tracking-widest">
              SYS.READY
            </div>
            <div className="absolute bottom-6 right-6 w-12 h-[1px] bg-white/20" />
            <div className="absolute bottom-6 right-6 w-[1px] h-12 bg-white/20" />
            <div className="absolute top-6 left-6 w-12 h-[1px] bg-white/20" />
            <div className="absolute top-6 left-6 w-[1px] h-12 bg-white/20" />
          </div>

          {/* Background Glow behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl -z-20 opacity-0 group-hover:opacity-40 transition-opacity duration-700 rounded-[3rem]" />
        </div>
      </div>
    </section>
  );
}
