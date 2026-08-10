import React from 'react'
import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Inertial smooth scrolling.
 *
 * Lenis is mounted at the root and drives the native window scroll, so
 * `position: sticky`, IntersectionObserver and anchor links all keep working.
 * Users who prefer reduced motion get plain native scrolling — Lenis is never
 * instantiated for them.
 */
export default function SmoothScroll({ children }) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return children

  return (
    <ReactLenis
      root
      options={{
        duration: 1.05,
        lerp: 0.1,
        smoothWheel: true,
        // Touch devices already have native momentum; overriding it feels wrong.
        syncTouch: false
      }}
    >
      {children}
    </ReactLenis>
  )
}
