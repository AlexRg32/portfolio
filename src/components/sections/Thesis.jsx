import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, DUR, EASE, MQ } from '../../motion/config';

/**
 * The commercial argument, told as typography rather than three identical cards.
 */
export default function Thesis({ copy, id }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const rows = gsap.utils.toArray('[data-thesis-row]', scope.current);

        rows.forEach((row, index) => {
          const word = row.querySelector('[data-thesis-word]');
          const meta = row.querySelector('[data-thesis-meta]');
          const from = index % 2 === 0 ? -1 : 1;

          gsap.fromTo(
            word,
            { xPercent: 6 * from },
            {
              xPercent: -6 * from,
              ease: 'none',
              scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            },
          );

          gsap.set(meta, { autoAlpha: 0, y: 12 });
          gsap.to(meta, {
            autoAlpha: 1,
            y: 0,
            duration: DUR.editorial,
            ease: EASE.enter,
            scrollTrigger: { trigger: row, start: 'top 92%', once: true },
          });

          ScrollTrigger.create({
            trigger: row,
            start: 'top 62%',
            end: 'bottom 42%',
            toggleClass: { targets: row, className: 'is-current' },
          });
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="thesis on-ink" id={id} ref={scope} aria-labelledby="thesis-title">
      <div className="shell thesis__head">
        <p className="mono index-mark">{copy.index} / {copy.label}</p>
        <h2 className="thesis__statement title-xl" id="thesis-title">{copy.statement}</h2>
        <p className="body thesis__body">{copy.body}</p>
      </div>

      <ol className="thesis__words">
        {copy.words.map((word, index) => (
          <li className="thesis__row" data-thesis-row key={word}>
            <div className="shell thesis__row-inner">
              <span className="mono thesis__n">{String(index + 1).padStart(2, '0')}</span>
              <span className="thesis__word display" data-thesis-word>{word}</span>
              <span className="mono thesis__meta" data-thesis-meta>{copy.wordsMeta[index]}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
