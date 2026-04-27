import { Badge } from "@/components/ui/badge";
import type { EducationItem } from "@/data/education";

export function EducationTimeline({ items }: { items: EducationItem[] }) {
  return (
    <section className="px-6 md:px-10 py-12 md:py-16">
      <div className="flex flex-col">
        {items.map((item) => (
          <section key={item.id} className="border-b border-black/5 dark:border-white/5 py-10 md:py-12">
            <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{item.period}</Badge>
                  <Badge variant="outline" className="text-neutral-600 dark:text-neutral-300">
                    {item.location}
                  </Badge>
                </div>
                <div className="text-lg font-serif text-black dark:text-white">{item.center}</div>
              </div>

              <div className="mt-6 md:mt-0 space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif text-black dark:text-white">{item.title}</h2>
                {item.summary && (
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{item.summary}</p>
                )}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-3">
                    {item.highlights.map((h, i) => (
                      <li key={`${item.id}-h-${i}`} className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={`${item.id}-${tag}`}>{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

