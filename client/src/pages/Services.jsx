import React, { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/ui/Icon'
import SectionHeader from '../components/ui/SectionHeader'
import SurfaceCard from '../components/ui/SurfaceCard'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import { collapse, stagger } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import '../components/services/services.css'

/*
 * Capability metadata (icon + tech chips) lives here rather than in i18n —
 * it is identical in every language, so duplicating it into the translation
 * files would just be two copies to keep in sync.
 */
const SERVICES = [
  {
    key: 'banking',
    i18nKey: 'services.bank',
    icon: 'automation',
    capabilities: [
      { key: 'core', icon: 'automation', tech: ['RPA', 'Python', 'UiPath', 'BluePrism', 'PowerAutomate'] },
      { key: 'payments', icon: 'brain', tech: ['TensorFlow', 'Scikit-learn', 'Predictive Models', 'Data Mining'] },
      { key: 'reporting', icon: 'chat', tech: ['Dialogflow', 'OpenAI API', 'BERT', 'NLP', 'Conversational AI'] },
      { key: 'migration', icon: 'cloud', tech: ['AWS SageMaker', 'Azure AI', 'Docker', 'Kubernetes', 'Cloud Native'] }
    ],
    hasDetail: true
  },
  {
    key: 'advisory',
    i18nKey: 'services.advisory',
    icon: 'target',
    capabilities: [
      { key: 'strategy', icon: 'target', tech: ['Digital transformation', 'Technology roadmaps', 'Business strategy'] },
      { key: 'leadership', icon: 'users', tech: ['Project management', 'Team leadership', 'Stakeholder management'] },
      { key: 'compliance', icon: 'scales', tech: ['AI Governance', 'Ethics Boards', 'GDPR/HIPAA', 'Audit Trails'] },
      { key: 'delivery', icon: 'rocket', tech: ['Agile delivery', 'Change management', 'Operational handover'] }
    ],
    hasDetail: false
  }
]

function CapabilityCard({ icon, title, description, tech }) {
  return (
    <SurfaceCard as="article" className="capability-card">
      <span className="card-icon">
        <Icon name={icon} size={20} />
      </span>
      <h4 className="capability-title">{title}</h4>
      <p className="small muted">{description}</p>
      <ul className="cluster tech-tags">
        {tech.map((item) => (
          <li key={item} className="tech-tag">
            {item}
          </li>
        ))}
      </ul>
    </SurfaceCard>
  )
}

function ServiceAccordion({ service, isOpen, onToggle }) {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const panelId = useId()
  const buttonId = useId()

  const detailPoints = service.hasDetail
    ? t(`${service.i18nKey}.points`, { returnObjects: true, defaultValue: [] })
    : []

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
            <span className="accordion-name">{t(`${service.i18nKey}.title`)}</span>
            <span className="accordion-lead small muted">{t(`${service.i18nKey}.lead`)}</span>
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
              <div className="capabilities-grid">
                {service.capabilities.map((capability) => (
                  <CapabilityCard
                    key={capability.key}
                    icon={capability.icon}
                    title={t(`${service.i18nKey}.capabilities.${capability.key}.title`)}
                    description={t(`${service.i18nKey}.capabilities.${capability.key}.desc`)}
                    tech={capability.tech}
                  />
                ))}
              </div>

              {Array.isArray(detailPoints) && detailPoints.length > 0 && (
                <div className="service-detail">
                  <h4 className="detail-title">{t(`${service.i18nKey}.detailedTitle`)}</h4>
                  <ul className="detail-list">
                    {detailPoints.map((point) => (
                      <li key={point}>
                        <Icon name="check" size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="small faint tech-profile">{t(`${service.i18nKey}.techProfile`)}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const [openKey, setOpenKey] = useState('banking')

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
    </div>
  )
}
