import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Service({title, children}){
  return (
    <article className="service-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  )
}

function AccordionService({ title, lead, children, isOpen, onToggle }) {
  return (
    <article className="accordion-service">
      <button 
        className={`accordion-header ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="accordion-title">
          <h3>{title}</h3>
          <p className="accordion-lead">{lead}</p>
        </div>
        <div className="accordion-icon">
          {isOpen ? '−' : '+'}
        </div>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="accordion-inner">
          {children}
        </div>
      </div>
    </article>
  )
}

function CapabilityCard({ icon, title, description, technologies }) {
  return (
    <div className="capability-card">
      <div className="capability-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{description}</p>
      {technologies && (
        <div className="tech-tags">
          {technologies.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Services(){
  const { t } = useTranslation()
  const [openService, setOpenService] = useState('banking') // Default to banking open
  
  const bankPoints = t('services.bank.points', { returnObjects: true })
  const bankCapabilities = t('services.bank.capabilities', { returnObjects: true, defaultValue: [] })
  const advisoryCapabilities = t('services.advisory.capabilities', { returnObjects: true, defaultValue: [] })

  const toggleService = (serviceKey) => {
    setOpenService(openService === serviceKey ? null : serviceKey)
  }

  return (
    <section className="container services-page">
      <h2 className="section-title">{t('services.title')}</h2>
      <div className="services-intro">
        <p className="lead">{t('services.intro')}</p>
      </div>

      <div className="services-accordion">
        <AccordionService
          title={t('services.bank.title')}
          lead={t('services.bank.lead')}
          isOpen={openService === 'banking'}
          onToggle={() => toggleService('banking')}
        >
          <div className="service-details">
            <div className="capabilities-grid">
              <CapabilityCard
                icon="🏦"
                title={t('services.bank.capabilities.core.title')}
                description={t('services.bank.capabilities.core.desc')}
                technologies={['COBOL', 'Matrix', 'Seneca', 'IASIRA', 'NSP/TREND']}
              />
              <CapabilityCard
                icon="💳"
                title={t('services.bank.capabilities.payments.title')}
                description={t('services.bank.capabilities.payments.desc')}
                technologies={['SEPA', 'SDD/SCT', 'SWIFT', 'Check-truncation']}
              />
              <CapabilityCard
                icon="📊"
                title={t('services.bank.capabilities.reporting.title')}
                description={t('services.bank.capabilities.reporting.desc')}
                technologies={['IAS/IFRS', 'IASIRA', 'Regulatory reporting']}
              />
              <CapabilityCard
                icon="🔄"
                title={t('services.bank.capabilities.migration.title')}
                description={t('services.bank.capabilities.migration.desc')}
                technologies={['DB2', 'VSAM', 'IMS', 'Modern stacks']}
              />
            </div>
            
            <div className="detailed-points">
              <h4>{t('services.bank.detailedTitle')}</h4>
              <ul className="detailed-list">
                {bankPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            
            <div className="tech-profile">
              <h4>{t('services.bank.techTitle')}</h4>
              <p className="muted">{t('services.bank.techProfile')}</p>
            </div>
          </div>
        </AccordionService>

        <AccordionService
          title={t('services.advisory.title')}
          lead={t('services.advisory.lead')}
          isOpen={openService === 'advisory'}
          onToggle={() => toggleService('advisory')}
        >
          <div className="service-details">
            <div className="capabilities-grid">
              <CapabilityCard
                icon="🎯"
                title={t('services.advisory.capabilities.strategy.title')}
                description={t('services.advisory.capabilities.strategy.desc')}
                technologies={['Digital transformation', 'Technology roadmaps', 'Business strategy']}
              />
              <CapabilityCard
                icon="👥"
                title={t('services.advisory.capabilities.leadership.title')}
                description={t('services.advisory.capabilities.leadership.desc')}
                technologies={['Project management', 'Team leadership', 'Stakeholder management']}
              />
              <CapabilityCard
                icon="⚖️"
                title={t('services.advisory.capabilities.compliance.title')}
                description={t('services.advisory.capabilities.compliance.desc')}
                technologies={['Risk management', 'Audit support', 'Regulatory alignment']}
              />
              <CapabilityCard
                icon="🚀"
                title={t('services.advisory.capabilities.delivery.title')}
                description={t('services.advisory.capabilities.delivery.desc')}
                technologies={['Agile delivery', 'Change management', 'Operational handover']}
              />
            </div>
          </div>
        </AccordionService>
      </div>
    </section>
  )
}
