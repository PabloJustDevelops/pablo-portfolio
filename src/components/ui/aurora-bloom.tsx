"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type AuroraBloomProps = {
  className?: string;
  intensity?: "soft" | "normal" | "strong";
};

const intensityMap: Record<NonNullable<AuroraBloomProps["intensity"]>, number> = {
  soft: 0.75,
  normal: 1,
  strong: 1.25,
};

export function AuroraBloom({ className, intensity = "normal" }: AuroraBloomProps) {
  const k = intensityMap[intensity];
  const motionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && motionRef.current) {
      gsap.to(motionRef.current, {
        x: `+=${18 * k}`,
        y: `-=${14 * k}`,
        rotation: 6,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(motionRef.current, {
        x: `-=${28 * k}`,
        y: `+=${24 * k}`,
        rotation: -4,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 6, // Offset to create complex motion
      });
    }
  }, [k]);

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />

      <div
        ref={motionRef}
        className="absolute -inset-[30%] opacity-80 mix-blend-screen"
      >
        <div className="absolute inset-0 blur-[120px] bg-[radial-gradient(ellipse_55%_40%_at_35%_28%,_oklch(0.623_0.214_259.815_/_0.30)_0%,_transparent_68%)]" />
        <div className="absolute inset-0 blur-[130px] bg-[radial-gradient(ellipse_45%_35%_at_70%_30%,_oklch(0.809_0.105_251.813_/_0.22)_0%,_transparent_66%)]" />
        <div className="absolute inset-0 blur-[150px] bg-[radial-gradient(ellipse_60%_48%_at_50%_72%,_oklch(0.546_0.245_262.881_/_0.18)_0%,_transparent_70%)]" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_55%,_transparent_35%,_rgba(0,0,0,0.55)_72%,_rgba(0,0,0,0.92)_100%)]" />
    </div>
  );
}
