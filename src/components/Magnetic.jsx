import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../motion/config';

/**
 * A very small magnetic pull on a control: the element leans a few pixels
 * towards a fine pointer that is already near it, and springs back on leave.
 *
 * Fine pointers only, and never with reduced motion. It wraps its child in a
 * span rather than cloning props, so the child stays a normal focusable
 * element with its own semantics.
 */
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (prefersReducedMotion()) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const target = node.firstElementChild ?? node;
    const toX = gsap.quickTo(target, 'x', { duration: 0.5, ease: 'power3.out' });
    const toY = gsap.quickTo(target, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (event) => {
      const box = node.getBoundingClientRect();
      toX((event.clientX - (box.left + box.width / 2)) * strength);
      toY((event.clientY - (box.top + box.height / 2)) * strength);
    };
    const reset = () => {
      toX(0);
      toY(0);
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', reset);
    node.addEventListener('blur', reset, true);

    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', reset);
      node.removeEventListener('blur', reset, true);
      gsap.set(target, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <span className={`magnetic ${className}`} ref={ref}>
      {children}
    </span>
  );
}
