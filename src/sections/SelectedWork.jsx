import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Espectáculos Baluarte',
    type: 'Web Corporativa / Eventos',
    description: 'Plataforma completa para la gestión y exposición de catálogos de espectáculos y eventos a gran escala.',
    tech: 'React · Tailwind · Vite',
    image: '/assets/baluarte.png',
    link: 'https://espectaculosbaluarte.netlify.app',
  },
  {
    id: 2,
    title: 'Fichatec',
    type: 'SaaS / B2B',
    description: 'SaaS para la gestión de ingredientes y alérgenos en la industria alimentaria. Entorno real de producción.',
    tech: 'Laravel · JS · MySQL',
    image: '/assets/fichatec.jpg',
    link: 'https://www.fichatec.com/tour/',
  },
  {
    id: 3,
    title: 'Saloria',
    type: 'SaaS / Producto',
    description: 'Sistema de gestión de citas, personal y operativa diaria diseñado para escalar.',
    tech: 'Spring Boot · React · Docker',
    image: '/assets/gestipelu.jpg',
    link: 'https://saloria.vercel.app',
  },
  {
    id: 4,
    title: "Autoescuela D'Click",
    type: 'Frontend / Landing',
    description: 'Landing page moderna de alta conversión estructurada para lectura rápida e interacción de contacto.',
    tech: 'React · Tailwind · Motion',
    image: '/assets/AUTOESCUELA.png',
    link: 'https://autoescuela-dclick.netlify.app',
  },
];

export default function SelectedWork() {
  return (
    <section id="proyectos" className="bg-black py-24 sm:py-32">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-display text-4xl sm:text-5xl text-white">Proyectos Seleccionados.</h2>
          <p className="mt-4 text-text-dim">Una selección de desarrollo full-stack y de producto reciente.</p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="group block"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative mb-6 overflow-hidden rounded-lg bg-surface pb-[60%] sm:pb-[50%]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                     <span className="bg-white text-black px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs">Ver Proyecto</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-6">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight text-white group-hover:text-accent-soft transition-colors">{project.title}</h3>
                    <p className="mt-2 text-text-muted max-w-md">{project.description}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-text-dim">{project.type}</span>
                    <span className="text-sm font-medium text-white">{project.tech}</span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
