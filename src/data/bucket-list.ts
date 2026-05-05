export type BucketListStatus = "done" | "in-progress" | "pending";

export type BucketListItem = {
  id: string;
  title: string;
  description?: string;
  status: BucketListStatus;
  year?: string;
};

export type BucketListCategory = {
  id: string;
  title: string;
  icon: string;
  items: BucketListItem[];
};

export const bucketList: BucketListCategory[] = [
  {
    id: "travel",
    title: "Viajes",
    icon: "Plane",
    items: [
      {
        id: "travel-japan",
        title: "Viajar a Japón",
        description: "Explorar Tokio, Kioto y la cultura japonesa.",
        status: "pending",
      },
      {
        id: "travel-northern-lights",
        title: "Ver las auroras boreales",
        description: "Noruega o Islandia en invierno.",
        status: "pending",
      },
      {
        id: "travel-roadtrip",
        title: "Road trip por la costa española",
        description: "De Barcelona a Cádiz por la carretera de la costa.",
        status: "pending",
      },
      {
        id: "travel-new-york",
        title: "Visitar Nueva York",
        description: "Times Square, Central Park, la estatua de la Libertad.",
        status: "pending",
      },
    ],
  },
  {
    id: "career",
    title: "Carrera",
    icon: "Briefcase",
    items: [
      {
        id: "career-open-source",
        title: "Contribuir a un proyecto open source relevante",
        description: "Un PR mergeado en un proyecto que uso.",
        status: "in-progress",
      },
      {
        id: "career-conference",
        title: "Dar una charla en una conferencia tech",
        description: "Compartir conocimiento en un evento de desarrollo.",
        status: "pending",
      },
      {
        id: "career-saas",
        title: "Lanzar un SaaS propio",
        description: "De idea a producto con usuarios reales.",
        status: "pending",
      },
      {
        id: "career-remote-abroad",
        title: "Trabajar remoto desde otro país",
        description: "Workation: trabajar y vivir en otro país temporalmente.",
        status: "pending",
      },
    ],
  },
  {
    id: "skills",
    title: "Habilidades",
    icon: "Target",
    items: [
      {
        id: "skills-cybersec",
        title: "Especializarme en Ciberseguridad",
        description: "Completar la especialización FP en ciberseguridad.",
        status: "in-progress",
        year: "2027",
      },
      {
        id: "skills-aws-cert",
        title: "Certificación AWS Cloud Practitioner",
        description: "Certificación foundational de Amazon Web Services.",
        status: "done",
        year: "2025",
      },
      {
        id: "skills-system-design",
        title: "Dominar System Design",
        description: "Diseñar sistemas distribuidos a gran escala con confianza.",
        status: "pending",
      },
      {
        id: "skills-rust",
        title: "Aprender Rust",
        description: "Un lenguaje que quiero dominar por rendimiento y seguridad.",
        status: "pending",
      },
    ],
  },
  {
    id: "experiences",
    title: "Experiencias",
    icon: "Sparkles",
    items: [
      {
        id: "exp-skydive",
        title: "Hacer paracaidismo",
        description: "Tirarse de un avión, al menos una vez.",
        status: "pending",
      },
      {
        id: "exp-music-festival",
        title: "Ir a un festival de música grande",
        description: "Primavera Sound, Sónar o similar.",
        status: "pending",
      },
      {
        id: "exp-marathon",
        title: "Correr una media maratón",
        description: "21km. Primero terminar los 10km sin parar.",
        status: "done",
      },
      {
        id: "exp-read-100",
        title: "Leer 100 libros",
        description: "De todo: ficción, tecnología, filosofía, negocios.",
        status: "in-progress",
      },
    ],
  },
];
