import { projects } from "@/data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Project = typeof projects[number];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.link} target="_blank" className="group block h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <Card className="flex flex-col h-full border-0 bg-transparent shadow-none">
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-800 rounded-t-3xl">
           {/* Placeholder for image if it fails or is not provided */}
           <div className="absolute inset-0 flex items-center justify-center text-neutral-600 bg-neutral-900">
                <span className="text-xs font-medium uppercase tracking-wider">{project.title} Preview</span>
           </div>
           {/* If image exists, it will overlay the placeholder */}
           {project.image && (
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
           )}
        </div>
        <CardHeader className="p-6 space-y-2 z-20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-serif text-white group-hover:text-purple-400 transition-colors">
                {project.title}
            </CardTitle>
            <ExternalLink size={18} className="text-neutral-500 group-hover:text-white transition-colors" />
          </div>
          <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-0 mt-auto z-20">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[10px] font-medium bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
