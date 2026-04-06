const techStackTop = [
  'React', 'Laravel', 'PHP', 'Spring Boot', 'PostgreSQL', 'Docker', 'SaaS', 'Producto digital',
];

const techStackBottom = [
  'Frontend', 'APIs REST', 'Paneles de gestión', 'Mantenibilidad', 'Delivery', 'Automatización', 'UX', 'Colaboración',
];

export default function MarqueeSection() {
  return (
    <section className="relative z-10 bg-bg py-24 md:py-28">
      <div className="container-wide">
        <div
          className="overflow-hidden border-t border-border/45 pt-8"
          data-gsap="group"
          data-gsap-stagger="0.04"
          data-gsap-start="top 88%"
        >
          <p className="eyebrow" data-gsap-item>
            Stack y forma de trabajo
          </p>
          <div className="mt-5 flex flex-wrap gap-3" data-gsap-item>
            {techStackTop.map((tech) => (
              <span key={tech} className="tag-chip">
                {tech}
              </span>
            ))}
          </div>
          <div className="line-separator my-6" />
          <div className="flex flex-wrap gap-3" data-gsap-item>
            {techStackBottom.map((tech) => (
              <span key={tech} className="tag-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
