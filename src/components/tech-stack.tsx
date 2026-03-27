"use client";
import { stack } from "@/data/stack";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TechStack() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">
          Tech Stack
        </h3>
        <span className="text-xs text-neutral-400 font-medium">Updated 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {stack.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group cursor-default border border-neutral-100 dark:border-neutral-800"
          >
            <tech.icon
              size={20}
              className="text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              strokeWidth={1.5}
            />
            <span className="text-[10px] font-medium text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
