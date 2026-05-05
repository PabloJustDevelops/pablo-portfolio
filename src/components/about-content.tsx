"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { EducationTimeline } from "@/components/education-timeline";

const tabs = [
  {
    id: "experience",
    label: "Experiencia",
    icon: Briefcase,
  },
  {
    id: "education",
    label: "Formación",
    icon: GraduationCap,
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function AboutContent() {
  const [activeTab, setActiveTab] = useState<TabId>("experience");

  return (
    <div>
      <div className="sticky top-16 md:top-20 z-20 bg-neutral-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-black/5 dark:border-white/5">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-white dark:bg-white/10 text-black dark:text-white shadow-sm border border-black/10 dark:border-white/10"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  <Icon size={14} className={cn(isActive ? "text-indigo-500" : "opacity-60")} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            {activeTab === "experience"
              ? `${experience.length} posiciones`
              : `${education.length} entradas`}
          </div>
        </div>
      </div>

      <div>
        {activeTab === "experience" && (
          <ExperienceTimeline items={experience} />
        )}
        {activeTab === "education" && (
          <EducationTimeline items={education} />
        )}
      </div>
    </div>
  );
}
