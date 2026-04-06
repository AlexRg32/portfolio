import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../utils/constants';
import { profile } from '../../data/profile';
import { ANALYTICS_EVENTS, trackAnalyticsEvent } from '../../utils/analytics';

export default function Footer() {
  const trackFooterEvent = (eventName, target) => () => {
    trackAnalyticsEvent(eventName, {
      section: 'footer',
      target,
    });
  };

  return (
    <footer className="bg-bg pb-8 pt-10 md:pb-10">
      <div className="container-wide">
        <div className="border-t border-border/45 py-8 md:py-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <p className="eyebrow">Portfolio profesional</p>
              <div className="mt-5">
                <Link
                  to="/"
                  className="text-2xl font-display font-semibold tracking-tight text-text transition-opacity hover:opacity-80"
                >
                  Alejandro Ruiz
                </Link>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {profile.role}
                </p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:min-w-[420px] lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="eyebrow">Explorar</p>
                <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-text-muted">
                  <Link to="/work" className="hover:text-text">
                    Trabajo
                  </Link>
                  <Link to="/about" className="hover:text-text">
                    Sobre Mí
                  </Link>
                  <Link to="/contact" className="hover:text-text">
                    Contacto
                  </Link>
                  <Link to="/privacy" className="hover:text-text">
                    Privacidad
                  </Link>
                </div>
              </div>

              <div>
                <p className="eyebrow">Canales</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary min-h-11 min-w-11 px-4 py-3"
                    aria-label="GitHub"
                    onClick={trackFooterEvent(ANALYTICS_EVENTS.githubClick, 'github')}
                  >
                    GitHub
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary min-h-11 min-w-11 px-4 py-3"
                    aria-label="LinkedIn"
                    onClick={trackFooterEvent(ANALYTICS_EVENTS.linkedinClick, 'linkedin')}
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className="button-secondary min-h-11 min-w-11 px-4 py-3"
                    aria-label="Correo"
                    onClick={trackFooterEvent(ANALYTICS_EVENTS.emailClick, 'email')}
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="line-separator my-8" />

          <div className="flex flex-col gap-3 text-sm text-text-dim md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Alejandro Ruiz Gasch. Todos los derechos reservados.</p>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <p>Disponible para oportunidades en producto digital</p>
              <Link to="/privacy" className="hover:text-text">
                Privacidad y analítica
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
