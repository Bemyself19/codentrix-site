import React from 'react'
import { useTranslation } from 'react-i18next'

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card card">
      <div className="feature-icon">{icon}</div>
      <h4>{title}</h4>
      <p className="muted">{description}</p>
    </div>
  )
}

function BenefitCard({ icon, title, points }) {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">{icon}</div>
      <h4>{title}</h4>
      <ul className="benefit-list">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Products() {
  const { t } = useTranslation()
  const features = t('products.telehealth.features', { returnObjects: true, defaultValue: [] })
  const providerBenefits = t('products.telehealth.benefits.providers', { returnObjects: true, defaultValue: [] })
  const patientBenefits = t('products.telehealth.benefits.patients', { returnObjects: true, defaultValue: [] })

  return (
    <>
      {/* Hero Section */}
      <section className="product-hero">
        <div className="container">
          <div className="product-hero-content">
            <div className="product-badge">{t('products.badge')}</div>
            <h1>{t('products.telehealth.title')}</h1>
            <p className="lead">{t('products.telehealth.subtitle')}</p>
            <div className="product-hero-ctas">
              <a href="/contact" className="btn primary">
                {t('products.telehealth.cta.primary')}
              </a>
              <a href="#features" className="btn outline">
                {t('products.telehealth.cta.secondary')}
              </a>
            </div>
            <p className="product-tagline muted">{t('products.telehealth.tagline')}</p>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="container product-section">
        <div className="problem-solution-grid">
          <div className="problem-box card">
            <h3>{t('products.telehealth.problem.title')}</h3>
            <p>{t('products.telehealth.problem.description')}</p>
          </div>
          <div className="solution-box card highlight">
            <h3>{t('products.telehealth.solution.title')}</h3>
            <p>{t('products.telehealth.solution.description')}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container product-section" id="features">
        <h2 className="section-title">{t('products.telehealth.featuresTitle')}</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">{t('products.telehealth.benefitsTitle')}</h2>
          <div className="benefits-grid">
            <BenefitCard
              icon="🏥"
              title={t('products.telehealth.benefits.providersTitle')}
              points={providerBenefits}
            />
            <BenefitCard
              icon="👤"
              title={t('products.telehealth.benefits.patientsTitle')}
              points={patientBenefits}
            />
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="container product-section">
        <div className="tech-showcase card">
          <h3>{t('products.telehealth.tech.title')}</h3>
          <p className="lead">{t('products.telehealth.tech.description')}</p>
          <div className="tech-stack">
            <div className="tech-category">
              <h4>{t('products.telehealth.tech.modern')}</h4>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">WebRTC</span>
                <span className="tech-tag">Cloud-native</span>
              </div>
            </div>
            <div className="tech-category">
              <h4>{t('products.telehealth.tech.secure')}</h4>
              <div className="tech-tags">
                <span className="tech-tag">End-to-end encryption</span>
                <span className="tech-tag">GDPR compliant</span>
                <span className="tech-tag">HIPAA-ready</span>
                <span className="tech-tag">Secure data storage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Codentrix Connection */}
      <section className="codentrix-connection">
        <div className="container">
          <div className="connection-card card">
            <h3>{t('products.telehealth.connection.title')}</h3>
            <p className="lead">{t('products.telehealth.connection.description')}</p>
            <div className="connection-points">
              <div className="connection-point">
                <span className="connection-icon">🔒</span>
                <span>{t('products.telehealth.connection.point1')}</span>
              </div>
              <div className="connection-point">
                <span className="connection-icon">⚖️</span>
                <span>{t('products.telehealth.connection.point2')}</span>
              </div>
              <div className="connection-point">
                <span className="connection-icon">🎯</span>
                <span>{t('products.telehealth.connection.point3')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="product-cta-section">
        <div className="container">
          <div className="product-cta-box">
            <h2>{t('products.telehealth.finalCta.title')}</h2>
            <p className="lead">{t('products.telehealth.finalCta.description')}</p>
            <a href="/contact" className="btn primary large">
              {t('products.telehealth.finalCta.button')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
