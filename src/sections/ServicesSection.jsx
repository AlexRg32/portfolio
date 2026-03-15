import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion';
import { services } from '../data/services';
import { useMediaQuery } from '../hooks/useMediaQuery';

function ServiceCardLayer({ service, index, total, progress }) {
  const segment = 1 / total;
  const start = index * segment;
  const mid = start + (segment * 0.5);
  const end = start + segment;

  const opacity = useTransform(
    progress,
    [Math.max(0, start - (segment * 0.2)), start, mid, end - (segment * 0.12), end],
    [0, 0.22, 1, 0.85, 0]
  );
  const scale = useTransform(
    progress,
    [start, mid, end],
    [0.995, 1, 0.99]
  );
  const y = useTransform(
    progress,
    [start, mid, end],
    [48, 0, -36]
  );
  const filter = useTransform(
    progress,
    [start, mid, end],
    ['blur(3px)', 'blur(0px)', 'blur(4px)']
  );

  return (
    <motion.article
      style={{ opacity, scale, y, filter }}
      className="pointer-events-none absolute inset-0 mx-auto h-[58vh] min-h-[430px] max-h-[700px] w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_35%,rgba(0,0,0,0.55))]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
        <div>
          <span className="mb-6 inline-flex rounded-full border border-white/20 px-4 py-2 font-body text-[11px] uppercase tracking-[0.2em] text-white/75">
            Servicio {service.id}
          </span>
          <h3 className="max-w-3xl font-display text-3xl leading-[0.95] tracking-tight text-white md:text-5xl">
            {service.title}
          </h3>
        </div>

        <div className="flex items-end justify-between gap-8">
          <p className="max-w-2xl font-body text-base font-light leading-relaxed text-white/84 md:text-xl">
            {service.description}
          </p>
          <span className="shrink-0 font-display text-5xl font-semibold italic leading-none text-white/20 md:text-7xl">
            {service.id}/{total}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });
  const progressLine = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.18
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const normalized = Math.max(0, Math.min(0.9999, latest));
    const nextIndex = Math.min(
      services.length - 1,
      Math.floor(normalized * services.length)
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <section ref={sectionRef} className="relative z-10 bg-bg px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="font-display text-display-sm leading-tight text-white md:text-display-md"
          >
            Qué puedo
            <br />
            hacer por ti
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-text-muted md:text-lg"
          >
            Una sección, cuatro frentes de trabajo y una misma idea: convertir
            tu visión en producto real, elegante y rentable.
          </motion.p>
        </div>

        {!reducedMotion && !isMobile && (
          <div
            className="relative"
            style={{ height: `${Math.max(services.length * 100, 300)}vh` }}
          >
            <div className="sticky top-14 grid h-[76vh] grid-cols-[280px_minmax(0,1fr)] items-center gap-10">
              <aside className="relative h-full max-h-[620px] rounded-[24px] border border-white/10 bg-surface/40 p-7 backdrop-blur-sm">
                <div className="absolute bottom-7 left-7 top-7 w-px bg-white/15" />
                <motion.div
                  style={{ scaleY: progressLine }}
                  className="absolute bottom-7 left-7 top-7 w-px origin-top bg-white"
                />
                <ul className="space-y-6 pl-8">
                  {services.map((service, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li key={service.id}>
                        <p className="font-body text-[10px] uppercase tracking-[0.24em] text-text-dim">
                          {service.id}
                        </p>
                        <p
                          className={`mt-2 font-display text-2xl leading-[1.05] transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/35'
                          }`}
                        >
                          {service.title}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              <div className="relative flex h-[62vh] min-h-[430px] max-h-[700px] items-center justify-center [perspective:1800px]">
                <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[76vh] max-h-[760px] w-full max-w-5xl -translate-y-1/2 rounded-[40px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09),transparent_60%)] blur-3xl" />

                {services.map((service, index) => (
                  <ServiceCardLayer
                    key={service.id}
                    service={service}
                    index={index}
                    total={services.length}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {(reducedMotion || isMobile) && (
          <div className="mt-8 space-y-6">
            {services.map((service) => (
              <article
                key={service.id}
                className="overflow-hidden rounded-[28px] border border-white/15 bg-black p-8 md:p-12"
              >
                <span className="mb-6 inline-flex rounded-full border border-white/20 px-4 py-2 font-body text-[11px] uppercase tracking-[0.2em] text-white/75">
                  Servicio {service.id}
                </span>
                <h3 className="font-display text-3xl leading-[0.95] tracking-tight text-white md:text-5xl">
                  {service.title}
                </h3>
                <div className="mt-10 flex items-end justify-between gap-8">
                  <p className="max-w-3xl font-body text-lg font-light leading-relaxed text-white/84 md:text-xl">
                    {service.description}
                  </p>
                  <span className="shrink-0 font-display text-5xl font-semibold italic leading-none text-white/30 md:text-7xl">
                    {service.id}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
