import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, DUR, EASE, STAGGER, MQ } from './config';

/**
 * One reveal pass per page. Content ships visible in the HTML; the initial
 * hidden state is only ever set inside the motion-allowed matchMedia branch,
 * so with reduced motion (or without JS) nothing is hidden at any point.
 */
export default function useEditorialReveal(scope, dependencies = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const root = scope.current;
        if (!root) return;

        // Lines masked behind their own box: the editorial type reveal.
        gsap.utils.toArray('[data-reveal="lines"]', root).forEach((block) => {
          const lines = block.querySelectorAll('[data-line-inner]');
          if (!lines.length) return;
          gsap.set(lines, { yPercent: 108 });
          gsap.to(lines, {
            yPercent: 0,
            duration: DUR.editorial,
            ease: EASE.enter,
            stagger: STAGGER.type,
            scrollTrigger: { trigger: block, start: 'top 95%', once: true },
          });
        });

        // Blocks rise a short distance. Transform and opacity only.
        gsap.utils.toArray('[data-reveal="up"]', root).forEach((el) => {
          gsap.set(el, { y: 26, autoAlpha: 0 });
          gsap.to(el, {
            y: 0,
            autoAlpha: 1,
            duration: DUR.editorial,
            ease: EASE.enter,
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          });
        });

        // Groups: children stagger in together.
        gsap.utils.toArray('[data-reveal="group"]', root).forEach((el) => {
          const kids = el.children;
          if (!kids.length) return;
          gsap.set(kids, { y: 20, autoAlpha: 0 });
          gsap.to(kids, {
            y: 0,
            autoAlpha: 1,
            duration: DUR.editorial,
            ease: EASE.enter,
            stagger: STAGGER.block,
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          });
        });

        // A hairline that draws itself across the page.
        gsap.utils.toArray('[data-reveal="rule"]', root).forEach((el) => {
          gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
          gsap.to(el, {
            scaleX: 1,
            duration: DUR.cinema,
            ease: EASE.inOut,
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          });
        });
      });

      // Late-loading fonts and images move trigger positions. Refreshing once
      // everything has settled keeps reveals from stranding content off-screen.
      const refresh = () => ScrollTrigger.refresh();
      const timer = window.setTimeout(refresh, 600);
      window.addEventListener('load', refresh);
      document.fonts?.ready.then(refresh);

      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('load', refresh);
        mm.revert();
      };
    },
    { scope, dependencies },
  );
}
