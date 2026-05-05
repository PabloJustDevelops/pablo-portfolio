import { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactSection } from "@/components/contact-section";
import { bucketList } from "@/data/bucket-list";
import { BucketListGrid } from "@/components/bucket-list-grid";

export const metadata: Metadata = {
  title: `Bucket List | ${profile.name}`,
  description: `Cosas que quiero hacer al menos una vez en la vida — ${profile.name}`,
};

export default function BucketListPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-emerald-500/30 pt-24 md:pt-32">
      {/* Background ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-teal-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Grid Container */}
      <div className="max-w-6xl mx-auto border-x border-black/5 dark:border-white/5 relative z-10">

        {/* Header Section */}
        <header className="text-center py-20 md:py-28 flex flex-col items-center justify-center border-b border-black/5 dark:border-white/5 relative bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            Metas personales
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
            Bucket{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 italic pr-2">
              List
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-light px-4">
            Cosas que quiero hacer al menos una vez en la vida. Una lista viva que va creciendo conmigo.
          </p>
        </header>

        <div className="flex flex-col relative z-10">
          <BucketListGrid categories={bucketList} />
        </div>

        <div className="border-t border-black/5 dark:border-white/5">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
