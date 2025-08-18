import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer(){
  const { t } = useTranslation()
  return (
    <footer className="site-footer">
      <div className="container">
        <small>{t('footer.copy', { year: new Date().getFullYear() })}</small>
      </div>
    </footer>
  )
}
