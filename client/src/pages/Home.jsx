import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function ServiceCard({title, children}){
  return (
    <article className="card service-card">
      <h4>{title}</h4>
      <div>{children}</div>
    </article>
  )
}

function CaseCard({title, summary}){
  return (
    <div className="card case-card">
      <h4>{title}</h4>
      <p className="muted">{summary}</p>
      <Link to="/services" className="btn small outline">Learn more</Link>
    </div>
  )
}

function StrengthCard({icon, title, description}){
  return (
    <div className="card strength-card">
      <div className="strength-icon">{icon}</div>
      <h4>{title}</h4>
      <p className="muted">{description}</p>
    </div>
  )
}

function MetricCard({number, label, sublabel}){
  return (
    <div className="metric-card">
      <div className="metric-number">{number}</div>
      <div className="metric-label">{label}</div>
      {sublabel && <div className="metric-sublabel">{sublabel}</div>}
    </div>
  )
}

export default function Home(){
  const { t } = useTranslation()
  return (
    <>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1>{t('home.title')}</h1>
          <p className="lead">{t('home.subtitle')}</p>

          <div className="hero-ctas">
            <a className="btn primary" href="/contact">{t('home.primary')}</a>
            <a className="btn outline" href="/services">{t('home.secondary')}</a>
          </div>

          <div className="proof-strip" aria-hidden>
            <ul>
              <li>{t('home.proof.0')}</li>
              <li>{t('home.proof.1')}</li>
              <li>{t('home.proof.2')}</li>
            </ul>
          </div>
        </div>

        <div className="hero-visual" aria-hidden>
          <div className="feature-grid">
            <ServiceCard title={t('services.bank.title')}>
              <p>{t('services.bank.lead')}</p>
            </ServiceCard>
            {/* removed telecom service card - focusing on Banking & Strategic Advisory */}
            <ServiceCard title={t('services.advisory.title')}>
              <p>{t('services.advisory.lead')}</p>
            </ServiceCard>
          </div>
        </div>
      </div>
    </section>

    {/* Professional Metrics Section */}
    <section className="metrics-section">
      <div className="container">
        <h2 className="section-title">{t('home.metrics.title')}</h2>
        <div className="metrics-grid">
          <MetricCard number="50+" label={t('home.metrics.projects')} sublabel={t('home.metrics.projectsSub')} />
          <MetricCard number="30+" label={t('home.metrics.years')} sublabel={t('home.metrics.yearsSub')} />
          <MetricCard number="€500M+" label={t('home.metrics.volume')} sublabel={t('home.metrics.volumeSub')} />
          <MetricCard number="99.9%" label={t('home.metrics.uptime')} sublabel={t('home.metrics.uptimeSub')} />
        </div>
      </div>
    </section>

    {/* Core Strengths Section */}
    <section className="strengths-section">
      <div className="container">
        <h2 className="section-title">{t('home.strengths.title')}</h2>
        <div className="strengths-grid">
          <StrengthCard 
            icon="🏛️" 
            title={t('home.strengths.banking.title')} 
            description={t('home.strengths.banking.desc')} 
          />
          <StrengthCard 
            icon="⚡" 
            title={t('home.strengths.modernization.title')} 
            description={t('home.strengths.modernization.desc')} 
          />
          <StrengthCard 
            icon="🔒" 
            title={t('home.strengths.compliance.title')} 
            description={t('home.strengths.compliance.desc')} 
          />
          <StrengthCard 
            icon="🎯" 
            title={t('home.strengths.strategy.title')} 
            description={t('home.strengths.strategy.desc')} 
          />
        </div>
      </div>
    </section>

    {/* Case Studies and Leadership */}
    <section className="container">
      <h2 className="section-title">{t('home.cases.title')}</h2>
      <div className="case-grid">
        <CaseCard title={t('cases.0.title')} summary={t('cases.0.summary')} />
        <CaseCard title={t('cases.1.title')} summary={t('cases.1.summary')} />
      </div>

      <div className="leadership-teaser card" style={{marginTop:'2rem'}}>
        <h3>{t('home.teamTitle')}</h3>
        <p className="muted">{t('home.teamLead')}</p>
        <div style={{marginTop:'0.75rem'}}>
          <Link to="/about" className="btn outline">{t('nav.about')}</Link>
          <Link to="/careers" className="btn primary" style={{marginLeft:'0.6rem'}}>{t('nav.careers')}</Link>
        </div>
      </div>
    </section>
    </>
  )
}
