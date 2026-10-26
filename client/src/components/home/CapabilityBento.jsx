import React from 'react'
import { useTranslation } from 'react-i18next'
import SurfaceCard from '../ui/SurfaceCard'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../motion/Reveal'
import RevealItem from '../motion/RevealItem'
import { stagger } from '../../lib/motion'
import './capability-bento.css'

/*
 * Deliberately unequal: two features get twice the area of the other two, so
 * the grid states a priority instead of presenting four equivalent boxes.
 */
const CAPABILITIES = [
  { key: 'studies', icon: 'pulse', size: 'lg' },
  { key: 'advisory', icon: 'scales', size: 'sm' },
  { key: 'training', icon: 'users', size: 'sm' },
  { key: 'automation', icon: 'automation', size: 'lg' }
]

export default function CapabilityBento() {
  const { t } = useTranslation()

  return (
    <section className="section container" aria-labelledby="capabilities-heading">
      <SectionHeader
        eyebrow={t('nav.services')}
        title={t('home.strengths.title')}
        as="h2"
        titleId="capabilities-heading"
      />

      <Reveal className="bento" variants={stagger(0.1)}>
        {CAPABILITIES.map((capability) => (
          <RevealItem key={capability.key} className={`bento-cell is-${capability.size}`}>
            <SurfaceCard as="article" className="bento-card">
              <span className="card-icon">
                <Icon name={capability.icon} size={22} />
              </span>
              <h3 className="heading-3 bento-title">
                {t(`services.${capability.key}.title`)}
              </h3>
              <p className="muted bento-copy">{t(`services.${capability.key}.lead`)}</p>
            </SurfaceCard>
          </RevealItem>
        ))}
      </Reveal>

      <Reveal className="bento-foot">
        <Button to="/services" variant="quiet" arrow>
          {t('home.secondary')}
        </Button>
      </Reveal>
    </section>
  )
}
