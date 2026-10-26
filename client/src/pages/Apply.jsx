import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/motion/Reveal'
import RevealItem from '../components/motion/RevealItem'
import Field from '../components/forms/Field'
import FileDrop from '../components/forms/FileDrop'
import FormStatus from '../components/forms/FormStatus'
import { postFormData } from '../lib/api'
import { stagger } from '../lib/motion'
import '../components/forms/forms.css'
import '../components/contact/contact.css'

const EMPTY = { name: '', email: '', phone: '', education: '', experience: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Apply() {
  const { t } = useTranslation()
  const [form, setForm] = useState(EMPTY)
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [fileError, setFileError] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const setField = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = async (event) => {
    event.preventDefault()

    const found = {}
    if (!form.name.trim()) found.name = t('forms.required')
    if (!EMAIL_PATTERN.test(form.email.trim())) found.email = t('forms.invalidEmail')

    setErrors(found)

    if (!file) setFileError(t('apply.file.missing'))
    if (Object.keys(found).length > 0 || !file) return

    setLoading(true)
    setStatus(null)

    // Field names match server/index.js exactly: the five text fields plus `cv`.
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => payload.append(key, value))
    payload.append('cv', file)

    const result = await postFormData('/api/careers/apply', payload)

    setLoading(false)
    setStatus(result.ok ? 'sent' : 'error')

    if (result.ok) {
      setForm(EMPTY)
      setFile(null)
    }
  }

  return (
    <div className="page">
      <section className="section-tight container-narrow">
        <SectionHeader
          eyebrow={t('nav.careers')}
          title={t('apply.title')}
          lead={t('apply.lead')}
          as="h1"
        />

        <Reveal variants={stagger(0.1)}>
          <RevealItem>
            <form className="form contact-form" onSubmit={submit} noValidate>
              <div className="form-row">
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
              </div>

              <Field
                label={t('apply.fields.phone')}
                name="phone"
                type="tel"
                value={form.phone}
                onChange={setField('phone')}
                autoComplete="tel"
              />

              <Field
                label={t('apply.fields.education')}
                name="education"
                value={form.education}
                onChange={setField('education')}
                textarea
                rows={4}
              />

              <Field
                label={t('apply.fields.experience')}
                name="experience"
                value={form.experience}
                onChange={setField('experience')}
                textarea
                rows={5}
              />

              <FileDrop
                file={file}
                onChange={setFile}
                onError={setFileError}
                labels={{
                  label: t('apply.file.label'),
                  prompt: t('apply.file.prompt'),
                  hint: t('apply.file.hint'),
                  remove: t('apply.file.remove'),
                  tooLarge: t('apply.file.tooLarge')
                }}
              />

              {fileError && <p className="field-error">{fileError}</p>}

              <div>
                <Button type="submit" disabled={loading} arrow={!loading}>
                  {loading ? t('forms.sending') : t('apply.submit')}
                </Button>
              </div>

              {status === 'sent' && <FormStatus tone="success">{t('apply.sent')}</FormStatus>}
              {status === 'error' && <FormStatus tone="error">{t('apply.error')}</FormStatus>}
            </form>
          </RevealItem>
        </Reveal>
      </section>
    </div>
  )
}
