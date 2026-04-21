export type ExperienceImpact = {
  label: string;
  value: string;
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  scope?: string;
  summary?: string;
  impact?: ExperienceImpact[];
  highlights: string[];
  stack?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const experience: ExperienceItem[] = [
  {
    id: "tech-solutions-2023",
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2023 — Presente",
    location: "Remoto",
    scope: "Equipo 4 · B2B SaaS",
    summary: "Construcción de una plataforma de clientes con foco en rendimiento y DX.",
    impact: [
      { label: "Tiempo de carga", value: "-40%" },
      { label: "Errores en producción", value: "-28%" },
      { label: "Tiempo de entrega", value: "-20%" },
    ],
    highlights: [
      "Lideré la migración a Next.js y reduje el tiempo de carga en un 40%.",
      "Diseñé un sistema de componentes reutilizable para acelerar entregas.",
      "Mejoré la observabilidad y el debugging con trazas y métricas.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP"],
    links: [{ label: "Sitio", href: "https://example.com" }],
  },
  {
    id: "creative-agency-2021",
    role: "Full Stack Developer",
    company: "Creative Agency",
    period: "2021 — 2023",
    location: "Valencia",
    scope: "Proyectos a medida",
    summary: "Webs interactivas y aplicaciones internas para clientes internacionales.",
    impact: [
      { label: "Conversión", value: "+15%" },
      { label: "TTI", value: "-35%" },
    ],
    highlights: [
      "Entregué micrositios animados con alto rendimiento y accesibilidad.",
      "Construí dashboards internos con autenticación y control de permisos.",
      "Estandaricé un flujo de trabajo de diseño → implementación con Figma.",
    ],
    stack: ["Node.js", "React", "PostgreSQL", "Tailwind", "Figma"],
  },
];
