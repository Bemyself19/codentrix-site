/*
 * Shared Framer Motion variants.
 *
 * Rule: only `transform`, `opacity`, `clip-path` and `filter` are animated so
 * everything stays on the compositor. Nothing here animates width, height,
 * top/left, margin or padding.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

/** Default viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.25 }

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO }
  }
}

/** Curtain wipe — used for imagery and feature panels. */
export const revealClip = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1, ease: EASE_OUT_EXPO }
  }
}

/** Parent container that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } }
})

/** Per-word headline entrance. Pair with <SplitText>. */
export const wordReveal = {
  hidden: { opacity: 0, y: '0.55em', rotateX: -45 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO }
  }
}

/** Accordion / disclosure panel. Height is animated by Framer's `auto`
 *  measurement, which it applies via transform-free layout — acceptable here
 *  because the alternative (max-height guesswork) causes visible snapping. */
export const collapse = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.45, ease: EASE_OUT_EXPO },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.35, ease: EASE_IN_OUT },
      opacity: { duration: 0.15 }
    }
  }
}

/** Full-screen mobile drawer. */
export const drawer = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.5, ease: EASE_OUT_EXPO, staggerChildren: 0.05, delayChildren: 0.12 }
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.35, ease: EASE_IN_OUT }
  }
}

export const drawerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } }
}

/** Route transition. Kept short so navigation never feels laggy. */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_IN_OUT } }
}

/**
 * Strips motion out of a variant set for reduced-motion users: the `visible`
 * state is kept (so content is on screen) but the `hidden` state matches it,
 * making the transition a no-op.
 */
export const still = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } }
}
