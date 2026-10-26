import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../motion/Reveal'
import RevealItem from '../motion/RevealItem'
import { revealClip, stagger } from '../../lib/motion'
import './case-studies.css'

const CASES = [
  { id: '0', icon: 'pulse', accent: 'cyan' },
  { id: '1', icon: 'layers', accent: 'violet' }
]

/**
 * Two-up, deliberately asymmetric: the second card is offset downward so the
 * pair reads as an editorial spread rather than a symmetric row.
 */
export default function CaseStudies() {
  const { t } = useTranslation()

  return (
    <section className="section container" aria-labelledby="cases-heading">
      <SectionHeader
        eyebrow={t('home.cases.eyebrow', { defaultValue: 'Case studies' })}
        title={t('home.cases.title')}
        as="h2"
        titleId="cases-heading"
      />

      <Reveal className="case-grid" variants={stagger(0.14)}>
        {CASES.map((item) => (
          <RevealItem key={item.id} className="case-cell" variants={revealClip}>
            <article className={`case-card is-${item.accent}`}>
              <div className="case-figure" aria-hidden="true">
                <Icon name={item.icon} size={40} strokeWidth={1.1} />
              </div>
              <div className="case-body">
                <h3 className="heading-3">{t(`cases.${item.id}.title`)}</h3>
                <p className="muted small">{t(`cases.${item.id}.summary`)}</p>
                <Link to="/products" className="case-link">
                  {t('home.cases.more', { defaultValue: 'Learn more' })}
                  <Icon name="arrowUpRight" size={18} />
                </Link>
              </div>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}
