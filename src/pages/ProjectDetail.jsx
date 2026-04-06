import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ANALYTICS_EVENTS, trackAnalyticsEvent } from '../utils/analytics';
import { getProjectMeta } from '../utils/routeMeta';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((item) => String(item.id) === projectId);
  const pageRef = useRef(null);
  useScrollReveal(pageRef, { dependencies: [projectId] });

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const trackProjectEvent = (eventName, surface) => () => {
    trackAnalyticsEvent(eventName, {
      project_id: String(project.id),
      project_name: project.title,
      surface,
    });
  };

  return (
    <PageTransition>
      <div ref={pageRef}>
        <RouteMeta meta={getProjectMeta(project)} />

        <section className="relative overflow-hidden bg-bg pb-16 pt-32 md:pb-20 md:pt-44">
          <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(108,160,255,0.18),transparent_42%)]" />

          <div className="container-wide relative z-10">
            <div className="mb-8 flex items-center justify-between gap-6">
              <Link to="/work" className="eyebrow hover:text-text">
                Volver al trabajo
              </Link>
              <span className="eyebrow">{`Proyecto ${project.id}`}</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="eyebrow">
                  Proyecto
                </p>
                <h1 className="mt-5 max-w-4xl font-display text-display-lg text-text">
                  {project.title}
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                  {project.caseStudy.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <MagneticButton
                    as="a"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary w-full sm:w-auto"
                    onClick={trackProjectEvent(ANALYTICS_EVENTS.projectDemoClick, 'project-detail')}
                  >
                    Ver proyecto en vivo
                  </MagneticButton>
                  <MagneticButton
                    as={Link}
                    to="/contact"
                    className="button-secondary w-full sm:w-auto"
                    onClick={trackProjectEvent(ANALYTICS_EVENTS.contactClick, 'project-detail')}
                  >
                    Contactar
                  </MagneticButton>
                </div>
              </div>

              <div className="panel overflow-hidden p-3 sm:p-4">
                <div className="overflow-hidden rounded-[24px] border border-border/60">
                  <img src={project.image} alt={project.title} className="aspect-[16/10] w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg py-10 md:py-14">
          <div className="container-wide grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" data-gsap="group" data-gsap-stagger="0.12">
            <div data-gsap-item className="panel p-7 md:p-8">
              <p className="eyebrow">Contexto</p>
              <p className="mt-4 text-2xl font-display leading-tight text-text">{project.caseStudy.teamContext}</p>
              <p className="mt-5 text-base leading-8 text-text-muted md:text-lg">
                {project.caseStudy.challenge}
              </p>
            </div>

            <div data-gsap-item className="panel p-7 md:p-8">
              <p className="eyebrow">Responsabilidad y enfoque</p>
              <p className="mt-4 text-2xl font-display leading-tight text-text">
                {project.caseStudy.role}
              </p>
              <div className="mt-5 space-y-5 text-base leading-8 text-text-muted md:text-lg">
                {project.caseStudy.solution.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg py-6 md:py-8">
          <div className="container-wide grid gap-5 lg:grid-cols-[1.1fr_0.9fr]" data-gsap="group" data-gsap-stagger="0.12">
            <div data-gsap-item className="panel p-7 md:p-8">
              <p className="eyebrow">Decisiones técnicas</p>
              <div className="mt-5 space-y-4">
                {project.caseStudy.technicalDecisions.map((item) => (
                  <p key={item} className="text-base leading-8 text-text-muted md:text-lg">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div data-gsap-item className="panel p-7 md:p-8">
              <p className="eyebrow">Resultado</p>
              <div className="mt-5 space-y-4">
                {project.caseStudy.outcomes.map((item) => (
                  <p key={item} className="text-base leading-8 text-text-muted md:text-lg">
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.caseStudy.deliverables.map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
