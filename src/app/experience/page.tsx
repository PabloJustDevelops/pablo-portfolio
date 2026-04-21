import { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/contact-section";
import { experience } from "@/data/experience";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: `Work Experience | ${profile.name}`,
  description: `Professional journey and work experience of ${profile.name}`,
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-blue-500/30 pt-24 md:pt-32">
      {/* Background ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Grid Container */}
      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative z-10">

        {/* Header Section */}
        <header className="text-center py-20 md:py-28 flex flex-col items-center justify-center border-b border-black/5 dark:border-white/5 relative bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            Experiencia
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 italic pr-2">
              Experience
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-light px-4">
            Una línea de tiempo de roles, responsabilidades y resultados.
          </p>
          {profile.social?.linkedin && (
            <div className="mt-10">
              <Link
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 uppercase tracking-widest"
              >
                Contactar
              </Link>
            </div>
          )}
        </header>

        <div className="flex flex-col relative z-10">
          {experience.map((exp, idx) => (
            <section
              key={`${exp.company}-${exp.period}-${idx}`}
              className="relative border-b border-black/5 dark:border-white/5"
            >
              <div className="flex flex-col md:flex-row relative">
                <div className="md:w-1/3 p-8 md:p-12 shrink-0 relative">
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5" />
                  <div className="hidden md:block absolute -left-[5px] top-12 w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900" />

                  <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
                    {exp.period}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-black dark:text-white mb-2">
                    {exp.company}
                  </h2>
                  {(exp.location || exp.scope) && (
                    <div className="text-neutral-500 dark:text-neutral-400 text-sm space-y-1">
                      {exp.location && <div>{exp.location}</div>}
                      {exp.scope && <div>{exp.scope}</div>}
                    </div>
                  )}
                </div>

                <div className="md:w-2/3 p-8 md:p-12 flex flex-col gap-6">
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-serif text-black dark:text-white">
                      {exp.role}
                    </h3>
                    {exp.summary && (
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {exp.summary}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {exp.highlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-neutral-600 dark:text-neutral-400 leading-relaxed"
                      >
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.stack && exp.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.stack.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {exp.links && exp.links.length > 0 && (
                    <div className="flex flex-wrap gap-4 pt-2">
                      {exp.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white underline underline-offset-4"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-black/5 dark:border-white/5">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
