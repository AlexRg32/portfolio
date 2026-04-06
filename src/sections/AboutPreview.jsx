import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';
import { fadeUp, viewportConfig } from '../utils/animations';

export default function AboutPreview() {
  return (
    <section className="relative z-10 bg-bg py-24 md:py-32">
      <div className="container-wide">
        <div className="grid gap-8 border-t border-border/45 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="eyebrow"
            >
              Cómo trabajo
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-5 max-w-3xl font-display text-display-md text-text"
            >
              Me siento cómodo en equipos donde hay que combinar criterio de interfaz, estructura técnica y una ejecución constante sin perder claridad.
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col items-start gap-5 lg:items-end"
          >
            <p className="max-w-md text-base leading-8 text-text-muted lg:text-right">
              Me interesa que el producto se vea bien, pero sobre todo que se entienda, funcione y se pueda mantener con el tiempo.
            </p>
            <MagneticButton as={Link} to="/about" className="button-primary">
              Ver experiencia
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
