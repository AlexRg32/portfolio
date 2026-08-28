import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TransitionLink from '../TransitionLink';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, DUR, EASE, MQ } from '../../motion/config';
import { casePath } from '../../utils/routes';

function srcSet(base, widths) {
  return widths.map((width) => `${base}-${width}.webp ${width}w`).join(', ');
}

export default function WorkSequence({ lang, copy, projects, id }) {
  const scope = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: one sticky plate, three panels driving it.
      mm.add(MQ.desktop, () => {
        const panels = gsap.utils.toArray('[data-work-panel]', scope.current);
        const plates = gsap.utils.toArray('[data-work-plate]', scope.current);

        gsap.set(plates, { autoAlpha: 0, scale: 1.06 });
        gsap.set(plates[0], { autoAlpha: 1, scale: 1 });

        const show = (index) => {
          setActive(index);
          plates.forEach((plate, plateIndex) => {
            const isActive = plateIndex === index;
            gsap.to(plate, {
              autoAlpha: isActive ? 1 : 0,
              scale: isActive ? 1 : 1.06,
              duration: DUR.editorial,
              ease: EASE.enter,
              overwrite: 'auto',
            });
          });
          // A short mechanical flinch as the plate changes.
          gsap.fromTo(
            plates[index],
            { clipPath: 'inset(6% 0% 6% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR.ui, ease: EASE.exit },
          );
        };

        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => show(index),
            onEnterBack: () => show(index),
          });
        });
      });

      // Below desktop: a plain vertical read, nothing pinned.
      mm.add(MQ.belowDesktop, () => {
        gsap.utils.toArray('[data-work-card]', scope.current).forEach((card) => {
          gsap.set(card, { y: 24, autoAlpha: 0 });
          gsap.to(card, {
            y: 0,
            autoAlpha: 1,
            duration: DUR.editorial,
            ease: EASE.enter,
            scrollTrigger: { trigger: card, start: 'top 94%', once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  const current = projects[active];

  return (
    <section
      className="work"
      id={id}
      ref={scope}
      aria-labelledby="work-title"
      style={{ '--project-accent': current.accent }}
    >
      <div className="shell work__head section-head">
        <p className="mono index-mark">{copy.index} / {copy.label}</p>
        <h2 className="title-xl" id="work-title">{copy.title}</h2>
        <p className="body work__intro">{copy.intro}</p>
      </div>

      <div className="shell work__stage">
        {/* Desktop: sticky plate. */}
        <div className="work__media" aria-hidden="true">
          <div className="work__plate-stack">
            {projects.map((project) => (
              <figure
                className="work__plate"
                data-work-plate
                key={project.slug}
                style={{ '--plate-surface': project.surface }}
              >
                <img
                  src={`${project.heroBase}-1200.webp`}
                  srcSet={srcSet(project.heroBase, project.heroWidths)}
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  width={project.imageWidth}
                  height={project.imageHeight}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ viewTransitionName: `case-media-${project.slug}` }}
                />
              </figure>
            ))}
          </div>
        </div>

        <ol className="work__panels">
          {projects.map((project) => {
            const text = project[lang];
            return (
              <li className="work__panel" data-work-panel key={project.slug}>
                <article className="work__card" data-work-card>
                  <p className="mono work__panel-index">
                    <span>{project.index}</span>
                    <span>{project.year}</span>
                  </p>

                  <h3 className="work__name title-lg">
                    <TransitionLink
                      to={casePath(lang, project.slug)}
                      data-cursor="case"
                      data-cursor-label={copy.cursor}
                    >
                      {project.title}
                    </TransitionLink>
                  </h3>

                  <p className="mono work__sector">{text.sector}</p>

                  {/* The plate, inline, for tablet and phone. */}
                  <TransitionLink
                    className="work__inline-media"
                    to={casePath(lang, project.slug)}
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ '--plate-surface': project.surface }}
                  >
                    <img
                      src={`${project.heroBase}-640.webp`}
                      srcSet={srcSet(project.heroBase, project.heroWidths)}
                      sizes="(max-width: 1024px) calc(100vw - 40px), 1px"
                      width={project.imageWidth}
                      height={project.imageHeight}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </TransitionLink>

                  <dl className="work__facts">
                    <div>
                      <dt className="mono">{copy.problemLabel}</dt>
                      <dd>{text.problem}</dd>
                    </div>
                    <div>
                      <dt className="mono">{copy.roleLabel}</dt>
                      <dd>{text.role}</dd>
                    </div>
                    <div>
                      <dt className="mono">{copy.scopeLabel}</dt>
                      <dd>{text.scope.join(' · ')}</dd>
                    </div>
                  </dl>

                  <p className="work__actions">
                    <TransitionLink
                      className="cta"
                      to={casePath(lang, project.slug)}
                      data-cursor="case"
                      data-cursor-label={copy.cursor}
                    >
                      <span>{copy.readCase}</span>
                      <span className="cta__arrow" aria-hidden="true">→</span>
                    </TransitionLink>
                    <a className="link" href={project.url} target="_blank" rel="noreferrer">
                      {copy.visit}
                      <span className="link__arrow" aria-hidden="true">↗</span>
                    </a>
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
