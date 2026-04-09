"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
}

export function HeroNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
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
    const POINT_COUNT = 100;
    const MAX_DISTANCE = 150; // Distance to connect points
    const MOUSE_RADIUS = 200; // Distance for mouse interaction
    const POINT_SPEED = 0.5;

    const isDark = theme === "dark" || theme === "system";
    const primaryColor = isDark ? "255, 255, 255" : "0, 0, 0";
    const accentColor = isDark ? "167, 139, 250" : "59, 130, 246"; // Violet/Blue

    // Initialize points
    const initPoints = () => {
      points = [];
      const width = canvas.width;
      const height = canvas.height;
      
      for (let i = 0; i < POINT_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * POINT_SPEED,
          vy: (Math.random() - 0.5) * POINT_SPEED,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    // Handle resize
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Setup canvas for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      initPoints();
    };

    // Mouse events
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

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial setup
    handleResize();

    // Animation Loop
    const render = () => {
      // Use logical coordinates for drawing
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);

      // Update and draw points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (repel)
        if (isActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            // Push away from mouse
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }
        }

        // Draw point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor}, ${isActive && Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2)) < MOUSE_RADIUS ? 0.8 : 0.3})`;
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
            
            // Calculate opacity based on distance (closer = more opaque)
            let opacity = (1 - dist / MAX_DISTANCE) * 0.15;
            
            // Highlight connections near mouse
            let isNearMouse = false;
            if (isActive) {
              const mouseDist1 = Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2));
              const mouseDist2 = Math.sqrt(Math.pow(mouseX - p2.x, 2) + Math.pow(mouseY - p2.y, 2));
              
              if (mouseDist1 < MOUSE_RADIUS || mouseDist2 < MOUSE_RADIUS) {
                opacity *= 2.5; // Make lines near mouse brighter
                isNearMouse = true;
              }
            }

            ctx.strokeStyle = isNearMouse ? `rgba(${accentColor}, ${opacity})` : `rgba(${primaryColor}, ${opacity})`;
            ctx.lineWidth = isNearMouse ? 1.5 : 0.5;
            ctx.stroke();
          }
        }
        
        // Connect to mouse if close enough
        if (isActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE * 1.2) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            const opacity = (1 - dist / (MAX_DISTANCE * 1.2)) * 0.3;
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
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden opacity-70", className)}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto"
      />
      {/* Soft gradient overlay to fade out the network at the edges */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white dark:to-black opacity-80" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white dark:from-black via-transparent to-white dark:to-black opacity-60" />
    </div>
  );
}