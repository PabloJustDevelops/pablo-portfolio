"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function UsesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-32 pb-24 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-32 flex flex-col items-center">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            The Gear
          </p>
          <h1 className="text-5xl md:text-7xl font-playfair font-medium tracking-tight">
            What Powers{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 italic pr-2">
              My Work
            </span>
          </h1>
        </header>

        <div className="space-y-32">
          {/* 01 Workstation */}
          <Section number="01" title="Workstation" description="The physical tools I rely on every day.">
            <div className="rounded-3xl bg-neutral-100 dark:bg-[#111111] border border-black/5 dark:border-white/5 overflow-hidden">
              <div className="relative aspect-[16/10] bg-black w-full overflow-hidden">
                <Image
                  src="https://www.techreclaimss.com/wp-content/uploads/2025/5/1747446442/gigabyte-g5-kc-15-6-fhd-144hz-i5-10500h-2-5ghz-16gb-512gb-rtx-3060-charger-1747446447.webp" // Gigabyte G5 KC image
                  alt="Gigabyte G5 KC"
                  fill
                  className="object-cover opacity-90 object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Gigabyte G5 KC</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono tracking-tight">
                    16GB RAM · 512GB SSD · RTX 3060
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider bg-blue-500/10 w-fit">
                  Daily Driver
                </div>
              </div>
            </div>
          </Section>

          {/* 02 Dev Tools */}
          <Section number="02" title="Dev Tools" description="">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 pt-2">
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
          <Section number="03" title="CLI Tools" description="">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 pt-2">
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
          <Section number="04" title="Apps" description="">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 pt-2">
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
    <section className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-black/5 dark:border-white/5 pt-12 md:pt-16">
      <div className="md:w-1/3 shrink-0">
        <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-3">{number}</p>
        <h2 className="text-3xl font-playfair font-semibold text-black dark:text-white mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed pr-4">
            {description}
          </p>
        )}
      </div>
      <div className="md:w-2/3">{children}</div>
    </section>
  );
}

function Tool({ icon, name, color, subtitle }: { icon: string; name: string; color: string; subtitle?: string }) {
  const isImage = icon.startsWith("http") || icon.startsWith("/");

  return (
    <div className="flex flex-col items-center text-center gap-3 group cursor-default">
      <div
        className={cn(
          "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 overflow-hidden",
          color
        )}
      >
        {isImage ? (
          <Image src={icon} alt={name} width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
        ) : (
          icon
        )}
      </div>
      <div>
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors block">
          {name}
        </span>
        {subtitle && (
          <span className="text-xs text-neutral-400 dark:text-neutral-500 block mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}