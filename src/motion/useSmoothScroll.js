import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './config';

/**
 * Lenis is a comfort layer, never a requirement. It is skipped entirely for
 * reduced motion and for touch pointers, where native scrolling is better.
 * The wheel, trackpad, keyboard and touch are never intercepted or blocked.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis;

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
