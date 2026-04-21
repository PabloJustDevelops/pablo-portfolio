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
    id: "agrisat-2026",
    role: "Full Stack Developer",
    company: "Agrisat S.L",
    period: "Mar 2026 — Jun 2026",
    location: "Albacete",
    scope: "Departamento de desarrollo regional",
    summary:
      "Desarrollo de un visor GIS en Angular con OpenLayers para consulta y visualización de datos geoespaciales, con foco en rendimiento y estabilidad.",
    impact: [
      { label: "Rendimiento", value: "Menor carga inicial del visor" },
      { label: "UX", value: "Activación de capas más rápida" },
      { label: "Estabilidad", value: "Menos bugs" },
    ],
    highlights: [
      "Integré capas cartográficas (WMS/WMTS/tiles) con controles de visibilidad, orden y leyenda.",
      "Implementé estilos dinámicos de geometrías (puntos/líneas/polígonos) según tipo/estado de la entidad.",
      "Desarrollé filtros y búsquedas por atributos con listado de resultados sincronizado con el mapa.",
      "Añadí selección de elementos sobre el mapa con interacción de click y panel/popup de detalle.",
      "Mejoré la calidad del código TypeScript con tipado, modelos y manejo consistente de errores/estados de carga.",
    ],
    stack: ["Angular", "TypeScript", "OpenLayers", "GIS", "WMS/WMTS", "REST"],
  },
  {
    id: "construccion-y-reformas-hg-2025",
    role: "Web Developer",
    company: "Construcción y Reformas HG",
    period: "Abr 2025 — Jun 2025",
    location: "Remoto (Albacete)",
    scope: "Web corporativa",
    summary:
      "Desarrollo end-to-end de una web corporativa con Next.js/React, optimizada para SEO y rendimiento, y desplegada en producción con Vercel.",
    impact: [
      { label: "Entrega", value: "Web completa en producción" },
      { label: "SEO", value: "Base técnica preparada" },
      { label: "Rendimiento", value: "Carga optimizada" },
    ],
    highlights: [
      "Construí la web completa con secciones: Inicio, Servicios, Proyectos, Sobre nosotros y Contacto.",
      "Implementé formulario de contacto con validaciones para captación de leads.",
      "Apliqué SEO on-page: metadata y estructura semántica orientada a indexación.",
      "Optimicé rendimiento (assets e imágenes) para una carga más rápida.",
      "Gestioné la puesta en producción: despliegue y hosting en Vercel.",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "casa-cultura-jose-saramago-2024",
    role: "Técnico Informático",
    company: "Casa de la Cultura José Saramago",
    period: "Mar 2024 — Jun 2024",
    location: "Albacete",
    scope: "Departamento de informática / resolución de incidencias",
    summary:
      "Soporte técnico y administración básica de sistemas, resolviendo incidencias de usuarios y manteniendo infraestructura, seguridad y equipos.",
    impact: [
      { label: "Soporte", value: "Resolución de incidencias" },
      { label: "Seguridad", value: "Antivirus centralizado" },
      { label: "Operativa", value: "Continuidad del servicio" },
    ],
    highlights: [
      "Resolví incidencias en puestos Windows, cuentas y aplicaciones de ofimática.",
      "Di soporte de red/WiFi y periféricos (impresoras, proyectores, audio).",
      "Realicé mantenimiento de equipos: configuración, actualizaciones y puesta a punto.",
      "Implanté y gestioné antivirus Kaspersky con administración centralizada desde un host.",
      "Proporcioné soporte remoto usando VNC para asistencia rápida.",
      "Participé en la gestión y mantenimiento básico de servidores Windows Server y Linux.",
    ],
    stack: ["Windows", "Windows Server", "Linux", "Soporte IT", "Redes", "VNC", "Kaspersky"],
  },
];
