import Vue from 'vue'
import store from '../store/index'
import VueI18n from 'vue-i18n'
import messages from '../lang'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: store.getters.lang == null ? navigator.language : store.getters.lang,
  fallbackLocale: 'en-US',
  messages
})

export const availableLanguages = ['en-US', 'zh-TW']

const loadedLanguages = ['zh-TW']

function getLanguageCode (lang) {
  if (lang.indexOf('-')) {
    return lang.split('-')[0]
  }

  return lang
}

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  let langCode = getLanguageCode(lang)
  document.querySelector('html').setAttribute('lang', langCode)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `../lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
