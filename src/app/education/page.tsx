import { Metadata } from "next";
import { profile } from "@/data/profile";
import { educationPageData } from "@/data/education";
import { EducationFeatured } from "@/components/education-featured";
import { EducationTimeline } from "@/components/education-timeline";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Educación | ${profile.name}`,
  description: `Formación, proyectos y aprendizaje continuo de ${profile.name}`,
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-indigo-500/30 pt-24 md:pt-32">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative z-10">
        <header className="text-center py-20 md:py-28 flex flex-col items-center justify-center border-b border-black/5 dark:border-white/5 relative bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            Educación
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            Educación{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 italic pr-2">
              y aprendizaje
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-light px-4">
            Formación reglada, proyectos y aprendizaje continuo.
          </p>
        </header>

        <EducationFeatured featured={educationPageData.featured} />
        <EducationTimeline items={educationPageData.timeline} />

        {educationPageData.certifications && educationPageData.certifications.length > 0 && (
          <section className="px-6 md:px-10 py-12 md:py-16 border-t border-black/5 dark:border-white/5">
            <h2 className="text-2xl md:text-3xl font-serif text-black dark:text-white mb-6">
              Certificaciones
            </h2>
            <ul className="space-y-4">
              {educationPageData.certifications.map((c) => (
                <li
                  key={`${c.name}-${c.issuer}-${c.date}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] px-4 py-3"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-black dark:text-white">{c.name}</div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">{c.issuer}</div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-500">{c.date}</div>
                    {c.link && (
                      <Link
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-indigo-600 dark:text-indigo-300 hover:underline underline-offset-4"
                      >
                        Ver
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
