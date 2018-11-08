import * as types from './mutation-types'

export const state = {
  lang: 'zh-TW',
  navFilter: {
    isVisible: false,
    source: [],
    selected: []
  },
  clickedSite: null
}

export const getters = {
  lang: (state) => {
    return state.lang
  },
  navFilter: (state) => {
    return state.navFilter
  },
  navFilterSelected: (state) => {
    return state.navFilter.selected
  },
  clickedSite: (state) => {
    return state.clickedSite
  }
}

export const actions = {
  setLang ({ commit }, lang) {
    commit(types.SWITCH_LANG, lang)
  },
  setNavFilter ({ commit }, navFilter) {
    commit(types.SET_NAV_FILTER, navFilter)
  },
  setNavFilterSelected ({ commit }, selected) {
    commit(types.SET_NAV_FILTER_SELECTED, selected)
  },
  setClickedSite ({ commit }, site) {
    commit(types.SET_CLICKED_SITE, site)
  }
}

export const mutations = {
  [types.SWITCH_LANG] (state, lang) {
    state.lang = lang
  },
  [types.SET_NAV_FILTER] (state, navFilter) {
    state.navFilter = navFilter
  },
  [types.SET_NAV_FILTER_SELECTED] (state, selected) {
    state.navFilter.selected = selected
  },
  [types.SET_CLICKED_SITE] (state, site) {
    state.clickedSite = site
  }
}
