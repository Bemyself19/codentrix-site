// First-party, cookieless event beacon.
//
// What it never does: set a cookie, read or store an IP, use a third-party
// domain, or follow anyone across sites. A random id lives in sessionStorage
// so two clicks in one visit can be read together; it dies with the tab.
//
// It also honours Do Not Track: if the browser asks not to be tracked, nothing
// is sent at all.

const SID_KEY = 'ctx_visit'
const SENT = new Set()

function visitId() {
  try {
    let id = sessionStorage.getItem(SID_KEY)
    if (!id) {
      id = crypto?.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem(SID_KEY, id)
    }
    return id
  } catch {
    return 'no-storage'
  }
}

function dnt() {
  return (
    navigator.doNotTrack === '1' ||
    window.doNotTrack === '1' ||
    navigator.msDoNotTrack === '1'
  )
}

/**
 * Send one event. Never throws: a failed beacon must not break the page.
 * @param {'page_view'|'cta_click'|'form_start'|'form_submit'|'download'} event
 * @param {{label?: string}} extra
 */
export function track(event, extra = {}) {
  try {
    if (dnt()) return
    // The landing query string is the only place a campaign is visible (the
    // Referrer-Policy hides the source path), so keep utm_source/campaign.
    const params = new URLSearchParams(location.search)
    const campaign = ['utm_source', 'utm_campaign']
      .map((k) => params.get(k))
      .filter(Boolean)
      .join('/')
      .slice(0, 40)
    const payload = JSON.stringify({
      e: event,
      p: location.pathname.slice(0, 120),
      k: campaign,
      l: (extra.label || '').slice(0, 60),
      r: document.referrer ? new URL(document.referrer).host.slice(0, 60) : '',
      s: visitId()
    })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {})
    }
  } catch {
    /* measurement is never allowed to break the page */
  }
}

/** Form start is only interesting the first time per page load. */
export function trackFormStart(label) {
  const key = `start:${label}`
  if (SENT.has(key)) return
  SENT.add(key)
  track('form_start', { label })
}

/** Track a click once per page load per label, so repeat clicks do not inflate. */
export function trackClick(label) {
  if (SENT.has(label)) return
  SENT.add(label)
  track('cta_click', { label })
}

/**
 * One global listener: elements with data-track, plus mailto/tel links and
 * outbound links. Nav clicks are ignored — they are already page views.
 */
export function installClickTracking() {
  if (typeof document === 'undefined') return () => {}
  const onClick = (ev) => {
    const el = ev.target?.closest?.('[data-track], a[href]')
    if (!el) return
    const marked = el.getAttribute && el.getAttribute('data-track')
    if (marked) return trackClick(marked)
    const href = el.getAttribute && el.getAttribute('href')
    if (!href) return
    if (href.startsWith('mailto:')) return trackClick('mailto')
    if (href.startsWith('tel:')) return trackClick('tel')
    if (/^https?:\/\//.test(href) && !href.includes(location.host)) {
      return trackClick(`out:${new URL(href).host.slice(0, 40)}`)
    }
  }
  document.addEventListener('click', onClick, { capture: true })
  return () => document.removeEventListener('click', onClick, { capture: true })
}
