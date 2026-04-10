import { Metadata } from "next";
import { Briefcase, Code2, Rocket, Network } from "lucide-react";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/contact-section";

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
        
        {/* Global Vertical Grid Line */}
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-black/5 dark:bg-white/5 hidden md:block pointer-events-none z-0" />

        {/* Header Section */}
        <header className="text-center py-20 md:py-32 flex flex-col items-center justify-center border-b border-black/5 dark:border-white/5 relative bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            The Journey
          </p>
          <h1 className="text-5xl md:text-7xl font-playfair tracking-tight mb-6">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 italic pr-2">
              Experience
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-light px-4">
            A timeline of my career, the companies I&apos;ve worked with, and the impact I&apos;ve made along the way.
          </p>
        </header>

        <div className="flex flex-col relative z-10">
          
          {/* Role 1 */}
          <section className="flex flex-col md:flex-row border-b border-black/5 dark:border-white/5 relative">
            {/* Left Column (Timeline/Date) */}
            <div className="md:w-1/3 p-8 md:p-12 shrink-0 flex flex-col justify-start">
              <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
                2023 — Present
              </p>
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-black dark:text-white mb-2">
                TechCorp Inc.
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                San Francisco, CA (Remote)
              </p>
            </div>
            
            {/* Right Column (Content) */}
            <div className="md:w-2/3 p-8 md:p-12 flex flex-col gap-6">
              <div className="group relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-black/5 dark:border-white/5 p-8 sm:p-10 hover:bg-white/[0.04] transition-colors duration-500 shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
                  <Briefcase size={100} className="text-blue-400" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif text-black dark:text-white mb-6">Senior Full-Stack Developer</h3>
                  
                  <div className="space-y-4">
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Leading a team of 5 developers to build scalable web applications. Reduced load times by 40% and implemented a new microservices architecture.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {["React", "Next.js", "Node.js", "AWS", "TypeScript"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Role 2 */}
          <section className="flex flex-col md:flex-row border-b border-black/5 dark:border-white/5 relative">
            {/* Left Column (Timeline/Date) */}
            <div className="md:w-1/3 p-8 md:p-12 shrink-0 flex flex-col justify-start">
              <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
                2021 — 2023
              </p>
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-black dark:text-white mb-2">
                Creative Digital
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                New York, NY
              </p>
            </div>
            
            {/* Right Column (Content) */}
            <div className="md:w-2/3 p-8 md:p-12 flex flex-col gap-6">
              <div className="group relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-black/5 dark:border-white/5 p-8 sm:p-10 hover:bg-white/[0.04] transition-colors duration-500 shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
                  <Network size={100} className="text-cyan-400" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif text-black dark:text-white mb-6">Frontend Developer</h3>
                  
                  <div className="space-y-4">
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Developed highly interactive marketing websites and internal dashboards for major brands. Focused on UI/UX, animations, and responsive design.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {["Vue.js", "GSAP", "Tailwind", "Figma", "Firebase"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Open Source / Freelance */}
          <section className="flex flex-col md:flex-row border-b border-black/5 dark:border-white/5 relative">
            {/* Left Column (Timeline/Date) */}
            <div className="md:w-1/3 p-8 md:p-12 shrink-0 flex flex-col justify-start">
              <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
                Ongoing
              </p>
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-black dark:text-white mb-2">
                Open Source & Freelance
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Global
              </p>
            </div>
            
            {/* Right Column (Content) */}
            <div className="md:w-2/3 p-8 md:p-12 flex flex-col sm:flex-row gap-6">
              <div className="flex-1 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-black/5 dark:border-white/5 p-8 relative overflow-hidden group shadow-sm">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <Code2 size={100} className="text-cyan-400" />
                </div>
                <h4 className="text-xl font-serif text-black dark:text-white mb-6 relative z-10">Notable Projects</h4>
                <ul className="space-y-6 relative z-10">
                  <li className="space-y-1">
                    <div className="text-sm font-medium text-cyan-600 dark:text-cyan-300">React Component Library</div>
                    <div className="text-xs text-neutral-500">Creator • 500+ Stars</div>
                  </li>
                  <li className="space-y-1">
                    <div className="text-sm font-medium text-cyan-600 dark:text-cyan-300">E-commerce Platform</div>
                    <div className="text-xs text-neutral-500">Freelance Lead • 2023</div>
                  </li>
                </ul>
              </div>

              <div className="flex-1 rounded-[2rem] bg-white/[0.02] border border-black/5 dark:border-white/5 p-8 flex flex-col justify-center items-center text-center group hover:border-blue-500/30 transition-colors shadow-sm">
                <Rocket className="text-neutral-500 dark:text-neutral-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 mb-4 transition-colors" size={40} />
                <div className="text-sm text-neutral-500 dark:text-neutral-400">Always looking for</div>
                <div className="text-xl font-medium text-black dark:text-white mt-2 font-serif">The next big challenge</div>
              </div>
            </div>
          </section>

          {/* Suggestion / Placeholder Note for the User */}
          <div className="p-8 md:p-12 relative z-10">
            <div className="p-6 rounded-2xl border border-dashed border-blue-500/30 bg-blue-500/5 text-center max-w-2xl mx-auto">
              <p className="text-sm text-blue-600 dark:text-blue-300/80 mb-2 font-mono uppercase tracking-widest">Dev Note</p>
              <p className="text-neutral-700 dark:text-neutral-300 font-light text-sm">
                This is the template for your Work Experience. Replace the texts and dates with your actual work history.
                You can duplicate the sections to add more companies to your timeline!
              </p>
            </div>
          </div>
        </div>

        {/* Recycled Contact / Call to action section */}
        <div className="border-t border-black/5 dark:border-white/5">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}