"use client";
import { stack } from "@/data/stack";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.tech-item');
      gsap.from(items, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">
          Tech Stack
        </h3>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Updated 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {stack.map((tech) => (
          <div
            key={tech.name}
            className="tech-item flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors group cursor-default border border-neutral-100 dark:border-neutral-800"
          >
            <tech.icon
              size={20}
              className="text-neutral-500 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              strokeWidth={1.5}
            />
            <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
