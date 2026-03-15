import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../utils/animations';
import MagneticButton from '../components/ui/MagneticButton';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Scene = lazy(() => import('../components/three/Scene'));

export default function HeroSection() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const shouldRenderScene = hasFinePointer && !prefersReducedMotion;

  return (
    <section className="h-[100svh] flex items-center justify-center relative overflow-hidden">
      {/* Capa de fondo interactiva */}
      {shouldRenderScene && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      {/* Capa tipografica */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-wide text-center relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="mx-auto inline-flex items-center rounded-full border border-white/10 bg-black/25 px-4 py-2 text-text-dim text-[10px] md:text-xs font-body uppercase tracking-[0.3em] mb-5 md:mb-7 backdrop-blur-md"
        >
          Desarrollo web con foco en negocio
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-display-xl font-display font-semibold text-text leading-[0.85] tracking-tight mix-blend-difference"
        >
          ALEJANDRO
          <br />
          RUIZ
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 md:mt-10 text-text-muted text-base md:text-lg font-body max-w-2xl mx-auto mix-blend-difference"
        >
          Te ayudo a lanzar una web clara, rápida y con personalidad, construida con tecnología sólida para que no se quede pequeña en seis meses.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row"
        >
          <MagneticButton
            as={Link}
            to="/work"
            className="inline-flex items-center rounded-full bg-text px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-bg transition-colors duration-300 hover:bg-white"
          >
            Ver proyectos
          </MagneticButton>
          <MagneticButton
            as={Link}
            to="/contact"
            className="inline-flex items-center rounded-full border border-white/20 bg-black/15 px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-text backdrop-blur-md transition-colors duration-300 hover:border-text hover:bg-text hover:text-bg"
          >
            Hablemos
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[11px] md:text-xs font-body uppercase tracking-[0.22em] text-text-dim"
        >
          <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-md">PHP / Laravel / React</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-md">JavaScript / TypeScript</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-md">APIs / Servidor / SaaS</span>
        </motion.div>

        {/* Indicador de desplazamiento */}
        <motion.div
          variants={fadeUp}
          className="absolute left-1/2 -translate-x-1/2 bottom-[-15vh] md:bottom-[-20vh] flex flex-col items-center gap-3"
        >
          <span className="text-text-dim text-[10px] font-body uppercase tracking-[0.2em]">Baja</span>
          <motion.div
            className="w-px h-16 bg-border-light"
            animate={{ scaleY: [0, 1, 0], translateY: [0, 0, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
