import React, { useCallback } from 'react'
import './surface-card.css'

/**
 * Base raised surface.
 *
 * On pointer move it writes the cursor position into two CSS custom properties
 * so the card can render a soft spotlight that follows the pointer. Writing
 * custom properties (rather than re-rendering) keeps this off the React render
 * path entirely; the highlight itself is a composited radial gradient.
 *
 * @param {object} props
 * @param {boolean} [props.interactive] enable hover lift + spotlight
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
export default function SurfaceCard({
  children,
  as: Component = 'div',
  interactive = true,
  className = '',
  ...rest
}) {
  const handlePointerMove = useCallback((event) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
    target.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
  }, [])

  return (
    <Component
      className={`surface-card ${interactive ? 'is-interactive' : ''} ${className}`.trim()}
      onPointerMove={interactive ? handlePointerMove : undefined}
      {...rest}
    >
      <span className="surface-card-spotlight" aria-hidden="true" />
      <div className="surface-card-body">{children}</div>
    </Component>
  )
}
