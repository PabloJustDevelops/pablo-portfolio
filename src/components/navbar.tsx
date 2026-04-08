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
  { name: "Blog", href: "/#blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Update pill position when pathname changes
  useEffect(() => {
    if (!navRef.current) return;
    
    // Find active link
    const activeLink = Array.from(navRef.current.querySelectorAll("a")).find((el) => {
      const href = el.getAttribute("href");
      return href === pathname || (href !== "/" && pathname.startsWith(href || ""));
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
  }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
      {/* Left: Logo */}
      <div className="flex-1 flex items-center pointer-events-auto">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo className="w-8 h-8 text-white" />
        </Link>
      </div>

      {/* Center: Pill Navigation */}
      <div className="relative flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
        <nav ref={navRef} className="relative flex items-center gap-1">
          {/* Animated Background Pill */}
          <div
            className="absolute inset-y-0 bg-white/10 rounded-full border border-white/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              width: `${pillStyle.width}px`,
              transform: `translateX(${pillStyle.left}px)`,
              opacity: pillStyle.opacity,
            }}
          />

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative z-10 px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          
          <button className="relative z-10 flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2">
            More
            <ChevronDown size={14} className="opacity-50" />
          </button>
        </nav>

        <div className="w-[1px] h-6 bg-white/10 mx-2" />

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 rounded-full bg-white/10 border border-white/5 text-white text-sm font-medium hover:bg-white/20 transition-all shadow-[0_0_10px_-5px_rgba(255,255,255,0.3)]"
        >
          Book a Call
        </button>
      </div>

      {/* Right: Command Menu Trigger */}
      <div className="flex-1 flex items-center justify-end pointer-events-auto">
        <button 
          className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
          aria-label="Search or Command Menu"
        >
          <Command size={20} />
        </button>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
