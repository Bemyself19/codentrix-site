import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageToggle(){
  const { i18n } = useTranslation()
  const toggle = ()=> i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  return <button className="lang-toggle" onClick={toggle}>{i18n.language === 'en' ? 'FR' : 'EN'}</button>
}
