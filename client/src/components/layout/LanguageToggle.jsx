import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'
import './language-toggle.css'

const LABELS = { en: 'EN', fr: 'FR' }

/**
 * Two-state language switch.
 *
 * Shows the *current* language and announces the target in its accessible
 * name, so screen reader users aren't left guessing what "FR" will do. Also
 * keeps `<html lang>` in sync, which the previous version never did.
 */
export default function LanguageToggle({ className = '' }) {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const next = current === 'en' ? 'fr' : 'en'

  React.useEffect(() => {
    document.documentElement.lang = current
  }, [current])

  return (
    <button
      type="button"
      className={`lang-toggle ${className}`.trim()}
      onClick={() => i18n.changeLanguage(next)}
      aria-label={t('nav.switchLanguage', {
        defaultValue: current === 'en' ? 'Passer en français' : 'Switch to English'
      })}
    >
      <Icon name="globe" size={16} />
      <span className="lang-toggle-track" aria-hidden="true">
        <span className={`lang-toggle-value ${current === 'en' ? 'is-active' : ''}`}>
          {LABELS.en}
        </span>
        <span className={`lang-toggle-value ${current === 'fr' ? 'is-active' : ''}`}>
          {LABELS.fr}
        </span>
      </span>
    </button>
  )
}
