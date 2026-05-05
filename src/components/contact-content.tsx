"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Mail,
  Globe,
  MapPin,
  Briefcase,
  Code2,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/data/profile";

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

        <div className="flex flex-wrap justify-center gap-2">
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
            href="/links"
            className={cn(
              "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl",
              "bg-black dark:bg-white text-white dark:text-black",
              "text-sm font-medium hover:opacity-90 transition-opacity"
            )}
          >
            <Globe size={14} />
            Todos mis links
          </Link>
          <a
            href={profile.social.email}
            className={cn(
              "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl",
              "border border-black/10 dark:border-white/10 bg-transparent",
              "text-sm font-medium text-black dark:text-white",
              "hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            )}
          >
            <Mail size={14} />
            Email directo
            <ArrowUpRight size={12} className="opacity-50" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function ContactContent() {
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
              Contacto
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-black dark:text-white">
              Proyecto, rol o simplemente un hola
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 leading-relaxed max-w-lg">
              Estoy disponible para roles a tiempo completo y proyectos freelance. Escríbeme y te responderé lo antes posible.
            </p>
          </div>
        </div>

        <div className="px-6 md:px-10 py-10 md:py-12">
          <div className="max-w-xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
