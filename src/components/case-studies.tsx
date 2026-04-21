"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="work" className="w-full relative py-20 px-4 sm:px-6 lg:px-8 z-10" ref={containerRef}>
      <div className="flex flex-col items-center text-center mb-16 md:mb-24">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-4">Case Studies</span>
        <h2 className="text-5xl md:text-7xl font-serif text-black dark:text-white tracking-tight">
          Curated <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">work</span>
        </h2>
      </div>
      
      <div className="flex flex-col w-full relative">
        {projects.map((project, i) => {
          return (
            <CaseStudyItem 
              key={i} 
              project={project} 
              index={i} 
              totalProjects={projects.length}
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
  totalProjects
}: { 
  project: typeof projects[number]; 
  index: number;
  totalProjects: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Only apply scroll animations if user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && cardRef.current && containerRef.current) {
      const targetScale = 1 - ((totalProjects - index) * 0.05);
      
      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: targetScale,
        opacity: 0.3,
        transformOrigin: "top center",
        ease: "none"
      });
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      // h-screen and sticky on desktop. Normal flow on mobile.
      // z-index increases so newer cards slide OVER older cards.
      className="w-full lg:h-screen lg:sticky lg:top-0 flex flex-col lg:flex-row"
      style={{ zIndex: index }}
    >
      {/* Left Side: Transparent background, sticky card inside */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex items-start justify-center relative lg:h-full px-4 lg:px-8 py-12 lg:py-0 lg:pt-24 xl:pt-32">
        <div
          className="w-full max-w-2xl relative"
        >
          <div style={{ marginTop: `${index * 30}px` }}>
            {/* Period/Category Info - Desktop visible above card, Mobile visible inline */}
            <div className="hidden lg:flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-500 mb-4 px-2">
              <div className="flex items-center gap-4">
                <span>{(index + 1).toString().padStart(2, '0')}</span>
                <div className="h-px w-12 bg-neutral-800" />
                <span className="uppercase tracking-widest">{project.category}</span>
              </div>
              <span className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 bg-neutral-900/50">
                {project.period}
              </span>
            </div>

            <div ref={cardRef}>
              <Link 
                href={project.link} 
                target="_blank" 
                className="group block w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-[2rem]"
              >
                <div className={`relative overflow-hidden rounded-[2rem] pt-8 px-8 md:pt-12 md:px-12 ${project.accentColor} transition-transform duration-300 ring-1 ring-black/10 dark:ring-white/10 h-[45vh] lg:h-[60vh] flex flex-col`}>
                  <div className="flex justify-between items-start mb-8 lg:mb-12">
                    <p className="text-xl md:text-2xl font-medium text-black dark:text-white max-w-xl leading-relaxed drop-shadow-sm">
                      {project.cardText}
                    </p>
                    <ArrowRight className="text-black dark:text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 w-6 h-6 md:w-8 md:h-8 flex-shrink-0 ml-4" />
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
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Solid background to cover previous text smoothly */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center lg:h-full bg-background px-6 lg:px-12 xl:px-16 py-12 lg:py-0 border-t lg:border-t-0 border-white/5">
        <div className="w-full max-w-xl mx-auto lg:mx-0 flex flex-col gap-6 lg:gap-8">
          {/* Mobile Period/Category Info */}
          <div className="flex lg:hidden items-center justify-between text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-4">
              <span>{(index + 1).toString().padStart(2, '0')}</span>
              <div className="h-px w-12 bg-neutral-800" />
              <span className="uppercase tracking-widest">{project.category}</span>
            </div>
            <span className="rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 bg-neutral-900/50">
              {project.period}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className={`h-[2px] w-8 ${project.textColor ? project.textColor.replace('text-', 'bg-') : 'bg-blue-500'}`} />
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black dark:text-white tracking-tight">{project.title}</h3>
          </div>

          <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {project.description}
          </p>

          {project.features && project.features.length > 0 && (
            <ul className="space-y-3">
              {project.features.map((feature, i) => (
                <li key={i} className="flex gap-3 text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                  <span className={project.textColor || "text-blue-500"}>✦</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
