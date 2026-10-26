import React, { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Icon from '../ui/Icon'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './scrolly-features.css'

/**
 * Sticky scrollytelling section.
 *
 * The left column pins while the right column's panels scroll past it; the
 * pinned visual swaps to whichever panel is currently in the reading position.
 * The active index is derived from the section's own scroll progress rather
 * than from a scroll event handler, so it stays in step with Lenis.
 *
 * Under reduced motion the sticky behaviour is dropped entirely (see the CSS)
 * and the panels read as a plain stacked list.
 *
 * @param {object} props
 * @param {Array<{title: string, description: string}>} props.features
 * @param {string[]} props.icons icon names, parallel to `features`
 */
export default function ScrollyFeatures({ features = [], icons = [], id }) {
  const containerRef = useRef(null)
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!features.length) return
    // Each panel is exactly one viewport tall, so the scrollable range spans
    // n-1 viewports and panel `i` is centred when progress === i/(n-1).
    // Rounding (not flooring) is what keeps the pinned visual in step with the
    // panel actually sitting in the reading position.
    const index = Math.round(progress * (features.length - 1))
    setActive((current) => (current === index ? current : index))
  })

  if (!features.length) return null

  return (
    <div className="scrolly" ref={containerRef} id={id}>
      <div className="container scrolly-inner">
        <div className="scrolly-sticky">
          <div className="scrolly-stage" aria-hidden="true">
            <span className="glow glow-cyan scrolly-glow" />

            <div className="scrolly-stage-inner">
              <motion.span
                key={`icon-${active}`}
                className="scrolly-icon"
                initial={prefersReduced ? false : { opacity: 0, scale: 0.85, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon name={icons[active] ?? 'spark'} size={72} strokeWidth={1} />
              </motion.span>

              <motion.p
                key={`num-${active}`}
                className="scrolly-index mono"
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {String(active + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
              </motion.p>
            </div>

            {/* Progress rail — reads as a chapter marker for the section. */}
            <ul className="scrolly-rail">
              {features.map((feature, index) => (
                <li
                  key={feature.title}
                  className={`scrolly-tick ${index === active ? 'is-active' : ''}`}
                />
              ))}
            </ul>
          </div>
        </div>

        <ol className="scrolly-panels">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className={`scrolly-panel ${index === active ? 'is-active' : ''}`}
            >
              <span className="scrolly-panel-index mono" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="heading-3">{feature.title}</h3>
              <p className="muted">{feature.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
