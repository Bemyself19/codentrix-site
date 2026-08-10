import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/ui/SectionHeader'
import Icon from '../components/ui/Icon'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import LeaderCard from '../components/about/LeaderCard'
import { stagger } from '../lib/motion'
import '../components/about/about.css'

const LEADERS = [
  {
    id: 'nader',
    name: 'Nader Ben Ammar',
    role: 'Chief Executive Officer',
    image: '/ceo.jpg'
  },
  {
    id: 'fethi',
    name: 'Fethi Nouri',
    role: 'Chief Technology Officer',
    image: '/fethi.jpg'
  },
  {
    id: 'ahmed',
    name: 'Ahmed Dammak',
    role: 'Chief Strategy Officer',
    image: '/ahmed.jpg'
  }
]

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="page">
      <section className="section-tight container">
        <SectionHeader
          eyebrow={t('nav.about')}
          title={t('about.title')}
          as="h1"
          className="about-head"
        />

        <Reveal className="about-intro" variants={stagger(0.1)}>
          <RevealItem as="p" className="about-statement">
            {t('about.description')}
          </RevealItem>

          <RevealItem as="aside" className="about-expansion">
            <span className="eyebrow">
              <Icon name="spark" size={15} />
              {t('about.expansion.title')}
            </span>
            <p className="muted">{t('about.expansion.description')}</p>
          </RevealItem>
        </Reveal>
      </section>

      <section className="section container" aria-labelledby="leadership-heading">
        <SectionHeader
          title={t('about.leadershipTitle')}
          lead={t('about.leadershipLead')}
          titleId="leadership-heading"
        />

        <Reveal className="leader-grid" variants={stagger(0.1)}>
          {LEADERS.map((leader) => (
            <RevealItem key={leader.id}>
              <LeaderCard {...leader} />
            </RevealItem>
          ))}
        </Reveal>
      </section>
    </div>
  )
}
