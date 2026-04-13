import { CaseStudiesSection } from "@/components/case-studies";
import { Hero } from "@/components/hero";
import { BentoSection } from "@/components/bento-section";
import { AboutMe } from "@/components/about-me";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans antialiased selection:bg-neutral-800">
      {/* Hero Section Full Width */}
      <section className="w-full h-screen min-h-[600px] flex items-center justify-center border-b border-black/5 dark:border-white/5">
        <Hero />
      </section>

      {/* Grid container starts here */}
      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative z-10">
        {/* Global Vertical Grid Line */}
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-black/5 dark:bg-white/5 hidden md:block pointer-events-none z-0" />

        {/* New Bento Section (About/Status) */}
        <BentoSection />

        {/* Work Section */}
        <CaseStudiesSection />

        {/* About Me Section */}
        <AboutMe />

        {/* Contact Section */}
        <ContactSection />
      </div>
      
      {/* Footer */}
      <footer className="w-full text-center text-xs text-neutral-500 dark:text-neutral-500 py-8 border-t border-black/5 dark:border-white/5">
        <p>© {new Date().getFullYear()} Pablo Rodríguez Garijo. Built with Next.js, Tailwind & Love.</p>
      </footer>
    </main>
  );
}
