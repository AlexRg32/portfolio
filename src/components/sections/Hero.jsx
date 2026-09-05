import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, DUR, EASE, STAGGER, MQ, prefersReducedMotion } from '../../motion/config';
import FitLines from '../FitLines';
import Seal from '../Seal';
import Magnetic from '../Magnetic';

/**
 * The whole first screen: name, role, place, one headline that fills the
 * frame, one photograph and one way in. Nothing else.
 */
export default function Hero({ copy, ids }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const root = scope.current;
      const portrait = root.querySelector('[data-hero-portrait]');
      const mm = gsap.matchMedia();

      /*
       * The entrance is deliberately kept out of matchMedia. A matchMedia
       * context is reverted and replayed whenever ScrollTrigger refreshes —
       * which late fonts and images make certain — and a first-screen
       * entrance that gets reverted leaves the headline hidden for good.
       */
      if (!prefersReducedMotion()) {
        const lines = root.querySelectorAll('.hero__title [data-line-inner]');
        const fades = root.querySelectorAll('[data-hero-fade]');

        gsap.set(lines, { yPercent: 115 });
        gsap.set(fades, { opacity: 0, y: 16 });
        if (portrait) {
          gsap.set(portrait, { clipPath: 'inset(100% 0% 0% 0%)' });
          gsap.set(portrait.querySelector('img'), { scale: 1.18 });
        }

        const tl = gsap.timeline({
          delay: 0.1,
          defaults: { ease: EASE.enter },
          // Nothing of the entrance survives it: the finished page carries no
          // inline state that a later revert could strand.
          onComplete: () => {
            gsap.set(lines, { clearProps: 'transform' });
            gsap.set(fades, { clearProps: 'opacity,transform' });
            if (portrait) gsap.set(portrait, { clearProps: 'clipPath' });
          },
        });

        tl.to(lines, { yPercent: 0, duration: DUR.cinema, stagger: STAGGER.type });
        if (portrait) {
          tl.to(portrait, { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR.cinema, ease: EASE.inOut }, '-=0.78')
            .to(portrait.querySelector('img'), { scale: 1, duration: 1.4 }, '<');
        }
        tl.to(fades, { opacity: 1, y: 0, duration: DUR.editorial, stagger: STAGGER.block }, '-=0.9');
      }

      // The photograph drifts a little against the type as the page moves.
      mm.add(MQ.desktop, () => {
        if (!portrait) return;
        gsap.to(portrait, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5 },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section className="hero" ref={scope} aria-labelledby="hero-title">
      <div className="hero__mass" aria-hidden="true" />

      <div className="shell hero__top" data-hero-fade>
        <p className="hero__name accent">{copy.name}</p>
        <p className="mono hero__role">{copy.role}</p>
        <p className="mono hero__place">{copy.place}</p>
      </div>

      <div className="shell hero__stage">
        <div className="hero__type" data-fit-frame>
          <h1 className="hero__title display" id="hero-title">
            <span className="sr-only">{copy.title}</span>
            <FitLines className="hero__lines hero__lines--wide" lines={copy.titleLines} fitHeight aria-hidden="true" />
            <FitLines className="hero__lines hero__lines--narrow" lines={copy.titleLinesNarrow} fitHeight aria-hidden="true" />
          </h1>
        </div>

        <figure className="hero__portrait" data-hero-portrait>
          <img
            src="/assets/alejandro-hero-560.webp"
            srcSet="/assets/alejandro-hero-384.webp 384w, /assets/alejandro-hero-560.webp 560w, /assets/alejandro-hero-768.webp 768w"
            sizes="(max-width: 700px) 52vw, (max-width: 1024px) 30vw, min(24vw, 380px)"
            width="768"
            height="1024"
            alt={copy.portraitAlt}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>

      <div className="shell hero__bottom" data-hero-fade>
        <Magnetic className="hero__seal-magnet">
          <a className="hero__seal" href={`#${ids.work}`} data-cursor="cta">
            <Seal text={copy.seal}>
              <span aria-hidden="true">↓</span>
            </Seal>
            <span className="sr-only">{copy.sealAction}</span>
          </a>
        </Magnetic>

        <a className="cta hero__cta" href={`#${ids.work}`} data-cursor="cta">
          <span>{copy.cta}</span>
          <span className="cta__arrow" aria-hidden="true">↓</span>
        </a>

        <p className="mono hero__scroll" aria-hidden="true">
          <span className="hero__scroll-rule" />
          {copy.scroll}
        </p>
      </div>
    </section>
  );
}
