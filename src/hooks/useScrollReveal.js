import { gsap, ScrollTrigger, useGSAP } from '../utils/gsap';

const REVEAL_SELECTOR = '[data-gsap="reveal"]';
const GROUP_SELECTOR = '[data-gsap="group"]';
const GROUP_ITEM_SELECTOR = '[data-gsap-item]';

function getNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getRevealFromVars(element) {
  const direction = element.dataset.gsapFrom ?? 'up';
  const distance = getNumber(element.dataset.gsapDistance, 44);

  switch (direction) {
    case 'left':
      return { x: -distance, y: 0, scale: 1 };
    case 'right':
      return { x: distance, y: 0, scale: 1 };
    case 'scale':
      return { x: 0, y: 0, scale: 0.92 };
    case 'fade':
      return { x: 0, y: 0, scale: 1 };
    case 'up':
    default:
      return { x: 0, y: distance, scale: 1 };
  }
}

function getRevealStart(element, fallback) {
  return element.dataset.gsapStart ?? fallback;
}

function clearRevealProps(targets) {
  gsap.set(targets, { clearProps: 'willChange,filter' });
}

export function useScrollReveal(scopeRef, options = {}) {
  const dependencies = options.dependencies ?? [];

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !scopeRef.current) {
        return undefined;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return undefined;
      }

      const scope = scopeRef.current;
      const groups = Array.from(scope.querySelectorAll(GROUP_SELECTOR));
      const groupedItems = new Set();

      groups.forEach((group) => {
        const items = Array.from(group.querySelectorAll(GROUP_ITEM_SELECTOR));
        if (!items.length) {
          return;
        }

        items.forEach((item) => groupedItems.add(item));

        const fromVars = getRevealFromVars(group);
        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            x: fromVars.x,
            y: fromVars.y,
            scale: fromVars.scale,
            filter: 'blur(8px)',
            willChange: 'transform, opacity, filter',
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: getNumber(group.dataset.gsapDuration, 0.9),
            ease: 'power3.out',
            stagger: getNumber(group.dataset.gsapStagger, 0.12),
            onComplete: () => clearRevealProps(items),
            scrollTrigger: {
              trigger: group,
              start: getRevealStart(group, 'top 86%'),
              once: true,
              fastScrollEnd: true,
            },
          }
        );
      });

      const singles = Array.from(scope.querySelectorAll(REVEAL_SELECTOR)).filter(
        (element) => !groupedItems.has(element) && !element.closest(GROUP_SELECTOR)
      );

      singles.forEach((element) => {
        const fromVars = getRevealFromVars(element);

        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            x: fromVars.x,
            y: fromVars.y,
            scale: fromVars.scale,
            filter: 'blur(8px)',
            willChange: 'transform, opacity, filter',
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: getNumber(element.dataset.gsapDuration, 0.82),
            delay: getNumber(element.dataset.gsapDelay, 0),
            ease: 'power3.out',
            onComplete: () => clearRevealProps(element),
            scrollTrigger: {
              trigger: element,
              start: getRevealStart(element, 'top 88%'),
              once: true,
              fastScrollEnd: true,
            },
          }
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        ScrollTrigger.refresh();
      };
    },
    { dependencies, scope: scopeRef, revertOnUpdate: true }
  );
}
