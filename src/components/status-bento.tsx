"use client";

import { motion } from "framer-motion";
import { Play, Music, Terminal, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2"
      >
        <div className="relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-950/90 ring-1 ring-white/10 p-8 flex flex-col justify-between min-h-[220px] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-35px_rgba(124,58,237,0.45)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-45px_rgba(59,130,246,0.35)]">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
            </div>
        
            <div className="relative">
              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/50 blur-[6px]" />
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"></span>
                  </span>
                  <span className="text-xs font-mono text-neutral-300/80 uppercase tracking-wider">
                    Current Focus
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-medium">
                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    Disponible
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    Remoto
                  </span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                Building scalable SaaS products
              </h3>
              <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
                Actualmente enfocado en desarrollo full-stack, optimización de rendimiento y arquitecturas modernas.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-7">
              <Badge
                variant="outline"
                className="bg-white/5 border-white/10 text-neutral-200/80 backdrop-blur-md"
              >
                <Code2 data-icon="inline-start" />
                Next.js
              </Badge>
              <Badge
                variant="outline"
                className="bg-white/5 border-white/10 text-neutral-200/80 backdrop-blur-md"
              >
                <Terminal data-icon="inline-start" />
                TypeScript
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-transparent"
      >
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950/90 ring-1 ring-white/10 p-6 flex flex-col justify-between min-h-[220px] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-35px_rgba(59,130,246,0.35)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_90px_-45px_rgba(59,130,246,0.45)]">
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
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-200/70">
                Last.fm
              </span>
              {(nowPlaying?.isPlaying || isLoading) && (
                <div className="flex items-end gap-[2px] h-3">
                  {bars.map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: `${height * 30}%` }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="w-1 bg-blue-400 rounded-t-sm shadow-[0_0_12px_rgba(59,130,246,0.55)]"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative flex gap-4 items-center mt-auto">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 ring-1 ring-white/10 bg-neutral-900">
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
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    onError={() => setCoverSrc(fallbackCover)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {nowPlaying?.isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center ring-1 ring-white/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]">
                        <Play size={11} className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col overflow-hidden w-full">
            {isLoading ? (
              <>
                <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse mb-2"></div>
                <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse"></div>
              </>
            ) : (
              <>
                <Link 
                  href={nowPlaying?.url || "#"} 
                  target="_blank"
                  className="text-sm font-medium text-white hover:text-blue-200 transition-colors truncate"
                  title={nowPlaying?.title}
                >
                  {nowPlaying?.title || "Sin reproducción"}
                </Link>
                <span className="text-xs text-neutral-300/70 mt-1 truncate" title={nowPlaying?.artist}>
                  {nowPlaying?.artist || "Desconocido"}
                </span>
                
                {nowPlaying?.isPlaying ? (
                  <span className="text-[10px] text-neutral-200/70 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></span>
                    EN VIVO · YouTube
                  </span>
                ) : (
                  <span className="text-[10px] text-neutral-200/60 mt-1">
                    Última escuchada
                  </span>
                )}
              </>
            )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
