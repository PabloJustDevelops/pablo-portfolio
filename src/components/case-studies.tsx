"use client";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function CaseStudiesSection() {
  return (
    <section id="work" className="w-full">
      <div className="flex flex-col items-center text-center mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">Case Studies</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Curated <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">work</span>
        </h2>
      </div>
      
      <div className="flex flex-col gap-32">
        {projects.map((project, i) => (
          <CaseStudyItem key={i} project={project} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

function CaseStudyItem({ project, index }: { project: typeof projects[number]; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
        <div className="flex items-center gap-4">
          <span>{index.toString().padStart(2, '0')}</span>
          <div className="h-px w-12 bg-neutral-800" />
          <span className="uppercase tracking-widest">{project.category}</span>
        </div>
        <span className="rounded-full border border-neutral-800 px-3 py-1 bg-neutral-900/50">
          {project.period}
        </span>
      </div>

      <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-4">{project.title}</h3>

      <Link href={project.link} target="_blank" className="group block w-full">
        <div className={`relative overflow-hidden rounded-[2rem] pt-8 px-8 md:pt-12 md:px-12 ${project.accentColor} transition-transform duration-300 ring-1 ring-white/10`}>
          <div className="flex justify-between items-start mb-12">
            <p className="text-lg md:text-2xl font-medium text-white max-w-xl leading-relaxed drop-shadow-sm">
              {project.description}
            </p>
            <ArrowRight className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 w-6 h-6 md:w-8 md:h-8 flex-shrink-0 ml-4" />
          </div>
          
          <div className="relative mt-auto w-full aspect-[16/10] md:aspect-[16/9] rounded-t-xl overflow-hidden shadow-2xl transform translate-y-6 group-hover:translate-y-2 transition-transform duration-500 bg-neutral-900">
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

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 transition-colors">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
