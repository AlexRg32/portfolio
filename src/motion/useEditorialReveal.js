import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, DUR, EASE, STAGGER, MQ, prefersReducedMotion } from './config';

/**
 * One reveal pass per page. Content ships visible in the HTML; the initial
 * hidden state is only ever set behind the reduced-motion check, so with
 * reduced motion — or without JavaScript — nothing is hidden at any point.
 *
 * Two rules keep a reveal from ever stranding content:
 *
 * 1. The tween is started from a trigger callback instead of being owned by
 *    the trigger. A ScrollTrigger.refresh() — which late fonts and images
 *    make certain — reverts the animations it owns back to their "from"
 *    state, and a `once` trigger has already fired and will not replay.
 * 2. Every reveal clears its own inline styles when it finishes, so a
 *    revealed element carries no motion state at all.
 */
export default function useEditorialReveal(scope, dependencies = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return undefined;
      const mm = gsap.matchMedia();

      /*
       * Scroll position is not the only way into a section: a keyboard user
       * tabs. Every pending reveal is also played the moment focus enters it,
       * so nobody can land on a control inside a block that is still faded
       * out. This is why the reveals below fade opacity and never visibility,
       * which would take the block out of the tab order entirely.
       */
      const pending = [];

      const once = (trigger, start, play) => {
        const entry = { trigger, run: () => {
          if (entry.done) return;
          entry.done = true;
          play();
        } };
        pending.push(entry);
        ScrollTrigger.create({ trigger, start, once: true, onEnter: entry.run });
      };

      const onFocusIn = (event) => {
        pending.forEach((entry) => {
          if (!entry.done && entry.trigger.contains(event.target)) entry.run();
        });
      };
      root.addEventListener('focusin', onFocusIn);

      if (!prefersReducedMotion()) {
        // Lines masked behind their own box: the editorial type reveal.
        gsap.utils.toArray('[data-reveal="lines"]', root).forEach((block) => {
          const lines = block.querySelectorAll('[data-line-inner]');
          if (!lines.length) return;
          gsap.set(lines, { yPercent: 115 });
          once(block, 'top 92%', () => {
            gsap.to(lines, {
              yPercent: 0,
              duration: DUR.cinema,
              ease: EASE.enter,
              stagger: STAGGER.type,
              clearProps: 'transform',
            });
          });
        });

        /*
         * Blocks rise a short distance. Opacity, never visibility: a
         * visibility:hidden block drops out of the tab order, and the focus
         * safeguard above can only fire on something that can take focus.
         */
        gsap.utils.toArray('[data-reveal="up"]', root).forEach((el) => {
          gsap.set(el, { y: 26, opacity: 0 });
          once(el, 'top 94%', () => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: DUR.editorial,
              ease: EASE.enter,
              clearProps: 'transform,opacity',
            });
          });
        });

        // Groups: children stagger in together.
        gsap.utils.toArray('[data-reveal="group"]', root).forEach((el) => {
          const kids = el.children;
          if (!kids.length) return;
          gsap.set(kids, { y: 22, opacity: 0 });
          once(el, 'top 94%', () => {
            gsap.to(kids, {
              y: 0,
              opacity: 1,
              duration: DUR.editorial,
              ease: EASE.enter,
              stagger: STAGGER.block,
              clearProps: 'transform,opacity',
            });
          });
        });

        // Photographs uncover themselves and settle out of a soft blur.
        gsap.utils.toArray('[data-reveal="clip"]', root).forEach((el) => {
          const image = el.querySelector('[data-reveal-target]') ?? el.querySelector('img') ?? el;
          gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' });
          gsap.set(image, { scale: 1.14, filter: 'blur(14px)' });
          once(el, 'top 88%', () => {
            gsap
              .timeline()
              .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR.cinema, ease: EASE.inOut, clearProps: 'clipPath' })
              .to(image, { scale: 1, filter: 'blur(0px)', duration: DUR.cinema, ease: EASE.enter, clearProps: 'filter' }, 0);
          });
        });

        // A hairline that draws itself across the page.
        gsap.utils.toArray('[data-reveal="rule"]', root).forEach((el) => {
          gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
          once(el, 'top 95%', () => {
            gsap.to(el, { scaleX: 1, duration: DUR.cinema, ease: EASE.inOut, clearProps: 'transform' });
          });
        });
      }

      // Parallax is desktop-only: on a phone it fights the scroll it rides on.
      mm.add(MQ.desktop, () => {
        gsap.utils.toArray('[data-parallax]', root).forEach((el) => {
          const distance = Number(el.dataset.parallax) || 60;
          gsap.fromTo(
            el,
            { y: distance },
            {
              y: -distance,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-parallax-scope]') ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          );
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
        root.removeEventListener('focusin', onFocusIn);
        mm.revert();
      };
    },
    { scope, dependencies },
  );
}
