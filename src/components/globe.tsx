"use client";

import createGlobe from "cobe";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";
import ES from "country-flag-icons/react/3x2/ES";
import GB from "country-flag-icons/react/3x2/GB";
import FR from "country-flag-icons/react/3x2/FR";

const LOCATIONS = [
  {
    name: "ESPAÑA",
    lat: 40.4168,
    lon: -3.7038,
    id: "spain",
    Flag: ES,
  },
  {
    name: "UK",
    lat: 51.5074,
    lon: -0.1278,
    id: "uk",
    Flag: GB,
  },
  {
    name: "FRANCIA",
    lat: 48.8566,
    lon: 2.3522,
    id: "france",
    Flag: FR,
  },
];

const PI = Math.PI;
const PHI = 1.618033988749895;
const SQRT5 = 2.23606797749979;
const TT_MAGIC = 0.7202100452062783;
const TAU = 6.283185307179586;
const TT_OFFSET = 3.8832220774509327;
const TT_FRAC = 0.618033988749895;
const MAP_SAMPLES = 16000;

function snapToFibonacciSample(
  dir: { x: number; y: number; z: number },
  mapSamples: number,
) {
  const _x = dir.x;
  const _y = dir.z;
  const _z = dir.y;

  const c = 1 / mapSamples;
  const p = Math.max(
    2,
    Math.floor(Math.log2(SQRT5 * mapSamples * PI * (1 - _z * _z)) * TT_MAGIC),
  );
  const t = Math.pow(PHI, p) / SQRT5;
  const e0 = Math.floor(t + 0.5);
  const e1 = Math.floor(t * PHI + 0.5);
  const o0 = (((e0 + 1) * TT_FRAC) % 1) * TAU - TT_OFFSET;
  const o1 = (((e1 + 1) * TT_FRAC) % 1) * TAU - TT_OFFSET;
  const L0 = -2 * e0;
  const L1 = -2 * e1;
  const S0 = Math.atan2(_y, _x);
  const S1 = _z - 1;
  const s = o0 * L1 - L0 * o1;
  const T0 = Math.floor((L1 * S0 - o1 * (S1 * mapSamples + 1)) / s);
  const T1 = Math.floor((-L0 * S0 + o0 * (S1 * mapSamples + 1)) / s);

  let best = PI;
  let bestX = 0;
  let bestY = 0;
  let bestZ = 0;

  for (let N = 0; N < 4; N++) {
    const P = e0 * (T0 + (N % 2)) + e1 * (T1 + Math.floor(N * 0.5));
    if (P > mapSamples) continue;
    const d = ((P * TT_FRAC) % 1) * TAU;
    const u = 1 - 2 * P * c;
    const I = Math.sqrt(1 - u * u);
    const x = Math.cos(d) * I;
    const y = Math.sin(d) * I;
    const z = u;
    const h = Math.sqrt((_x - x) ** 2 + (_y - y) ** 2 + (_z - z) ** 2);
    if (h < best) {
      best = h;
      bestX = x;
      bestY = y;
      bestZ = z;
    }
  }

  return { x: bestX, y: bestZ, z: bestY };
}

export interface GlobeRef {
  rotate: (lat: number, lon: number) => void;
}

export const Globe = forwardRef<GlobeRef, { className?: string }>(
  ({ className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const phiRef = useRef(-2.5);
    const targetPhiRef = useRef(null as number | null);
    const markersRef = useRef<(HTMLDivElement | null)[]>(
      new Array(LOCATIONS.length).fill(null),
    );
    const sizeRef = useRef({ width: 350, height: 350 });
    const labelOffsetsRef = useRef(
      Array.from({ length: LOCATIONS.length }, () => ({ x: 0, y: 0 })),
    );

    useImperativeHandle(ref, () => ({
      rotate: (_lat: number, lon: number) => {
        const phi = -((lon + 90) * Math.PI) / 180;
        targetPhiRef.current = phi;
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const update = () => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          sizeRef.current = { width: rect.width, height: rect.height };
        }
      };
      update();
      const ro = new ResizeObserver(() => update());
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    useEffect(() => {
      if (!canvasRef.current) return;

      const dpr =
        typeof window !== "undefined"
          ? Math.min(window.devicePixelRatio, 2)
          : 1;
      const labelLift = 10;
      const labelPadding = 8;

      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: Math.max(1, Math.round(sizeRef.current.width * dpr)),
        height: Math.max(1, Math.round(sizeRef.current.height * dpr)),
        phi: phiRef.current,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: MAP_SAMPLES,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.8, 1],
        glowColor: [0.2, 0.4, 0.8],
        opacity: 0.8,
        markers: [],
        onRender: (state) => {
          if (targetPhiRef.current !== null) {
            const diff = targetPhiRef.current - phiRef.current;
            if (Math.abs(diff) > 0.001) {
              phiRef.current += diff * 0.1;
            } else {
              phiRef.current = targetPhiRef.current;
              targetPhiRef.current = null;
            }
          }
          state.phi = phiRef.current;
          const widthPx = Math.max(1, Math.round(sizeRef.current.width * dpr));
          const heightPx = Math.max(
            1,
            Math.round(sizeRef.current.height * dpr),
          );
          state.width = widthPx;
          state.height = heightPx;

          if (
            canvasRef.current &&
            (canvasRef.current.width !== widthPx ||
              canvasRef.current.height !== heightPx)
          ) {
            canvasRef.current.width = widthPx;
            canvasRef.current.height = heightPx;
          }

          const width = widthPx;
          const height = heightPx;
          const containerWidth = width / dpr;
          const containerHeight = height / dpr;

          const anchorsX = new Array(LOCATIONS.length).fill(0);
          const anchorsY = new Array(LOCATIONS.length).fill(0);
          const visible = new Array(LOCATIONS.length).fill(false);
          const bubbleW = new Array(LOCATIONS.length).fill(0);
          const bubbleH = new Array(LOCATIONS.length).fill(0);

          LOCATIONS.forEach((loc, i) => {
            const scale = (state.scale as number | undefined) ?? 1;
            const offset = (state.offset as [number, number] | undefined) ?? [
              0, 0,
            ];

            const phi = state.phi as number;
            const theta = (state.theta as number | undefined) ?? 0;
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);
            const cosTheta = Math.cos(theta);
            const sinTheta = Math.sin(theta);

            const lat = (loc.lat * PI) / 180;
            const lon = (loc.lon * PI) / 180 - PI;

            const t = Math.cos(lat);
            const rawX = -t * Math.cos(lon);
            const rawY = Math.sin(lat);
            const rawZ = t * Math.sin(lon);

            const snapped = snapToFibonacciSample(
              { x: rawX, y: rawY, z: rawZ },
              MAP_SAMPLES,
            );
            const pX = snapped.x;
            const pY = snapped.y;
            const pZ = snapped.z;

            const lX = pX * cosPhi + pZ * sinPhi;
            const lY =
              pX * (sinPhi * sinTheta) +
              pY * cosTheta +
              pZ * (-cosPhi * sinTheta);
            const lZ =
              pX * (-sinPhi * cosTheta) +
              pY * sinTheta +
              pZ * (cosPhi * cosTheta);

            const aX = 0.8 * lX;
            const aY = 0.8 * lY;
            const aXPre = aX * (height / width);

            const nX = scale * (aXPre + offset[0] / width);
            const nY = scale * (aY - offset[1] / height);

            const pixelX = (nX + 1) * 0.5 * width;
            const pixelY = (nY + 1) * 0.5 * height;

            const screenX = pixelX / dpr;
            const screenY = (height - pixelY) / dpr;
            const isVisible =
              lZ > 0 && Number.isFinite(screenX) && Number.isFinite(screenY);

            const marker = markersRef.current[i];
            if (marker && isVisible) {
              const bubble = marker.querySelector(
                "[data-bubble]",
              ) as HTMLDivElement | null;
              bubbleW[i] = bubble?.offsetWidth ?? 0;
              bubbleH[i] = bubble?.offsetHeight ?? 0;
            }

            anchorsX[i] = screenX;
            anchorsY[i] = screenY;
            visible[i] = isVisible;
          });

          const targetOffsets = Array.from(
            { length: LOCATIONS.length },
            () => ({ x: 0, y: 0 }),
          );
          const indices = [];
          for (let i = 0; i < LOCATIONS.length; i++) {
            if (
              visible[i] &&
              bubbleW[i] > 0 &&
              bubbleH[i] > 0 &&
              markersRef.current[i]
            )
              indices.push(i);
          }

          for (let iter = 0; iter < 6; iter++) {
            for (let a = 0; a < indices.length; a++) {
              for (let b = a + 1; b < indices.length; b++) {
                const i = indices[a];
                const j = indices[b];

                const wi = bubbleW[i];
                const hi = bubbleH[i];
                const wj = bubbleW[j];
                const hj = bubbleH[j];

                const xi = anchorsX[i] + targetOffsets[i].x;
                const yiBottom = anchorsY[i] + targetOffsets[i].y - labelLift;
                const xj = anchorsX[j] + targetOffsets[j].x;
                const yjBottom = anchorsY[j] + targetOffsets[j].y - labelLift;

                const li = xi - wi / 2;
                const ri = xi + wi / 2;
                const ti = yiBottom - hi;
                const bi = yiBottom;

                const lj = xj - wj / 2;
                const rj = xj + wj / 2;
                const tj = yjBottom - hj;
                const bj = yjBottom;

                const overlapX = Math.min(ri, rj) - Math.max(li, lj);
                const overlapY = Math.min(bi, bj) - Math.max(ti, tj);
                if (overlapX <= 0 || overlapY <= 0) continue;

                if (overlapY < overlapX) {
                  const push = overlapY / 2 + labelPadding;
                  if (yiBottom < yjBottom) {
                    targetOffsets[i].y -= push;
                    targetOffsets[j].y += push;
                  } else {
                    targetOffsets[i].y += push;
                    targetOffsets[j].y -= push;
                  }
                } else {
                  const push = overlapX / 2 + labelPadding;
                  if (xi < xj) {
                    targetOffsets[i].x -= push;
                    targetOffsets[j].x += push;
                  } else {
                    targetOffsets[i].x += push;
                    targetOffsets[j].x -= push;
                  }
                }
              }
            }
          }

          for (const i of indices) {
            const wi = bubbleW[i];
            const hi = bubbleH[i];

            const x = anchorsX[i] + targetOffsets[i].x;
            const bottom = anchorsY[i] + targetOffsets[i].y - labelLift;
            const left = x - wi / 2;
            const right = x + wi / 2;
            const top = bottom - hi;

            if (left < labelPadding) targetOffsets[i].x += labelPadding - left;
            if (right > containerWidth - labelPadding)
              targetOffsets[i].x -= right - (containerWidth - labelPadding);
            if (top < labelPadding) targetOffsets[i].y += labelPadding - top;
            if (bottom > containerHeight - labelPadding)
              targetOffsets[i].y -= bottom - (containerHeight - labelPadding);
          }

          for (let i = 0; i < LOCATIONS.length; i++) {
            const marker = markersRef.current[i];
            const isVisible = visible[i];
            if (!marker || !isVisible) {
              if (marker) {
                marker.style.opacity = "0";
                marker.style.pointerEvents = "none";
              }
              labelOffsetsRef.current[i].x = 0;
              labelOffsetsRef.current[i].y = 0;
              continue;
            }

            const current = labelOffsetsRef.current[i];
            const target = targetOffsets[i];
            current.x += (target.x - current.x) * 0.25;
            current.y += (target.y - current.y) * 0.25;

            marker.style.transform = `translate(${anchorsX[i]}px, ${anchorsY[i]}px)`;
            marker.style.opacity = "1";
            marker.style.pointerEvents = "auto";
            marker.style.zIndex = String(1000 + Math.round(anchorsY[i]));

            const bubble = marker.querySelector(
              "[data-bubble]",
            ) as HTMLDivElement | null;
            if (bubble) {
              bubble.style.transform = `translate(-50%, calc(-100% - ${labelLift}px)) translate(${current.x}px, ${current.y}px)`;
            }
          }
        },
      });

      return () => {
        globe.destroy();
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn("relative aspect-square w-full max-w-[350px]", className)}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
          className="opacity-90 cursor-grab active:cursor-grabbing touch-none relative z-0"
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            targetPhiRef.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteracting.current = e.clientX;
              phiRef.current += delta * 0.005;
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteracting.current = e.touches[0].clientX;
              phiRef.current += delta * 0.005;
            }
          }}
        />

        {/* Badges posicionados con refs */}
        {LOCATIONS.map((loc, index) => (
          <div
            key={loc.id}
            ref={(el) => {
              markersRef.current[index] = el;
            }}
            className="absolute left-0 top-0 group"
            style={{
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"></div>
            <div
              data-bubble
              className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg pointer-events-auto group-hover:scale-110 transition-transform duration-300 absolute left-0 top-0"
            >
              <loc.Flag title={loc.name} className="w-3 h-3 rounded-[1px]" />
              <span className="text-[10px] font-semibold text-white">
                {loc.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

Globe.displayName = "Globe";
