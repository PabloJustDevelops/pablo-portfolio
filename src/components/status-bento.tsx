"use client";

import { Play, Music, Terminal, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type NowPlayingData = {
  title: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  isPlaying: boolean;
};

export function StatusBento() {
  // Simulación de barras de ecualizador animadas
  const [bars, setBars] = useState([1, 2, 1, 3]);
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para el reloj en vivo
  const [time, setTime] = useState<string>("");
  
  // Datos simulados para el gráfico de actividad
  const activityData = useMemo(() => {
    return Array.from({ length: 18 }).map(() => 
      Array.from({ length: 4 }).map(() => Math.random())
    );
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  const fallbackCover = useMemo(
    () =>
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop",
    []
  );
  const cover = nowPlaying?.image || fallbackCover;
  const [coverSrc, setCoverSrc] = useState(cover);

  useEffect(() => {
    setCoverSrc(cover);
  }, [cover]);

  // Efecto para las barras de audio
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(bars.map(() => Math.floor(Math.random() * 3) + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [bars]);

  // Efecto para obtener la canción
  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (res.ok) {
          const data = await res.json();
          setNowPlaying(data);
        }
      } catch (error) {
        console.error("Error al obtener Now Playing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    // Opcional: Actualizar cada 30 segundos
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = [leftCardRef.current, rightCardRef.current].filter((el): el is HTMLDivElement => el !== null);
    
    if (cards.length > 0 && containerRef.current) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all" // Very important for flex/grid layouts after animation!
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        ref={leftCardRef}
        className="md:col-span-2 h-full"
      >
        <div className="relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent h-full">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-950/90 ring-1 ring-white/10 p-8 flex flex-col justify-between min-h-[220px] h-full shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-35px_rgba(124,58,237,0.45)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-45px_rgba(59,130,246,0.35)]">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
            </div>
        
            <div className="relative flex flex-col h-full">
              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/50 blur-[6px]" />
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"></span>
                  </span>
                  <span className="text-xs font-mono text-neutral-300/80 uppercase tracking-wider">
                    Codificando
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-inner">
                  <span className="text-emerald-400 animate-pulse">●</span> {time ? `${time} LOCAL` : '00:00:00 LOCAL'}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-serif text-black dark:text-white mb-2 leading-tight">
                  Building scalable SaaS products
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md leading-relaxed mb-6">
                  Actualmente enfocado en desarrollo full-stack, optimización de rendimiento y arquitecturas modernas.
                </p>

                {/* Gráfico de actividad tipo GitHub */}
                <div className="flex flex-col gap-2.5 opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider flex items-center gap-2">
                    Actividad Reciente
                  </span>
                  <div className="flex gap-1.5 flex-wrap sm:flex-nowrap overflow-hidden">
                    {activityData.map((col, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-1.5">
                        {col.map((intensity, rowIndex) => {
                          let bgClass = "bg-white/5"; // sin actividad
                          if (intensity > 0.8) bgClass = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]";
                          else if (intensity > 0.5) bgClass = "bg-emerald-500/80";
                          else if (intensity > 0.3) bgClass = "bg-emerald-600/60";
                          else if (intensity > 0.1) bgClass = "bg-emerald-800/40";
                          
                          return (
                            <div 
                              key={rowIndex} 
                              className={`w-3 h-3 rounded-[3px] transition-all duration-300 hover:scale-150 cursor-crosshair ${bgClass}`}
                              title={`Actividad: ${Math.round(intensity * 100)}%`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={rightCardRef}
        className="relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent h-full"
      >
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950/90 ring-1 ring-white/10 p-6 flex flex-col justify-between min-h-[220px] h-full shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-35px_rgba(59,130,246,0.35)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-45px_rgba(59,130,246,0.45)]">
          <div
            className="absolute -inset-8 opacity-30 blur-2xl scale-110"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/65 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-70" />
        
          <div className="relative flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Music size={14} className="text-neutral-200/80" />
              <span className="text-xs font-mono text-neutral-200/80 uppercase tracking-wider">
                {nowPlaying?.isPlaying ? "Now Playing" : "Recently Played"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] text-neutral-200/70">
                Last.fm
              </span>
              {(nowPlaying?.isPlaying || isLoading) && (
                <div className="flex items-end gap-[2px] h-3">
                  {bars.map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height * 30}%`, transition: "height 0.4s ease-in-out" }}
                      className="w-1 bg-blue-400 rounded-t-sm shadow-[0_0_12px_rgba(59,130,246,0.55)]"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center flex-1 gap-5 mt-4 mb-2">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 ring-1 ring-white/10 bg-neutral-900 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-white/10" />
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music className="text-neutral-600 animate-pulse" />
                </div>
              ) : (
                <>
                  <Image
                    src={coverSrc}
                    alt={nowPlaying?.title || "Portada"}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                    onError={() => setCoverSrc(fallbackCover)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {nowPlaying?.isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center ring-1 ring-white/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]">
                        <Play size={16} className="text-black dark:text-white ml-1" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col items-center text-center overflow-hidden w-full px-2">
            {isLoading ? (
              <>
                <div className="h-5 bg-black/10 dark:bg-white/10 rounded w-3/4 animate-pulse mb-3"></div>
                <div className="h-3 bg-black/5 dark:bg-white/5 rounded w-1/2 animate-pulse mb-3"></div>
                <div className="h-5 bg-black/5 dark:bg-white/5 rounded-full w-1/3 animate-pulse mt-1"></div>
              </>
            ) : (
              <>
                <Link 
                  href={nowPlaying?.url || "#"} 
                  target="_blank"
                  className="text-base sm:text-lg font-semibold text-black dark:text-white hover:text-blue-200 transition-colors truncate w-full"
                  title={nowPlaying?.title}
                >
                  {nowPlaying?.title || "Sin reproducción"}
                </Link>
                <span className="text-sm text-neutral-300/70 mt-1 truncate w-full" title={nowPlaying?.artist}>
                  {nowPlaying?.artist || "Desconocido"}
                </span>
                
                {nowPlaying?.isPlaying ? (
                  <span className="text-[11px] text-neutral-200/80 mt-3 flex items-center justify-center gap-1.5 font-medium px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></span>
                    EN VIVO · YouTube
                  </span>
                ) : (
                  <span className="text-[11px] text-neutral-200/60 mt-3 font-medium px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-md">
                    Última escuchada
                  </span>
                )}
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
