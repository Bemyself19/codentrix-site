import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import './button.css'

/**
 * Single button surface for the whole site.
 *
 * Renders an `<a>` for external `href`, a router `<Link>` for internal `to`,
 * and a `<button>` otherwise — so an in-app CTA no longer triggers a full page
 * reload the way the old raw `<a href="/contact">` markup did.
 *
 * @param {object} props
 * @param {'primary'|'ghost'|'quiet'} [props.variant]
 * @param {'sm'|'md'} [props.size]
 * @param {string} [props.to] internal route
 * @param {string} [props.href] external URL
 * @param {boolean} [props.arrow] append a trailing arrow that slides on hover
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  arrow = false,
  className = '',
  ...rest
}) {
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim()

  const inner = (
    <>
      <span className="btn-label">{children}</span>
      {arrow && <Icon name="arrowRight" size={18} className="btn-arrow" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:/i.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  )
}
