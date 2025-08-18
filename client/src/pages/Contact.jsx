import React, {useState} from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function Contact(){
  const { t } = useTranslation()
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const send = async e => {
    e.preventDefault()
    setLoading(true)
    try{
      await axios.post('/api/contact', form)
      setStatus('sent')
    }catch(err){
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <section className="container contact">
      <h2>{t('contact.title')}</h2>
      <div className="contact-grid">
        <form onSubmit={send} className="contact-form">
          <label>{t('contact.form.name')}<input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} /></label>
          <label>{t('contact.form.email')}<input required type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} /></label>
          <label>{t('contact.form.message')}<textarea required value={form.message} onChange={e=>setForm({...form, message: e.target.value})} /></label>
          <button type="submit" disabled={loading} className="btn primary small">{loading ? 'Sending…' : t('contact.form.send')}</button>
          {status === 'sent' && <p className="notice">Thanks — your message was sent.</p>}
          {status === 'error' && <p className="error">There was an error sending your message.</p>}
        </form>

        <aside className="company-card card">
          <h3>{t('contact.company')}</h3>
          <p><strong>{t('contact.addressLabel')}</strong><br />14, RUE AVICENNE<br />2034 EZZAHRA<br /><strong>{t('contact.country')}</strong></p>
          <p><strong>{t('contact.emailLabel')}</strong><br /><a href="mailto:contact@codentrix.io">contact@codentrix.io</a></p>
          <p><strong>{t('contact.phoneLabel')}</strong><br />+216 98 340 092</p>

          <div className="map-wrap">
            {/* Google Maps embed using the address query; hl=fr requests French UI where available */}
            <iframe
              title="Codentrix location"
              src="https://www.google.com/maps?q=14+RUE+AVICENNE+2034+EZZAHRA&hl=fr&output=embed"
              style={{border:0,width:'100%',height:'220px'}}
              allowFullScreen={false}
              loading="lazy"
            />
            <small><a href="https://www.google.com/maps/search/?api=1&query=14+RUE+AVICENNE+2034+EZZAHRA" target="_blank" rel="noreferrer">Voir la carte en grand</a></small>
          </div>
        </aside>
      </div>
    </section>
  )
}
