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
                  src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80" // High quality generic laptop/setup
                  alt="Gigabyte G5 KC"
                  fill
                  className="object-cover opacity-90"
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
              <Tool icon="T" name="Trae" color="bg-blue-500" />
              <Tool icon="C" name="Claude Code" color="bg-orange-500" />
              <Tool icon="O" name="OpenCode" color="bg-indigo-500" />
              <Tool icon="WT" name="Windows Terminal" color="bg-neutral-800" subtitle="(Chris Titus)" />
              <Tool icon="Z" name="Zen Browser" color="bg-zinc-700" />
              <Tool icon="F" name="Figma" color="bg-pink-500" />
              <Tool icon="Fr" name="Framer" color="bg-blue-400" />
              <Tool icon="D" name="Docker" color="bg-cyan-500" />
            </div>
          </Section>

          {/* 03 CLI Tools */}
          <Section number="03" title="CLI Tools" description="">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 pt-2">
              <Tool icon="Z" name="Zsh" color="bg-emerald-600" />
              <Tool icon="T" name="tmux" color="bg-green-500" />
              <Tool icon="L" name="LazyGit" color="bg-orange-600" />
              <Tool icon="N" name="Neovim" color="bg-green-400" />
              <Tool icon="Z" name="zoxide" color="bg-purple-500" />
              <Tool icon="E" name="eza" color="bg-blue-500" />
              <Tool icon="S" name="Starship" color="bg-pink-600" />
              <Tool icon="G" name="GitHub CLI" color="bg-neutral-800" />
            </div>
          </Section>

          {/* 04 Apps */}
          <Section number="04" title="Apps" description="">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 pt-2">
              <Tool icon="R" name="Raycast" color="bg-red-500" />
              <Tool icon="N" name="Notion" color="bg-neutral-800" />
              <Tool icon="C" name="CleanShot X" color="bg-blue-400" />
              <Tool icon="S" name="Screen Studio" color="bg-purple-600" />
              <Tool icon="1" name="1Password" color="bg-blue-600" />
              <Tool icon="K" name="Karabiner" color="bg-neutral-600" subtitle="Elements" />
              <Tool icon="S" name="Spotify" color="bg-green-500" />
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
  return (
    <div className="flex flex-col items-center text-center gap-3 group cursor-default">
      <div
        className={cn(
          "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1",
          color
        )}
      >
        {icon}
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