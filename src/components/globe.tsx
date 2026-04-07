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
  globeRef?: React.RefObject<any>;
}

export function Globe({ className, globeRef }: GlobeProps) {
  const internalGlobeRef = useRef<unknown>(undefined);
  const activeRef = globeRef || internalGlobeRef;
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 350, height: 350 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
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
  }, []);

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

        // HTML Elements (Tooltips)
        htmlElementsData={LOCATIONS}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.innerHTML = `
            <div class="flex flex-col items-center group transition-transform duration-300 hover:scale-110">
              <div class="bg-white/90 backdrop-blur-sm text-black px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shadow-lg rounded-sm border border-white/20">
                ${d.name}
              </div>
              <div class="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-white/90"></div>
              <div class="w-1.5 h-1.5 mt-0.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
            </div>
          `;
          el.style.pointerEvents = "auto";
          el.style.transform = "translate(-50%, -100%)";
          return el;
        }}
      />
    </div>
  );
}

export default Globe;
