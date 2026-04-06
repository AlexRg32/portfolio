import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { services } from '../data/services';

export default function ServicesSection() {
  const recruiterFacts = [
    { label: 'Objetivo', value: profile.targetRole },
    { label: 'Ubicación', value: profile.contact.location },
    { label: 'Modalidad', value: profile.workMode },
    { label: 'Disponibilidad', value: profile.availability },
  ];

  return (
    <section className="relative z-10 bg-bg py-24 md:py-32">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Snapshot profesional</p>
            <h2 className="mt-5 max-w-2xl font-display text-display-md text-text">
              Perfil pensado para
              <br className="hidden md:block" /> equipos de producto
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-text-muted md:text-lg">
            El objetivo no es enseñar de todo, sino dejar claro dónde encajo mejor:
            producto web, operativa real, interfaces limpias y capacidad para sacar
            funcionalidades adelante de punta a punta.
          </p>
        </div>

        <div
          className="mt-14 grid gap-6 border-y border-border/45 py-8 md:grid-cols-2 xl:grid-cols-4"
          data-gsap="group"
          data-gsap-stagger="0.08"
          data-gsap-start="top 86%"
        >
          {recruiterFacts.map((fact) => (
            <article key={fact.label} data-gsap-item className="min-w-0">
              <p className="eyebrow">{fact.label}</p>
              <p className="mt-3 text-lg leading-7 text-text">{fact.value}</p>
            </article>
          ))}
        </div>

        <div
          className="mt-12 grid gap-x-10 gap-y-8 lg:grid-cols-2"
          data-gsap="group"
          data-gsap-stagger="0.08"
          data-gsap-start="top 84%"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              data-gsap-item
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="border-b border-border/40 pb-8"
            >
              <p className="eyebrow">{`Fortaleza ${service.id}`}</p>
              <h3 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.4rem)] leading-tight text-text">
                {service.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div
          className="mt-12 border-t border-border/45 pt-8"
          data-gsap="reveal"
          data-gsap-from="fade"
          data-gsap-start="top 86%"
        >
          <p className="eyebrow">En qué suelo encajar mejor</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {profile.focusAreas.map((area) => (
              <span key={area} className="tag-chip">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
