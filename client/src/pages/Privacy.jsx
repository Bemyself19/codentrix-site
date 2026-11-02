import React from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import '../components/contact/contact.css'
import './privacy.css'

const SECTIONS = [
  { key: 'intro', items: [] },
  { key: 'siteData', items: ['siteData.site', 'siteData.forms', 'siteData.retention'] },
  { key: 'products', items: ['products.sehatynet', 'products.medform'] },
  { key: 'legal', items: ['legal.tunisia', 'legal.eu', 'legal.rights'] },
  { key: 'sharing', items: ['sharing.hosting', 'sharing.noSelling'] },
  { key: 'contact', items: [] }
]

export default function Privacy() {
  const { t } = useTranslation()
  return (
    <div className="privacy-page">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t('privacy.eyebrow')}</p>
          <h1 className="privacy-title">{t('privacy.title')}</h1>
          <p className="privacy-updated">{t('privacy.updated')}</p>
        </Reveal>

        {SECTIONS.map((section) => (
          <Reveal key={section.key}>
            <RevealItem>
              <section className="privacy-section">
                <h2>{t(`privacy.${section.key}.heading`)}</h2>
                {section.items.map((item) => (
                  <p key={item}>{t(`privacy.${item}`)}</p>
                ))}
                {section.key === 'intro' && (
                  <p>{t('privacy.intro.body')}</p>
                )}
                {section.key === 'contact' && (
                  <ul className="privacy-contact">
                    <li>
                      <a href="mailto:contact@codentrix.io">contact@codentrix.io</a>
                    </li>
                    <li>
                      Codentrix SARL — 57 AV 02 Mars 1934, 2034 Ezzahra, Tunisie
                    </li>
                  </ul>
                )}
              </section>
            </RevealItem>
          </Reveal>
        ))}
      </div>
    </div>
  )
}