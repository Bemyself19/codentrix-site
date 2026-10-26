import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'
import './announcement-pill.css'

const STORAGE_KEY = 'codentrix:announcement-dismissed'
const VERSION = 'telehealth-launch'

/**
 * Launch announcement.
 *
 * Rendered inline at the top of the hero rather than as a full-width bar above
 * the header — the header is fixed, so a bar would sit underneath it. Dismissal
 * is persisted, which the previous banner did not do: it reappeared on every
 * page load.
 */
export default function AnnouncementPill() {
  const { t } = useTranslation()
  const [dismissed, setDismissed] = useState(true)

  // Read after mount so the server-rendered/first paint markup can't flash the
  // pill for someone who already dismissed it.
  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === VERSION)
    } catch {
      // Private browsing or blocked storage — show the pill, don't crash.
      setDismissed(false)
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, VERSION)
    } catch {
      // Nothing to do; the pill stays dismissed for this session only.
    }
  }

  if (dismissed) return null

  return (
    <div className="announce">
      <Link to="/products" className="announce-body">
        <span className="announce-tag">{t('home.announcement.title')}</span>
        <span className="announce-text">{t('home.announcement.text')}</span>
        <Icon name="arrowRight" size={16} className="announce-arrow" />
      </Link>
      <button
        type="button"
        className="announce-close"
        onClick={dismiss}
        aria-label={t('home.announcement.dismiss', { defaultValue: 'Dismiss announcement' })}
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  )
}
