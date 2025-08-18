import React from 'react'
import { useTranslation } from 'react-i18next'

function Service({title, children}){
  return (
    <article className="service-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  )
}

export default function Services(){
  const { t, i18n } = useTranslation()
  const bankPoints = t('services.bank.points', { returnObjects: true })
  const telecomPoints = t('services.telecom.points', { returnObjects: true })
  return (
    <section className="container">
      <h2>{t('services.title')}</h2>
      <Service title={t('services.bank.title')}>
        <div>
          <p>{t('services.bank.lead')}</p>
          <ul>
            {bankPoints.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <p className="muted">{t('services.bank.techProfile')}</p>
        </div>
  </Service>

  <Service title={t('services.telecom.title')}>
        <ul>
          {telecomPoints.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
  </Service>
    </section>
  )
}
