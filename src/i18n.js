import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import tr from './locales/tr/translation.json'

const savedLang = (() => {
  try { return localStorage.getItem('ic_lang') || 'en' } catch { return 'en' }
})()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    lng:          savedLang,
    fallbackLng:  'en',
    interpolation: { escapeValue: false },
  })

export default i18n
