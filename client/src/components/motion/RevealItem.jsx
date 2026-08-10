import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, still } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * A child of a <Reveal> that staggers.
 *
 * Deliberately declares no `initial`/`whileInView` of its own: Framer only
 * propagates variant state from a parent to children that don't drive
 * themselves. Nesting <Reveal> inside <Reveal> would make every child trigger
 * independently and defeat the stagger.
 *
 * @param {object} props
 * @param {import('framer-motion').Variants} [props.variants]
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
export default function RevealItem({
  children,
  variants = fadeUp,
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
      {...rest}
    >
      {children}
    </Component>
  )
}
