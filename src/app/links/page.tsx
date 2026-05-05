import { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/contact-section";
import { LinksContent } from "@/components/links-content";

export const metadata: Metadata = {
  title: `Links | ${profile.name}`,
  description: `Todas mis redes y enlaces en un solo lugar — ${profile.name}`,
};

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-violet-500/30 pt-24 md:pt-32">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative z-10">
        <div className="flex flex-col relative z-10">
          <LinksContent />
        </div>

        <div className="border-t border-black/5 dark:border-white/5">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
