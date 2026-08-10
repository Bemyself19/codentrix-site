import { useEffect } from 'react'
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/**
 * Single source of truth for motion preference.
 *
 * Wraps Framer's hook and mirrors the result onto `<html class="no-motion">`
 * so plain CSS (marquees, grain, hover flourishes) can opt out too.
 *
 * @returns {boolean} true when the user prefers reduced motion
 */
export function useReducedMotion() {
  const prefersReduced = useFramerReducedMotion() ?? false

  useEffect(() => {
    document.documentElement.classList.toggle('no-motion', prefersReduced)
  }, [prefersReduced])

  return prefersReduced
}

export default useReducedMotion
