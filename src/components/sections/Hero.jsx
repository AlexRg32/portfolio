import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, DUR, EASE, STAGGER, MQ } from '../../motion/config';
import { useGSAP } from '@gsap/react';
import MaskLines from '../MaskLines';
import HeroLattice from '../HeroLattice';
import { sectionHref } from '../../utils/routes';

export default function Hero({ lang, copy, ids }) {
  const scope = useRef(null);
  const portraitRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance. Runs after the content is already painted.
      mm.add(MQ.motion, () => {
        const lines = scope.current.querySelectorAll('[data-line-inner]');
        const tl = gsap.timeline({ delay: 0.12, defaults: { ease: EASE.enter } });
        gsap.set(lines, { yPercent: 108 });
        gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 18 });
        tl.to(lines, { yPercent: 0, duration: DUR.cinema, stagger: STAGGER.type })
          .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: DUR.editorial, stagger: STAGGER.block }, '-=0.62');
      });

      // Portrait depth: the photograph answers the pointer without floating away.
      mm.add(MQ.desktop, () => {
        const figure = portraitRef.current;
        if (!figure) return;
        const image = figure.querySelector('img');
        const toX = gsap.quickTo(image, 'x', { duration: 0.9, ease: 'power3.out' });
        const toY = gsap.quickTo(image, 'y', { duration: 0.9, ease: 'power3.out' });
        const toRot = gsap.quickTo(figure, 'rotate', { duration: 1.1, ease: 'power3.out' });

        const onMove = (event) => {
          const cx = event.clientX / window.innerWidth - 0.5;
          const cy = event.clientY / window.innerHeight - 0.5;
          toX(cx * -26);
          toY(cy * -18);
          toRot(cx * 0.5);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
      });

      return () => mm.revert();
    },
    { scope },
  );

  useEffect(() => {
    // Keep the LCP image out of any animated wrapper.
    portraitRef.current?.style.removeProperty('opacity');
  }, []);

  return (
    <section className="hero" ref={scope} aria-labelledby="hero-title">
      <HeroLattice />

      <div className="shell hero__grid">
        <p className="hero__eyebrow" data-hero-fade>
          <span className="hero__eyebrow-name">{copy.eyebrowName}</span>
          <span className="mono">{copy.eyebrowRole}</span>
          <span className="mono hero__eyebrow-place">{copy.eyebrowPlace}</span>
        </p>

        <p className="hero__availability mono" data-hero-fade>
          <span className="status-dot" aria-hidden="true" />
          {copy.availability}
        </p>

        <h1 className="hero__title display" id="hero-title">
          <MaskLines lines={copy.titleLines} />
        </h1>

        <div className="hero__lede" data-hero-fade>
          <p className="lede">{copy.support}</p>
        </div>

        <div className="hero__actions" data-hero-fade>
          <Link className="cta" to={sectionHref(lang, ids.contact)} data-cursor="cta">
            <span>{copy.primary}</span>
            <span className="cta__arrow" aria-hidden="true">→</span>
          </Link>
          <a className="cta cta--ghost" href={`#${ids.work}`} data-cursor="cta">
            <span>{copy.secondary}</span>
            <span className="cta__arrow" aria-hidden="true">↓</span>
          </a>
        </div>

        <figure className="hero__portrait" ref={portraitRef}>
          <div className="hero__portrait-frame">
            <img
              src="/assets/alejandro-portrait-800.webp"
              srcSet="/assets/alejandro-portrait-480.webp 480w, /assets/alejandro-portrait-800.webp 800w, /assets/alejandro-portrait-1200.webp 1200w"
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1024px) 54vw, min(46vw, 720px)"
              width="2200"
              height="1466"
              alt={copy.portraitAlt}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="mono">
            <span>{copy.portraitCaption}</span>
            <span>{copy.portraitMeta}</span>
          </figcaption>
        </figure>

        <p className="hero__scroll mono" data-hero-fade aria-hidden="true">
          <span className="hero__scroll-rule" />
          {copy.scroll}
        </p>
      </div>
    </section>
  );
}
