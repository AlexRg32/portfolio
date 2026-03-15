import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import RouteMeta from '../components/seo/RouteMeta';
import MagneticButton from '../components/ui/MagneticButton';
import { experience } from '../data/experience';
import { profile } from '../data/profile';
import { skills } from '../data/skills';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function About() {
  return (
    <PageTransition>
      <RouteMeta
        title="Sobre mí | Alejandro Ruiz"
        description="Perfil de Alejandro Ruiz: desarrollador web especializado en PHP, React, Laravel y JavaScript para producto digital."
        path="/about"
      />
      <section className="relative overflow-hidden bg-bg pt-32 md:pt-40">
        <div className="absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_58%)] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-wide relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-5 text-sm font-body uppercase tracking-[0.3em] text-text-dim"
            >
              Sobre Mí
            </motion.p>
            <motion.h1 variants={fadeUp} className="max-w-4xl text-display-lg font-display text-text">
              Desarrollo productos digitales con obsesión por el detalle y la utilidad.
            </motion.h1>
          </div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-lg md:text-xl font-body leading-relaxed text-text-muted">
              {profile.fullBio}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-border bg-surface/70 p-6">
                <p className="text-sm uppercase tracking-[0.22em] text-text-dim">Base</p>
                <p className="mt-3 text-xl font-display text-text">{profile.contact.location}</p>
              </div>
              <div className="rounded-[24px] border border-border bg-surface/70 p-6">
                <p className="text-sm uppercase tracking-[0.22em] text-text-dim">Rol</p>
                <p className="mt-3 text-xl font-display text-text">{profile.role}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-bg py-20 md:py-24">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          {skills.map((group, index) => (
            <motion.article
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="rounded-[28px] border border-border bg-surface/70 p-8 md:p-10"
            >
              <p className="mb-6 text-sm uppercase tracking-[0.28em] text-text-dim">
                {group.category}
              </p>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-4 border-b border-white/6 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="text-lg font-body text-text">{item.name}</span>
                    <span className="text-sm uppercase tracking-[0.18em] text-text-dim">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-bg py-4 md:py-8">
        <div className="container-wide">
          {experience.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="rounded-[32px] border border-border bg-black p-8 md:p-10"
            >
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-text-dim">Experiencia</p>
                  <h2 className="mt-4 text-display-sm font-display text-text">{item.role}</h2>
                  <p className="mt-3 text-lg text-text-muted">{item.company}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-text-dim">{item.period}</p>
                </div>

                <div>
                  <p className="text-base md:text-lg font-body leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                  <div className="mt-8 grid gap-3">
                    {item.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-text-muted"
                      >
                        {achievement}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border-light px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-text-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="container-wide rounded-[32px] border border-border bg-surface/70 p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.28em] text-text-dim">Colaboración</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-display-sm font-display text-text">
            Trabajo mejor con equipos que quieren criterio técnico, ejecución rápida y una experiencia visual realmente cuidada.
          </h2>
          <div className="mt-10">
            <MagneticButton
              as="a"
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center rounded-full bg-text px-8 py-4 text-sm font-body uppercase tracking-[0.2em] text-bg transition-colors duration-300 hover:bg-white"
            >
              Hablemos
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
