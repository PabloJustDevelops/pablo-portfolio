"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function TorusShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  // Smoothly interpolate mouse position for rotation parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-1, 1]
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Base continuous slow rotation
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    // Add mouse parallax
    targetRotation.current.x = mousePosition.y * 0.5;
    targetRotation.current.y = mousePosition.x * 0.5;

    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 5 * delta;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 5 * delta;

    meshRef.current.rotation.x += currentRotation.current.x * delta;
    meshRef.current.rotation.y += currentRotation.current.y * delta;
  });

  const isDark = theme === "dark" || theme === "system"; // Assuming system is dark by default for the hero

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[10, 3.5, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1.5}
          roughness={0.15}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color={isDark ? "#ffffff" : "#0a0a0a"}
          attenuationDistance={10}
          attenuationColor={isDark ? "#ffffff" : "#000000"}
        />
      </mesh>
    </Float>
  );
}

export function Hero3DTorus() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 45], fov: 40 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="city" />
        <TorusShape />
      </Canvas>
    </div>
  );
}