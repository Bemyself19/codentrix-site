import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import SplitText from '../motion/SplitText'
import AnnouncementPill from './AnnouncementPill'
import { fadeUp, stagger, still } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './hero.css'

const PILLARS = [
  { icon: 'automation', titleKey: 'services.bank.title', leadKey: 'services.bank.lead' },
  { icon: 'stethoscope', titleKey: 'home.telehealth.title', leadKey: 'home.telehealth.lead' },
  { icon: 'target', titleKey: 'services.advisory.title', leadKey: 'services.advisory.lead' }
]

export default function Hero() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? still : fadeUp

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="glow glow-cyan hero-glow-1" />
        <span className="glow glow-violet hero-glow-2" />
        <span className="hero-grid-lines" />
      </div>

      <div className="container hero-inner">
        <motion.div
          className="hero-content"
          variants={prefersReduced ? still : stagger(0.1, 0.05)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={variants}>
            <AnnouncementPill />
          </motion.div>

          <motion.p className="eyebrow" variants={variants}>
            Codentrix SARL
          </motion.p>

          <h1 id="hero-heading" className="display hero-title">
            <SplitText text={t('home.title')} as="span" />
          </h1>

          <motion.p className="lead hero-lead" variants={variants}>
            {t('home.subtitle')}
          </motion.p>

          <motion.div className="cluster hero-ctas" variants={variants}>
            <Button to="/contact" arrow>
              {t('home.primary')}
            </Button>
            <Button to="/services" variant="ghost">
              {t('home.secondary')}
            </Button>
          </motion.div>
        </motion.div>

        {/*
          Three stacked pillars rather than a uniform card grid: each one is
          offset from the next so the column reads as a layered stack, not a
          list. Decorative depth only — the same content lives on /services.
        */}
        <motion.ul
          className="hero-pillars"
          variants={prefersReduced ? still : stagger(0.12, 0.35)}
          initial="hidden"
          animate="visible"
        >
          {PILLARS.map((pillar) => (
            <motion.li key={pillar.titleKey} className="hero-pillar" variants={variants}>
              <span className="card-icon">
                <Icon name={pillar.icon} size={20} />
              </span>
              <div>
                <h2 className="hero-pillar-title">{t(pillar.titleKey)}</h2>
                <p className="small muted">{t(pillar.leadKey)}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
