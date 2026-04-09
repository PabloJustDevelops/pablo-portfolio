"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !dotRef.current || !ringRef.current) return;

    // Create quickTo instances for high performance
    const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0, ease: "none" });
    const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0, ease: "none" });
    
    // Ring follows with a spring-like delay
    const xRing = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      
      if (isInteractive) {
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
        gsap.to(ringRef.current, { 
          scale: 1.5, 
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderWidth: 0,
          duration: 0.2 
        });
      } else {
        gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
        gsap.to(ringRef.current, { 
          scale: 1, 
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderWidth: 1.5,
          duration: 0.2 
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(dotRef.current, { scale: 0.5, duration: 0.1 });
      gsap.to(ringRef.current, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.1 });
      gsap.to(ringRef.current, { scale: 1, duration: 0.1 });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mounted, isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease"
        }}
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease"
        }}
      />
    </>
  );
}
