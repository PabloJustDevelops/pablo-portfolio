"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

const LOCATIONS = [
  {
    name: "ESPAÑA",
    lat: 40.4168,
    lng: -3.7038, // Note: react-globe.gl uses lng instead of lon
    id: "spain",
  },
  {
    name: "UK",
    lat: 51.5074,
    lng: -0.1278,
    id: "uk",
  },
  {
    name: "FRANCIA",
    lat: 48.8566,
    lng: 2.3522,
    id: "france",
  },
];

const ARCS = [
  {
    startLat: LOCATIONS[0].lat,
    startLng: LOCATIONS[0].lng,
    endLat: LOCATIONS[2].lat,
    endLng: LOCATIONS[2].lng,
    color: ["rgba(255, 255, 255, 0.8)", "rgba(59, 130, 246, 0.8)"],
  },
  {
    startLat: LOCATIONS[2].lat,
    startLng: LOCATIONS[2].lng,
    endLat: LOCATIONS[1].lat,
    endLng: LOCATIONS[1].lng,
    color: ["rgba(59, 130, 246, 0.8)", "rgba(255, 255, 255, 0.8)"],
  },
];

interface GlobeProps {
  className?: string;
  globeRef?: React.RefObject<unknown>;
}

export function Globe({ className, globeRef }: GlobeProps) {
  const internalGlobeRef = useRef<unknown>(undefined);
  const activeRef = globeRef || internalGlobeRef;
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 350, height: 350 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Auto-rotate setup
    if (activeRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const controls = (activeRef.current as any).controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      
      // Point the camera to Europe initially
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (activeRef.current as any).pointOfView({ lat: 45, lng: 0, altitude: 2.5 }, 1000);
    }

    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: width });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, activeRef]);

  if (!mounted) {
    return (
      <div 
        className={cn("relative aspect-square w-full max-w-[350px] bg-transparent", className)} 
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative aspect-square w-full max-w-[350px] cursor-grab active:cursor-grabbing", className)}
    >
      <ReactGlobe
        // @ts-expect-error - ReactGlobe ref types are incomplete
        ref={activeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        
        // Rings (Points)
        ringsData={LOCATIONS}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => "#3b82f6"}
        ringMaxRadius={3}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1000}
        
        // Arcs
        arcsData={ARCS}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitudeAutoScale={0.2}
        arcStroke={1}

        // Labels instead of HTML Elements for better 3D performance and z-indexing
        labelsData={LOCATIONS}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.5}
        labelDotRadius={0.5}
        labelColor={() => "rgba(255, 255, 255, 0.9)"}
        labelResolution={2}
        labelAltitude={0.01}
        labelTypeface="https://unpkg.com/three-globe/example/fonts/helvetiker_regular.typeface.json"
      />
    </div>
  );
}

export default Globe;
