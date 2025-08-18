import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Careers(){
  const { t } = useTranslation()
  return (
    <section className="container careers">
      <h2>{t('careers.title')}</h2>
      <p className="lead">{t('careers.lead')}</p>

      <div className="why-us card">
        <h3>{t('careers.whyTitle')}</h3>
        <ul>
          <li>{t('careers.why.0')}</li>
          <li>{t('careers.why.1')}</li>
          <li>{t('careers.why.2')}</li>
          <li>{t('careers.why.3')}</li>
        </ul>
      </div>

      <div className="careers-cta">
        <p>{t('careers.ctaLead')}</p>
        <Link to="/apply" className="btn primary">{t('careers.cta')}</Link>
      </div>
    </section>
  )
}
