"use client";

import { profile } from "@/data/profile";
import { ArrowRight, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { AuroraBloom } from "@/components/ui/aurora-bloom";

import confetti from "canvas-confetti";

export function Hero() {
  const handleConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    (function frame() {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full min-h-screen overflow-hidden bg-black selection:bg-blue-500/30 pb-40">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <AuroraBloom intensity="normal" />
        <StarsBackground
          starDensity={0.00009}
          allStarsTwinkle={true}
          twinkleProbability={0.55}
          minTwinkleSpeed={0.6}
          maxTwinkleSpeed={1.2}
          className="opacity-35"
        />
        <ShootingStars
          starColor="#A5B4FC"
          trailColor="#22D3EE"
          minSpeed={10}
          maxSpeed={22}
          minDelay={4500}
          maxDelay={9500}
          className="opacity-15"
        />
      </div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-grain mix-blend-overlay"></div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center max-w-5xl px-6 md:px-0 mt-[-5vh]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]"
        >
          <span className="text-xs text-neutral-300 font-medium tracking-wide">
            Disponible para nuevos proyectos
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
            delay: 0.1,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight text-white leading-[1.1]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Código con alma.
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-400 to-neutral-600 font-sans tracking-tighter font-semibold">
            Ingeniería que escala.
          </span>
        </motion.h1>

        {/* Subtitle / Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center gap-3 text-lg text-neutral-400 max-w-xl font-sans mx-auto"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-white">
            {profile.name.charAt(0)}
          </div>
          <p>
            Hola, soy {profile.name}. {profile.role}.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-12"
        >
          <a
            href="mailto:pabloroga6@gmail.com"
            onClick={handleConfetti}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)]"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Empezar proyecto{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </a>

          <button
            className="group flex items-center gap-2 text-neutral-400 hover:text-white text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-white/5"
            onClick={() => {
              navigator.clipboard.writeText("pabloroga6@gmail.com");
            }}
          >
            <Copy
              size={14}
              className="group-hover:text-blue-400 transition-colors"
            />
            <span>pabloroga6@gmail.com</span>
          </button>
        </motion.div>
      </div>

    </div>
  );
}
