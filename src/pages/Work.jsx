import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import MagneticButton from '../components/ui/MagneticButton';
import { projects } from '../data/projects';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function Work() {
  return (
    <PageTransition>
      <RouteMeta
        title="Trabajo Seleccionado | Alejandro Ruiz"
        description="Seleccion de proyectos web, SaaS y experiencias digitales construidas por Alejandro Ruiz con foco en claridad, conversion y mantenibilidad."
        path="/work"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Trabajo Seleccionado',
          hasPart: projects.map((project) => ({
            '@type': 'CreativeWork',
            name: project.title,
            url: `https://alejandroruiz.netlify.app/work/${project.id}`,
          })),
        }}
      />
      <section className="relative overflow-hidden bg-bg pt-32 md:pt-40">
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-wide relative z-10"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-sm font-body uppercase tracking-[0.3em] text-text-dim"
          >
            Trabajo Seleccionado
          </motion.p>
          <motion.h1 variants={fadeUp} className="max-w-5xl text-display-lg font-display text-text">
            Productos, landings y sistemas pensados para mover negocio, no solo pixels.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-3xl text-lg md:text-xl font-body leading-relaxed text-text-muted"
          >
            Aqui tienes una seleccion de proyectos donde he trabajado interfaz, arquitectura y experiencia de usuario con foco real en conversion, claridad y mantenimiento.
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="container-wide space-y-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.04 }}
              className="grid gap-8 overflow-hidden rounded-[32px] border border-border bg-surface/65 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
            >
              <Link
                to={`/work/${project.id}`}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-black"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </Link>

              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="text-sm uppercase tracking-[0.22em] text-text-dim">
                      Proyecto {project.id}
                    </span>
                    {project.status && (
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-dim">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h2 className="text-display-sm font-display text-text">{project.title}</h2>
                  <p className="mt-5 text-base md:text-lg font-body leading-relaxed text-text-muted">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border-light px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-text-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <MagneticButton
                    as={Link}
                    to={`/work/${project.id}`}
                    className="inline-flex items-center rounded-full bg-text px-7 py-4 text-sm font-body uppercase tracking-[0.2em] text-bg transition-colors duration-300 hover:bg-white"
                  >
                    Ver detalle
                  </MagneticButton>
                  <MagneticButton
                    as="a"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-border-light px-7 py-4 text-sm font-body uppercase tracking-[0.2em] text-text transition-colors duration-300 hover:border-text hover:bg-text hover:text-bg"
                  >
                    Abrir proyecto
                  </MagneticButton>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
