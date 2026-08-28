import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { prefersReducedMotion } from '../motion/config';

/**
 * Route and hash scrolling in one place, so back/forward, in-page anchors and
 * deep links all behave the same way. It waits a frame for the smooth-scroll
 * layer to exist, then hands the scroll to it rather than fighting it.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const isDeepLink = firstRun.current;
    firstRun.current = false;

    const run = () => {
      const lenis = window.__lenis;

      if (!hash) {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }

      // A deep link should land, not travel. In-page anchors glide.
      const immediate = isDeepLink || prefersReducedMotion();
      if (lenis) {
        lenis.scrollTo(target, { offset: -12, immediate });
      } else {
        target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
      }
    };

    // Two frames: enough for the smooth-scroll layer to have registered.
    const outer = requestAnimationFrame(() => {
      const inner = requestAnimationFrame(run);
      frames.push(inner);
    });
    const frames = [outer];

    return () => frames.forEach((frame) => cancelAnimationFrame(frame));
  }, [pathname, hash, key]);

  return null;
}
