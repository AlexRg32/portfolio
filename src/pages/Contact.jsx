import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import MagneticButton from '../components/ui/MagneticButton';
import { profile } from '../data/profile';
import { SOCIAL_LINKS } from '../utils/constants';
import { fadeUp, staggerContainer } from '../utils/animations';

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
  return (
    <PageTransition>
      <RouteMeta
        title="Contacto | Alejandro Ruiz"
        description="Habla con Alejandro Ruiz para lanzar una web, producto o automatización con mejor criterio técnico, identidad visual y foco en resultado."
        path="/contact"
      />
      <section className="relative overflow-hidden bg-bg pt-32 md:pt-40">
        <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_58%)] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-wide relative z-10 grid gap-12 lg:grid-cols-[1fr_0.95fr]"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-5 text-sm font-body uppercase tracking-[0.3em] text-text-dim"
            >
              Contacto
            </motion.p>
            <motion.h1 variants={fadeUp} className="max-w-4xl text-display-lg font-display text-text">
              Si quieres una web con criterio, personalidad y foco en resultado, podemos hablar.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-3xl text-lg md:text-xl font-body leading-relaxed text-text-muted"
            >
              Trabajo con negocios, estudios y marcas que buscan una presencia digital más seria, más afinada y mejor ejecutada.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <MagneticButton
                as="a"
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center rounded-full bg-text px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-bg transition-colors duration-300 hover:bg-white"
              >
                {profile.contact.email}
              </MagneticButton>
              <MagneticButton
                as="a"
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border-light px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-text transition-colors duration-300 hover:border-text hover:bg-text hover:text-bg"
              >
                LinkedIn
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="rounded-[32px] border border-border bg-surface/70 p-8 md:p-10"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-text-dim">Lo que puedes esperar</p>
            <div className="mt-8 space-y-5 text-base md:text-lg font-body leading-relaxed text-text-muted">
              <p>Respuesta clara, propuesta concreta y enfoque técnico desde la primera conversación.</p>
              <p>Capacidad para moverme entre diseño, interfaz, servidor y automatización cuando el proyecto lo necesita.</p>
              <p>Una ejecución cuidada que prioriza velocidad, conversión y una identidad visual con carácter.</p>
            </div>
            <div className="mt-8 rounded-[24px] border border-white/8 bg-black/30 p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-text-dim">Encaje ideal</p>
              <p className="mt-4 text-base font-body leading-relaxed text-text-muted">
                Webs de negocio, producto SaaS, relanzamientos visuales o automatizaciones donde haga falta unir claridad, identidad y ejecución técnica.
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-text-dim">
                Respuesta habitual: 24-48 horas
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          {contactChannels.map((channel, index) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group rounded-[28px] border border-border bg-black p-8 transition-colors duration-300 hover:border-white/20"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-text-dim">{channel.label}</p>
              <p className="mt-6 text-2xl md:text-3xl font-display text-text break-words">
                {channel.value}
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.22em] text-text-dim transition-colors duration-300 group-hover:text-text">
                Abrir canal
              </p>
            </motion.a>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
