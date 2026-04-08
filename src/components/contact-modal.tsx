"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Mail, X, Linkedin, Twitter, Github, ChevronLeft } from "lucide-react";
import { profile } from "@/data/profile";
import Image from "next/image";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ModalState = "menu" | "form";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [viewState, setViewState] = useState<ModalState>("menu");
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      setViewState("menu"); // Reset to main menu
      
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
  }, [isOpen]);

  // View transition animation
  const switchView = (newState: ModalState) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: newState === "form" ? -20 : 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setViewState(newState);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: newState === "form" ? 20 : -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden bg-black/60"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-[500px] overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f11] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 p-6">
            <div className="space-y-1">
              <h2 className="font-serif text-3xl text-white">
                {viewState === "menu" ? "Reach out" : "Drop a note"}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                {viewState === "menu" ? "Let's build something together" : "I read every message"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {viewState === "form" && (
                <button
                  onClick={() => switchView("menu")}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ChevronLeft size={14} /> Menu
                </button>
              )}
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          <div ref={contentRef} className="p-6">
            {viewState === "menu" ? (
              <div className="space-y-4">
                {/* Send Message Card */}
                <button
                  onClick={() => switchView("form")}
                  className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 text-left transition-all hover:border-white/10 hover:bg-white/10"
                >
                  <div className="mb-8 flex w-full flex-col gap-3">
                    <div className="flex w-fit items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1.5 text-sm text-blue-300">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[10px]">
                        You
                      </span>
                      Hey, I have a project idea!
                    </div>
                    <div className="flex w-fit items-center gap-2 self-end rounded-full bg-white/10 px-3 py-1.5 text-sm text-neutral-300">
                      Sounds great, tell me more...
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-[10px] font-bold text-white overflow-hidden">
                        {profile.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Project, role, or just a hey</h3>
                      <p className="text-sm text-neutral-400">Start a conversation</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors group-hover:bg-white/10">
                      Send message <ArrowRight size={14} />
                    </div>
                  </div>
                </button>

                {/* Email Card */}
                <a
                  href={`mailto:${profile.social.email.replace("mailto:", "")}`}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-8 text-center transition-all hover:border-white/10 hover:bg-white/10"
                >
                  <Mail size={32} strokeWidth={1.5} className="mb-4 text-neutral-400 group-hover:text-white transition-colors" />
                  <h3 className="text-lg font-semibold text-white">Email me</h3>
                  <p className="font-mono text-xs text-neutral-500">{profile.social.email.replace("mailto:", "")}</p>
                </a>

                {/* Social Links Footer */}
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <a href={profile.social.linkedin} target="_blank" className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-sm text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                  <a href="#" target="_blank" className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-sm text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
                    <Twitter size={16} /> Twitter
                  </a>
                  <a href={profile.social.github} target="_blank" className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-sm text-neutral-400 transition-colors hover:bg-white/10 hover:text-white">
                    <Github size={16} /> GitHub
                  </a>
                </div>
              </div>
            ) : (
              /* Contact Form View */
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Email</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Topic</label>
                  <select className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all">
                    <option value="" disabled selected>Select a topic</option>
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
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="consent" className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 checked:bg-white accent-white" />
                  <label htmlFor="consent" className="text-xs text-neutral-400">
                    I agree that my submitted data is collected and stored to respond to my inquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}