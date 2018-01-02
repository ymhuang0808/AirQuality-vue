import Vue from 'vue'
import store from '../store/index'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: store.getters.lang == null ? navigator.language : store.getters.lang,
  fallbackLocale: 'en-US',
  messages: {
    'en-US': require('../lang/en-US.json'),
    'zh-TW': require('../lang/zh-TW.json')
  }
})

export const availableLanguages = ['en-US', 'zh-TW']

const loadedLanguages = ['en-US']

function getLanguageCode (lang) {
  if (lang.indexOf('-')) {
    return lang.split('-')[0]
  }

  return lang
}

function setI18nLanguage (lang) {
  i18n.locale = lang
  let langCode = getLanguageCode(lang)
  document.querySelector('html').setAttribute('lang', langCode)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.indexOf(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
