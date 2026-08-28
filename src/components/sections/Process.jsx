import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, MQ } from '../../motion/config';

/** Five phases, each answering a concern the client actually has. */
export default function Process({ copy, id }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const line = scope.current.querySelector('[data-process-line]');
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: scope.current.querySelector('[data-process-track]'),
              start: 'top 78%',
              end: 'bottom 62%',
              scrub: 0.6,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="process" id={id} ref={scope} aria-labelledby="process-title">
      <div className="shell section-head process__head">
        <p className="mono index-mark">{copy.index} / {copy.label}</p>
        <h2 className="title-xl" id="process-title">{copy.title}</h2>
        <p className="body">{copy.intro}</p>
      </div>

      <div className="shell process__track" data-process-track>
        <span className="process__rail" aria-hidden="true">
          <span className="process__rail-fill" data-process-line />
        </span>
        <ol className="process__steps">
          {copy.steps.map((step) => (
            <li className="process__step" key={step.n} data-reveal="up">
              <span className="process__node" aria-hidden="true" />
              <p className="mono process__n">{step.n}</p>
              <h3 className="process__name">{step.name}</h3>
              <p className="mono process__concern">
                <span className="sr-only">{copy.concernLabel}: </span>
                “{step.concern}”
              </p>
              <p className="process__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
