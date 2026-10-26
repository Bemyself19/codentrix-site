import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import SplitText from '../components/motion/SplitText'
import ScrollyFeatures from '../components/products/ScrollyFeatures'
import { stagger } from '../lib/motion'
import '../components/products/products.css'

const ICONS = {
  medformPro: ['file', 'layers', 'scales', 'lock', 'pulse', 'globe', 'users'],
  medformMarketing: ['chat', 'target', 'brain', 'pulse', 'file', 'globe']
}

/** Generic product page for the MedForm products (copy lives in i18n under products.<productKey>). */
export default function ProductDetail({ productKey }) {
  const { t } = useTranslation()
  const features = t(`products.${productKey}.features`, { returnObjects: true, defaultValue: [] })
  const list = Array.isArray(features) ? features : []

  return (
    <>
      <section className="product-hero" aria-labelledby="product-heading">
        <div className="product-hero-atmosphere" aria-hidden="true">
          <span className="glow glow-cyan product-glow-1" />
          <span className="glow glow-violet product-glow-2" />
        </div>
        <div className="container relative">
          <Reveal className="product-hero-content" variants={stagger(0.1)}>
            <RevealItem as="span" className="product-badge">
              {t(`products.${productKey}.title`).toUpperCase()}
            </RevealItem>
            <h1 id="product-heading" className="display product-title">
              <SplitText text={t(`products.${productKey}.title`)} as="span" />
            </h1>
            <RevealItem as="p" className="lead">
              {t(`products.${productKey}.subtitle`)}
            </RevealItem>
            <RevealItem className="cluster product-hero-ctas">
              <Button to="/contact" arrow>{t('products.detail.ctaPrimary')}</Button>
              <Button href="#features" variant="ghost">{t('products.detail.ctaSecondary')}</Button>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="features-heading">
        <div className="container">
          <SectionHeader
            eyebrow={t('products.detail.ctaSecondary')}
            title={t('products.detail.featuresTitle')}
            titleId="features-heading"
          />
        </div>
        <ScrollyFeatures id="features" features={list} icons={ICONS[productKey]} />
      </section>

      <section className="section container">
        <Reveal className="product-cta" variants={stagger(0.1)}>
          <RevealItem><h2 className="heading-2">{t('products.detail.finalTitle')}</h2></RevealItem>
          <RevealItem as="p" className="lead">{t('products.detail.finalDescription')}</RevealItem>
          <RevealItem>
            <Button to="/contact" arrow>{t('products.detail.finalButton')}</Button>
          </RevealItem>
        </Reveal>
      </section>
    </>
  )
}
