"use client";

import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

export function AboutMe() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Know About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Full-Stack Developer and <br />
              a little bit of{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 italic">
                everything
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-light">
            <p>
              I&apos;m {profile.name}, a proactive full-stack developer
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
            <p className="text-white font-medium">
              I believe in waking up each day eager to make a difference!
            </p>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex gap-4">
              <Link
                href={profile.social.linkedin}
                target="_blank"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href={profile.social.github}
                target="_blank"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Github size={20} />
              </Link>
              {/* Using Twitter icon for X as it's common replacement, or could use a custom X icon */}
              <Link
                href="#"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </Link>
            </div>

            <Link
              href="#work"
              className="group flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors uppercase tracking-wider"
            >
              Work Experience
              <div className="p-1 rounded-full border border-white/20 group-hover:border-white/40 transition-colors">
                <ArrowRight size={12} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Card */}
        <div className="relative group">
          {/* Card Container */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] bg-neutral-900 overflow-hidden border border-white/10 shadow-2xl">
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
            
            {/* Radial Gradient Glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent opacity-50" />
            
            {/* Inner Border Effect */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
            
            {/* Logo Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Logo Background Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/10 backdrop-blur-sm transform rotate-6 group-hover:rotate-3 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2rem] border border-white/5 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out" />
                
                {/* The Logo Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8rem] md:text-[10rem] font-bold tracking-tighter text-white/90 font-serif" style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
                        {profile.name.charAt(0)}
                    </span>
                </div>
              </div>
            </div>

            {/* Decorative Corner Lines */}
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 rounded-tr-3xl" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/10 rounded-bl-3xl" />
          </div>

          {/* Background Glow behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10 opacity-30 rounded-[3rem]" />
        </div>
      </div>
    </section>
  );
}
