import { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/contact-section";
import { education } from "@/data/education";
import { EducationTimeline } from "@/components/education-timeline";

export const metadata: Metadata = {
  title: `Education | ${profile.name}`,
  description: `Formación académica y certificaciones de ${profile.name}`,
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-indigo-500/30 pt-24 md:pt-32">
      {/* Background ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Grid Container */}
      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative z-10">

        {/* Header Section */}
        <header className="text-center py-20 md:py-28 flex flex-col items-center justify-center border-b border-black/5 dark:border-white/5 relative bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            Formación
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            Academic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-400 italic pr-2">
              Journey
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-light px-4">
            Una línea de tiempo de grados, certificaciones y aprendizaje continuo.
          </p>
        </header>

        <div className="flex flex-col relative z-10">
          <div className="px-6 md:px-10 py-10 md:py-16">
            <EducationTimeline items={education} />
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/5">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
