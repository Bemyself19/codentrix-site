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
  // Split on whitespace, then glue any purely-punctuation token (an em dash,
  // for instance) onto the word after it — otherwise it animates in as its own
  // "word" and can be left stranded on a line by itself.
  const words = useMemo(() => {
    const tokens = String(text ?? '')
      .split(/\s+/)
      .filter(Boolean)

    return tokens.reduce((acc, token, index) => {
      const isPunctuation = !/[\p{L}\p{N}]/u.test(token)
      if (isPunctuation && index < tokens.length - 1) {
        acc.push({ text: token, glued: true })
      } else if (acc.at(-1)?.glued) {
        acc[acc.length - 1] = { text: `${acc.at(-1).text} ${token}`, glued: false }
      } else {
        acc.push({ text: token, glued: false })
      }
      return acc
    }, [])
  }, [text])
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
          <span key={`${word.text}-${i}`} className="split-text-word">
            <motion.span className="split-text-inner" variants={prefersReduced ? still : wordReveal}>
              {word.text}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  )
}
