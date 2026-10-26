import React from 'react'

/*
 * One stroke-based icon system replacing the emoji that were previously
 * hardcoded into JSX. All glyphs are drawn on a 24x24 grid with a 1.5 stroke
 * and inherit `currentColor`, so they pick up whatever the surface sets.
 */

const paths = {
  automation: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 8V4M9 4h6" />
      <path d="M9 13h.01M15 13h.01" />
      <path d="M9.5 16.5h5" />
    </>
  ),
  transform: (
    <>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.6 7.5 10 4.3-1.4 7.5-5 7.5-10v-6L12 2.5Z" />
      <path d="M9.5 12.2l1.8 1.8 3.4-3.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5.5a3 3 0 0 0-5.7-1.3A2.8 2.8 0 0 0 4 9a2.9 2.9 0 0 0 .6 4.6A3 3 0 0 0 7 19a3 3 0 0 0 5 1.4Z" />
      <path d="M12 5.5a3 3 0 0 1 5.7-1.3A2.8 2.8 0 0 1 20 9a2.9 2.9 0 0 1-.6 4.6A3 3 0 0 1 17 19a3 3 0 0 1-5 1.4Z" />
      <path d="M12 5.5v15" />
    </>
  ),
  chat: (
    <>
      <path d="M20 12.5c0 3.9-3.6 7-8 7a9 9 0 0 1-2.6-.4L4 21l1.3-3.6A6.6 6.6 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
      <path d="M9 12h.01M12 12h.01M15 12h.01" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17.3 10a3.8 3.8 0 0 1 .4 8.5H7Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M16 5.4a3.2 3.2 0 0 1 0 6.2" />
      <path d="M17.5 14.6a6 6 0 0 1 3 5.4" />
    </>
  ),
  scales: (
    <>
      <path d="M12 4v16M7 20h10" />
      <path d="M5 8h14M12 4 5 8l-2.5 5a4 4 0 0 0 5 0L5 8Zm7 0 7 4 2.5 5a4 4 0 0 1-5 0L19 8Z" />
    </>
  ),
  rocket: (
    <>
      <path d="M13.5 4.5c3.5-2 6-1.5 6-1.5s.5 2.5-1.5 6c-1.6 2.8-4.4 5-6.6 6.4L8.6 12.6C10 10.4 12 7 13.5 4.5Z" />
      <path d="m8.6 12.6-3-.8 2-2.6 2.8.4M11.4 15.4l.8 3 2.6-2-.4-2.8" />
      <path d="M7.5 16.5c-1.2 1.2-1.5 4-1.5 4s2.8-.3 4-1.5" />
    </>
  ),
  pulse: (
    <>
      <path d="M2.5 12.5H7l2-5 3.5 10 2.5-7 1.5 2h5" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M5 3.5v5a4 4 0 0 0 8 0v-5" />
      <path d="M5 3.5H3.5M13 3.5h1.5" />
      <path d="M9 12.5v2a5 5 0 0 0 10 0v-1" />
      <circle cx="19" cy="10.5" r="2" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5 13.8 9 19.5 12 13.8 15 12 20.5 10.2 15 4.5 12l5.7-3L12 3.5Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4 8.5-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17Z" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </>
  ),
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4.5M7.5 9 12 4.5 16.5 9" />
      <path d="M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15" />
    </>
  ),
  file: (
    <>
      <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5Z" />
      <path d="M13.5 3.5V9H19" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2h.01" />
    </>
  )
}

/**
 * @param {{ name: keyof typeof paths, size?: number, className?: string, strokeWidth?: number }} props
 */
export default function Icon({ name, size = 24, className = '', strokeWidth = 1.5, ...rest }) {
  const glyph = paths[name]
  if (!glyph) return null

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}

export const iconNames = Object.keys(paths)
