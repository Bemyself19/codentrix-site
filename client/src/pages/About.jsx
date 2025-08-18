import React from 'react'
import { useTranslation } from 'react-i18next'

export default function About(){
  const { t, i18n } = useTranslation()

  return (
    <section className="container">
      <h2>{t('about.title')}</h2>
      <p>{t('about.description')}</p>

      <h3>{t('about.leadershipTitle')}</h3>
      <p>{t('about.leadershipLead')}</p>

      <div className="team-grid">
        {/* Small reusable flip card that toggles on click or Enter/Space */}
        {(() => {
          function FlipCard({image, name, title, lead, back}){
            const [flipped, setFlipped] = React.useState(false)
            const toggle = (e) => { e && e.preventDefault(); setFlipped(s => !s) }
            return (
              <div className={`flip-card ${flipped ? 'is-flipped' : ''}`} tabIndex={0} role="button" aria-pressed={flipped} onClick={toggle} onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') toggle(e)}}>
                <div className={`flip-inner`}>
                  <div className="flip-front leader-card">
                    <img src={image} alt={name} className="leader-photo" />
                    <div className="leader-info">
                      <h4>{name} — {title}</h4>
                      <p className="lead">{t(`about.leaders.${name.split(' ')[0].toLowerCase()}.lead`, { lng: i18n.language, defaultValue: lead })}</p>
                    </div>
                  </div>
                  <div className="flip-back card">
                    <h4>{name} — {title.split(',')[0]}</h4>
                    <p>{t(`about.leaders.${name.split(' ')[0].toLowerCase()}.back`, { lng: i18n.language, defaultValue: back })}</p>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <>
              <FlipCard
                image="/ceo.jpg"
                name="Nader Ben Ammar"
                title="Chief Executive Officer (CEO)"
                lead="CEO with 20+ years leading telecom and technology operations across MENA."
                back="Seasoned executive with a track record in regional leadership (Ericsson, Huawei, Siemens). Focused on strategy, P&L responsibility and high-performing teams."
              />

              <FlipCard
                image="/fethi.jpg"
                name="Fethi Nouri"
                title="Chief Technology Officer (CTO)"
                lead="CTO with 30+ years in core banking modernization, payments and compliance."
                back="Experienced in large-scale core migrations, payment systems and IAS/IFRS reporting—trusted to deliver compliant, resilient transformations."
              />
            </>
          )
        })()}
      </div>

      {/* Centered CSO card below the main leadership pair */}
      <div className="team-center">
        {(() => {
          function FlipCard({image, name, title, lead, back}){
            const [flipped, setFlipped] = React.useState(false)
            const toggle = (e) => { e && e.preventDefault(); setFlipped(s => !s) }
            return (
              <div className={`flip-card ${flipped ? 'is-flipped' : ''}`} tabIndex={0} role="button" aria-pressed={flipped} onClick={toggle} onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') toggle(e)}}>
                <div className={`flip-inner`}>
                  <div className="flip-front leader-card">
                    <img src={image} alt={name} className="leader-photo" />
                    <div className="leader-info">
                      <h4>{name} — {title}</h4>
                        <p className="lead">{t(`about.leaders.${name.split(' ')[0].toLowerCase()}.lead`, { lng: i18n.language, defaultValue: lead })}</p>
                    </div>
                  </div>
                  <div className="flip-back card">
                    <h4>{name} — {title.split(',')[0]}</h4>
                      <p>{t(`about.leaders.${name.split(' ')[0].toLowerCase()}.back`, { lng: i18n.language, defaultValue: back })}</p>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <FlipCard
              image="/ahmed.jpg"
              name="Ahmed Dammak"
              title="Chief Strategy Officer (CSO)"
              lead="CSO driving growth strategy, partnerships and product-market fit."
              back="Seasoned strategist with experience in business development, strategic partnerships and product strategy across telecom and banking sectors."
            />
          )
        })()}
      </div>
    </section>
  )
}
