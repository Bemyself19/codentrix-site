import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../components/ui/Icon'
import SurfaceCard from '../components/ui/SurfaceCard'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import SplitText from '../components/motion/SplitText'
import { stagger } from '../lib/motion'
import '../components/products/products.css'

const PRODUCTS = [
  { key: 'sehatynet', to: '/products/sehatynet', icon: 'stethoscope' },
  { key: 'medformPro', to: '/products/medform-pro', icon: 'file' },
  { key: 'medformMarketing', to: '/products/medform-marketing', icon: 'chat' }
]

export default function Products() {
  const { t } = useTranslation()

  return (
    <>
      <section className="product-hero" aria-labelledby="products-heading">
        <div className="product-hero-atmosphere" aria-hidden="true">
          <span className="glow glow-cyan product-glow-1" />
          <span className="glow glow-violet product-glow-2" />
        </div>
        <div className="container relative">
          <Reveal className="product-hero-content" variants={stagger(0.1)}>
            <h1 id="products-heading" className="display product-title">
              <SplitText text={t('products.overview.title')} as="span" />
            </h1>
            <RevealItem as="p" className="lead">{t('products.overview.lead')}</RevealItem>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal className="product-grid" variants={stagger(0.12)}>
          {PRODUCTS.map(({ key, to, icon }) => (
            <RevealItem key={key}>
              <SurfaceCard as={Link} to={to} className="product-card">
                <span className="card-icon"><Icon name={icon} size={22} /></span>
                <h2 className="heading-3">{t(`products.overview.cards.${key}.name`)}</h2>
                <p className="eyebrow">{t(`products.overview.cards.${key}.kind`)}</p>
                <p className="muted">{t(`products.overview.cards.${key}.desc`)}</p>
                <span className="case-link">
                  {t('products.overview.more')}
                  <Icon name="arrowUpRight" size={18} />
                </span>
              </SurfaceCard>
            </RevealItem>
          ))}
        </Reveal>
      </section>
    </>
  )
}
