"use client";

import { cn } from "@/lib/utils";
import {
  Check,
  Circle,
  Plane,
  Briefcase,
  Target,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { BucketListCategory, BucketListStatus } from "@/data/bucket-list";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  Target,
  Sparkles,
};

const statusDot: Record<BucketListStatus, { label: string; dotClass: string; textClass: string }> = {
  done: {
    label: "Hecho",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-600 dark:text-emerald-400",
  },
  "in-progress": {
    label: "En progreso",
    dotClass: "bg-amber-500",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  pending: {
    label: "Pendiente",
    dotClass: "bg-neutral-300 dark:bg-neutral-600",
    textClass: "text-neutral-500 dark:text-neutral-400",
  },
};

function CategorySection({ category, index }: { category: BucketListCategory; index: number }) {
  const Icon = iconMap[category.icon] ?? Circle;
  const doneCount = category.items.filter((i) => i.status === "done").length;
  const totalCount = category.items.length;

  return (
    <section className="border-b border-black/5 dark:border-white/5">
      <div className="px-6 md:px-10 py-8 md:py-10 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
            <Icon size={16} className="text-neutral-500 dark:text-neutral-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-serif text-black dark:text-white leading-tight">
              {category.title}
            </h2>
            <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mt-0.5">
              {String(index + 1).padStart(2, "0")} — {doneCount} de {totalCount}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {category.items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                statusDot[item.status].dotClass
              )}
            />
          ))}
        </div>
      </div>

      <div className="divide-y divide-black/5 dark:divide-white/5">
        {category.items.map((item) => {
          const status = statusDot[item.status];
          return (
            <div
              key={item.id}
              className="group px-6 md:px-10 py-5 md:py-6 flex items-start gap-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
            >
              <div className="mt-1 shrink-0">
                {item.status === "done" ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Check size={12} className="text-emerald-500" strokeWidth={2.5} />
                  </div>
                ) : item.status === "in-progress" ? (
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-neutral-200 dark:border-neutral-700" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3">
                  <h3
                    className={cn(
                      "text-sm font-medium leading-snug",
                      item.status === "done"
                        ? "text-neutral-400 dark:text-neutral-500 line-through decoration-neutral-300 dark:decoration-neutral-600"
                        : "text-black dark:text-white"
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.year && (
                    <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                      {item.year}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <span className={cn("text-[10px] font-mono uppercase tracking-wider shrink-0 mt-0.5", status.textClass)}>
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function BucketListGrid({ categories }: { categories: BucketListCategory[] }) {
  const totalDone = categories.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.status === "done").length,
    0
  );
  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const progressPercent = Math.round((totalDone / totalItems) * 100);

  return (
    <div>
      <div className="px-6 md:px-10 py-6 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Progreso
          </span>
          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            {totalDone}/{totalItems}
          </span>
        </div>
        <div className="h-1 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {categories.map((category, idx) => (
        <CategorySection key={category.id} category={category} index={idx} />
      ))}
    </div>
  );
}
