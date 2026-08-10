import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import LanguageToggle from './LanguageToggle'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { drawer, drawerItem, still } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrolled } from '../../hooks/useScrolled'
import './navbar.css'

const LINKS = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/about', key: 'nav.about' },
  { to: '/services', key: 'nav.services' },
  { to: '/products', key: 'nav.products' },
  { to: '/careers', key: 'nav.careers' }
]

export default function NavBar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const scrolled = useScrolled(40)
  const prefersReduced = useReducedMotion()
  const lenis = useLenis()
  const drawerRef = useRef(null)
  const toggleRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  // Any navigation closes the drawer.
  useEffect(() => {
    close()
  }, [location.pathname, close])

  // Lock scrolling while the drawer is open. Lenis drives the window scroll,
  // so `overflow: hidden` alone is not enough — it has to be stopped too.
  useEffect(() => {
    if (!open) return undefined

    document.body.dataset.scrollLocked = 'true'
    lenis?.stop()

    return () => {
      delete document.body.dataset.scrollLocked
      lenis?.start()
    }
  }, [open, lenis])

  // Esc closes; Tab is trapped inside the drawer while it is open.
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <>
      <a className="skip-link" href="#main">
        {t('nav.skipToContent', { defaultValue: 'Skip to content' })}
      </a>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="container header-inner">
          <NavLink to="/" className="brand" aria-label="Codentrix — home">
            <img
              src="/logo.png"
              alt=""
              className="brand-logo"
              width="132"
              height="32"
              fetchpriority="high"
            />
            <span className="visually-hidden">Codentrix</span>
          </NavLink>

          <nav className="primary-nav" aria-label={t('nav.primary', { defaultValue: 'Main' })}>
            <ul>
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
                  >
                    {t(link.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <LanguageToggle className="header-lang" />
            <Button to="/contact" size="sm" variant="primary" className="header-cta">
              {t('nav.contact')}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
              <span className="visually-hidden">
                {t('nav.toggleMenu', { defaultValue: 'Menu' })}
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            ref={drawerRef}
            className="mobile-drawer"
            variants={prefersReduced ? still : drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav aria-label={t('nav.primary', { defaultValue: 'Main' })}>
              <ul>
                {[...LINKS, { to: '/contact', key: 'nav.contact' }].map((link, index) => (
                  <motion.li key={link.to} variants={prefersReduced ? still : drawerItem}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) => `drawer-link ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="drawer-index mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {t(link.key)}
                      <Icon name="arrowUpRight" size={20} className="drawer-arrow" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div className="drawer-foot" variants={prefersReduced ? still : drawerItem}>
              <a className="text-link" href="mailto:contact@codentrix.io">
                contact@codentrix.io
              </a>
              <LanguageToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
