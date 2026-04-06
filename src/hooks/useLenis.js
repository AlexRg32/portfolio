import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    let disposeScrollBridge = () => {};
    let isDisposed = false;

    import('../utils/gsap').then(({ ScrollTrigger }) => {
      if (isDisposed) {
        return;
      }

      const syncScrollTrigger = () => {
        ScrollTrigger.update();
      };
      const syncLenisDimensions = () => {
        lenis.resize();
      };

      lenis.on('scroll', syncScrollTrigger);
      ScrollTrigger.addEventListener('refresh', syncLenisDimensions);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      disposeScrollBridge = () => {
        lenis.off('scroll', syncScrollTrigger);
        ScrollTrigger.removeEventListener('refresh', syncLenisDimensions);
      };
    });

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      isDisposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      disposeScrollBridge();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
