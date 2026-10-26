import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has scrolled past `threshold` pixels.
 *
 * Uses a passive listener throttled to one read per animation frame, so the
 * sticky header can restyle itself without causing scroll handler churn.
 *
 * @param {number} threshold pixels from the top of the document
 * @returns {boolean}
 */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}

export default useScrolled
