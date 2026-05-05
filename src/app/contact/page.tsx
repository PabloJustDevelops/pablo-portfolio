import { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: `Contacto | ${profile.name}`,
  description: `Ponte en contacto con ${profile.name} — proyectos, colaboraciones o simplemente saludar`,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-blue-500/30 pt-24 md:pt-32">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative z-10">
        <div className="flex flex-col relative z-10">
          <ContactContent />
        </div>
      </div>
    </main>
  );
}
