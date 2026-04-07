"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#work" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 inset-x-0 max-w-fit mx-auto z-50 px-4">
      <div className="relative flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
          
          <button className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition-colors px-4 py-2">
            More
            <ChevronDown size={14} className="opacity-50" />
          </button>
        </nav>

        <div className="w-[1px] h-6 bg-white/10 mx-2" />

        <Link
          href="mailto:hello@example.com"
          className="px-5 py-2 rounded-full bg-white/10 border border-white/5 text-white text-sm font-medium hover:bg-white/20 transition-all shadow-[0_0_10px_-5px_rgba(255,255,255,0.3)]"
        >
          Book a Call
        </Link>
      </div>
    </div>
  );
}
