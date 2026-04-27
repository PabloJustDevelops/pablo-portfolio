export type EducationLink = { label: string; href: string };

export type EducationItem = {
  id: string;
  title: string;
  center: string;
  location: string;
  period: string;
  summary?: string;
  highlights?: string[];
  tags?: string[];
  links?: EducationLink[];
};

export type FeaturedProject = {
  name: string;
  description: string;
  stack: string[];
  notes?: string[];
  links?: EducationLink[];
};

export type EducationPageData = {
  featured: {
    main: EducationItem;
    project: FeaturedProject;
    learningNow: string[];
  };
  timeline: EducationItem[];
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
};

export const educationPageData: EducationPageData = {
  featured: {
    main: {
      id: "dam-2024-2026",
      title: "Grado Superior — Desarrollo de Aplicaciones Multiplataforma (DAM)",
      center: "IES Leonardo Da Vinci",
      location: "Albacete, España",
      period: "2024 — 2026",
      summary:
        "Formación orientada al desarrollo de software multiplataforma: backend, datos, UI, Android y buenas prácticas de entrega.",
      highlights: [
        "POO con Java, estructuras de datos y fundamentos de algoritmia.",
        "Modelado y diseño de bases de datos relacionales (SQL) y acceso a datos (JDBC/JPA/Hibernate).",
        "Desarrollo de APIs REST y consumo de servicios HTTP/JSON desde cliente.",
        "Desarrollo Android (Kotlin/Java) y aplicaciones de escritorio (JavaFX/Swing).",
        "Flujos con Git, testing, despliegue básico con Docker y metodologías ágiles (Scrum/Kanban).",
      ],
      tags: ["Java", "SQL", "APIs REST", "Android", "Git", "Testing", "Docker", "Agile"],
    },
    project: {
      name: "TravelPal",
      description:
        "Aplicación web para centralizar la planificación de viajes y mantener toda la información organizada en un solo lugar.",
      stack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"],
      notes: [
        "Itinerario por días, notas, checklist/tareas y adjuntos (reservas, PDFs, enlaces).",
        "Presupuesto/gastos para controlar el viaje de principio a fin.",
        "Autenticación y base de datos con Supabase.",
        "Sin mapas por limitación de API de pago.",
      ],
    },
    learningNow: [
      "Arquitectura",
      "Testing",
      "OpenLayers/GIS",
      "React Native",
      "CI/CD",
      "Seguridad",
      "Backend con Node",
    ],
  },
  timeline: [
    {
      id: "dam-2024-2026",
      title: "Grado Superior — Desarrollo de Aplicaciones Multiplataforma (DAM)",
      center: "IES Leonardo Da Vinci",
      location: "Albacete, España",
      period: "2024 — 2026",
      summary:
        "Base sólida de desarrollo full-stack y multiplataforma, con foco en prácticas de calidad y entrega.",
      highlights: [
        "POO con Java y fundamentos de estructuras de datos.",
        "BBDD relacional, SQL y acceso a datos (JDBC/JPA/Hibernate).",
        "APIs REST y consumo de servicios.",
        "Android (Kotlin/Java) y UI responsive.",
        "Git, testing, Docker y Agile.",
      ],
      tags: ["Java", "SQL", "REST", "Android", "Git", "Testing"],
    },
    {
      id: "smr-2022-2024",
      title: "FP Grado Medio — Sistemas Microinformáticos y Redes (SMR)",
      center: "IES Leonardo Da Vinci",
      location: "Albacete, España",
      period: "2022 — 2024",
      summary:
        "Formación práctica orientada a sistemas, redes, soporte IT y seguridad básica en entornos reales.",
      highlights: [
        "Montaje y mantenimiento de equipos (diagnóstico, upgrades, imágenes del sistema).",
        "Configuración de redes LAN/WiFi y resolución de incidencias.",
        "Administración básica Windows Server/Linux (usuarios, permisos, servicios).",
        "Copias de seguridad y medidas de seguridad básicas.",
        "Instalación y gestión de antivirus.",
      ],
      tags: ["Redes", "Windows", "Linux", "Soporte IT", "Seguridad"],
    },
  ],
};

