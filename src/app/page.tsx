import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { BentoSection } from "@/components/bento-section";
import { AboutMe } from "@/components/about-me";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans antialiased selection:bg-neutral-800">
      <Navbar />
      
      {/* Hero Section Full Width */}
      <section className="w-full h-screen min-h-[600px] flex items-center justify-center border-b border-white/5">
        <Hero />
      </section>

      {/* New Bento Section (About/Status) */}
      <BentoSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        
        {/* Work Section */}
        <section id="work">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-500 mb-2">Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Curated <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">work</span>
            </h2>
          </div>
          
          <BentoGrid>
            {projects.map((project, i) => (
              <BentoGridItem
                key={i}
                className={i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"}
              >
                 <ProjectCard project={project} />
              </BentoGridItem>
            ))}
          </BentoGrid>
        </section>

        {/* About Me Section */}
        <AboutMe />

        {/* Contact Section */}
        <ContactSection />

      </div>
      
      {/* Footer */}
      <footer className="w-full text-center text-xs text-neutral-500 py-8 border-t border-white/5">
        <p>© {new Date().getFullYear()} Pablo. Built with Next.js, Tailwind & Love.</p>
      </footer>
    </main>
  );
}
