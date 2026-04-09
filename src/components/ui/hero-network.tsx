"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function HeroNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    
    // Mouse state
    let mouseX = -1000;
    let mouseY = -1000;
    let isActive = false;

    // Configuration
    const POINT_COUNT = 120; // Slightly more points to fill screen
    const MAX_DISTANCE = 160; // Distance to connect points
    const MOUSE_RADIUS = 250; // Distance for mouse interaction
    const POINT_SPEED = 0.4;

    const isDark = theme === "dark" || theme === "system";
    const primaryColor = isDark ? "255, 255, 255" : "0, 0, 0";
    const accentColor = isDark ? "167, 139, 250" : "59, 130, 246"; // Violet/Blue

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Initialize points
    const initPoints = () => {
      points = [];
      for (let i = 0; i < POINT_COUNT; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * POINT_SPEED,
          vy: (Math.random() - 0.5) * POINT_SPEED,
          radius: Math.random() * 1.5 + 0.8, // Slightly bigger dots
        });
      }
    };

    // Handle resize with ResizeObserver
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      initPoints();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    } else {
      resizeObserver.observe(document.body);
    }

    // Mouse events directly on window to track smoothly everywhere
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isActive = true;
    };

    const handleMouseLeave = () => {
      isActive = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial setup
    handleResize();

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls smoothly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (repel slightly)
        if (isActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // Draw point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const pointOpacity = isActive && Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2)) < MOUSE_RADIUS ? 0.9 : 0.4;
        ctx.fillStyle = `rgba(${primaryColor}, ${pointOpacity})`;
        ctx.fill();

        // Connect points
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Calculate opacity based on distance
            let opacity = (1 - dist / MAX_DISTANCE) * 0.2;
            
            // Highlight connections near mouse
            let isNearMouse = false;
            if (isActive) {
              const mouseDist1 = Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2));
              const mouseDist2 = Math.sqrt(Math.pow(mouseX - p2.x, 2) + Math.pow(mouseY - p2.y, 2));
              
              if (mouseDist1 < MOUSE_RADIUS || mouseDist2 < MOUSE_RADIUS) {
                opacity = Math.min(opacity * 3, 0.8); // Make lines near mouse brighter
                isNearMouse = true;
              }
            }

            ctx.strokeStyle = isNearMouse ? `rgba(${accentColor}, ${opacity})` : `rgba(${primaryColor}, ${opacity})`;
            ctx.lineWidth = isNearMouse ? 1.5 : 0.5;
            ctx.stroke();
          }
        }
        
        // Connect directly to mouse cursor if very close
        if (isActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE * 0.8) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            const opacity = (1 - dist / (MAX_DISTANCE * 0.8)) * 0.4;
            ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto"
      />
      {/* Reduced the aggressive gradient masks so the network is fully visible */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white dark:to-black opacity-50" />
    </div>
  );
}