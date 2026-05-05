import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  ArrowUpRight,
  MapPin,
  Briefcase,
  Code2,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { profile } from "@/data/profile";

type LinkEntry = {
  id: string;
  title: string;
  handle: string;
  href: string;
  icon: LucideIcon;
};

type LinkCategory = {
  id: string;
  title: string;
  links: LinkEntry[];
};

const categories: LinkCategory[] = [
  {
    id: "code",
    title: "Código y Proyectos",
    links: [
      {
        id: "github",
        title: "GitHub",
        handle: "@PabloJustDevelops",
        href: profile.social.github,
        icon: Github,
      },
      {
        id: "portfolio",
        title: "Portfolio",
        handle: "pablo-portfolio.vercel.app",
        href: "/",
        icon: Globe,
      },
    ],
  },
  {
    id: "connect",
    title: "Conecta",
    links: [
      {
        id: "linkedin",
        title: "LinkedIn",
        handle: "in/pablo-rodríguez-garijo",
        href: profile.social.linkedin,
        icon: Linkedin,
      },
      {
        id: "twitter",
        title: "X (Twitter)",
        handle: "@pablojustdev",
        href: profile.social.twitter,
        icon: Twitter,
      },
      {
        id: "email",
        title: "Email",
        handle: profile.social.email.replace("mailto:", ""),
        href: profile.social.email,
        icon: Mail,
      },
    ],
  },
];

function ProfileCard() {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center ring-2 ring-black/10 dark:ring-white/10">
            <Logo className="w-12 h-12 text-white dark:text-black" />
          </div>
          <h2 className="text-2xl font-serif text-black dark:text-white">
            {profile.name}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20">
            <Code2 size={12} className="mr-1" />
            Developer
          </Badge>
          <Badge className="bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20">
            <Briefcase size={12} className="mr-1" />
            Freelancer
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0 opacity-60" />
            <span>Albacete, España</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="shrink-0 opacity-60" />
            <span>{profile.social.email.replace("mailto:", "")}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl",
              "bg-black dark:bg-white text-white dark:text-black",
              "text-sm font-medium hover:opacity-90 transition-opacity"
            )}
          >
            <Send size={14} />
            Contactar
          </Link>
          <Link
            href="/"
            className={cn(
              "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl",
              "border border-black/10 dark:border-white/10 bg-transparent",
              "text-sm font-medium text-black dark:text-white",
              "hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            )}
          >
            <Globe size={14} />
            Website
          </Link>
        </div>
      </div>
    </div>
  );
}

function LinkItem({ entry }: { entry: LinkEntry }) {
  const Icon = entry.icon;
  const isExternal = entry.href.startsWith("http");

  return (
    <a
      href={entry.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/[0.01] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:border-black/10 dark:hover:border-white/10 transition-all"
    >
      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
        <Icon size={18} className="text-neutral-600 dark:text-neutral-400" strokeWidth={1.5} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-semibold text-black dark:text-white leading-tight">
            {entry.title}
          </h4>
          {isExternal && (
            <ArrowUpRight size={12} className="text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 truncate font-mono">
          {entry.handle}
        </p>
      </div>
    </a>
  );
}

export function LinksContent() {
  return (
    <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <aside className="hidden md:block border-r border-black/5 dark:border-white/5">
        <div className="sticky top-24 px-6 py-12">
          <ProfileCard />
        </div>
      </aside>

      <div className="border-b border-black/5 dark:border-white/5">
        <div className="px-6 md:px-10 py-10 md:py-12 border-b border-black/5 dark:border-white/5">
          <div className="md:hidden mb-8">
            <ProfileCard />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase mb-2">
              Network
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-black dark:text-white">
              Conecta conmigo
            </h1>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="px-6 md:px-10 py-8 border-b border-black/5 dark:border-white/5 last:border-b-0">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-5">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.links.map((entry) => (
                <LinkItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
