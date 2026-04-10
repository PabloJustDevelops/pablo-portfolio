"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function UsesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-32 pb-24 selection:bg-blue-500/30">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header className="text-center mb-32 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-600 dark:text-neutral-300 uppercase">
              The Gear
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-medium tracking-tight mb-6">
            What Powers{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 italic pr-2">
              My Work
            </span>
          </h1>
          <p className="max-w-2xl text-neutral-500 dark:text-neutral-400 text-lg md:text-xl">
            A curated list of the hardware, software, and tools I use to design, build, and ship products every day.
          </p>
        </header>

        <div className="space-y-32">
          {/* 01 Workstation */}
          <Section number="01" title="Workstation" description="The physical tools and hardware I rely on to get things done.">
            <div className="group relative rounded-[2.5rem] bg-neutral-100 dark:bg-[#111111] border border-black/5 dark:border-white/10 overflow-hidden transition-all duration-500 hover:border-black/10 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5">
              {/* Premium Background Glow inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-white w-full overflow-hidden flex items-center justify-center p-8 sm:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <Image
                  src="https://www.pcvarge.com/wp-content/uploads/2022/02/Gigabyte-G5-KC-5US1130SH-Review-scaled.jpg"
                  alt="Gigabyte G5 KC Laptop"
                  fill
                  unoptimized
                  className="object-contain p-8 md:p-16 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                />
              </div>
              <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 p-8 md:p-10 border-t border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md">
                <div>
                  <h3 className="text-3xl font-bold text-black dark:text-white mb-3">Gigabyte G5 KC</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>16GB RAM</Badge>
                    <Badge>512GB SSD</Badge>
                    <Badge>RTX 3060</Badge>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  Daily Driver
                </div>
              </div>
            </div>
          </Section>

          {/* 02 Dev Tools */}
          <Section number="02" title="Dev Tools" description="My primary stack for writing, designing, and testing code.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Tool icon="https://cdn.simpleicons.org/cursor/ffffff" name="Trae" color="bg-[#18181B]" />
              <Tool icon="https://cdn.simpleicons.org/anthropic/ffffff" name="Claude Code" color="bg-[#D97757]" />
              <Tool icon="https://cdn.simpleicons.org/opensourceinitiative/ffffff" name="OpenCode" color="bg-[#3DA639]" />
              <Tool icon="https://cdn.simpleicons.org/windowsterminal/ffffff" name="Windows Terminal" color="bg-[#4D4D4D]" subtitle="(Chris Titus)" />
              <Tool icon="https://cdn.simpleicons.org/zenbrowser/ffffff" name="Zen Browser" color="bg-[#1F1F1F]" />
              <Tool icon="https://cdn.simpleicons.org/figma/ffffff" name="Figma" color="bg-[#F24E1E]" />
              <Tool icon="https://cdn.simpleicons.org/framer/ffffff" name="Framer" color="bg-[#0055FF]" />
              <Tool icon="https://cdn.simpleicons.org/docker/ffffff" name="Docker" color="bg-[#2496ED]" />
            </div>
          </Section>

          {/* 03 CLI Tools */}
          <Section number="03" title="CLI Tools" description="Terminal utilities that make my workflow infinitely faster.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Tool icon="https://cdn.simpleicons.org/gnubash/ffffff" name="Zsh" color="bg-[#4EAA25]" />
              <Tool icon="https://cdn.simpleicons.org/tmux/ffffff" name="tmux" color="bg-[#1BB91F]" />
              <Tool icon="https://cdn.simpleicons.org/git/ffffff" name="LazyGit" color="bg-[#F05032]" />
              <Tool icon="https://cdn.simpleicons.org/neovim/ffffff" name="Neovim" color="bg-[#57A143]" />
              <Tool icon="https://cdn.simpleicons.org/rust/ffffff" name="zoxide" color="bg-[#000000]" />
              <Tool icon="https://cdn.simpleicons.org/files/ffffff" name="eza" color="bg-[#1F1F1F]" />
              <Tool icon="https://cdn.simpleicons.org/starship/ffffff" name="Starship" color="bg-[#DD0B78]" />
              <Tool icon="https://cdn.simpleicons.org/github/ffffff" name="GitHub CLI" color="bg-[#181717]" />
            </div>
          </Section>

          {/* 04 Apps */}
          <Section number="04" title="Apps" description="Everyday applications that keep my life and projects organized.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Tool icon="https://cdn.simpleicons.org/raycast/ffffff" name="Raycast" color="bg-[#FF6363]" />
              <Tool icon="https://cdn.simpleicons.org/notion/ffffff" name="Notion" color="bg-[#000000]" />
              <Tool icon="https://cdn.simpleicons.org/mac-os/ffffff" name="CleanShot X" color="bg-[#007AFF]" />
              <Tool icon="https://cdn.simpleicons.org/obsstudio/ffffff" name="Screen Studio" color="bg-[#302E31]" />
              <Tool icon="https://cdn.simpleicons.org/1password/ffffff" name="1Password" color="bg-[#0058F5]" />
              <Tool icon="https://cdn.simpleicons.org/apple/ffffff" name="Karabiner" color="bg-[#999999]" subtitle="Elements" />
              <Tool icon="https://cdn.simpleicons.org/spotify/ffffff" name="Spotify" color="bg-[#1DB954]" />
            </div>
          </Section>
        </div>
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
    <section className="flex flex-col lg:flex-row gap-10 lg:gap-20">
      <div className="lg:w-[30%] shrink-0">
        <div className="sticky top-32">
          <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
            {number} //
          </p>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-black dark:text-white mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed pr-4">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="lg:w-[70%]">{children}</div>
    </section>
  );
}

function Tool({ icon, name, color, subtitle }: { icon: string; name: string; color: string; subtitle?: string }) {
  const isImage = icon.startsWith("http") || icon.startsWith("/");

  return (
    <div className="group relative flex items-center gap-5 p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.08] hover:border-black/10 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 overflow-hidden cursor-default">
      {/* Glow effect on hover based on brand color */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500" style={{ backgroundColor: color.replace('bg-[', '').replace(']', '') }} />
      
      {/* Icon Container */}
      <div
        className={cn(
          "relative z-10 w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
          color
        )}
      >
        {isImage ? (
          <Image src={icon} alt={name} width={32} height={32} className="w-7 h-7 object-contain drop-shadow-md" unoptimized />
        ) : (
          icon
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col text-left">
        <span className="text-base font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {name}
        </span>
        {subtitle && (
          <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/10 text-black dark:text-white text-xs font-medium font-mono">
      {children}
    </span>
  );
}