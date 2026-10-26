import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, still, viewportOnce } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Scroll-triggered reveal wrapper.
 *
 * Fires once when the element enters the viewport. Under reduced motion the
 * variants collapse to a no-op so content renders immediately at full opacity.
 *
 * @param {object} props
 * @param {import('framer-motion').Variants} [props.variants] defaults to fadeUp
 * @param {number} [props.delay] seconds
 * @param {keyof JSX.IntrinsicElements} [props.as] element to render
 */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  as = 'div',
  className = '',
  ...rest
}) {
  const prefersReduced = useReducedMotion()
  const Component = motion[as] ?? motion.div

  return (
    <Component
      data-reveal
      className={className}
      variants={prefersReduced ? still : variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}
