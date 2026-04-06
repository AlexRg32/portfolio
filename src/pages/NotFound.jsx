import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import MagneticButton from '../components/ui/MagneticButton';
import { fadeUp, staggerContainer } from '../utils/animations';
import { getNotFoundMeta } from '../utils/routeMeta';

export default function NotFound() {
  return (
    <PageTransition>
      <RouteMeta meta={getNotFoundMeta()} />
      <section className="relative overflow-hidden bg-bg px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-wide relative z-10 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-sm font-body uppercase tracking-[0.3em] text-text-dim"
          >
            Error 404
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-4xl text-display-lg font-display text-text"
          >
            Esta página no está donde debería.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg font-body leading-relaxed text-text-muted"
          >
            Puede que el enlace esté roto o que el contenido se haya movido. Te dejo accesos rápidos para volver a una ruta útil.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              as={Link}
              to="/"
              className="inline-flex items-center rounded-full bg-text px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-bg transition-colors duration-300 hover:bg-white"
            >
              Volver al inicio
            </MagneticButton>
            <MagneticButton
              as={Link}
              to="/work"
              className="inline-flex items-center rounded-full border border-border-light px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-text transition-colors duration-300 hover:border-text hover:bg-text hover:text-bg"
            >
              Ver trabajo
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
