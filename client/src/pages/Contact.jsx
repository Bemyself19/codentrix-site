import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import Field from '../components/forms/Field'
import FormStatus from '../components/forms/FormStatus'
import { postJson } from '../lib/api'
import { stagger } from '../lib/motion'
import '../components/forms/forms.css'
import '../components/contact/contact.css'

const EMPTY = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const setField = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  /** Client-side mirror of what the endpoint requires. */
  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t('forms.required')
    if (!EMAIL_PATTERN.test(form.email.trim())) next.email = t('forms.invalidEmail')
    if (!form.message.trim()) next.message = t('forms.required')
    return next
  }

  const send = async (event) => {
    event.preventDefault()

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setLoading(true)
    setStatus(null)

    const result = await postJson('/api/contact', form)

    setLoading(false)
    setStatus(result.ok ? 'sent' : 'error')
    if (result.ok) setForm(EMPTY)
  }

  return (
    <div className="page">
      <section className="section-tight container">
        <SectionHeader eyebrow={t('nav.contact')} title={t('contact.title')} as="h1" />

        <Reveal className="contact-grid" variants={stagger(0.12)}>
          <RevealItem>
            <form className="form contact-form" onSubmit={send} noValidate>
              <Field
                label={t('contact.form.name')}
                name="name"
                value={form.name}
                onChange={setField('name')}
                error={errors.name}
                autoComplete="name"
                required
              />
              <Field
                label={t('contact.form.email')}
                name="email"
                type="email"
                value={form.email}
                onChange={setField('email')}
                error={errors.email}
                autoComplete="email"
                required
              />
              <Field
                label={t('contact.form.message')}
                name="message"
                value={form.message}
                onChange={setField('message')}
                error={errors.message}
                textarea
                rows={6}
                required
              />

              <div>
                <Button type="submit" disabled={loading} arrow={!loading}>
                  {loading ? t('forms.sending') : t('contact.form.send')}
                </Button>
              </div>

              {status === 'sent' && <FormStatus tone="success">{t('forms.contactSent')}</FormStatus>}
              {status === 'error' && <FormStatus tone="error">{t('forms.contactError')}</FormStatus>}
            </form>
          </RevealItem>

          <RevealItem as="aside" className="contact-aside">
            <h2 className="heading-3 contact-company">{t('contact.company')}</h2>

            <dl className="contact-details">
              <div>
                <dt className="field-label">{t('contact.addressLabel')}</dt>
                <dd>
                  <address>
                    57 AV 02 MARS 1934
                    <br />
                    2034 EZZAHRA
                    <br />
                    {t('contact.country')}
                  </address>
                </dd>
              </div>

              <div>
                <dt className="field-label">{t('contact.emailLabel')}</dt>
                <dd>
                  <a className="text-link" href="mailto:contact@codentrix.io">
                    contact@codentrix.io
                  </a>
                </dd>
              </div>

              <div>
                <dt className="field-label">{t('contact.phoneLabel')}</dt>
                <dd>
                  <a className="text-link" href="tel:+21698340092">
                    +216 98 340 092
                  </a>
                </dd>
              </div>
            </dl>

            <div className="contact-map">
              <iframe
                title={t('contact.mapTitle', { defaultValue: 'Codentrix location' })}
                src="https://www.google.com/maps?q=57+AV+02+MARS+1934+2034+EZZAHRA&output=embed"
                width="600"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              className="contact-map-link"
              href="https://www.google.com/maps/search/?api=1&query=57+AV+02+MARS+1934+2034+EZZAHRA"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('contact.viewLargerMap', { defaultValue: 'Open in Google Maps' })}
              <Icon name="arrowUpRight" size={15} />
            </a>
          </RevealItem>
        </Reveal>
      </section>
    </div>
  )
}
