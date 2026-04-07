import { Metadata } from "next";
import { Briefcase, Code2, Rocket, Network } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Work Experience | ${profile.name}`,
  description: `Professional journey and work experience of ${profile.name}`,
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Background ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
        {/* Header Section */}
        <header className="mb-20 space-y-8 mt-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">Experience</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl font-light">
              A timeline of my career, the companies I&apos;ve worked with, and the impact I&apos;ve made along the way.
            </p>
          </div>
        </header>

        {/* Graphical Timeline / Bento Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          
          {/* Main Recent Role Card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 sm:p-10 hover:bg-white/[0.04] transition-colors duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
              <Briefcase size={140} className="text-blue-400" />
            </div>
            
            <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-6">
                  2023 — Present
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif text-white mb-2">Senior Full-Stack Developer</h3>
                <p className="text-xl text-neutral-300 font-light">TechCorp Inc.</p>
              </div>
              
              <div className="space-y-4 mt-12">
                <p className="text-neutral-400 leading-relaxed max-w-lg">
                  Leading a team of 5 developers to build scalable web applications. Reduced load times by 40% and implemented a new microservices architecture.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "AWS", "TypeScript"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Card (e.g., Side Projects / Open Source) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-white/5 p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Code2 size={100} className="text-cyan-400" />
              </div>
              <h4 className="text-xl font-serif text-white mb-4 relative z-10">Open Source & Freelance</h4>
              <ul className="space-y-4 relative z-10">
                <li className="space-y-1">
                  <div className="text-sm font-medium text-cyan-300">React Component Library</div>
                  <div className="text-xs text-neutral-500">Creator • 500+ Stars</div>
                </li>
                <li className="space-y-1">
                  <div className="text-sm font-medium text-cyan-300">E-commerce Platform</div>
                  <div className="text-xs text-neutral-500">Freelance Lead • 2023</div>
                </li>
              </ul>
            </div>

            <div className="h-48 rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-center items-center text-center group hover:border-blue-500/30 transition-colors">
              <Rocket className="text-neutral-500 group-hover:text-blue-400 mb-3 transition-colors" size={32} />
              <div className="text-sm text-neutral-400">Always looking for</div>
              <div className="text-lg font-medium text-white mt-1">The next big challenge</div>
            </div>
          </div>

          {/* Timeline Connector Line (Visible on Desktop) */}
          <div className="hidden md:block absolute left-[30px] top-[100%] bottom-[-100px] w-px bg-gradient-to-b from-white/10 to-transparent -z-10" />

          {/* Previous Role Card */}
          <div className="md:col-span-12 mt-6 group relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 sm:p-10 hover:bg-white/[0.04] transition-colors duration-500">
             <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Network className="text-neutral-400 group-hover:text-cyan-300 transition-colors" size={24} />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-medium mb-3">
                    2021 — 2023
                  </div>
                  <h4 className="text-2xl font-serif text-white mb-1">Frontend Developer</h4>
                  <p className="text-neutral-400 mb-4">Creative Digital Agency</p>
                  <p className="text-sm text-neutral-500 max-w-3xl">
                    Developed highly interactive marketing websites and internal dashboards for major brands. Focused on UI/UX, animations, and responsive design.
                  </p>
                </div>
             </div>
          </div>

        </div>

        {/* Suggestion / Placeholder Note for the User */}
        <div className="mt-24 p-6 rounded-2xl border border-dashed border-blue-500/30 bg-blue-500/5 text-center max-w-2xl mx-auto">
          <p className="text-sm text-blue-300/80 mb-2 font-mono uppercase tracking-widest">Dev Note</p>
          <p className="text-neutral-300 font-light">
            This is the template for your Work Experience. Similar to the Education page, replace the texts and dates with your actual work history.
            You can copy the cards to add more companies to your timeline!
          </p>
        </div>

      </div>
    </main>
  );
}