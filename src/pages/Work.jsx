import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import PageTransition from '../components/layout/PageTransition';

export default function Work() {
  return (
    <PageTransition>
      <section className="pt-32 pb-section min-h-screen">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-wide"
        >
          <motion.p
            variants={fadeUp}
            className="text-text-dim text-sm font-body uppercase tracking-[0.3em] mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-display-lg font-display font-semibold text-text"
          >
            Trabajo
          </motion.h1>
          <motion.div variants={fadeUp} className="line-separator mt-12 mb-16" />
          <motion.p variants={fadeUp} className="text-text-dim font-body text-lg">
            Proyectos destacados — Coming in Phase 3
          </motion.p>
        </motion.div>
      </section>
    </PageTransition>
  );
}
