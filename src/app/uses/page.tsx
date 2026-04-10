"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ContactSection } from "@/components/contact-section";

export default function UsesPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-black dark:text-white pt-24 md:pt-32 selection:bg-blue-500/30">
      
      {/* Container with side borders to match the reference style */}
      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative">
        
        {/* Subtle background texture for the header area */}
        <div className="absolute top-0 left-0 right-0 h-[400px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />

        {/* Header */}
        <header className="text-center py-20 md:py-32 flex flex-col items-center justify-center border-b border-black/5 dark:border-white/5 relative z-10">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            The Gear
          </p>
          <h1 className="text-5xl md:text-7xl font-playfair tracking-tight">
            What Powers{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
              My Work
            </span>
          </h1>
        </header>

        {/* 01 Workstation */}
        <Section number="01" title="Workstation" description="The physical tools I rely on every day.">
          <div className="rounded-2xl bg-neutral-200/50 dark:bg-[#111111] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-white/50 dark:bg-black/20 flex items-center justify-center">
              <Image
                src="https://www.pcvarge.com/wp-content/uploads/2022/02/Gigabyte-G5-KC-5US1130SH-Review-scaled.jpg"
                alt="Gigabyte G5 KC Laptop"
                fill
                unoptimized
                className="object-contain p-8 md:p-12 drop-shadow-2xl"
              />
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-[#0f0f0f] border-t border-black/5 dark:border-white/5">
              <h3 className="text-sm font-bold text-black dark:text-white">Gigabyte G5 KC</h3>
              <div className="flex gap-3 text-xs font-mono font-medium">
                <span className="text-blue-600 dark:text-blue-400 uppercase tracking-widest">DAILY DRIVER</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 02 Dev Tools */}
        <Section number="02" title="Dev Tools" description="">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-16 gap-x-8 pt-4">
            <Tool icon="https://cdn.simpleicons.org/cursor/18181B" darkIcon="https://cdn.simpleicons.org/cursor/ffffff" name="Trae" />
            <Tool icon="https://cdn.simpleicons.org/anthropic/D97757" darkIcon="https://cdn.simpleicons.org/anthropic/D97757" name="Claude Code" />
            <Tool icon="https://cdn.simpleicons.org/opensourceinitiative/3DA639" darkIcon="https://cdn.simpleicons.org/opensourceinitiative/3DA639" name="OpenCode" />
            <Tool icon="https://cdn.simpleicons.org/windowsterminal/4D4D4D" darkIcon="https://cdn.simpleicons.org/windowsterminal/ffffff" name="Windows Terminal" />
            <Tool icon="https://cdn.simpleicons.org/zenbrowser/1F1F1F" darkIcon="https://cdn.simpleicons.org/zenbrowser/ffffff" name="Zen Browser" />
            <Tool icon="https://cdn.simpleicons.org/figma/F24E1E" darkIcon="https://cdn.simpleicons.org/figma/F24E1E" name="Figma" />
            <Tool icon="https://cdn.simpleicons.org/framer/0055FF" darkIcon="https://cdn.simpleicons.org/framer/0055FF" name="Framer" />
            <Tool icon="https://cdn.simpleicons.org/docker/2496ED" darkIcon="https://cdn.simpleicons.org/docker/2496ED" name="Docker" />
          </div>
        </Section>

        {/* 03 CLI Tools */}
        <Section number="03" title="CLI Tools" description="">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-16 gap-x-8 pt-4">
            <Tool icon="https://cdn.simpleicons.org/gnubash/4EAA25" darkIcon="https://cdn.simpleicons.org/gnubash/4EAA25" name="Zsh" />
            <Tool icon="https://cdn.simpleicons.org/tmux/1BB91F" darkIcon="https://cdn.simpleicons.org/tmux/1BB91F" name="tmux" />
            <Tool icon="https://cdn.simpleicons.org/git/F05032" darkIcon="https://cdn.simpleicons.org/git/F05032" name="LazyGit" />
            <Tool icon="https://cdn.simpleicons.org/neovim/57A143" darkIcon="https://cdn.simpleicons.org/neovim/57A143" name="Neovim" />
            <Tool icon="https://cdn.simpleicons.org/rust/000000" darkIcon="https://cdn.simpleicons.org/rust/ffffff" name="zoxide" />
            <Tool icon="https://cdn.simpleicons.org/files/1F1F1F" darkIcon="https://cdn.simpleicons.org/files/ffffff" name="eza" />
            <Tool icon="https://cdn.simpleicons.org/starship/DD0B78" darkIcon="https://cdn.simpleicons.org/starship/DD0B78" name="Starship" />
            <Tool icon="https://cdn.simpleicons.org/github/181717" darkIcon="https://cdn.simpleicons.org/github/ffffff" name="GitHub CLI" />
          </div>
        </Section>

        {/* 04 Apps */}
        <Section number="04" title="Apps" description="">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-16 gap-x-8 pt-4">
            <Tool icon="https://cdn.simpleicons.org/raycast/FF6363" darkIcon="https://cdn.simpleicons.org/raycast/FF6363" name="Raycast" />
            <Tool icon="https://cdn.simpleicons.org/notion/000000" darkIcon="https://cdn.simpleicons.org/notion/ffffff" name="Notion" />
            <Tool icon="https://cdn.simpleicons.org/mac-os/007AFF" darkIcon="https://cdn.simpleicons.org/mac-os/007AFF" name="CleanShot X" />
            <Tool icon="https://cdn.simpleicons.org/obsstudio/302E31" darkIcon="https://cdn.simpleicons.org/obsstudio/ffffff" name="Screen Studio" />
            <Tool icon="https://cdn.simpleicons.org/1password/0058F5" darkIcon="https://cdn.simpleicons.org/1password/0058F5" name="1Password" />
            <Tool icon="https://cdn.simpleicons.org/apple/999999" darkIcon="https://cdn.simpleicons.org/apple/999999" name="Karabiner" />
            <Tool icon="https://cdn.simpleicons.org/spotify/1DB954" darkIcon="https://cdn.simpleicons.org/spotify/1DB954" name="Spotify" />
          </div>
        </Section>
      </div>

      {/* Recycled Contact / Call to action section */}
      <div className="border-t border-black/5 dark:border-white/5">
        <ContactSection />
      </div>
    </main>
  );
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col md:flex-row border-b border-black/5 dark:border-white/5 relative">
      {/* Left Column */}
      <div className="md:w-1/3 p-8 md:p-12 md:border-r border-black/5 dark:border-white/5 shrink-0">
        <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
          {number}
        </p>
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-black dark:text-white mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      {/* Right Column */}
      <div className="md:w-2/3 p-8 md:p-12 flex items-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
}

function Tool({ icon, darkIcon, name }: { icon: string; darkIcon: string; name: string; }) {
  const isImage = icon.startsWith("http") || icon.startsWith("/");

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 group cursor-default">
      <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
        {isImage ? (
          <>
            {/* Light mode icon */}
            <Image src={icon} alt={name} width={40} height={40} className="w-10 h-10 object-contain drop-shadow-sm dark:hidden" unoptimized />
            {/* Dark mode icon */}
            <Image src={darkIcon} alt={name} width={40} height={40} className="w-10 h-10 object-contain drop-shadow-sm hidden dark:block" unoptimized />
          </>
        ) : (
          icon
        )}
      </div>
      <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}