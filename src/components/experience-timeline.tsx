"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TechBadge } from "@/components/tech-badge";
import type { ExperienceItem } from "@/data/experience";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const detailSectionsRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const detailIds = useMemo(() => items.map((item) => `experience-${item.id}`), [items]);
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const entries = detailSectionsRef.current
      .map((el, idx) => ({ el, idx }))
      .filter((item): item is { el: HTMLElement; idx: number } => item.el !== null);

    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const candidates = observerEntries
          .filter((e) => e.isIntersecting)
          .map((e) => {
            const idx = Number((e.target as HTMLElement).dataset.index ?? "-1");
            return { idx, ratio: e.intersectionRatio, top: e.boundingClientRect.top };
          })
          .filter((c) => Number.isFinite(c.idx) && c.idx >= 0);

        if (candidates.length === 0) return;

        candidates.sort((a, b) => b.ratio - a.ratio || Math.abs(a.top) - Math.abs(b.top));
        const nextIndex = candidates[0]?.idx;
        if (nextIndex === undefined) return;
        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    );

    entries.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [detailIds]);

  const scrollTo = (idx: number) => {
    if (typeof window === "undefined") return;
    const id = detailIds[idx];
    const target = id ? document.getElementById(id) : null;
    target?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    setActiveIndex(idx);
  };

  return (
    <div className="relative">
      <div className="md:hidden sticky top-20 z-20 bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-black/5 dark:border-white/5">
        <nav
          aria-label="Índice de experiencia"
          className={cn(
            "px-4 py-3 flex gap-2 overflow-x-auto",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {items.map((exp, idx) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-current={idx === activeIndex ? "true" : undefined}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "shrink-0 h-8 px-3 rounded-full border border-black/10 dark:border-white/10",
                idx === activeIndex
                  ? "bg-black/10 dark:bg-white/10 text-black dark:text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              )}
            >
              <span className="font-medium">{exp.company}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <aside className="hidden md:block border-r border-black/5 dark:border-white/5">
          <div className="sticky top-24 px-6 py-12">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                Índice
              </div>
              <div className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                {(activeIndex + 1).toString().padStart(2, "0")} / {items.length.toString().padStart(2, "0")}
              </div>
            </div>

            <nav aria-label="Índice de experiencia" className="flex flex-col gap-1">
              {items.map((exp, idx) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => scrollTo(idx)}
                  aria-current={idx === activeIndex ? "true" : undefined}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "h-auto items-start justify-start gap-2 px-3 py-2 rounded-xl border border-transparent text-left",
                    idx === activeIndex
                      ? "bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  <span className="flex flex-col">
                    <span className="text-sm font-medium leading-tight">{exp.company}</span>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-500 leading-tight">
                      {exp.period}
                    </span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex flex-col">
          {items.map((exp, idx) => (
            <section
              key={exp.id}
              id={detailIds[idx]}
              data-index={idx}
              ref={(el) => {
                detailSectionsRef.current[idx] = el;
              }}
              className="scroll-mt-28 border-b border-black/5 dark:border-white/5 px-4 md:px-8 py-12 md:py-16"
            >
              <Card
                className={cn(
                  "bg-white/60 dark:bg-white/[0.02] ring-1 ring-black/5 dark:ring-white/10",
                  idx === activeIndex && "ring-black/15 dark:ring-white/20"
                )}
              >
                <CardHeader className="border-b border-black/5 dark:border-white/5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20">
                      {exp.period}
                    </Badge>
                    {exp.location && (
                      <Badge variant="outline" className="text-neutral-600 dark:text-neutral-300">
                        {exp.location}
                      </Badge>
                    )}
                    {exp.scope && (
                      <Badge variant="outline" className="text-neutral-600 dark:text-neutral-300">
                        {exp.scope}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-3 space-y-1">
                    <CardTitle className="text-2xl md:text-3xl font-serif text-black dark:text-white">
                      {exp.role}
                    </CardTitle>
                    <CardDescription className="text-neutral-600 dark:text-neutral-400">
                      {exp.company}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8">
                  {exp.summary && (
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {exp.summary}
                    </p>
                  )}

                  {exp.impact && exp.impact.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {exp.impact.map((i) => (
                        <div
                          key={`${exp.id}-${i.label}-${i.value}`}
                          className="rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-4 py-3"
                        >
                          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                            {i.label}
                          </div>
                          <div className="mt-1 text-lg font-semibold text-black dark:text-white">
                            {i.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="space-y-3">
                    {exp.highlights.map((item, i) => (
                      <li
                        key={`${exp.id}-highlight-${i}`}
                        className="flex gap-3 text-neutral-700 dark:text-neutral-300 leading-relaxed"
                      >
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.stack && exp.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((tag) => (
                        <TechBadge key={`${exp.id}-${tag}`} name={tag} />
                      ))}
                    </div>
                  )}
                </CardContent>

                {exp.links && exp.links.length > 0 && (
                  <CardFooter className="gap-2 flex-wrap justify-end border-black/5 dark:border-white/10 bg-transparent">
                    {exp.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-8 rounded-full border-black/10 dark:border-white/10 bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
                        )}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </CardFooter>
                )}
              </Card>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
