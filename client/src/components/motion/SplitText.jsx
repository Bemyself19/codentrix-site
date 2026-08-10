import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { stagger, wordReveal, still, viewportOnce } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './split-text.css'

/**
 * Splits a string into words and staggers them in.
 *
 * The full text stays available to screen readers via a visually-hidden copy;
 * the animated words are aria-hidden so assistive tech reads one clean string
 * rather than a stream of fragments.
 *
 * @param {object} props
 * @param {string} props.text
 * @param {keyof JSX.IntrinsicElements} [props.as]
 * @param {number} [props.delay] seconds before the first word
 */
export default function SplitText({ text, as = 'span', className = '', delay = 0, ...rest }) {
  const prefersReduced = useReducedMotion()
  const words = useMemo(() => String(text ?? '').split(/\s+/).filter(Boolean), [text])
  const Component = motion[as] ?? motion.span

  if (prefersReduced) {
    const Static = as
    return (
      <Static className={className} {...rest}>
        {text}
      </Static>
    )
  }

  return (
    <Component
      className={`split-text ${className}`.trim()}
      variants={stagger(0.055, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" className="split-text-words">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="split-text-word">
            <motion.span className="split-text-inner" variants={prefersReduced ? still : wordReveal}>
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  )
}
