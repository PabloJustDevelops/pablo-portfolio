import { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/contact-section";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: `About | ${profile.name}`,
  description: `Experiencia profesional y formación académica de ${profile.name}`,
};

export default function AboutPage() {
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
            Sobre mí
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-400 italic pr-2">
              Journey
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-light px-4">
            Experiencia profesional y formación académica, todo en un solo lugar.
          </p>
        </header>

        <div className="flex flex-col relative z-10">
          <AboutContent />
        </div>

        <div className="border-t border-black/5 dark:border-white/5">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
