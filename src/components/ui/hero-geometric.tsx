"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";

export function HeroGeometric() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === "system";

  useGSAP(() => {
    // 1. Continuous smooth 3D rotations for the rings
    gsap.to(ring1Ref.current, {
      rotationX: 360,
      rotationY: 360,
      duration: 35,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ring2Ref.current, {
      rotationX: -360,
      rotationY: 360,
      duration: 45,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ring3Ref.current, {
      rotationX: 360,
      rotationY: -360,
      duration: 55,
      repeat: -1,
      ease: "none",
    });

    // 2. Subtle floating effect for the entire structure
    gsap.to([ring1Ref.current, ring2Ref.current, ring3Ref.current, orbRef.current], {
      y: "-=30",
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.1, // Slight delay between elements creates a very organic feel
    });

    // 3. Ultra-smooth, non-convulsing mouse tracking using gsap.quickTo
    const xTo1 = gsap.quickTo(ring1Ref.current, "x", { duration: 0.8, ease: "power3.out" });
    const yTo1 = gsap.quickTo(ring1Ref.current, "y", { duration: 0.8, ease: "power3.out" });
    
    const xTo2 = gsap.quickTo(ring2Ref.current, "x", { duration: 1.2, ease: "power3.out" });
    const yTo2 = gsap.quickTo(ring2Ref.current, "y", { duration: 1.2, ease: "power3.out" });

    const xTo3 = gsap.quickTo(ring3Ref.current, "x", { duration: 1.6, ease: "power3.out" });
    const yTo3 = gsap.quickTo(ring3Ref.current, "y", { duration: 1.6, ease: "power3.out" });

    const xToOrb = gsap.quickTo(orbRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const yToOrb = gsap.quickTo(orbRef.current, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-1 to 1) based on screen center
      const x = (e.clientX - window.innerWidth / 2) * 0.08;
      const y = (e.clientY - window.innerHeight / 2) * 0.08;

      // Apply different depths of parallax to each ring
      xTo1(x); yTo1(y);
      xTo2(-x * 0.6); yTo2(-y * 0.6);
      xTo3(x * 1.2); yTo3(y * 1.2);
      xToOrb(x * 1.5); yToOrb(y * 1.5);
    };

    // 4. Safely return to center when mouse leaves the window (prevents convulsing)
    const handleMouseLeave = () => {
      xTo1(0); yTo1(0);
      xTo2(0); yTo2(0);
      xTo3(0); yTo3(0);
      xToOrb(0); yToOrb(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-80"
      style={{ perspective: "1000px" }} // Enables CSS 3D space
    >
      {/* Core Glowing Orb */}
      <div 
        ref={orbRef}
        className={`absolute w-64 h-64 md:w-[400px] md:h-[400px] rounded-full blur-[80px] opacity-40 mix-blend-screen ${isDark ? 'bg-indigo-600' : 'bg-blue-300'}`}
        style={{ transform: "translateZ(-200px)" }}
      />

      {/* Glass Ring 1 (Outer) */}
      <div 
        ref={ring1Ref}
        className={`absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full border-[1px] md:border-[2px] ${isDark ? 'border-white/10 bg-white/[0.01]' : 'border-black/10 bg-black/[0.01]'} backdrop-blur-sm`}
        style={{ 
          transformStyle: "preserve-3d",
          boxShadow: isDark ? "inset 0 0 40px rgba(255,255,255,0.05)" : "inset 0 0 40px rgba(0,0,0,0.05)"
        }}
      />

      {/* Glass Ring 2 (Middle) */}
      <div 
        ref={ring2Ref}
        className={`absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full border-[1px] md:border-[2px] ${isDark ? 'border-white/15 bg-white/[0.02]' : 'border-black/15 bg-black/[0.02]'} backdrop-blur-md`}
        style={{ 
          transformStyle: "preserve-3d",
          boxShadow: isDark ? "inset 0 0 30px rgba(255,255,255,0.08)" : "inset 0 0 30px rgba(0,0,0,0.08)"
        }}
      />

      {/* Glass Ring 3 (Inner) */}
      <div 
        ref={ring3Ref}
        className={`absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full border-[1px] md:border-[2px] ${isDark ? 'border-white/25 bg-white/[0.03]' : 'border-black/25 bg-black/[0.03]'} backdrop-blur-lg`}
        style={{ 
          transformStyle: "preserve-3d",
          boxShadow: isDark ? "inset 0 0 20px rgba(255,255,255,0.15)" : "inset 0 0 20px rgba(0,0,0,0.15)"
        }}
      />
    </div>
  );
}