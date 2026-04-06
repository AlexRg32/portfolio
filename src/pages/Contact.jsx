import { useRef } from 'react';
import MagneticButton from '../components/ui/MagneticButton';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import { profile } from '../data/profile';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SOCIAL_LINKS } from '../utils/constants';
import { ANALYTICS_EVENTS, trackAnalyticsEvent } from '../utils/analytics';
import { getContactMeta } from '../utils/routeMeta';

const contactChannels = [
  {
    label: 'Correo',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
  },
  {
    label: 'LinkedIn',
    value: 'Abrir perfil',
    href: SOCIAL_LINKS.linkedin,
  },
  {
    label: 'GitHub',
    value: 'Ver repositorios',
    href: SOCIAL_LINKS.github,
  },
  {
    label: 'Teléfono',
    value: profile.contact.phone,
    href: `tel:${profile.contact.phone.replace(/\s+/g, '')}`,
  },
];

export default function Contact() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);

  const trackContactEvent = (eventName, channel, section) => () => {
    trackAnalyticsEvent(eventName, {
      channel,
      section,
    });
  };

  return (
    <PageTransition>
      <div ref={pageRef}>
        <RouteMeta meta={getContactMeta()} />

        <section className="relative overflow-hidden bg-bg pb-20 pt-32 md:pb-24 md:pt-44">
          <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(108,160,255,0.18),transparent_42%)]" />

          <div className="container-wide relative z-10 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="eyebrow">
                Contacto profesional
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-display-lg text-text">
                Si buscas un perfil que pueda moverse entre interfaz, backend y producto, aquí estoy.
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-text-muted md:text-lg">
                Estoy abierto a oportunidades como {profile.role.toLowerCase()} en equipos que valoren
                claridad técnica, buena ejecución y producto real.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <MagneticButton
                  as="a"
                  href={`mailto:${profile.contact.email}`}
                  className="button-primary w-full sm:w-auto"
                  onClick={trackContactEvent(ANALYTICS_EVENTS.emailClick, 'email', 'contact-hero')}
                >
                  Escribir por email
                </MagneticButton>
                {profile.resumeUrl && (
                  <MagneticButton
                    as="a"
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary w-full sm:w-auto"
                    onClick={trackContactEvent(ANALYTICS_EVENTS.cvView, 'resume', 'contact-hero')}
                  >
                    Ver CV
                  </MagneticButton>
                )}
                <MagneticButton
                  as="a"
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary w-full sm:w-auto"
                  onClick={trackContactEvent(ANALYTICS_EVENTS.linkedinClick, 'linkedin', 'contact-hero')}
                >
                  LinkedIn
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary w-full sm:w-auto"
                  onClick={trackContactEvent(ANALYTICS_EVENTS.githubClick, 'github', 'contact-hero')}
                >
                  GitHub
                </MagneticButton>
              </div>
            </div>

            <div className="border-t border-border/45 pt-6">
              <p className="eyebrow">Snapshot profesional</p>
              <div className="mt-6 space-y-4 text-base leading-8 text-text-muted md:text-lg">
                <p>Rol objetivo: {profile.targetRole}.</p>
                <p>Modalidad: {profile.workMode}.</p>
                <p>Disponibilidad: {profile.availability}.</p>
              </div>
              <div className="mt-8 border-t border-border/35 pt-6">
                <p className="eyebrow">Dónde creo que encajo mejor</p>
                <p className="mt-4 text-base leading-8 text-text-muted">
                  Equipos de producto, SaaS y herramientas internas donde haga falta alguien capaz de
                  aportar tanto en interfaz como en estructura técnica y ritmo de entrega.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {profile.focusAreas.map((area) => (
                    <span key={area} className="tag-chip">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg py-12 md:py-16">
          <div
            className="container-wide grid gap-x-10 gap-y-8 border-t border-border/45 pt-10 md:grid-cols-2"
            data-gsap="group"
            data-gsap-stagger="0.1"
            data-gsap-start="top 84%"
          >
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={trackContactEvent(
                  channel.label === 'Correo'
                    ? ANALYTICS_EVENTS.emailClick
                    : channel.label === 'LinkedIn'
                      ? ANALYTICS_EVENTS.linkedinClick
                      : channel.label === 'GitHub'
                        ? ANALYTICS_EVENTS.githubClick
                        : ANALYTICS_EVENTS.contactClick,
                  channel.label.toLowerCase(),
                  'contact-channels',
                )}
                data-gsap-item
                className="group border-b border-border/35 pb-8"
              >
                <p className="eyebrow">{channel.label}</p>
                <p className="mt-5 break-words font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-text">
                  {channel.value}
                </p>
                <p className="mt-6 text-sm uppercase tracking-[0.22em] text-text-dim transition-colors duration-300 group-hover:text-text">
                  Abrir canal
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
