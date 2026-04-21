import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Freelance Developer',
    company: 'Independiente',
    period: 'Feb 2026 — Actualidad',
    details: 'Desarrollo de landing pages de alta conversión y aplicaciones web personalizadas con foco en performance y UX.',
  },
  {
    role: 'Full Stack Developer',
    company: 'Infoexpo (SaaS Fichatec)',
    period: '2025 — Feb 2026',
    details: 'Desarrollo de producto escalable, optimización de flujos SaaS y automatización avanzada con agentes de IA.',
  },
  {
    role: 'Full Stack Developer',
    company: 'Proyectos Gastronómicos (Freelance)',
    period: '2024 — 2025',
    details: 'Definición de arquitecturas web, sistemas de votación y paneles de administración complejos.',
  },
];

export default function Experience() {
  return (
    <section id="trayectoria" className="bg-black py-24 sm:py-32 border-t border-border/50">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-display text-4xl sm:text-5xl text-white">Trayectoria.</h2>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col sm:flex-row justify-between gap-4 border-b border-border pb-12"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                <p className="text-accent-soft font-medium mt-1">{exp.company}</p>
                <p className="text-text-muted mt-4 max-w-lg leading-relaxed">{exp.details}</p>
              </div>
              <div className="text-sm font-mono text-text-dim whitespace-nowrap">
                {exp.period}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
