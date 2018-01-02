import * as types from './mutation-types'

export const state = {
  lang: 'en-US'
}

export const getters = {
  lang: (state) => {
    return state.lang
  }
}

export const actions = {
  setLang ({ commit }, lang) {
    commit(types.SWITCH_LANG, lang)
  }
}

export const mutations = {
  [types.SWITCH_LANG] (state, lang) {
    state.lang = lang
  }
}
