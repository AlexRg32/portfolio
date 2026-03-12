import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import { SOCIAL_LINKS } from '../utils/constants';
import PageTransition from '../components/layout/PageTransition';
import MagneticButton from '../components/ui/MagneticButton';

export default function Contact() {
  return (
    <PageTransition>
      <section className="pt-32 pb-section min-h-screen flex items-center">
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
            Contacto
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-display-lg font-display font-semibold text-text leading-tight"
          >
            ¿Tienes un
            <br />
            proyecto?
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-12">
            <MagneticButton
              as="a"
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="inline-block px-12 py-5 border border-border-light text-text font-body text-sm uppercase tracking-[0.2em] hover:bg-text hover:text-bg transition-all duration-500 ease-out-expo"
            >
              Escríbeme
            </MagneticButton>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-16 flex justify-center gap-12 text-text-dim"
          >
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body uppercase tracking-wider hover:text-text transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body uppercase tracking-wider hover:text-text transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-sm font-body uppercase tracking-wider hover:text-text transition-colors duration-300"
            >
              Email
            </a>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
