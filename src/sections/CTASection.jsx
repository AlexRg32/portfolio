import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations';
import MagneticButton from '../components/ui/MagneticButton';
import { SOCIAL_LINKS } from '../utils/constants';

// Contact Call To Action imported as a reusable section in Home
export default function CTASection() {
  return (
    <section className="py-32 md:py-64 relative z-10 bg-bg">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="container-wide text-center"
      >
        <motion.p 
          variants={fadeUp}
          className="text-text-dim text-sm font-body uppercase tracking-[0.3em] mb-8"
        >
          Siguiente paso
        </motion.p>
        
        <motion.h2 
          variants={fadeUp} 
          className="text-display-xl font-display font-semibold text-text uppercase leading-none tracking-tighter"
        >
          Ponte En
          <br className="hidden md:block"/> Contacto
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-16">
          <MagneticButton
            as="a"
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="inline-block z-20 px-12 py-6 rounded-full border border-border bg-surface hover:bg-text hover:border-text hover:text-bg text-text text-sm font-body uppercase tracking-[0.2em] transition-colors duration-500 ease-out-expo"
          >
            alexrg32@icloud.com
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
