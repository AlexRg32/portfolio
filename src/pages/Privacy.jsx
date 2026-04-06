import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import MagneticButton from '../components/ui/MagneticButton';
import { profile } from '../data/profile';
import { getPrivacyMeta } from '../utils/routeMeta';

const privacySections = [
  {
    title: 'Qué mido',
    body:
      'Uso analítica para entender de forma agregada cuándo entra la gente, qué páginas visita, desde qué fuente llega y qué acciones útiles realiza dentro del portfolio.',
  },
  {
    title: 'Herramientas',
    body:
      'El tráfico básico se mide con Plausible. Si aceptas la capa avanzada, también activo Microsoft Clarity para revisar mapas de calor y recorridos de navegación.',
  },
  {
    title: 'Consentimiento',
    body:
      'Clarity solo se activa cuando el visitante lo acepta expresamente desde el banner. Si no lo acepta, esa capa avanzada no se carga.',
  },
  {
    title: 'Datos sensibles',
    body:
      'No utilizo esta analítica para identificar personalmente a nadie. Los formularios y contenidos sensibles deben permanecer protegidos y fuera del alcance del replay.',
  },
];

export default function Privacy() {
  return (
    <PageTransition>
      <RouteMeta meta={getPrivacyMeta()} />

      <section className="relative overflow-hidden bg-bg pb-16 pt-32 md:pb-20 md:pt-44">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(108,160,255,0.18),transparent_42%)]" />

        <div className="container-wide relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="eyebrow">Privacidad y analítica</p>
            <h1 className="mt-5 max-w-4xl font-display text-display-lg text-text">
              Explico de forma clara qué mido en esta web y cuándo activo la capa avanzada.
            </h1>
          </div>

          <p className="max-w-3xl text-base leading-8 text-text-muted md:text-lg">
            Este portfolio usa analítica para entender mejor el tráfico, mejorar la experiencia y saber
            qué partes del sitio generan interés real. La idea es obtener señales útiles sin convertir la web
            en un sistema invasivo.
          </p>
        </div>
      </section>

      <section className="bg-bg py-10 md:py-14">
        <div className="container-wide grid gap-4 lg:grid-cols-2" data-gsap="group" data-gsap-stagger="0.08">
          {privacySections.map((section) => (
            <article key={section.title} data-gsap-item className="panel p-7 md:p-8">
              <p className="eyebrow">{section.title}</p>
              <p className="mt-5 text-base leading-8 text-text-muted md:text-lg">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-bg py-6 md:py-8">
        <div className="container-wide grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="panel p-7 md:p-8">
            <p className="eyebrow">Qué se almacena</p>
            <div className="mt-5 space-y-4 text-base leading-8 text-text-muted md:text-lg">
              <p>
                Para recordar si aceptas o rechazas la analítica avanzada, la web guarda una preferencia local
                en tu navegador. Esa preferencia solo sirve para no preguntarte en cada visita.
              </p>
              <p>
                El tráfico básico se mide con una configuración ligera. La capa avanzada depende de tu
                consentimiento y se usa para revisar clics, scroll y patrones de uso del sitio.
              </p>
            </div>
          </article>

          <article className="panel p-7 md:p-8">
            <p className="eyebrow">Contacto</p>
            <div className="mt-5 space-y-4 text-base leading-8 text-text-muted md:text-lg">
              <p>
                Si tienes alguna duda sobre esta capa de analítica o prefieres contactar directamente, puedes
                escribirme por email.
              </p>
              <p>
                Correo de contacto: <a href={`mailto:${profile.contact.email}`} className="text-text hover:text-accent">{profile.contact.email}</a>
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton as="a" href={`mailto:${profile.contact.email}`} className="button-primary w-full sm:w-auto">
                Escribir por email
              </MagneticButton>
              <MagneticButton as={Link} to="/" className="button-secondary w-full sm:w-auto">
                Volver al inicio
              </MagneticButton>
            </div>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}
