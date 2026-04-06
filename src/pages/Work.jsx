import { useRef } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getWorkMeta } from '../utils/routeMeta';

export default function Work() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <PageTransition>
      <div ref={pageRef}>
        <RouteMeta meta={getWorkMeta()} />

        <section className="relative overflow-hidden bg-bg pb-16 pt-32 md:pb-20 md:pt-44">
          <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(108,160,255,0.18),transparent_44%)]" />

          <div className="container-wide relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow">
                Proyectos seleccionados
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-display-lg text-text">
                Proyectos donde se ve mejor cómo trabajo.
              </h1>
            </div>

            <p className="max-w-3xl text-base leading-8 text-text-muted md:text-lg">
              He priorizado primero lo que mejor explica mi encaje profesional:
              SaaS, producto real, experiencia profesional y ejecución full-stack cuando hace falta.
            </p>
          </div>
        </section>

        <section className="bg-bg py-12 md:py-16">
          <div
            className="container-wide space-y-16"
            data-gsap="group"
            data-gsap-stagger="0.08"
            data-gsap-start="top 82%"
          >
            {sortedProjects.map((project, index) => (
              <article
                key={project.id}
                data-gsap-item
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
                    />
                  </Link>

                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex h-full flex-col justify-between`}>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="tag-chip">{`Selección ${project.priority}`}</span>
                        {project.status && <span className="tag-chip">{project.status}</span>}
                      </div>

                      <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.96] tracking-[-0.04em] text-text">{project.title}</h2>
                      <p className="mt-5 text-base leading-8 text-text-muted md:text-lg">
                        {project.caseStudy.summary}
                      </p>

                      <p className="mt-5 text-sm uppercase tracking-[0.18em] text-text-dim">
                        {project.caseStudy.role}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="tag-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <MagneticButton as={Link} to={`/work/${project.id}`} className="button-primary">
                        Ver caso
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
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
