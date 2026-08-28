import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../motion/config';

/**
 * A contextual cursor for fine pointers only. Never mounted on touch devices
 * or with reduced motion, and purely decorative: it carries no information
 * that is not already in the DOM.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current) return undefined;

    const dot = dotRef.current;
    const label = labelRef.current;
    const x = gsap.quickTo(dot, 'x', { duration: 0.36, ease: 'power3.out' });
    const y = gsap.quickTo(dot, 'y', { duration: 0.36, ease: 'power3.out' });

    const onMove = (event) => {
      x(event.clientX);
      y(event.clientY);
    };

    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      const mode = target?.dataset.cursor ?? null;
      dot.dataset.mode = mode ?? '';
      if (label) label.textContent = target?.dataset.cursorLabel ?? '';
    };

    const onLeave = () => { dot.dataset.state = 'out'; };
    const onEnter = () => { dot.dataset.state = 'in'; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" ref={dotRef} aria-hidden="true" data-state="in">
      <span className="cursor__ring" />
      <span className="cursor__label" ref={labelRef} />
    </div>
  );
}
