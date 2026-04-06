import { Link } from 'react-router-dom';
import MagneticButton from '../components/ui/MagneticButton';
import { profile } from '../data/profile';
import { ANALYTICS_EVENTS, trackAnalyticsEvent } from '../utils/analytics';

const heroFacts = [
  'React / Laravel / PHP',
  'Spring Boot / PostgreSQL',
  'SaaS / APIs / Backoffice',
  profile.workMode,
];

function LinkIcon({ children }) {
  return <span className="h-4 w-4 shrink-0 text-text-dim">{children}</span>;
}

export default function HeroSection() {
  const trackHeroEvent = (eventName, target) => () => {
    trackAnalyticsEvent(eventName, {
      section: 'hero',
      target,
    });
  };

  return (
    <section className="relative overflow-hidden bg-bg pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(122,175,255,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(177,206,255,0.12),transparent_30%)]" />

      <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div className="max-w-[42rem]">
          <h1 className="max-w-[12ch] font-display text-[clamp(3.2rem,11vw,7.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-text sm:max-w-4xl">
            Full-stack con
            <br className="hidden md:block" /> foco en producto
          </h1>

          <p className="mt-8 max-w-[34rem] text-[15px] leading-7 text-text-muted sm:text-base md:text-lg md:leading-8">
            Soy {profile.name}. Desarrollo producto web con una base fuerte en frontend y capacidad real para moverme entre backend, datos y operativa cuando el proyecto lo pide.
          </p>

          <div className="mt-5 max-w-[34rem] text-[15px] leading-7 text-text-dim sm:text-base md:text-lg md:leading-8">
            He trabajado con SaaS, APIs, paneles de administración y herramientas de uso real con React, Laravel, Spring Boot, Docker y PostgreSQL.
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton
              as={Link}
              to="/work"
              className="button-primary w-full sm:w-auto"
              onClick={trackHeroEvent(ANALYTICS_EVENTS.workView, 'work')}
            >
              Ver proyectos
            </MagneticButton>
            {profile.resumeUrl && (
              <MagneticButton
                as="a"
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary w-full sm:w-auto"
                onClick={trackHeroEvent(ANALYTICS_EVENTS.cvView, 'resume')}
              >
                Ver CV
              </MagneticButton>
            )}
            <MagneticButton
              as="a"
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary w-full sm:w-auto"
              onClick={trackHeroEvent(ANALYTICS_EVENTS.linkedinClick, 'linkedin')}
            >
              LinkedIn
            </MagneticButton>
          </div>

          <div className="mt-12 flex flex-wrap gap-2.5 sm:gap-3">
            {heroFacts.map((fact) => (
              <span key={fact} className="tag-chip">
                {fact}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-5 border-t border-border/45 pt-6 sm:grid-cols-3">
            {profile.highlights.map((item) => (
              <p key={item} className="text-sm leading-6 text-text-muted">
                {item}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:max-w-[34rem] sm:grid-cols-2">
            <a
              href={`mailto:${profile.contact.email}`}
              onClick={trackHeroEvent(ANALYTICS_EVENTS.emailClick, 'email')}
              className="group inline-flex items-center justify-between gap-3 rounded-[18px] border border-border/45 bg-surface/18 px-4 py-4 text-base text-text transition-colors duration-300 hover:border-border-light/70 hover:bg-surface/28"
            >
              <span className="inline-flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-surface-light/20 text-text">
                  <LinkIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                      <path d="M4 6h16v12H4z" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                  </LinkIcon>
                </span>
                <span className="min-w-0 truncate">{profile.contact.email}</span>
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-text-dim transition-colors duration-300 group-hover:text-text">
                Email
              </span>
            </a>

            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackHeroEvent(ANALYTICS_EVENTS.githubClick, 'github')}
              className="group inline-flex items-center justify-between gap-3 rounded-[18px] border border-border/45 bg-surface/18 px-4 py-4 text-base text-text transition-colors duration-300 hover:border-border-light/70 hover:bg-surface/28"
            >
              <span className="inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-surface-light/20 text-text">
                  <LinkIcon>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.55-1.37-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.22 1.84 1.22 1.08 1.8 2.82 1.28 3.5.98.1-.76.42-1.28.76-1.57-2.66-.3-5.46-1.3-5.46-5.8 0-1.28.47-2.32 1.22-3.14-.12-.3-.53-1.5.12-3.13 0 0 1-.31 3.3 1.2A11.7 11.7 0 0 1 12 6.6c1.03 0 2.07.14 3.05.41 2.3-1.5 3.3-1.2 3.3-1.2.66 1.63.25 2.83.13 3.13.76.82 1.22 1.86 1.22 3.14 0 4.5-2.8 5.49-5.47 5.78.43.36.82 1.05.82 2.13v3.16c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
                    </svg>
                  </LinkIcon>
                </span>
                <span>GitHub</span>
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-text-dim transition-colors duration-300 group-hover:text-text">
                Perfil
              </span>
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-text-dim">
            <Link to="/about" className="inline-flex items-center gap-2 hover:text-text">
              <LinkIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 10v6" />
                  <path d="M12 7h.01" />
                </svg>
              </LinkIcon>
              Más sobre mi experiencia
            </Link>
          </div>
        </div>

        <div className="lg:justify-self-end lg:pt-4">
          <div className="grid gap-5">
            <div className="overflow-hidden rounded-[28px] border border-border/45 bg-surface-light/15">
              <img
                src={profile.photo}
                alt={profile.name}
                className="aspect-[4/5] w-full object-cover object-center"
                loading="eager"
              />
            </div>
            <div className="grid gap-4 border-t border-border/45 pt-4 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Ubicación</p>
                <p className="mt-2 text-base text-text">{profile.contact.location}</p>
              </div>
              <div>
                <p className="eyebrow">Disponibilidad</p>
                <p className="mt-2 text-base text-text">{profile.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
