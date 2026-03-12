import { DURATIONS, EASINGS } from './constants';

// ─── Framer Motion Variants ───

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.outExpo,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.outQuart,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.outExpo,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.outExpo,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.outExpo,
    },
  },
};

// Stagger container — wraps children with stagger delay
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Word reveal — for TextReveal component
export const wordReveal = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.outExpo,
    },
  },
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.outExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.inOutQuart,
    },
  },
};

// Viewport trigger defaults
export const viewportConfig = {
  once: true,
  margin: '-80px',
};
