import { motion } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';
import { SOCIAL_LINKS } from '../utils/constants';
import { profile } from '../data/profile';
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations';

export default function CTASection() {
  return (
    <section className="relative z-10 bg-bg py-24 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="container-wide"
      >
        <div className="border-t border-border/45 pt-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <motion.p variants={fadeUp} className="eyebrow">
                Contacto profesional
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-5 max-w-3xl font-display text-display-lg font-semibold text-text"
              >
                Si encaja mi perfil,
                <br className="hidden md:block" /> hablamos
              </motion.h2>
            </div>

            <motion.div variants={fadeUp}>
              <p className="max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                {profile.recruiterPitch}
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
          >
            <MagneticButton as="a" href={`mailto:${SOCIAL_LINKS.email}`} className="button-primary w-full sm:w-auto">
              Escribir por email
            </MagneticButton>
            <MagneticButton
              as="a"
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary w-full sm:w-auto"
            >
              Abrir LinkedIn
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
