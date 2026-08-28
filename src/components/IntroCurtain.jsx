import { useEffect, useRef, useState } from 'react';
import { gsap, DUR, EASE, prefersReducedMotion } from '../motion/config';
import Monogram from './Monogram';
import { content } from '../data/content';

const SEEN_KEY = 'ar-intro-seen';

/**
 * A brand intro, not a preloader. It mounts after the first paint, lasts under
 * 800 ms, can be skipped, runs once per session and never appears at all when
 * reduced motion is requested. The page below is already rendered and usable.
 */
export default function IntroCurtain({ lang }) {
  const [active, setActive] = useState(false);
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const copy = content[lang].intro;

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let seen = true;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen || window.scrollY > 4) return undefined;
    try { window.sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* private mode */ }

    // One frame later: the page has already painted, so this is a brand intro
    // rather than a preloader standing between the visitor and the content.
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!active || !rootRef.current) return undefined;

    const root = rootRef.current;
    const strokes = root.querySelectorAll('.monogram__stroke');
    const ctx = gsap.context(() => {
      strokes.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({
        onComplete: () => setActive(false),
        defaults: { ease: EASE.enter },
      });

      tl.to(strokes, { strokeDashoffset: 0, duration: 0.42, stagger: 0.035 })
        .to('.intro__word', { yPercent: 0, duration: DUR.editorial, stagger: 0.03 }, '-=0.24')
        .to(root, { yPercent: -100, duration: 0.62, ease: EASE.inOut }, '+=0.06');

      timelineRef.current = tl;
    }, root);

    return () => ctx.revert();
  }, [active]);

  const skip = () => {
    timelineRef.current?.progress(1);
    setActive(false);
  };

  if (!active) return null;

  return (
    <div className="intro on-ink" ref={rootRef} role="presentation">
      <div className="intro__stage">
        <Monogram className="intro__monogram" strokeWidth={2.2} />
        <p className="intro__name">
          {['Alejandro', 'Ruiz'].map((word) => (
            <span className="mask-line" key={word}>
              <span className="intro__word">{word}</span>
            </span>
          ))}
        </p>
      </div>
      <button type="button" className="intro__skip mono" onClick={skip}>{copy.skip}</button>
      <span className="sr-only">{copy.label}</span>
    </div>
  );
}
