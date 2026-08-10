import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import SectionHeader from '../components/ui/SectionHeader'
import SurfaceCard from '../components/ui/SurfaceCard'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import SplitText from '../components/motion/SplitText'
import ScrollyFeatures from '../components/products/ScrollyFeatures'
import { stagger } from '../lib/motion'
import '../components/products/products.css'

/* Icons live in code, not in the translation files — the emoji that used to be
   stored alongside the copy are now this parallel list. */
const FEATURE_ICONS = ['brain', 'chat', 'pulse', 'file', 'spark', 'layers']

const CONNECTION_POINTS = [
  { icon: 'shield', key: 'point1' },
  { icon: 'automation', key: 'point2' },
  { icon: 'cloud', key: 'point3' }
]

const TECH = {
  modern: ['React', 'Node.js', 'WebRTC', 'Cloud-native'],
  secure: ['End-to-end encryption', 'GDPR compliant', 'HIPAA-ready', 'Secure data storage']
}

function BenefitColumn({ icon, title, points }) {
  return (
    <SurfaceCard as="article" className="benefit-card">
      <span className="card-icon">
        <Icon name={icon} size={22} />
      </span>
      <h3 className="heading-3 benefit-title">{title}</h3>
      <ul className="benefit-list">
        {points.map((point) => (
          <li key={point}>
            <Icon name="check" size={16} className="benefit-check" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  )
}

export default function Products() {
  const { t } = useTranslation()

  const asArray = (key) => {
    const value = t(key, { returnObjects: true, defaultValue: [] })
    return Array.isArray(value) ? value : []
  }

  const features = asArray('products.telehealth.features')
  const providerBenefits = asArray('products.telehealth.benefits.providers')
  const patientBenefits = asArray('products.telehealth.benefits.patients')

  return (
    <>
      {/* ── hero ─────────────────────────────────────────────── */}
      <section className="product-hero" aria-labelledby="product-heading">
        <div className="product-hero-atmosphere" aria-hidden="true">
          <span className="glow glow-cyan product-glow-1" />
          <span className="glow glow-violet product-glow-2" />
        </div>

        <div className="container relative">
          <Reveal className="product-hero-content" variants={stagger(0.1)}>
            <RevealItem as="span" className="product-badge">
              {t('products.badge')}
            </RevealItem>

            <h1 id="product-heading" className="display product-title">
              <SplitText text={t('products.telehealth.title')} as="span" />
            </h1>

            <RevealItem as="p" className="lead">
              {t('products.telehealth.subtitle')}
            </RevealItem>

            <RevealItem className="cluster product-hero-ctas">
              <Button to="/contact" arrow>
                {t('products.telehealth.cta.primary')}
              </Button>
              <Button href="#features" variant="ghost">
                {t('products.telehealth.cta.secondary')}
              </Button>
            </RevealItem>

            <RevealItem as="p" className="small faint product-tagline">
              {t('products.telehealth.tagline')}
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ── problem / solution ───────────────────────────────── */}
      <section className="section container">
        <Reveal className="problem-solution" variants={stagger(0.12)}>
          <RevealItem as="article" className="ps-card is-problem">
            <span className="eyebrow is-warning">
              <Icon name="alert" size={15} />
              {t('products.telehealth.problem.title')}
            </span>
            <p>{t('products.telehealth.problem.description')}</p>
          </RevealItem>

          <RevealItem as="article" className="ps-card is-solution">
            <span className="eyebrow">{t('products.telehealth.solution.title')}</span>
            <p>{t('products.telehealth.solution.description')}</p>
          </RevealItem>
        </Reveal>
      </section>

      {/* ── features (scrollytelling) ────────────────────────── */}
      <section className="section-tight" aria-labelledby="features-heading">
        <div className="container">
          <SectionHeader
            eyebrow={t('products.telehealth.cta.secondary')}
            title={t('products.telehealth.featuresTitle')}
            titleId="features-heading"
          />
        </div>
        <ScrollyFeatures id="features" features={features} icons={FEATURE_ICONS} />
      </section>

      {/* ── benefits ─────────────────────────────────────────── */}
      <section className="band section" aria-labelledby="benefits-heading">
        <div className="container">
          <SectionHeader
            title={t('products.telehealth.benefitsTitle')}
            titleId="benefits-heading"
          />

          <Reveal className="benefits-grid" variants={stagger(0.12)}>
            <RevealItem>
              <BenefitColumn
                icon="stethoscope"
                title={t('products.telehealth.benefits.providersTitle')}
                points={providerBenefits}
              />
            </RevealItem>
            <RevealItem>
              <BenefitColumn
                icon="users"
                title={t('products.telehealth.benefits.patientsTitle')}
                points={patientBenefits}
              />
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* ── technology ───────────────────────────────────────── */}
      <section className="section container">
        <Reveal className="tech-showcase" variants={stagger(0.1)}>
          <RevealItem className="tech-intro">
            <h2 className="heading-2">{t('products.telehealth.tech.title')}</h2>
            <p className="lead">{t('products.telehealth.tech.description')}</p>
          </RevealItem>

          <RevealItem className="tech-columns">
            <div className="tech-category">
              <h3 className="tech-category-title">{t('products.telehealth.tech.modern')}</h3>
              <ul className="cluster tech-tags">
                {TECH.modern.map((tag) => (
                  <li key={tag} className="tech-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">{t('products.telehealth.tech.secure')}</h3>
              <ul className="cluster tech-tags">
                {TECH.secure.map((tag) => (
                  <li key={tag} className="tech-tag is-secure">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </Reveal>
      </section>

      {/* ── the difference ───────────────────────────────────── */}
      <section className="band section" aria-labelledby="difference-heading">
        <div className="container">
          <SectionHeader
            title={t('products.telehealth.connection.title')}
            lead={t('products.telehealth.connection.description')}
            titleId="difference-heading"
          />

          <Reveal className="connection-points" variants={stagger(0.1)}>
            {CONNECTION_POINTS.map((point) => (
              <RevealItem key={point.key} className="connection-point">
                <span className="card-icon">
                  <Icon name={point.icon} size={20} />
                </span>
                <p>{t(`products.telehealth.connection.${point.key}`)}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── final CTA ────────────────────────────────────────── */}
      <section className="section container">
        <Reveal className="product-cta" variants={stagger(0.1)}>
          <RevealItem>
            <h2 className="heading-2">{t('products.telehealth.finalCta.title')}</h2>
          </RevealItem>
          <RevealItem as="p" className="lead">
            {t('products.telehealth.finalCta.description')}
          </RevealItem>
          <RevealItem>
            <Button to="/contact" arrow>
              {t('products.telehealth.finalCta.button')}
            </Button>
          </RevealItem>
        </Reveal>
      </section>
    </>
  )
}
