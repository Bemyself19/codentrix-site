import React from 'react'
import './marquee.css'

/**
 * Infinite horizontal ticker.
 *
 * The children are rendered twice and the track is translated by exactly -50%,
 * which makes the loop seamless regardless of content width. The duplicate is
 * aria-hidden so screen readers see each item once. Pure CSS animation on
 * `transform` — no scroll listeners, no JS per frame.
 *
 * Under `prefers-reduced-motion` the animation stops and the track wraps into a
 * static row (see marquee.css).
 *
 * @param {{ items: Array<string|{key:string,node:React.ReactNode}>, speed?: number, className?: string }} props
 */
export default function Marquee({ items = [], speed = 32, className = '', children }) {
  const content = children ?? (
    <>
      {items.map((item, i) => {
        const key = typeof item === 'string' ? `${item}-${i}` : item.key
        const node = typeof item === 'string' ? item : item.node
        return (
          <li key={key} className="marquee-item">
            {node}
          </li>
        )
      })}
    </>
  )

  return (
    <div className={`marquee ${className}`.trim()} data-marquee>
      <div className="marquee-track" style={{ '--marquee-duration': `${speed}s` }}>
        <ul className="marquee-group">{content}</ul>
        <ul className="marquee-group" aria-hidden="true">
          {content}
        </ul>
      </div>
    </div>
  )
}
