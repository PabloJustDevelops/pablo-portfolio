"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="work" className="w-full relative py-20" ref={containerRef}>
      <div className="flex flex-col items-center text-center mb-24 md:mb-32">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">Case Studies</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Curated <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">work</span>
        </h2>
      </div>
      
      <div className="flex flex-col">
        {projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return (
            <CaseStudyItem 
              key={i} 
              project={project} 
              index={i} 
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

function CaseStudyItem({ 
  project, 
  index,
  targetScale
}: { 
  project: typeof projects[number]; 
  index: number;
  targetScale: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Escalar y desvanecer la tarjeta (lado izquierdo)
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  
  // Cambiamos la animación del texto para que no se superponga
  // Al hacer scroll, el texto se desvanecerá antes de que el siguiente lo cubra
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen flex items-start justify-center sticky pb-10 pt-24 md:pt-32"
      style={{ top: `${index * 40}px` }} // Offset para el apilamiento de las tarjetas
    >
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        {/* Left Side: The Card */}
        <motion.div
          style={shouldReduceMotion ? {} : { 
            scale, 
            opacity: cardOpacity, 
            transformOrigin: "top center"
          }}
          className="w-full lg:w-[55%] xl:w-[60%] flex flex-col relative z-10"
        >
          {/* Period/Category Info - Desktop visible above card, Mobile visible inline */}
          <div className="hidden lg:flex items-center justify-between text-xs font-mono text-neutral-500 mb-4 px-2">
            <div className="flex items-center gap-4">
              <span>{(index + 1).toString().padStart(2, '0')}</span>
              <div className="h-px w-12 bg-neutral-800" />
              <span className="uppercase tracking-widest">{project.category}</span>
            </div>
            <span className="rounded-full border border-neutral-800 px-3 py-1 bg-neutral-900/50">
              {project.period}
            </span>
          </div>

          <Link 
            href={project.link} 
            target="_blank" 
            className="group block w-full h-full"
          >
            <div className={`relative overflow-hidden rounded-[2rem] pt-8 px-8 md:pt-12 md:px-12 ${project.accentColor} transition-transform duration-300 ring-1 ring-white/10 h-[50vh] lg:h-[70vh] flex flex-col bg-background`}>
              <div className="flex justify-between items-start mb-8 lg:mb-12">
                <p className="text-xl md:text-2xl font-medium text-white max-w-xl leading-relaxed drop-shadow-sm">
                  {project.cardText}
                </p>
                <ArrowRight className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 w-6 h-6 md:w-8 md:h-8 flex-shrink-0 ml-4" />
              </div>
              
              <div className="relative mt-auto w-full flex-1 rounded-t-xl overflow-hidden shadow-2xl transform translate-y-6 group-hover:translate-y-2 transition-transform duration-500 bg-neutral-900">
                 {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
                 ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                        {project.title} Preview
                    </div>
                 )}
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Right Side: The Info */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center lg:py-8 lg:pt-12 z-0">
          <motion.div 
            style={shouldReduceMotion ? {} : { 
              opacity: textOpacity,
            }}
            className="w-full flex flex-col gap-6 lg:gap-8 bg-background p-4 rounded-xl lg:p-0 lg:rounded-none"
          >
            {/* Mobile Period/Category Info */}
            <div className="flex lg:hidden items-center justify-between text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-4">
                <span>{(index + 1).toString().padStart(2, '0')}</span>
                <div className="h-px w-12 bg-neutral-800" />
                <span className="uppercase tracking-widest">{project.category}</span>
              </div>
              <span className="rounded-full border border-neutral-800 px-3 py-1 bg-neutral-900/50">
                {project.period}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className={`h-[2px] w-8 ${project.textColor ? project.textColor.replace('text-', 'bg-') : 'bg-blue-500'}`} />
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-tight">{project.title}</h3>
            </div>

            <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-neutral-400 text-sm md:text-base">
                    <span className={project.textColor || "text-blue-500"}>✦</span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
