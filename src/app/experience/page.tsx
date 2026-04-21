import { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/contact-section";
import { experience } from "@/data/experience";
import { ExperienceTimeline } from "@/components/experience-timeline";

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
          <ExperienceTimeline items={experience} />
        </div>

        <div className="border-t border-black/5 dark:border-white/5">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
