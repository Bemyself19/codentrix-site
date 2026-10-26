import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { pageTransition } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const instant = { initial: {}, animate: {}, exit: {} }

/**
 * Wraps a route's content in an enter/exit transition and resets scroll.
 *
 * The scroll reset has to go through Lenis when it is active — calling
 * `window.scrollTo` alone leaves Lenis's internal position out of sync and the
 * page springs back on the next wheel event.
 */
export default function PageTransition({ children }) {
  const prefersReduced = useReducedMotion()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [lenis])

  const variants = prefersReduced ? instant : pageTransition

  return (
    <motion.div initial={variants.initial} animate={variants.animate} exit={variants.exit}>
      {children}
    </motion.div>
  )
}
