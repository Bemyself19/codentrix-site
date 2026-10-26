import React, { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import { collapse, stagger } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import '../components/services/services.css'

/* Icons live here, copy lives in i18n under services.<key>. */
const SERVICES = [
  { key: 'studies', icon: 'pulse' },
  { key: 'advisory', icon: 'scales' },
  { key: 'training', icon: 'users' },
  { key: 'automation', icon: 'automation' }
]

function ServiceAccordion({ service, isOpen, onToggle }) {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const panelId = useId()
  const buttonId = useId()
  const base = `services.${service.key}`
  const points = t(`${base}.points`, { returnObjects: true, defaultValue: [] })

  return (
    <article className={`accordion ${isOpen ? 'is-open' : ''}`}>
      <h3 className="accordion-heading">
        <button
          type="button"
          id={buttonId}
          className="accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="card-icon accordion-icon">
            <Icon name={service.icon} size={20} />
          </span>
          <span className="accordion-title">
            <span className="accordion-name">{t(`${base}.title`)}</span>
            <span className="accordion-lead small muted">{t(`${base}.lead`)}</span>
          </span>
          <span className="accordion-marker" aria-hidden="true">
            <Icon name={isOpen ? 'minus' : 'plus'} size={20} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="accordion-panel"
            variants={collapse}
            initial={prefersReduced ? false : 'hidden'}
            animate="visible"
            exit={prefersReduced ? undefined : 'exit'}
          >
            <div className="accordion-panel-inner">
              <div className="service-detail">
                <h4 className="detail-title">{t('services.includesTitle')}</h4>
                <ul className="detail-list">
                  {(Array.isArray(points) ? points : []).map((point) => (
                    <li key={point}>
                      <Icon name="check" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const [openKey, setOpenKey] = useState('studies')

  return (
    <div className="page">
      <section className="section-tight container">
        <SectionHeader
          eyebrow={t('nav.services')}
          title={t('services.title')}
          lead={t('services.intro')}
          as="h1"
        />

        <Reveal className="accordion-list" variants={stagger(0.1)}>
          {SERVICES.map((service) => (
            <RevealItem key={service.key}>
              <ServiceAccordion
                service={service}
                isOpen={openKey === service.key}
                onToggle={() => setOpenKey((current) => (current === service.key ? null : service.key))}
              />
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="section container">
        <Reveal className="services-band" variants={stagger(0.1)}>
          <RevealItem>
            <h2 className="heading-2">{t('services.band.title')}</h2>
          </RevealItem>
          <RevealItem as="p" className="lead">
            {t('services.band.lead')}
          </RevealItem>
          <RevealItem>
            <Button to="/products" arrow>
              {t('services.band.button')}
            </Button>
          </RevealItem>
        </Reveal>
      </section>
    </div>
  )
}
