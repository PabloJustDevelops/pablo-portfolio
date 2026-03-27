"use client";

import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              ¿Hablamos?
              <br />
              <span className="text-neutral-500">Vamos a crear algo increíble.</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
              Estoy disponible para nuevos proyectos freelance o oportunidades laborales. 
              Si tienes una idea en mente o simplemente quieres saludar, ¡escríbeme!
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <span>pablolopez2001@outlook.es</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-violet-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <span>Disponible en LinkedIn</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-950/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
