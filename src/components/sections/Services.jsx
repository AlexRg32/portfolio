import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, DUR, EASE, prefersReducedMotion } from '../../motion/config';
import { sectionHref } from '../../utils/routes';

/**
 * Editorial rows, not icon cards. One row open at a time, driven by real
 * buttons with aria-expanded so it works with a keyboard and a screen reader.
 */
export default function Services({ lang, copy, id, contactId }) {
  const baseId = useId();
  const [open, setOpen] = useState(0);
  const panelsRef = useRef({});

  // Panels ship open in the HTML. The closed state is applied only once JS
  // runs, so the content is readable without scripts and for search engines.
  useEffect(() => {
    Object.entries(panelsRef.current).forEach(([key, node]) => {
      if (node) gsap.set(node, { height: Number(key) === 0 ? 'auto' : 0 });
    });
  }, []);

  const toggle = (index) => {
    const next = open === index ? -1 : index;
    const reduced = prefersReducedMotion();
    const closing = panelsRef.current[open];
    const opening = panelsRef.current[next];

    if (closing && open !== next) {
      if (reduced) gsap.set(closing, { height: 0 });
      else gsap.to(closing, { height: 0, duration: DUR.ui, ease: EASE.exit, overwrite: true });
    }
    if (opening) {
      if (reduced) gsap.set(opening, { height: 'auto' });
      else {
        gsap.fromTo(
          opening,
          { height: 0 },
          { height: 'auto', duration: DUR.editorial, ease: EASE.enter, overwrite: true },
        );
      }
    }
    setOpen(next);
  };

  return (
    <section className="services" id={id} aria-labelledby="services-title">
      <div className="shell section-head services__head">
        <p className="mono index-mark">{copy.index} / {copy.label}</p>
        <h2 className="title-xl" id="services-title">{copy.title}</h2>
        <p className="body">{copy.intro}</p>
      </div>

      <div className="shell services__list">
        {copy.items.map((service, index) => {
          const expanded = open === index;
          const panelId = `${baseId}-panel-${service.id}`;
          const buttonId = `${baseId}-button-${service.id}`;
          return (
            <article className={`service${expanded ? ' is-open' : ''}`} key={service.id}>
              <h3 className="service__heading">
                <button
                  type="button"
                  id={buttonId}
                  className="service__trigger"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  data-cursor="link"
                >
                  <span className="mono service__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service__name title-lg">{service.name}</span>
                  <span className="service__sign" aria-hidden="true" />
                </button>
              </h3>

              <div
                className="service__panel"
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!expanded}
                ref={(node) => { panelsRef.current[index] = node; }}
              >
                <div className="service__panel-inner">
                  <div className="service__col">
                    <p className="mono service__label">{copy.problemLabel}</p>
                    <p className="service__text">{service.problem}</p>
                  </div>
                  <div className="service__col">
                    <p className="mono service__label">{copy.audienceLabel}</p>
                    <p className="service__text">{service.audience}</p>
                  </div>
                  <div className="service__col">
                    <p className="mono service__label">{copy.includesLabel}</p>
                    <ul className="service__includes">
                      {service.includes.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="service__col service__col--delivery">
                    <p className="mono service__label">{copy.deliveryLabel}</p>
                    <p className="service__text service__delivery">{service.delivery}</p>
                    <Link className="cta" to={sectionHref(lang, contactId)} data-cursor="cta">
                      <span>{service.cta}</span>
                      <span className="cta__arrow" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
