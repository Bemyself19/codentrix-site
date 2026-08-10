import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import Reveal from '../motion/Reveal'
import RevealItem from '../motion/RevealItem'
import { stagger } from '../../lib/motion'
import './leadership-band.css'

/** Closing band. Full-bleed and inverted to signal the end of the page. */
export default function LeadershipBand() {
  const { t } = useTranslation()

  return (
    <section className="leadership-band" aria-labelledby="leadership-heading">
      <span className="glow glow-violet leadership-glow" aria-hidden="true" />

      <div className="container relative">
        <Reveal className="leadership-inner" variants={stagger(0.1)}>
          <RevealItem>
            <h2 id="leadership-heading" className="heading-2">
              {t('home.teamTitle')}
            </h2>
          </RevealItem>
          <RevealItem as="p" className="lead leadership-lead">
            {t('home.teamLead')}
          </RevealItem>
          <RevealItem className="cluster leadership-ctas">
            <Button to="/about" variant="ghost">
              {t('nav.about')}
            </Button>
            <Button to="/careers" arrow>
              {t('nav.careers')}
            </Button>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  )
}
