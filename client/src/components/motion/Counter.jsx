import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Splits a display string such as `€500M+`, `99.99%` or `50+` into the parts
 * around its first numeric run, so only the number is animated and any
 * currency symbol, unit or suffix is preserved verbatim.
 *
 * @param {string} raw
 * @returns {{ prefix: string, target: number, decimals: number, suffix: string } | null}
 */
function parseValue(raw) {
  const match = String(raw).match(/^(\D*?)(\d[\d\s,.]*)(.*)$/s)
  if (!match) return null

  const [, prefix, digits, suffix] = match
  const normalized = digits.replace(/[\s,]/g, '')
  const target = Number.parseFloat(normalized)
  if (!Number.isFinite(target)) return null

  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0
  return { prefix, target, decimals, suffix }
}

/**
 * Counts a metric up from zero the first time it scrolls into view.
 *
 * Falls back to the literal string when the value has no number in it or the
 * user prefers reduced motion.
 *
 * @param {{ value: string, duration?: number, className?: string }} props
 */
export default function Counter({ value, duration = 1600, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReduced = useReducedMotion()
  const parsed = parseValue(value)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!parsed || prefersReduced || !inView) return undefined

    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCurrent(parsed.target * EASE_OUT(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, prefersReduced, parsed?.target, duration])

  if (!parsed || prefersReduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  const shown = inView ? current : 0

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {shown.toLocaleString(undefined, {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals
      })}
      {parsed.suffix}
    </span>
  )
}
