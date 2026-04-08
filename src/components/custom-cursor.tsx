"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring
  const springX = useSpring(mouseX, { damping: 40, stiffness: 300, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // Only mount on desktop/devices with fine pointers
    if (window.matchMedia("(pointer: fine)").matches) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Find if we are hovering an interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
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
  }, [mounted, mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderWidth: isHovering ? "0px" : "1.5px",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
