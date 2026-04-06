import { useRef } from 'react';
import MagneticButton from '../components/ui/MagneticButton';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import { experience } from '../data/experience';
import { profile } from '../data/profile';
import { skills } from '../data/skills';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getAboutMeta } from '../utils/routeMeta';

export default function About() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);

  return (
    <PageTransition>
      <div ref={pageRef}>
        <RouteMeta meta={getAboutMeta()} />

        <section className="relative overflow-hidden bg-bg pb-16 pt-32 md:pb-20 md:pt-44">
          <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(108,160,255,0.18),transparent_40%)]" />

          <div className="container-wide relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="eyebrow">
                Perfil profesional
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-display-lg text-text">
                Desarrollo producto web con una mezcla de frontend sólido, criterio técnico y foco real en entrega.
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-text-muted md:text-lg">
                {profile.fullBio}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {profile.resumeUrl && (
                  <MagneticButton
                    as="a"
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary"
                  >
                    Ver CV
                  </MagneticButton>
                )}
                <MagneticButton
                  as="a"
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  LinkedIn
                </MagneticButton>
              </div>
            </div>

            <div className="panel overflow-hidden p-3 sm:p-4">
              <div className="overflow-hidden rounded-[24px] border border-border/60 bg-surface-light/30">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4">
                <div className="panel-soft p-4">
                  <p className="eyebrow">Base</p>
                  <p className="mt-3 text-xl font-display text-text">{profile.contact.location}</p>
                </div>
                <div className="panel-soft p-4">
                  <p className="eyebrow">Encaje actual</p>
                  <p className="mt-3 text-xl font-display text-text">{profile.targetRole}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg py-10 md:py-14">
          <div
            className="container-wide grid gap-4 lg:grid-cols-2"
            data-gsap="group"
            data-gsap-stagger="0.08"
            data-gsap-start="top 82%"
          >
            {skills.map((group) => (
              <article key={group.category} data-gsap-item className="panel p-7 md:p-8">
                <p className="eyebrow">{group.category}</p>
                <div className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-4 border-b border-border/45 pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="text-lg text-text">{item.name}</span>
                      <span className="text-sm uppercase tracking-[0.18em] text-text-dim">
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-bg py-6 md:py-8">
          <div className="container-wide" data-gsap="group">
            {experience.map((item) => (
              <article key={item.id} data-gsap-item className="panel p-8 md:p-10">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <p className="eyebrow">Experiencia</p>
                    <h2 className="mt-4 font-display text-display-sm text-text">{item.role}</h2>
                    <p className="mt-3 text-lg text-text-muted">{item.company}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-text-dim">{item.period}</p>
                  </div>

                  <div>
                    <p className="text-base leading-8 text-text-muted md:text-lg">
                      {item.description}
                    </p>
                    <div className="mt-8 grid gap-3">
                      {item.achievements.map((achievement) => (
                        <div key={achievement} className="panel-soft px-5 py-4 text-text-muted">
                          {achievement}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {item.techStack.map((tech) => (
                        <span key={tech} className="tag-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-bg py-20 md:py-24">
          <div className="container-wide">
            <div className="panel p-8 text-center md:p-12" data-gsap="reveal" data-gsap-from="scale">
              <p className="eyebrow">Colaboración</p>
              <h2 className="mx-auto mt-4 max-w-4xl font-display text-display-sm text-text">
                Trabajo mejor con equipos que valoran criterio técnico, buena comunicación y una ejecución cuidada sin perder ritmo.
              </h2>
              <div className="mt-8">
                <MagneticButton
                  as="a"
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  Abrir LinkedIn
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
