import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations';
import PageTransition from '../components/layout/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-wide text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-text-dim text-sm font-body uppercase tracking-[0.3em] mb-6"
          >
            Creative Developer & AI Engineer
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-display-xl font-display font-semibold text-text leading-none"
          >
            ALEJANDRO
            <br />
            RUIZ
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 text-text-muted text-lg font-body max-w-xl mx-auto"
          >
            Construyo experiencias digitales que cuentan historias y generan resultados.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeUp}
            className="mt-20 flex flex-col items-center gap-2"
          >
            <span className="text-text-dim text-xs font-body uppercase tracking-[0.2em]">Scroll</span>
            <motion.div
              className="w-px h-12 bg-border-light"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Placeholder sections */}
      <section className="py-section">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="container-wide"
        >
          <div className="line-separator mb-12" />
          <h2 className="text-display-md font-display text-text">Servicios</h2>
          <p className="text-text-dim mt-4 font-body">— Coming in Phase 2</p>
        </motion.div>
      </section>

      <section className="py-section">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="container-wide"
        >
          <div className="line-separator mb-12" />
          <h2 className="text-display-md font-display text-text">Trabajo Destacado</h2>
          <p className="text-text-dim mt-4 font-body">— Coming in Phase 2</p>
        </motion.div>
      </section>

      <section className="py-section">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="container-wide text-center"
        >
          <h2 className="text-display-lg font-display text-text">Hablemos</h2>
          <p className="text-text-muted mt-6 font-body text-lg">
            ¿Tienes un proyecto en mente?
          </p>
          <a
            href="mailto:alexrg32@icloud.com"
            className="inline-block mt-8 px-10 py-4 border border-border-light text-text font-body text-sm uppercase tracking-[0.2em] hover:bg-text hover:text-bg transition-all duration-500 ease-out-expo"
          >
            Contactar
          </a>
        </motion.div>
      </section>
    </PageTransition>
  );
}
