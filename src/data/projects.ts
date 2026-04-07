export const projects = [
  {
    title: "E-commerce Dashboard",
    cardText: "Plataforma de e-commerce completa con pagos reales, autenticación y panel de administración.",
    description: "Plataforma Full-stack con tienda en línea, pagos seguros con Stripe y panel de control para gestión de inventario.",
    features: [
      "Catálogo de productos con búsqueda, categorías, filtros y valoraciones.",
      "Checkout con Stripe y verificación de pagos en el servidor.",
      "Panel de administración para gestión de productos, pedidos y analíticas.",
      "Autenticación con JWT y roles de usuario — Cliente, Vendedor, Admin."
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Stripe", "Zustand"],
    link: "https://github.com",
    image: "https://placehold.co/1200x800?text=Dashboard+App",
    featured: true,
    category: "WEB APP",
    period: "Q4 2024",
    accentColor: "bg-blue-600",
    textColor: "text-blue-500",
  },
  {
    title: "SaaS Landing Page",
    cardText: "Landing page optimizada para conversión con animaciones suaves y un diseño moderno.",
    description: "Sitio web de marketing para un producto SaaS, diseñado para maximizar conversiones y mostrar el valor del producto de forma clara.",
    features: [
      "Animaciones fluidas con Framer Motion y scroll effects.",
      "Diseño responsive y accesible con componentes de Shadcn UI.",
      "Integración con CMS para gestión de contenido dinámico.",
      "Optimización de rendimiento y SEO para mejor posicionamiento."
    ],
    tags: ["React", "Framer Motion", "Stripe", "Tailwind CSS", "Next.js"],
    link: "https://github.com",
    image: "https://placehold.co/1200x800?text=SaaS+Landing",
    featured: true,
    category: "LANDING PAGE",
    period: "Q1 2025",
    accentColor: "bg-purple-600",
    textColor: "text-purple-500",
  },
  {
    title: "Task Manager API",
    cardText: "Una API RESTful robusta y escalable para la gestión de tareas y proyectos en equipo.",
    description: "Backend de alto rendimiento construido con Node.js y PostgreSQL, diseñado para manejar miles de peticiones por segundo.",
    features: [
      "Arquitectura limpia y escalable basada en microservicios.",
      "Documentación completa de la API generada automáticamente con Swagger.",
      "Autenticación segura, control de acceso basado en roles (RBAC).",
      "Tests unitarios y de integración exhaustivos con Jest."
    ],
    tags: ["Node.js", "Express", "PostgreSQL", "Docker", "Jest", "Swagger"],
    link: "https://github.com",
    image: "https://placehold.co/1200x800?text=API+Docs",
    featured: false,
    category: "BACKEND",
    period: "Q2 2025",
    accentColor: "bg-emerald-600",
    textColor: "text-emerald-500",
  },
];
