import { motion } from 'framer-motion';
import { fadeUp, viewportConfig } from '../utils/animations';
import TextReveal from '../components/ui/TextReveal';
import MagneticButton from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';

export default function AboutPreview() {
  return (
    <section className="py-24 md:py-48 relative z-10 bg-bg">
      <div className="container-wide flex flex-col items-center justify-center text-center">
        <motion.p 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-text-dim text-xs font-body uppercase tracking-[0.3em] mb-12"
        >
          El Enfoque
        </motion.p>
        
        {/* Potent statement revealed word by word */}
        <div className="max-w-4xl mx-auto mb-16">
          <TextReveal 
            as="h2" 
            className="text-display-md md:text-[clamp(2.5rem,5vw,5rem)] font-display text-text leading-[1.1] tracking-tight"
          >
            No hago plantillas. Escribo código a medida para empresas que se toman el diseño en serio y quieren devorar a su competencia.
          </TextReveal>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <MagneticButton 
            as={Link} 
            to="/about"
            className="inline-block px-8 py-4 bg-text text-bg font-body text-sm uppercase tracking-[0.2em] hover:bg-transparent hover:text-text hover:border-text border-transparent border transition-all duration-500 ease-out-expo"
          >
            Conocer más
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
