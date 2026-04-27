import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { EducationPageData } from "@/data/education";

export function EducationFeatured({ featured }: { featured: EducationPageData["featured"] }) {
  return (
    <section className="px-6 md:px-10 py-10 md:py-14 border-b border-black/5 dark:border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8 bg-white/60 dark:bg-white/[0.02] ring-1 ring-black/5 dark:ring-white/10">
          <CardHeader className="border-b border-black/5 dark:border-white/5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{featured.main.period}</Badge>
              <Badge variant="outline" className="text-neutral-600 dark:text-neutral-300">
                {featured.main.location}
              </Badge>
            </div>
            <div className="mt-3 space-y-1">
              <div className="text-2xl md:text-3xl font-serif text-black dark:text-white">
                {featured.main.title}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">{featured.main.center}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {featured.main.summary && (
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{featured.main.summary}</p>
            )}
            {featured.main.tags && featured.main.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {featured.main.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 ring-1 ring-black/5 dark:ring-white/10">
          <CardHeader className="border-b border-black/5 dark:border-white/5">
            <div className="text-xl font-serif text-black dark:text-white">{featured.project.name}</div>
            <div className="text-neutral-600 dark:text-neutral-400">{featured.project.description}</div>
          </CardHeader>
          <CardContent className="space-y-5">
            {featured.project.notes && featured.project.notes.length > 0 && (
              <ul className="space-y-2">
                {featured.project.notes.map((n, i) => (
                  <li
                    key={`${featured.project.name}-note-${i}`}
                    className="flex gap-3 text-neutral-700 dark:text-neutral-300 leading-relaxed"
                  >
                    <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              {featured.project.stack.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-12 bg-white/60 dark:bg-white/[0.02] ring-1 ring-black/5 dark:ring-white/10">
          <CardHeader className="border-b border-black/5 dark:border-white/5">
            <div className="text-xl font-serif text-black dark:text-white">Actualmente aprendiendo</div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Temas en los que estoy profundizando últimamente.
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {featured.learningNow.map((topic) => (
                <Badge key={topic}>{topic}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

