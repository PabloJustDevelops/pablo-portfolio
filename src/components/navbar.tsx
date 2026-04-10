"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Command, Link as LinkIcon, Laptop, Trophy } from "lucide-react";
import { Logo } from "./logo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactModal } from "./contact-modal";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#work" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const [modalState, setModalState] = useState<"closed" | "contact" | "navigation">("closed");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Sync hash on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    
    // Set initial hash
    handleHashChange();
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle click outside for More menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update pill position when pathname or hash changes
  useEffect(() => {
    if (!navRef.current) return;
    
    // Helper to check if an item is active
    const isItemActive = (href: string) => {
      if (href === "/") {
        return pathname === "/" && (!activeHash || activeHash === "");
      }
      if (href.startsWith("/#")) {
        const hash = href.substring(1);
        return activeHash === hash || (pathname === "/" && activeHash === hash);
      }
      return pathname.startsWith(href);
    };

    // Delay calculation slightly to allow DOM to update after font load / active state change
    const updatePill = () => {
      if (!navRef.current) return;
      const activeLink = Array.from(navRef.current.querySelectorAll("a")).find((el) => {
        const href = el.getAttribute("href") || "";
        return isItemActive(href);
      });

      if (activeLink) {
        const parentRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        setPillStyle({
          width: linkRect.width,
          left: linkRect.left - parentRect.left,
          opacity: 1,
        });
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updatePill();
    
    // Also add intersection observer to update active section on scroll
    const handleScroll = () => {
      const sections = navItems
        .filter(item => item.href.startsWith('/#'))
        .map(item => item.href.substring(2)); // get ids: "about", "work", etc.
      
      let currentSection = "";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is near the top of the viewport (with offset)
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = `#${section}`;
            break;
          }
        }
      }
      
      if (currentSection && currentSection !== activeHash) {
        // We only want to visually update the pill, not spam the history API
        setActiveHash(currentSection);
      } else if (!currentSection && window.scrollY < 100 && activeHash !== "") {
        // At the top of the page
        setActiveHash("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, activeHash]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
      {/* Left: Logo */}
      <div className="flex-1 flex items-center pointer-events-auto">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo className="w-8 h-8 text-black dark:text-white" />
        </Link>
      </div>

      {/* Center: Pill Navigation */}
      <div ref={moreMenuRef} className="relative flex items-center gap-1 p-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl pointer-events-auto">
        <nav ref={navRef} className="relative flex items-center gap-1">
          {/* Animated Background Pill */}
          <div
            className="absolute inset-y-0 bg-black/10 dark:bg-white/10 rounded-full border border-black/5 dark:border-white/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              width: `${pillStyle.width}px`,
              transform: `translateX(${pillStyle.left}px)`,
              opacity: pillStyle.opacity,
            }}
          />

          {navItems.map((item) => {
            let isActive = false;
            
            if (item.href === "/") {
              isActive = pathname === "/" && (!activeHash || activeHash === "");
            } else if (item.href.startsWith("/#")) {
              const hash = item.href.substring(1); // #about, #work
              isActive = activeHash === hash || (pathname === "/" && activeHash === hash);
            } else {
              isActive = pathname.startsWith(item.href);
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative z-10 px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive
                    ? "text-black dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                )}
                onClick={() => {
                  if (item.href.startsWith("/#")) {
                    setActiveHash(item.href.substring(1));
                  } else if (item.href === "/") {
                    setActiveHash("");
                  }
                  setIsMoreOpen(false);
                }}
              >
                {item.name}
              </Link>
            );
          })}
          
          <button 
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={cn(
              "relative z-10 flex items-center gap-1 text-sm font-medium transition-colors px-4 py-2 rounded-full",
              isMoreOpen ? "text-black dark:text-white bg-black/5 dark:bg-white/10" : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            )}
          >
            More
            <ChevronDown size={14} className={cn("opacity-50 transition-transform duration-300", isMoreOpen && "rotate-180")} />
          </button>
        </nav>

        <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10 mx-2" />

        <button
          onClick={() => setModalState("contact")}
          className="px-5 py-2 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 text-black dark:text-white text-sm font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-all shadow-[0_0_10px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_-5px_rgba(0,0,0,0.3)]"
        >
          Book a Call
        </button>

        {/* Dropdown Menu */}
        {isMoreOpen && (
          <div className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] bg-white dark:bg-[#1a1a1c] border border-black/10 dark:border-white/10 rounded-[2rem] shadow-2xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-in fade-in slide-in-from-top-4 duration-300 z-50 pointer-events-auto">
            
            {/* Bucket List Card */}
            <Link href="#" onClick={() => setIsMoreOpen(false)} className="group relative h-48 sm:h-full rounded-[1.5rem] overflow-hidden block border border-black/5 dark:border-white/5 bg-neutral-900">
              <Image 
                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80" 
                alt="Florida Summer Beach" 
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end">
                <h4 className="text-white font-sans font-bold text-lg leading-tight tracking-tight">Bucket List</h4>
                <p className="text-white/80 font-sans text-xs mt-1">Things to do at least once in my life</p>
              </div>
            </Link>

            {/* Links List */}
            <div className="flex flex-col gap-2">
              <Link href="#" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-4 p-3 rounded-[1.25rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors">
                <div className="w-10 h-10 rounded-[0.85rem] bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                  <LinkIcon size={18} className="text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black dark:text-white leading-tight">Links</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">All my links are here</p>
                </div>
              </Link>
              
              <Link href="/uses" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-4 p-3 rounded-[1.25rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors">
                <div className="w-10 h-10 rounded-[0.85rem] bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                  <Laptop size={18} className="text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black dark:text-white leading-tight">Uses</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">A peek into my digital...</p>
                </div>
              </Link>
              
              <Link href="#" onClick={() => setIsMoreOpen(false)} className="flex items-center gap-4 p-3 rounded-[1.25rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors">
                <div className="w-10 h-10 rounded-[0.85rem] bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                  <Trophy size={18} className="text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black dark:text-white leading-tight">Attribution</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Journey to create this site</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Right: Command Menu Trigger */}
      <div className="flex-1 flex items-center justify-end pointer-events-auto">
        <button 
          onClick={() => setModalState("navigation")}
          className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-black/10 dark:hover:border-white/10"
          aria-label="Search or Command Menu"
        >
          <Command size={20} />
        </button>
      </div>

      <ContactModal 
        isOpen={modalState !== "closed"} 
        initialView={modalState === "closed" ? "contact" : modalState}
        onClose={() => setModalState("closed")} 
      />
    </header>
  );
}
