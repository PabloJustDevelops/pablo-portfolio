"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ExperienceItem } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const desktopRailRef = useRef<HTMLDivElement>(null);
  const desktopHaloRef = useRef<HTMLDivElement>(null);

  const mobileRailRef = useRef<HTMLDivElement>(null);
  const mobileHaloRef = useRef<HTMLDivElement>(null);

  const metaProbeRef = useRef<HTMLDivElement>(null);
  const contentProbeRef = useRef<HTMLDivElement>(null);

  const chaptersRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopX, setDesktopX] = useState<number | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const chapterTriggers: ScrollTrigger[] = [];

    chaptersRef.current.forEach((el, idx) => {
      if (!el) return;
      chapterTriggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(idx);
          },
        })
      );
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!desktopRailRef.current || !desktopHaloRef.current) return;

      let maxY = 0;
      const measure = () => {
        const railRect = desktopRailRef.current!.getBoundingClientRect();
        const haloRect = desktopHaloRef.current!.getBoundingClientRect();
        maxY = Math.max(0, railRect.height - haloRect.height);

        if (sectionRef.current && metaProbeRef.current && contentProbeRef.current) {
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const metaRect = metaProbeRef.current.getBoundingClientRect();
          const contentRect = contentProbeRef.current.getBoundingClientRect();
          const x = (metaRect.right + contentRect.left) / 2 - sectionRect.left;
          setDesktopX(x);
        }
      };

      measure();

      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(desktopHaloRef.current!, { y: p * maxY });
        },
      });

      const onRefresh = () => {
        measure();
        st.update();
      };

      ScrollTrigger.addEventListener("refresh", onRefresh);

      return () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        st.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      if (!mobileRailRef.current || !mobileHaloRef.current) return;

      let maxY = 0;
      const measure = () => {
        const railRect = mobileRailRef.current!.getBoundingClientRect();
        const haloRect = mobileHaloRef.current!.getBoundingClientRect();
        maxY = Math.max(0, railRect.height - haloRect.height);
      };

      measure();

      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(mobileHaloRef.current!, { y: p * maxY });
        },
      });

      const onRefresh = () => {
        measure();
        st.update();
      };

      ScrollTrigger.addEventListener("refresh", onRefresh);

      return () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        st.kill();
      };
    });

    return () => {
      mm.revert();
      chapterTriggers.forEach((t) => t.kill());
    };
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative">
      <div className="md:hidden pointer-events-none absolute left-4 top-0 bottom-0 w-6 z-20">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative h-[60vh] w-6 flex items-stretch justify-center">
            <div ref={mobileRailRef} className="relative h-full w-[2px] bg-white/15 dark:bg-white/20 rounded-full">
              <div
                ref={mobileHaloRef}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: 0 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 -m-5 rounded-full bg-cyan-400/30 blur-xl" />
                  <div className="w-3 h-3 rounded-full bg-cyan-300 border border-white/50 shadow-[0_0_30px_rgba(34,211,238,0.55)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {desktopX !== null && (
        <div
          className="hidden md:block pointer-events-none absolute top-0 bottom-0 -translate-x-1/2 w-10 z-20"
          style={{ left: desktopX }}
        >
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative h-[70vh] w-10 flex items-stretch justify-center">
              <div
                ref={desktopRailRef}
                className="relative h-full w-[2px] bg-white/15 dark:bg-white/20 rounded-full"
              />
              <div
                ref={desktopHaloRef}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ top: 0 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 -m-7 rounded-full bg-cyan-400/35 blur-2xl" />
                  <div className="w-4 h-4 rounded-full bg-cyan-300 border border-white/50 shadow-[0_0_40px_rgba(34,211,238,0.65)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {items.map((exp, idx) => (
          <section
            key={`${exp.company}-${exp.period}-${idx}`}
            ref={(el) => {
              chaptersRef.current[idx] = el;
            }}
            className="relative border-b border-black/5 dark:border-white/5 md:min-h-[85vh]"
          >
            <div className="md:grid md:grid-cols-[1fr_80px_1.6fr] md:gap-0">
              <div
                ref={idx === 0 ? metaProbeRef : undefined}
                className="pl-12 pr-6 py-10 md:px-6 md:py-12"
              >
                <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
                  {exp.period}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-black dark:text-white mb-2">
                  {exp.company}
                </h2>
                {(exp.location || exp.scope) && (
                  <div className="text-neutral-500 dark:text-neutral-400 text-sm space-y-1">
                    {exp.location && <div>{exp.location}</div>}
                    {exp.scope && <div>{exp.scope}</div>}
                  </div>
                )}
              </div>

              <div className="hidden md:block" />

              <div
                ref={idx === 0 ? contentProbeRef : undefined}
                className="pl-12 pr-6 pb-10 md:px-6 md:py-12 flex flex-col gap-6"
              >
                <div className="space-y-4">
                  <h3
                    className={[
                      "text-3xl md:text-4xl font-serif",
                      idx === activeIndex ? "text-black dark:text-white" : "text-black/70 dark:text-white/70",
                    ].join(" ")}
                  >
                    {exp.role}
                  </h3>
                  {exp.summary && (
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {exp.summary}
                    </p>
                  )}
                </div>

                <ul className="space-y-3">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex gap-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.stack && exp.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.stack.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {exp.links && exp.links.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {exp.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white underline underline-offset-4"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
