"use client";

import Image from "next/image";
import {
  Layers,
  Map,
  Network,
  Monitor,
  ShieldCheck,
  Server,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IconImage = {
  kind: "image";
  src: string;
};

type IconGlyph = {
  kind: "glyph";
  Icon: typeof Layers;
  color?: string;
};

type IconDefinition = (IconImage | IconGlyph) & {
  label: string;
};

const SIMPLE_ICONS: Record<string, { slug: string; color?: string }> = {
  Angular: { slug: "angular", color: "DD0031" },
  "Next.js": { slug: "nextdotjs", color: "FFFFFF" },
  React: { slug: "react", color: "61DAFB" },
  TypeScript: { slug: "typescript", color: "3178C6" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4" },
  Vercel: { slug: "vercel", color: "FFFFFF" },
  OpenLayers: { slug: "openlayers", color: "1F6B75" },
  Windows: { slug: "windows", color: "0078D6" },
  "Windows Server": { slug: "windows", color: "0078D6" },
  Linux: { slug: "linux", color: "FCC624" },
  Kaspersky: { slug: "kaspersky", color: "006D5C" },
};

function toSimpleIconUrl(slug: string, color?: string) {
  const safeColor = color?.replace("#", "");
  if (!safeColor) return `https://cdn.simpleicons.org/${slug}`;
  return `https://cdn.simpleicons.org/${slug}/${safeColor}`;
}

function getIconDefinition(name: string): IconDefinition {
  const match = SIMPLE_ICONS[name];
  if (match) {
    return {
      kind: "image",
      label: name,
      src: toSimpleIconUrl(match.slug, match.color),
    };
  }

  const key = name.toLowerCase();

  if (key.includes("wms") || key.includes("wmts")) {
    return { kind: "glyph", label: name, Icon: Layers, color: "#60A5FA" };
  }
  if (key.includes("gis")) {
    return { kind: "glyph", label: name, Icon: Map, color: "#34D399" };
  }
  if (key.includes("rest")) {
    return { kind: "glyph", label: name, Icon: Network, color: "#A78BFA" };
  }
  if (key.includes("vnc")) {
    return { kind: "glyph", label: name, Icon: Monitor, color: "#F59E0B" };
  }
  if (key.includes("red")) {
    return { kind: "glyph", label: name, Icon: Network, color: "#A78BFA" };
  }
  if (key.includes("soporte")) {
    return { kind: "glyph", label: name, Icon: Wrench, color: "#F59E0B" };
  }
  if (key.includes("server")) {
    return { kind: "glyph", label: name, Icon: Server, color: "#60A5FA" };
  }
  if (key.includes("seguridad") || key.includes("antivirus")) {
    return { kind: "glyph", label: name, Icon: ShieldCheck, color: "#34D399" };
  }

  return { kind: "glyph", label: name, Icon: Layers, color: "#94A3B8" };
}

export function TechBadge({ name, className }: { name: string; className?: string }) {
  const def = getIconDefinition(name);

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-b from-neutral-800/60 to-neutral-900/60 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.25)] hover:from-neutral-700/60 hover:to-neutral-800/60 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 whitespace-nowrap group/badge cursor-default",
        className
      )}
    >
      {def.kind === "image" ? (
        <Image
          src={def.src}
          alt={def.label}
          width={14}
          height={14}
          unoptimized
          className="w-3.5 h-3.5 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.15)] group-hover/badge:scale-110 transition-transform duration-300"
        />
      ) : (
        <def.Icon
          size={14}
          style={{ color: def.color }}
          className="drop-shadow-[0_0_5px_rgba(0,0,0,0.15)] group-hover/badge:scale-110 transition-transform duration-300"
        />
      )}
      <span className="text-xs text-neutral-200 font-medium tracking-wide group-hover/badge:text-white transition-colors">
        {name}
      </span>
    </div>
  );
}
