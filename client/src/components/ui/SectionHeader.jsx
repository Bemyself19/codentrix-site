import React from 'react'
import Reveal from '../motion/Reveal'
import RevealItem from '../motion/RevealItem'
import { stagger } from '../../lib/motion'

/**
 * Eyebrow + heading + optional lead, revealed as one staggered group.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] small-caps label above the heading
 * @param {string} props.title
 * @param {string} [props.lead]
 * @param {'h1'|'h2'|'h3'} [props.as] heading level — pick for document outline
 * @param {string} [props.titleId] id for the heading, for aria-labelledby
 */
export default function SectionHeader({
  eyebrow,
  title,
  lead,
  as = 'h2',
  titleId,
  className = ''
}) {
  const Heading = as

  return (
    <Reveal className={`section-head ${className}`.trim()} variants={stagger(0.09)}>
      {eyebrow && (
        <RevealItem as="span" className="eyebrow">
          {eyebrow}
        </RevealItem>
      )}
      <RevealItem>
        <Heading id={titleId} className={as === 'h1' ? 'display' : 'heading-2'}>
          {title}
        </Heading>
      </RevealItem>
      {lead && (
        <RevealItem as="p" className="lead">
          {lead}
        </RevealItem>
      )}
    </Reveal>
  )
}
