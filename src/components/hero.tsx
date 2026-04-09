"use client";

import { profile } from "@/data/profile";
import { ArrowRight, Copy } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Hero3DTorus } from "@/components/ui/hero-3d-torus";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Entrance Sequence (Timeline)
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Set initial states
    gsap.set([badgeRef.current, profileRef.current, buttonsRef.current], { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)"
    });
    
    gsap.set(backgroundRef.current, { 
      opacity: 0,
      scale: 1.1
    });

    // Split text simulation - we wrap words in spans for stagger effect
    // Since we can't use SplitText plugin (it's premium), we use a CSS trick
    // by animating the Y position from 100% to 0 inside an overflow:hidden container
    gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
      yPercent: 120,
      rotationX: -20,
      opacity: 0,
      transformOrigin: "50% 100%"
    });

    // The Sequence
    tl.to(backgroundRef.current, {
      opacity: 1,
      scale: 1,
      duration: 2.5,
      ease: "power2.out"
    })
    .to(badgeRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1
    }, "-=1.5")
    .to([titleLine1Ref.current, titleLine2Ref.current], {
      yPercent: 0,
      rotationX: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out"
    }, "-=0.8")
    .to(profileRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1
    }, "-=0.6")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1
    }, "-=0.8");

    // 2. Scroll Parallax Effect
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
      },
      y: 150, // Move down slightly slower than scroll
      opacity: 0,
      scale: 0.95,
      ease: "none"
    });

  }, { scope: containerRef });

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
    <div ref={containerRef} className="relative flex flex-col items-center justify-center text-center w-full min-h-screen overflow-hidden bg-white dark:bg-black selection:bg-blue-500/30 pb-40">
      {/* Background Effects */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <Hero3DTorus />
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
        <div
          ref={badgeRef}
          className="mb-8 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(0,0,0,0.1)]"
        >
          <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium tracking-wide">
            Disponible para nuevos proyectos
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight text-black dark:text-white leading-[1.1] flex flex-col items-center" style={{ perspective: "1000px" }}>
          {/* We wrap text in overflow-hidden containers to create a mask reveal effect */}
          <div className="overflow-hidden pb-2">
            <span ref={titleLine1Ref} className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              Código con alma.
            </span>
          </div>
          <div className="overflow-hidden pb-4">
            <span ref={titleLine2Ref} className="block text-transparent bg-clip-text bg-gradient-to-b from-neutral-400 to-neutral-600 font-sans tracking-tighter font-semibold">
              Ingeniería que escala.
            </span>
          </div>
        </h1>

        {/* Subtitle / Profile */}
        <div
          ref={profileRef}
          className="mt-4 flex items-center gap-3 text-lg text-neutral-600 dark:text-neutral-400 max-w-xl font-sans mx-auto"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-black dark:text-white">
            {profile.name.charAt(0)}
          </div>
          <p>
            Hola, soy {profile.name}. {profile.role}.
          </p>
        </div>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center gap-6 mt-12"
        >
          <a
            href="mailto:pabloroga6@gmail.com"
            onClick={handleConfetti}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]"
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
            className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
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
        </div>
      </div>

    </div>
  );
}
