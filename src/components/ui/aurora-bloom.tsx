"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
  const k = intensityMap[intensity];

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />

      <motion.div
        className="absolute -inset-[30%] opacity-80 mix-blend-screen"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 18 * k, -10 * k, 0],
                y: [0, -14 * k, 10 * k, 0],
                rotate: [0, 6, -4, 0],
              }
        }
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="absolute inset-0 blur-[120px] bg-[radial-gradient(ellipse_55%_40%_at_35%_28%,_oklch(0.623_0.214_259.815_/_0.30)_0%,_transparent_68%)]" />
        <div className="absolute inset-0 blur-[130px] bg-[radial-gradient(ellipse_45%_35%_at_70%_30%,_oklch(0.809_0.105_251.813_/_0.22)_0%,_transparent_66%)]" />
        <div className="absolute inset-0 blur-[150px] bg-[radial-gradient(ellipse_60%_48%_at_50%_72%,_oklch(0.546_0.245_262.881_/_0.18)_0%,_transparent_70%)]" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_55%,_transparent_35%,_rgba(0,0,0,0.55)_72%,_rgba(0,0,0,0.92)_100%)]" />
    </div>
  );
}
