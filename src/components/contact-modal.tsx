"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { toast } from "sonner";
import { sendEmail } from "@/app/actions/send-email";
import { 
  ArrowRight, Mail, ChevronLeft, Linkedin, Twitter, Github, 
  Search, Sun, Moon, Home, Folder, Book, Phone, Trophy, User, 
  FileText, List, Laptop, Link as LinkIcon, ArrowUpRight, Loader2 
} from "lucide-react";
import { profile } from "@/data/profile";
import Link from "next/link";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialView?: ModalState;
};

type ModalState = "navigation" | "contact" | "form";

export function ContactModal({ isOpen, onClose, initialView = "contact" }: ContactModalProps) {
  const [viewState, setViewState] = useState<ModalState>(initialView);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", topic: "", message: "", consent: false });
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Open/Close Animations
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      setViewState(initialView); // Reset to initial view when opened
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        backdropFilter: "blur(8px)",
        duration: 0.4,
        ease: "power2.out",
        display: "block",
      });

      gsap.fromTo(
        modalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    } else {
      document.body.style.overflow = ""; // Restore scrolling
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        },
      });

      gsap.to(modalRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen, initialView]);

  // View transition animation
  const switchView = (newState: ModalState) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        setViewState(newState);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
        );
      },
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Error", { description: "Por favor, completa los campos requeridos." });
      return;
    }
    if (!formData.consent) {
      toast.error("Error", { description: "Debes aceptar la política de privacidad." });
      return;
    }

    setIsPending(true);
    try {
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        message: `[Topic: ${formData.topic || "None"}]\n\n${formData.message}`,
      });

      if (result.error) {
        toast.error("Error", { description: result.error });
        return;
      }

      toast.success("¡Mensaje enviado!", {
        description: "Gracias por contactarme. Te responderé lo antes posible.",
      });
      setFormData({ name: "", email: "", topic: "", message: "", consent: false });
      switchView("contact");
    } catch (_error) {
      toast.error("Error inesperado", { description: "Ocurrió un error al enviar tu mensaje." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden bg-white/80 dark:bg-black/60 pointer-events-auto"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-[500px] overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <div ref={contentRef}>
            {viewState === "navigation" && (
              <div className="flex flex-col">
                {/* Search Header */}
                <div className="flex items-center gap-3 p-4 border-b border-black/5 dark:border-white/5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMNDAgMEg0ME00MCA0MEwwIDBIMFoiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')]">
                  <div className="flex-1 flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5">
                    <Search size={16} className="text-neutral-500" />
                    <input 
                      type="text" 
                      placeholder="Search pages, posts, projects..." 
                      className="bg-transparent border-none outline-none text-sm text-black dark:text-white w-full placeholder:text-neutral-500"
                    />
                  </div>
                  <button onClick={() => switchView("contact")} className="px-4 py-2.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors">
                    Reach out
                  </button>
                  <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2.5 text-neutral-500 dark:text-neutral-400 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white dark:hover:text-black dark:hover:text-white transition-colors"
                  >
                    {mounted && theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto max-h-[60vh] space-y-6">
                  {/* Recent */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-medium text-neutral-400">Recent</span>
                      <button className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Clear</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 border border-black/10 dark:border-white/10 rounded-full border-dashed cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">Bucket List</span>
                      <span className="px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 border border-black/10 dark:border-white/10 rounded-full border-dashed cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</span>
                    </div>
                  </div>

                  {/* Pages */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-3 px-1">
                      <span className="text-xs font-medium text-neutral-400">Pages</span>
                      <div className="h-px bg-black/5 dark:bg-white/5 flex-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <Link href="/" onClick={onClose} className="flex items-center justify-between p-2.5 rounded-xl bg-black/10 dark:bg-white/10 text-white">
                        <div className="flex items-center gap-3">
                          <Home size={16} className="opacity-70" />
                          <span className="text-sm font-medium">Home</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black dark:dark:bg-white mr-1" />
                      </Link>
                      <Link href="/#about" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <User size={16} className="opacity-70" />
                        <span className="text-sm font-medium">About</span>
                      </Link>
                      
                      <Link href="#work" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <Folder size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Projects</span>
                      </Link>
                      <Link href="#blog" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <FileText size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Blog</span>
                      </Link>
                      
                      <Link href="#" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <Book size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Guestbook</span>
                      </Link>
                      <Link href="#" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <List size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Bucket List</span>
                      </Link>
                      
                      <button onClick={() => switchView("contact")} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors w-full text-left">
                        <Phone size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Book a call</span>
                      </button>
                      <Link href="#" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <Laptop size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Uses</span>
                      </Link>
                      
                      <Link href="#" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <Trophy size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Attribution</span>
                      </Link>
                      <Link href="#" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                        <LinkIcon size={16} className="opacity-70" />
                        <span className="text-sm font-medium">Links</span>
                      </Link>
                    </div>
                  </div>

                  {/* Connect */}
                  <div className="space-y-2 pb-2">
                    <div className="flex items-center gap-3 mb-3 px-1">
                      <span className="text-xs font-medium text-neutral-400">Connect</span>
                      <div className="h-px bg-black/5 dark:bg-white/5 flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={profile.social.github} target="_blank" className="flex items-center gap-2 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors flex-1">
                        <Github size={16} className="opacity-70" />
                        <span className="text-sm font-medium flex-1">GitHub</span>
                        <ArrowUpRight size={14} className="opacity-50" />
                      </a>
                      <a href={profile.social.linkedin} target="_blank" className="flex items-center gap-2 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors flex-1">
                        <Linkedin size={16} className="opacity-70" />
                        <span className="text-sm font-medium flex-1">LinkedIn</span>
                        <ArrowUpRight size={14} className="opacity-50" />
                      </a>
                      <a href="#" target="_blank" className="flex items-center gap-2 p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors flex-1">
                        <Twitter size={16} className="opacity-70" />
                        <span className="text-sm font-medium flex-1">X (Twitter)</span>
                        <ArrowUpRight size={14} className="opacity-50" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewState === "contact" && (
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 p-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMNDAgMEg0ME00MCA0MEwwIDBIMFoiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')]">
                  <div className="space-y-1">
                    <h2 className="font-serif text-3xl font-medium text-black dark:text-white tracking-tight">Reach out</h2>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Let&apos;s build something together</p>
                  </div>
                  <button onClick={() => switchView("navigation")} className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-black/10 dark:hover:bg-black/10 dark:hover:bg-white/10 hover:text-white">
                    <ChevronLeft size={14} /> Menu
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Send Message Card */}
                  <button
                    onClick={() => switchView("form")}
                    className="group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-transparent p-6 text-left transition-all duration-300 hover:bg-[#1a1a1c]"
                  >
                    <div className="mb-10 flex w-full flex-col gap-3">
                      <div className="flex w-fit items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-[13px] text-blue-300">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[10px]">You</span>
                        Hey, I have a project idea!
                      </div>
                      <div className="flex w-fit items-center gap-2 self-end rounded-full bg-neutral-100 dark:bg-[#1a1a1c] px-4 py-2 text-[13px] text-neutral-300">
                        Sounds great, tell me more...
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-bold text-black dark:text-white overflow-hidden">
                          {profile.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">Project, role, or just a hey</h3>
                        <p className="text-sm text-neutral-500">Start a conversation</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-transparent px-4 py-2 text-[13px] font-medium text-black dark:text-white transition-colors duration-300 group-hover:bg-white/10">
                        Send message <ArrowRight size={14} className="opacity-70" />
                      </div>
                    </div>
                  </button>

                  {/* Email Card */}
                  <a
                    href={`mailto:${profile.social.email.replace("mailto:", "")}`}
                    className="group flex flex-col items-center justify-center rounded-3xl border border-black/5 dark:border-white/5 bg-transparent p-8 text-center transition-all duration-300 hover:bg-[#1a1a1c]"
                  >
                    <Mail size={32} strokeWidth={1.5} className="mb-4 text-neutral-500" />
                    <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">Email me</h3>
                    <p className="mt-1 text-sm text-neutral-500">{profile.social.email.replace("mailto:", "")}</p>
                  </a>

                  {/* Social Links Footer */}
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <a href={profile.social.linkedin} target="_blank" className="flex items-center justify-center gap-2 rounded-2xl border border-black/5 dark:border-white/5 bg-transparent py-3.5 text-[13px] font-medium text-neutral-500 dark:text-neutral-400 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-100 dark:bg-[#1a1a1c] hover:text-white">
                      <Linkedin size={16} className="opacity-70" /> LinkedIn
                    </a>
                    <a href="#" target="_blank" className="flex items-center justify-center gap-2 rounded-2xl border border-black/5 dark:border-white/5 bg-transparent py-3.5 text-[13px] font-medium text-neutral-500 dark:text-neutral-400 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-100 dark:bg-[#1a1a1c] hover:text-white">
                      <Twitter size={16} className="opacity-70" /> X / Twitter
                    </a>
                    <a href={profile.social.github} target="_blank" className="flex items-center justify-center gap-2 rounded-2xl border border-black/5 dark:border-white/5 bg-transparent py-3.5 text-[13px] font-medium text-neutral-500 dark:text-neutral-400 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-100 dark:bg-[#1a1a1c] hover:text-white">
                      <Github size={16} className="opacity-70" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            )}

            {viewState === "form" && (
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 p-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMNDAgMEg0ME00MCA0MEwwIDBIMFoiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')]">
                  <div className="space-y-1">
                    <h2 className="font-serif text-3xl font-medium text-black dark:text-white tracking-tight">Drop a note</h2>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">I read every message</p>
                  </div>
                  <button onClick={() => switchView("navigation")} className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-black/10 dark:hover:bg-black/10 dark:hover:bg-white/10 hover:text-white">
                    <ChevronLeft size={14} /> Menu
                  </button>
                </div>

                <div className="p-6">
                  <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Name</label>
                        <input 
                          type="text" 
                          placeholder="Jane Doe" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white placeholder:text-neutral-600 focus:border-black/20 dark:focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Email</label>
                        <input 
                          type="email" 
                          placeholder="jane@example.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white placeholder:text-neutral-600 focus:border-black/20 dark:focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Topic</label>
                      <select 
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white focus:border-black/20 dark:focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                      >
                        <option value="" disabled>Select a topic</option>
                        <option value="project">Project Inquiry</option>
                        <option value="role">Full-time Role</option>
                        <option value="hello">Just saying hi</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Message</label>
                      <textarea 
                        rows={4} 
                        placeholder="Tell me about your project, idea, or just say hi..." 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white placeholder:text-neutral-600 focus:border-black/20 dark:focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all" 
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        id="consent" 
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 checked:bg-white dark:checked:bg-black dark:bg-white accent-white cursor-pointer" 
                      />
                      <label htmlFor="consent" className="text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer">
                        I agree that my submitted data is collected and stored to respond to my inquiry.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-black dark:dark:bg-white px-4 py-3 text-sm font-semibold text-black dark:text-white dark:dark:text-black transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isPending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}