import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'
import LanguageToggle from './LanguageToggle'
import './footer.css'

const SITE_LINKS = [
  { to: '/services', key: 'nav.services' },
  { to: '/products', key: 'nav.products' },
  { to: '/about', key: 'nav.about' },
  { to: '/careers', key: 'nav.careers' },
  { to: '/contact', key: 'nav.contact' }
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-lead">
          <p className="eyebrow">{t('footer.eyebrow', { defaultValue: 'Get in touch' })}</p>
          <p className="footer-pitch">
            {t('footer.pitch', {
              defaultValue: 'Tell us what you want to automate. We will tell you what it takes.'
            })}
          </p>
          <Link to="/contact" className="footer-cta">
            {t('home.primary')}
            <Icon name="arrowUpRight" size={26} />
          </Link>
        </div>

        <div className="footer-cols">
          <nav className="footer-col" aria-label={t('footer.siteNav', { defaultValue: 'Site' })}>
            <h2 className="footer-col-title">{t('footer.siteNav', { defaultValue: 'Site' })}</h2>
            <ul>
              {SITE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-col-title">{t('contact.company')}</h2>
            <address className="footer-address">
              57 AV 02 MARS 1934
              <br />
              2034 EZZAHRA
              <br />
              {t('contact.country')}
            </address>
          </div>

          <div className="footer-col">
            <h2 className="footer-col-title">{t('contact.emailLabel')}</h2>
            <ul>
              <li>
                <a className="footer-link" href="mailto:contact@codentrix.io">
                  contact@codentrix.io
                </a>
              </li>
              <li>
                <a className="footer-link" href="tel:+21698340092">
                  +216 98 340 092
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the footer's overflow. Decorative. */}
      <div className="footer-wordmark" aria-hidden="true">
        Codentrix
      </div>

      <div className="container footer-base">
        <small className="faint">{t('footer.copy', { year: new Date().getFullYear() })}</small>
        <LanguageToggle />
      </div>
    </footer>
  )
}
