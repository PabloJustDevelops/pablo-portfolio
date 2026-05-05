export type EducationImpact = {
  label: string;
  value: string;
};

export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  scope?: string;
  summary?: string;
  impact?: EducationImpact[];
  highlights: string[];
  stack?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const education: EducationItem[] = [
  {
    id: "dam-2024-2026",
    degree: "DAM — Desarrollo de Aplicaciones Multiplataforma",
    institution: "IES Leonardo Da Vinci",
    period: "2024 — 2026",
    location: "Albacete",
    scope: "Grado Superior de Formación Profesional",
    summary:
      "Formación especializada en desarrollo de aplicaciones multiplataforma, abarcando programación, interfaces, bases de datos y despliegue de software.",
    impact: [
      { label: "Tipo", value: "Grado Superior (FP)" },
      { label: "Enfoque", value: "Desarrollo Multiplataforma" },
      { label: "Duración", value: "2 años" },
    ],
    highlights: [
      "Desarrollo de aplicaciones de escritorio, móviles y web con Java, Kotlin y tecnologías front-end.",
      "Diseño e implementación de interfaces de usuario con frameworks modernos.",
      "Gestión de bases de datos relacionales y NoSQL, integración con aplicaciones.",
      "Despliegue y distribución de aplicaciones en distintos entornos.",
      "Acceso directo a la especialización en Ciberseguridad.",
    ],
    stack: ["Java", "Kotlin", "Android", "SQL", "Git", "Linux", "Spring"],
  },
  {
    id: "smr-2021-2024",
    degree: "SMR — Sistemas Microinformáticos y Redes",
    institution: "IES Leonardo Da Vinci",
    period: "2021 — 2024",
    location: "Albacete",
    scope: "Grado Medio de Formación Profesional",
    summary:
      "Formación en montaje, mantenimiento y reparación de equipos microinformáticos, así como administración de redes locales y servicios de red.",
    impact: [
      { label: "Tipo", value: "Grado Medio (FP)" },
      { label: "Enfoque", value: "Sistemas y Redes" },
      { label: "Duración", value: "2 años" },
    ],
    highlights: [
      "Montaje y configuración de equipos microinformáticos y periféricos.",
      "Administración y mantenimiento de sistemas operativos Windows y Linux.",
      "Gestión de redes locales: cableado, switches, routers y servicios de red.",
      "Instalación y configuración de servicios de red: DHCP, DNS, web y correo.",
      "Atención al usuario y resolución de incidencias técnicas.",
    ],
    stack: ["Windows", "Linux", "Redes", "TCP/IP", "Active Directory", "Virtualización"],
  },
  {
    id: "especializacion-ciberseguridad-2027",
    degree: "Especialización en Ciberseguridad",
    institution: "IES Leonardo Da Vinci",
    period: "2027 (previsto)",
    location: "Albacete",
    scope: "Especialización FP",
    summary:
      "Especialización post-DAM enfocada en seguridad informática, análisis de vulnerabilidades, protección de sistemas y respuesta ante incidentes.",
    impact: [
      { label: "Tipo", value: "Especialización FP" },
      { label: "Enfoque", value: "Ciberseguridad" },
      { label: "Estado", value: "Previsto" },
    ],
    highlights: [
      "Análisis de vulnerabilidades y pruebas de penetración en sistemas y redes.",
      "Implementación de medidas de seguridad perimetral y protección de endpoints.",
      "Gestión de incidentes de seguridad y respuesta forense.",
      "Auditoría de seguridad y cumplimiento normativo.",
      "Configuración segura de servicios y comunicaciones.",
    ],
    stack: ["Pentesting", "SIEM", "Firewalls", "Criptografía", "Forense", "Redes"],
  },
];
