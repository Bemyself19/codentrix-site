import React from 'react'
import Icon from '../ui/Icon'
import './forms.css'

/**
 * Submission feedback.
 *
 * Rendered inside a live region so the outcome is announced rather than only
 * appearing visually — the previous forms showed a bare paragraph that screen
 * reader users had to go hunting for.
 *
 * @param {{ tone: 'success'|'error', children: React.ReactNode }} props
 */
export default function FormStatus({ tone = 'success', children }) {
  return (
    <p className={`form-status is-${tone}`} role="status">
      <Icon name={tone === 'success' ? 'check' : 'alert'} size={17} />
      <span>{children}</span>
    </p>
  )
}
