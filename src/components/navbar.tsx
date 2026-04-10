"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Command } from "lucide-react";
import { Logo } from "./logo";
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
  const navRef = useRef<HTMLElement>(null);

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
      <div className="relative flex items-center gap-1 p-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl pointer-events-auto">
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
                }}
              >
                {item.name}
              </Link>
            );
          })}
          
          <button className="relative z-10 flex items-center gap-1 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors px-4 py-2">
            More
            <ChevronDown size={14} className="opacity-50" />
          </button>
        </nav>

        <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10 mx-2" />

        <button
          onClick={() => setModalState("contact")}
          className="px-5 py-2 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 text-black dark:text-white text-sm font-medium hover:bg-black/10 dark:hover:bg-white/20 transition-all shadow-[0_0_10px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_-5px_rgba(0,0,0,0.3)]"
        >
          Book a Call
        </button>
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
