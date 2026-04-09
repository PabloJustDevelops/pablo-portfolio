"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === "system";

  // Mouse tracking for subtle light movement
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetLightPos = useRef({ x: 0, y: 12 });
  const currentLightPos = useRef({ x: 0, y: 12 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Extremely slow rotation of the planet
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.z += delta * 0.02;
    }

    if (lightRef.current) {
      // Move light source based on mouse
      targetLightPos.current.x = mousePosition.x * 5;
      targetLightPos.current.y = 12 + mousePosition.y * 2;

      currentLightPos.current.x += (targetLightPos.current.x - currentLightPos.current.x) * 2 * delta;
      currentLightPos.current.y += (targetLightPos.current.y - currentLightPos.current.y) * 2 * delta;

      lightRef.current.position.x = currentLightPos.current.x;
      lightRef.current.position.y = currentLightPos.current.y;
    }
  });

  return (
    <group position={[0, -20, -10]}>
      {/* Main Light source creating the horizon glow */}
      <pointLight
        ref={lightRef}
        position={[0, 12, -5]}
        intensity={isDark ? 80 : 120}
        distance={50}
        color={isDark ? "#8b5cf6" : "#ffffff"} // Purple-ish in dark, pure white in light
      />
      
      {/* Secondary rim light */}
      <directionalLight 
        position={[0, 20, -10]} 
        intensity={isDark ? 2 : 4} 
        color={isDark ? "#ffffff" : "#f8fafc"} 
      />

      {/* The Planet */}
      <Sphere ref={meshRef} args={[24, 128, 128]}>
        <meshStandardMaterial
          color={isDark ? "#050505" : "#f1f5f9"}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
    </group>
  );
}

export function HeroHorizon() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark" || theme === "system";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* CSS Atmosphere Glow */}
      <div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[50vh] rounded-[100%] blur-[80px] opacity-60 mix-blend-screen transition-colors duration-1000 ${
          isDark 
            ? "bg-gradient-to-t from-violet-900/40 via-blue-900/20 to-transparent" 
            : "bg-gradient-to-t from-white/80 via-white/40 to-transparent"
        }`}
        style={{
          transform: "translate(-50%, 40%)"
        }}
      />
      
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{ antialias: true, alpha: true }}
        className="absolute inset-0"
      >
        <ambientLight intensity={isDark ? 0.1 : 0.8} />
        <Planet />
      </Canvas>

      {/* Fade out top */}
      <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? "from-black via-black/80" : "from-white via-white/80"} to-transparent h-1/2`} />
    </div>
  );
}