import { motion } from 'framer-motion';

export default function FooterContact() {
  return (
    <section id="contacto" className="border-t border-border bg-black py-32 text-center sm:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgb(255_255_255_/_0.03),_transparent_50%)] pointer-events-none" />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-display mb-12 text-5xl tracking-tighter text-white sm:text-7xl md:text-8xl">
            Hablemos.
          </h2>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="mailto:alexrg32@icloud.com"
              className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-black transition-transform hover:scale-105"
            >
              alexrg32@icloud.com
              <span className="absolute -inset-2 rounded-full border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
            <a
              href="/Alex_Ruiz_CV.pdf"
              target="_blank"
              download
              className="group inline-flex items-center justify-center rounded-full border border-border bg-surface px-8 py-4 text-sm font-semibold tracking-wide text-text transition-all hover:border-white hover:bg-white hover:text-black hover:scale-105"
            >
              Descargar CV
            </a>
          </div>
          
          <div className="mt-32 border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono uppercase tracking-widest text-text-dim">
             <p>© {new Date().getFullYear()} Alejandro Ruiz.</p>
             <div className="flex gap-6 mt-4 sm:mt-0">
               <a href="https://github.com/alexrg32" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
               <a href="https://linkedin.com/in/aleruizg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
