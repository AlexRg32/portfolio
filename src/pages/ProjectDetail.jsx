import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import MagneticButton from '../components/ui/MagneticButton';
import { projects } from '../data/projects';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((item) => String(item.id) === projectId);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <PageTransition>
      <RouteMeta
        title={`${project.title} | Alejandro Ruiz`}
        description={project.caseStudy.summary}
        path={`/work/${project.id}`}
        image={project.image}
        type="article"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.caseStudy.summary,
          image: `https://alejandroruiz.netlify.app${project.image}`,
          url: `https://alejandroruiz.netlify.app/work/${project.id}`,
        }}
      />
      <section className="relative overflow-hidden bg-bg pt-32 md:pt-40">
        <div className="absolute inset-x-0 top-0 h-[45rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-wide relative z-10"
        >
          <motion.div variants={fadeUp} className="mb-8 flex items-center justify-between gap-6">
            <Link
              to="/work"
              className="text-sm font-body uppercase tracking-[0.24em] text-text-dim hover:text-text transition-colors"
            >
              Volver al trabajo
            </Link>
            <span className="text-sm font-body uppercase tracking-[0.24em] text-text-dim">
              Proyecto {project.id}
            </span>
          </motion.div>

          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <motion.p
                variants={fadeUp}
                className="mb-5 text-sm font-body uppercase tracking-[0.3em] text-text-dim"
              >
                Caso real
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-display-lg font-display text-text"
              >
                {project.title}
              </motion.h1>
            </div>

            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-base md:text-lg font-body leading-relaxed text-text-muted">
                {project.caseStudy.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border-light px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-text-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <MagneticButton
                  as="a"
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-text px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-bg transition-colors duration-300 hover:bg-white"
                >
                  Ver proyecto en vivo
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  to="/contact"
                  className="inline-flex items-center rounded-full border border-border-light px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-text transition-colors duration-300 hover:border-text hover:bg-text hover:text-bg"
                >
                  Quiero algo así
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-14 overflow-hidden rounded-[32px] border border-white/10 bg-surface shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="aspect-[16/10] w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-border bg-surface/70 p-8 md:p-10">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-text-dim">Rol y contexto</p>
            <p className="text-2xl font-display text-text leading-tight">{project.caseStudy.role}</p>
            <p className="mt-5 text-base md:text-lg font-body leading-relaxed text-text-muted">
              {project.caseStudy.challenge}
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-black p-8 md:p-10">
            <p className="mb-6 text-sm uppercase tracking-[0.28em] text-text-dim">Solución</p>
            <div className="space-y-5 text-base md:text-lg font-body leading-relaxed text-text-muted">
              {project.caseStudy.solution.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg py-4 md:py-8">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-border bg-surface/70 p-8 md:p-10">
            <p className="mb-6 text-sm uppercase tracking-[0.28em] text-text-dim">Entregables</p>
            <div className="flex flex-wrap gap-3">
              {project.caseStudy.deliverables.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-light px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-text-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-border bg-black p-8 md:p-10">
            <p className="mb-6 text-sm uppercase tracking-[0.28em] text-text-dim">Resultado</p>
            <div className="space-y-4">
              {project.caseStudy.outcomes.map((item) => (
                <p key={item} className="text-base md:text-lg font-body leading-relaxed text-text-muted">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
