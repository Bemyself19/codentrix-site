import React from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../motion/Reveal'
import RevealItem from '../motion/RevealItem'
import Counter from '../motion/Counter'
import { stagger } from '../../lib/motion'
import './metrics-band.css'

const METRICS = [
  { valueKey: 'home.metrics.projects', labelKey: 'home.metrics.projectsSub' },
  { valueKey: 'home.metrics.years', labelKey: 'home.metrics.yearsSub' },
  { valueKey: 'home.metrics.volume', labelKey: 'home.metrics.volumeSub' },
  { valueKey: 'home.metrics.uptime', labelKey: 'home.metrics.uptimeSub' }
]

/**
 * Quantitative proof. Rendered as a hairline-divided band rather than four
 * cards — the numbers carry the weight, so boxing them competes with them.
 * Amber is used here and nowhere else on the page.
 */
export default function MetricsBand() {
  const { t } = useTranslation()

  return (
    <section className="band metrics-band" aria-labelledby="metrics-heading">
      <div className="container section-tight">
        <Reveal variants={stagger(0.09)}>
          <RevealItem as="h2" id="metrics-heading" className="eyebrow metrics-heading">
            {t('home.metrics.title')}
          </RevealItem>

          <dl className="metrics-grid">
            {METRICS.map((metric) => (
              <RevealItem key={metric.valueKey} as="div" className="metric">
                <dt className="metric-value">
                  <Counter value={t(metric.valueKey)} />
                </dt>
                <dd className="metric-label">{t(metric.labelKey)}</dd>
              </RevealItem>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
