import { CaseStudiesSection } from "@/components/case-studies";
import { Hero } from "@/components/hero";
import { BentoSection } from "@/components/bento-section";
import { AboutMe } from "@/components/about-me";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans antialiased selection:bg-neutral-800">
      {/* Hero Section Full Width */}
      <section className="w-full h-screen min-h-[600px] flex items-center justify-center border-b border-white/5">
        <Hero />
      </section>

      {/* New Bento Section (About/Status) */}
      <BentoSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* Work Section */}
        <CaseStudiesSection />

        {/* About Me Section */}
        <AboutMe />

        {/* Contact Section */}
        <ContactSection />

      </div>
      
      {/* Footer */}
      <footer className="w-full text-center text-xs text-neutral-500 py-8 border-t border-white/5">
        <p>© {new Date().getFullYear()} Pablo Rodríguez Garijo. Built with Next.js, Tailwind & Love.</p>
      </footer>
    </main>
  );
}
