import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';
import { projects } from '../data/projects';

export default function FeaturedWork() {
  const featuredIds = [1, 3, 5];
  const displayProjects = featuredIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean);

  return (
    <section className="relative z-10 bg-bg py-24 md:py-32">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow">Proyectos clave</p>
            <h2 className="mt-5 max-w-xl font-display text-display-md text-text">
              Trabajo que explica mejor mi encaje profesional.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-text-muted md:text-lg">
            He dejado arriba lo que mejor cuenta mi perfil: un SaaS en entorno profesional,
            un producto propio con base full-stack y un proyecto frontend bien resuelto.
          </p>
        </div>

        <div
          className="mt-14 space-y-16"
          data-gsap="group"
          data-gsap-stagger="0.08"
          data-gsap-start="top 84%"
        >
          {displayProjects.map((project, index) => (
            <motion.article
              key={project.id}
              data-gsap-item
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="border-t border-border/45 pt-10"
            >
              <div className={`grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center ${index % 2 === 1 ? 'lg:grid-cols-[0.95fr_1.05fr]' : ''}`}>
                <Link
                  to={`/work/${project.id}`}
                  className={`${index % 2 === 1 ? 'lg:order-2' : ''} block overflow-hidden rounded-[26px] border border-border/40`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out-expo hover:scale-[1.03]"
                    loading="lazy"
                  />
                </Link>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} max-w-[34rem]`}>
                  <p className="eyebrow">{index === 0 ? 'Proyecto destacado' : `Proyecto ${index + 1}`}</p>
                  <h3 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.96] tracking-[-0.04em] text-text">
                    {project.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-text-muted md:text-lg">
                    {project.caseStudy.summary}
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-[0.18em] text-text-dim">
                    {project.caseStudy.role}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <MagneticButton as={Link} to={`/work/${project.id}`} className="button-primary">
                      Ver detalle
                    </MagneticButton>
                    <MagneticButton
                      as="a"
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-secondary"
                    >
                      Abrir demo
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <MagneticButton as={Link} to="/work" className="button-secondary">
            Abrir portfolio completo
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
