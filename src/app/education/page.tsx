import { Metadata } from "next";
import { GraduationCap, BookOpen, Trophy, Compass } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Education | ${profile.name}`,
  description: `Educational background and academic journey of ${profile.name}`,
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Background ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
        {/* Header Section */}
        <header className="mb-20 space-y-8 mt-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight">
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">Journey</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl font-light">
              A timeline of my formal education, certifications, and continuous learning path. Because mastering the craft never really stops.
            </p>
          </div>
        </header>

        {/* Graphical Timeline / Bento Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          
          {/* Main Degree/University Card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 sm:p-10 hover:bg-white/[0.04] transition-colors duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <GraduationCap size={120} className="text-indigo-400" />
            </div>
            
            <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
                  2018 — 2022
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif text-white mb-2">Bachelor in Computer Science</h3>
                <p className="text-xl text-neutral-300 font-light">University of Technology</p>
              </div>
              
              <div className="space-y-4 mt-12">
                <p className="text-neutral-400 leading-relaxed max-w-lg">
                  Focused on software engineering, algorithms, and web technologies. Graduated with honors and led the university&apos;s web development club.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Data Structures", "Web Dev", "Software Architecture", "AI Basics"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Card (e.g., Bootcamps/Certifications) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 rounded-[2rem] bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-white/5 p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Trophy size={100} className="text-purple-400" />
              </div>
              <h4 className="text-xl font-serif text-white mb-4 relative z-10">Certifications</h4>
              <ul className="space-y-4 relative z-10">
                <li className="space-y-1">
                  <div className="text-sm font-medium text-purple-300">AWS Certified Developer</div>
                  <div className="text-xs text-neutral-500">Amazon Web Services • 2023</div>
                </li>
                <li className="space-y-1">
                  <div className="text-sm font-medium text-purple-300">Full-Stack Bootcamp</div>
                  <div className="text-xs text-neutral-500">Ironhack • 2022</div>
                </li>
              </ul>
            </div>

            <div className="h-48 rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-center items-center text-center group hover:border-indigo-500/30 transition-colors">
              <Compass className="text-neutral-500 group-hover:text-indigo-400 mb-3 transition-colors" size={32} />
              <div className="text-sm text-neutral-400">Currently exploring</div>
              <div className="text-lg font-medium text-white mt-1">Web3 & Machine Learning</div>
            </div>
          </div>

          {/* Timeline Connector Line (Visible on Desktop) */}
          <div className="hidden md:block absolute left-[30px] top-[100%] bottom-[-100px] w-px bg-gradient-to-b from-white/10 to-transparent -z-10" />

          {/* Earlier Education Card */}
          <div className="md:col-span-12 mt-6 group relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 p-8 sm:p-10 hover:bg-white/[0.04] transition-colors duration-500">
             <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <BookOpen className="text-neutral-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-medium mb-3">
                    2016 — 2018
                  </div>
                  <h4 className="text-2xl font-serif text-white mb-1">High School Diploma (Technology Focus)</h4>
                  <p className="text-neutral-400">Institute of Sciences</p>
                </div>
             </div>
          </div>

        </div>

        {/* Suggestion / Placeholder Note for the User */}
        <div className="mt-24 p-6 rounded-2xl border border-dashed border-indigo-500/30 bg-indigo-500/5 text-center max-w-2xl mx-auto">
          <p className="text-sm text-indigo-300/80 mb-2 font-mono uppercase tracking-widest">Dev Note</p>
          <p className="text-neutral-300 font-light">
            This is a graphical placeholder layout for your education. You can replace the texts, add more cards, or change the dates. 
            The bento-box grid style makes it much more visual than a simple text list!
          </p>
        </div>

      </div>
    </main>
  );
}