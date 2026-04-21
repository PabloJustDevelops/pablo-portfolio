import { experience } from "@/data/experience";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <div className="flex flex-col gap-6 p-6 h-full justify-between">
      <div className="flex items-center gap-2">
        <Briefcase size={20} className="text-neutral-500" />
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Experiencia</h2>
      </div>

      <div className="flex flex-col gap-8 relative pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-2">
        {experience.map((exp, idx) => (
          <div key={idx} className="relative pl-6">
             <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900" />
             <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{exp.role}</h3>
             <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                <span>{exp.company}</span>
                <span className="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">{exp.period}</span>
             </div>
             <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                {exp.summary ?? exp.highlights?.[0] ?? ""}
             </p>
          </div>
        ))}
      </div>
    </div>
  );
}
