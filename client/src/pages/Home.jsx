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

export default function Home(){
  const { t } = useTranslation()
  return (
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
            <ServiceCard title={t('services.telecom.title')}>
              <p>{t('services.telecom.lead')}</p>
            </ServiceCard>
            <ServiceCard title={t('services.advisory.title')}>
              <p>{t('services.advisory.lead')}</p>
            </ServiceCard>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="case-grid">
          <CaseCard title={t('cases.0.title')} summary={t('cases.0.summary')} />
          <CaseCard title={t('cases.1.title')} summary={t('cases.1.summary')} />
        </div>

        <div className="leadership-teaser card" style={{marginTop:'1.25rem'}}>
          <h3>{t('home.teamTitle')}</h3>
          <p className="muted">{t('home.teamLead')}</p>
          <div style={{marginTop:'0.75rem'}}>
            <Link to="/about" className="btn outline">{t('nav.about')}</Link>
            <Link to="/careers" className="btn primary" style={{marginLeft:'0.6rem'}}>{t('nav.careers')}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
