import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * One motion grammar for the whole site. Nothing is timed locally:
 * every animation picks a duration, an ease and a stagger from here.
 */
export const DUR = {
  micro: 0.18,
  ui: 0.34,
  editorial: 0.78,
  cinema: 1.1,
};

export const EASE = {
  enter: 'expo.out',
  exit: 'power2.in',
  glide: 'power2.out',
  inOut: 'power3.inOut',
};

export const STAGGER = {
  tight: 0.025,
  type: 0.045,
  block: 0.06,
};

gsap.defaults({ duration: DUR.editorial, ease: EASE.enter });

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Shared matchMedia conditions so breakpoints stay in one place. */
export const MQ = {
  desktop: '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
  tablet: '(min-width: 701px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)',
  belowDesktop: '(max-width: 1024px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
};

export { gsap, ScrollTrigger };
