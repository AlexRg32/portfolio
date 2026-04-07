import { useRef } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ANALYTICS_EVENTS, trackAnalyticsEvent } from '../utils/analytics';
import { getHireMeta } from '../utils/routeMeta';

const fitAreas = [
  {
    title: 'Frontend con criterio de producto',
    description:
      'Interfaz clara, jerarquía de contenido, estados comprensibles y foco real en que la funcionalidad se entienda y se use bien.',
  },
  {
    title: 'Capacidad full-stack real',
    description:
      'Puedo moverme entre React, backend, base de datos, APIs y operativa cuando el proyecto necesita avanzar sin demasiada fricción.',
  },
  {
    title: 'Buen encaje en SaaS y backoffice',
    description:
      'Mis proyectos más fuertes están cerca de paneles, herramientas internas, flujos de gestión y operativa diaria de negocio.',
  },
  {
    title: 'Perfil junior con delivery útil',
    description:
      'No vendo seniority inventado. Vendo capacidad de aportar desde ya, aprender rápido y sacar trabajo adelante con buena base.',
  },
];

const firstMonthWins = [
  'Entrar rápido en un frontend React o una capa web de producto ya existente.',
  'Resolver tareas de interfaz, formularios, flujos y paneles sin perder claridad de código.',
  'Ayudar en APIs, modelos de datos y lógica de negocio cuando haga falta tocar backend.',
  'Aportar criterio de mantenibilidad en SaaS, herramientas internas y backoffice.',
];

const selectedProjectIds = new Set([1, 3, 4]);
const recruiterProjects = projects.filter((project) => selectedProjectIds.has(project.id));

const quickFacts = [
  { label: 'Objetivo', value: 'Frontend / Full-Stack / Backend junior' },
  { label: 'Modalidad', value: 'Remoto, hibrido o Alicante-Murcia' },
  { label: 'Disponibilidad', value: 'Incorporacion inmediata' },
  { label: 'Stack', value: 'React, Laravel, Spring Boot, PostgreSQL' },
];

export default function Hire() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);

  const trackHireEvent = (eventName, target, section) => () => {
    trackAnalyticsEvent(eventName, {
      target,
      section,
    });
  };

  return (
    <PageTransition>
      <div ref={pageRef}>
        <RouteMeta meta={getHireMeta()} />

        <section className="relative overflow-hidden bg-bg pb-20 pt-32 md:pb-24 md:pt-44">
          <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(108,160,255,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(177,206,255,0.12),transparent_34%)]" />

          <div className="container-wide relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-border/45 bg-surface/18 px-4 py-2 text-sm text-text-muted">
                <span className="inline-flex items-center gap-2 text-text">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Disponible para incorporacion
                </span>
                <span>Remoto / Alicante / Murcia</span>
              </div>

              <p className="eyebrow mt-8">Perfil rapido para recruiters</p>
              <h1 className="mt-5 max-w-4xl font-display text-display-lg text-text">
                Si necesitas un perfil junior que pueda aportar en frontend, full-stack y producto,
                aqui tienes el resumen rapido.
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-text-muted md:text-lg">
                Soy {profile.name}. Trabajo especialmente bien en producto web, SaaS, paneles de
                gestion y herramientas internas donde haga falta combinar interfaz, backend y una
                ejecucion clara sin vender humo.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <MagneticButton
                  as="a"
                  href={`mailto:${profile.contact.email}`}
                  className="button-primary w-full sm:w-auto"
                  onClick={trackHireEvent(ANALYTICS_EVENTS.emailClick, 'email', 'hire-hero')}
                >
                  Escribir por email
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary w-full sm:w-auto"
                  onClick={trackHireEvent(ANALYTICS_EVENTS.cvView, 'resume', 'hire-hero')}
                >
                  Ver CV
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary w-full sm:w-auto"
                  onClick={trackHireEvent(ANALYTICS_EVENTS.linkedinClick, 'linkedin', 'hire-hero')}
                >
                  Abrir LinkedIn
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  to="/work"
                  className="button-secondary w-full sm:w-auto"
                  onClick={trackHireEvent(ANALYTICS_EVENTS.workView, 'work', 'hire-hero')}
                >
                  Ver trabajo
                </MagneticButton>
              </div>
            </div>

            <div className="grid gap-4 border-t border-border/45 pt-6 lg:border-t-0 lg:pt-0">
              {quickFacts.map((fact) => (
                <article key={fact.label} className="rounded-[24px] border border-border/45 bg-surface/18 p-6">
                  <p className="eyebrow">{fact.label}</p>
                  <p className="mt-4 text-xl font-display leading-tight text-text">{fact.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg py-12 md:py-16">
          <div className="container-wide border-t border-border/45 pt-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="eyebrow">Encaje inmediato</p>
                <h2 className="mt-5 max-w-3xl font-display text-display-md text-text">
                  Donde suelo encajar mejor desde el principio.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                Me interesan especialmente equipos de producto que valoren claridad de interfaz,
                capacidad full-stack y una forma de trabajar bastante practica.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2" data-gsap="group" data-gsap-stagger="0.08" data-gsap-start="top 86%">
              {fitAreas.map((area) => (
                <article key={area.title} data-gsap-item className="rounded-[26px] border border-border/45 bg-surface/18 p-7">
                  <p className="eyebrow">Encaje</p>
                  <h3 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.5rem)] leading-tight text-text">
                    {area.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-text-muted">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg py-12 md:py-16">
          <div className="container-wide border-t border-border/45 pt-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="eyebrow">Primer mes</p>
                <h2 className="mt-5 max-w-3xl font-display text-display-md text-text">
                  Lo que puedo empezar a aportar sin demasiada rampa.
                </h2>
              </div>

              <div className="grid gap-4">
                {firstMonthWins.map((item) => (
                  <div key={item} className="rounded-[22px] border border-border/40 bg-surface/18 px-5 py-4 text-base leading-8 text-text-muted">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg py-12 md:py-16">
          <div className="container-wide border-t border-border/45 pt-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="eyebrow">Pruebas rapidas</p>
                <h2 className="mt-5 max-w-3xl font-display text-display-md text-text">
                  Tres proyectos que explican mejor mi encaje.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                He dejado una mezcla de SaaS profesional, producto propio y frontend orientado a
                conversion para que se vea rapido el rango real de trabajo.
              </p>
            </div>

            <div className="mt-10 space-y-8" data-gsap="group" data-gsap-stagger="0.08" data-gsap-start="top 86%">
              {recruiterProjects.map((project) => (
                <article key={project.id} data-gsap-item className="rounded-[28px] border border-border/45 bg-surface/18 p-6 md:p-8">
                  <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <Link to={`/work/${project.id}`} className="block overflow-hidden rounded-[22px] border border-border/35">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out-expo hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </Link>

                    <div>
                      <p className="eyebrow">Proyecto</p>
                      <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] text-text">
                        {project.title}
                      </h3>
                      <p className="mt-5 text-base leading-8 text-text-muted md:text-lg">
                        {project.caseStudy.summary}
                      </p>
                      <p className="mt-4 text-sm uppercase tracking-[0.18em] text-text-dim">
                        {project.caseStudy.role}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.techStack.map((item) => (
                          <span key={item} className="tag-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <MagneticButton
                          as={Link}
                          to={`/work/${project.id}`}
                          className="button-primary w-full sm:w-auto"
                          onClick={trackHireEvent(ANALYTICS_EVENTS.projectOpen, `project-${project.id}`, 'hire-projects')}
                        >
                          Ver detalle
                        </MagneticButton>
                        <MagneticButton
                          as="a"
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-secondary w-full sm:w-auto"
                          onClick={trackHireEvent(ANALYTICS_EVENTS.projectDemoClick, `project-${project.id}`, 'hire-projects')}
                        >
                          Abrir demo
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg py-20 md:py-24">
          <div className="container-wide border-t border-border/45 pt-12">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className="eyebrow">Canal rapido</p>
                <h2 className="mt-5 max-w-3xl font-display text-display-lg font-semibold text-text">
                  Si ves encaje, hablamos esta semana.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                Portfolio, CV, LinkedIn y contacto directo estan ya listos para una revision rapida.
                Si prefieres, tambien puedes llamarme directamente.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton
                as="a"
                href={`mailto:${profile.contact.email}`}
                className="button-primary w-full sm:w-auto"
                onClick={trackHireEvent(ANALYTICS_EVENTS.emailClick, 'email', 'hire-cta')}
              >
                Escribir por email
              </MagneticButton>
              <MagneticButton
                as="a"
                href={`tel:${profile.contact.phone.replace(/\s+/g, '')}`}
                className="button-secondary w-full sm:w-auto"
                onClick={trackHireEvent(ANALYTICS_EVENTS.contactClick, 'phone', 'hire-cta')}
              >
                Llamar ahora
              </MagneticButton>
              <MagneticButton
                as="a"
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary w-full sm:w-auto"
                onClick={trackHireEvent(ANALYTICS_EVENTS.linkedinClick, 'linkedin', 'hire-cta')}
              >
                Abrir LinkedIn
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
