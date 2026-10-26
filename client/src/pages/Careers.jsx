import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import { stagger } from '../lib/motion'
import '../components/careers/careers.css'

/* Parallel to `careers.why` in the translation files. */
const REASON_ICONS = ['brain', 'pulse', 'globe', 'rocket']

export default function Careers() {
  const { t } = useTranslation()
  const reasons = t('careers.why', { returnObjects: true, defaultValue: [] })
  const reasonList = Array.isArray(reasons) ? reasons : []

  return (
    <div className="page">
      <section className="section-tight container">
        <SectionHeader
          eyebrow={t('nav.careers')}
          title={t('careers.title')}
          lead={t('careers.lead')}
          as="h1"
        />
      </section>

      <section className="section container" aria-labelledby="why-heading">
        <SectionHeader title={t('careers.whyTitle')} titleId="why-heading" />

        {/* Numbered rows rather than bullet points: each reason gets its own
            band and reveals an arrow on hover, so the list reads as content. */}
        <Reveal as="ol" className="reason-list" variants={stagger(0.09)}>
          {reasonList.map((reason, index) => (
            <RevealItem as="li" key={reason} className="reason-row">
              <span className="reason-index mono">{String(index + 1).padStart(2, '0')}</span>
              <span className="card-icon reason-icon">
                <Icon name={REASON_ICONS[index] ?? 'spark'} size={20} />
              </span>
              <p className="reason-text">{reason}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="section container">
        <Reveal className="careers-cta" variants={stagger(0.1)}>
          <RevealItem>
            <h2 className="heading-2">{t('careers.ctaLead')}</h2>
          </RevealItem>
          <RevealItem>
            <Button to="/apply" arrow>
              {t('careers.cta')}
            </Button>
          </RevealItem>
        </Reveal>
      </section>
    </div>
  )
}
