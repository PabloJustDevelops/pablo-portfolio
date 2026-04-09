"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function MobiusShape() {
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
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.z += delta * 0.05;

    // Add mouse parallax
    targetRotation.current.x = mousePosition.y * 0.8;
    targetRotation.current.y = mousePosition.x * 0.8;

    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 5 * delta;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 5 * delta;

    meshRef.current.rotation.x += currentRotation.current.x * delta;
    meshRef.current.rotation.y += currentRotation.current.y * delta;
  });

  const isDark = theme === "dark" || theme === "system";

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        {/* p=1, q=2 creates an infinity loop (Mobius strip like) knot */}
        <torusKnotGeometry args={[1.8, 0.6, 256, 64, 1, 2]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={1.5}
          roughness={0.1} // Slightly frosted for better light catching
          transmission={1} 
          ior={1.5} 
          chromaticAberration={0.15} 
          anisotropy={0.2}
          distortion={0.2} 
          distortionScale={0.5}
          temporalDistortion={0.1}
          color={isDark ? "#ffffff" : "#000000"}
          attenuationDistance={10}
          attenuationColor={isDark ? "#ffffff" : "#000000"}
        />
      </mesh>
    </Float>
  );
}

export function Hero3DMobius() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 40 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[-10, -10, -10]} intensity={1} />
        <Environment preset="city" />
        <MobiusShape />
      </Canvas>
    </div>
  );
}