"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function PrismShape() {
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
    meshRef.current.rotation.z += delta * 0.1;

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
      <mesh ref={meshRef} scale={3.5}>
        {/* An Icosahedron with 0 detail creates a perfect sharp 20-sided diamond/crystal shape */}
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={1.5}
          roughness={0.05} // Very smooth and reflective
          transmission={1} // Fully transparent glass
          ior={1.5} // Index of refraction for glass/crystal
          chromaticAberration={0.15} // Splits light into RGB on the edges
          anisotropy={0.1}
          distortion={0} // No distortion, keep faces flat
          color={isDark ? "#ffffff" : "#000000"}
          attenuationDistance={5}
          attenuationColor={isDark ? "#ffffff" : "#000000"}
        />
      </mesh>
    </Float>
  );
}

export function Hero3DPrism() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 40 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[-10, -10, -10]} intensity={1} />
        
        {/* Environment map is crucial for glass materials to have something to reflect/refract */}
        <Environment preset="city" />
        <PrismShape />
      </Canvas>
    </div>
  );
}