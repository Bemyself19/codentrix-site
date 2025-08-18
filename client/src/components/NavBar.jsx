import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageToggle from './LanguageToggle'
import { useTranslation } from 'react-i18next'

export default function NavBar(){
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Codentrix home">
          <span className="logo-badge">
            <img src="/logo.png" alt="Codentrix logo" className="brand-logo" />
          </span>
        </Link>
        <button className="nav-toggle" aria-expanded={open} onClick={()=>setOpen(!open)} aria-label="Toggle navigation">
          <span className="hamburger" />
        </button>

        <nav className={open ? 'open' : ''} onClick={()=>setOpen(false)}>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/services">{t('nav.services')}</Link>
          <Link to="/careers">{t('nav.careers')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
