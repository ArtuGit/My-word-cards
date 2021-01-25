/*
 * Developed by Artu, https://github.com/ArtuGit
 *  Copyleft, 2021.
 */

import { initAppData } from '~/plugins/api-helpers'

export const state = () => ({
  isDev: false,
  pageTitle: '',
})

export const mutations = {
  setDev(state, dev) {
    state.isDev = dev
  },
  setPageTitle(state, title) {
    state.pageTitle = title
  },
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    await vuexContext.dispatch('auth/initAuth', context.req)
    vuexContext.commit('setDev', context.isDev)
    await initAppData.call(this, vuexContext)
  },
}

export const getters = {
  isDev(state) {
    return state.isDev
  },
  pageTitle(state) {
    return state.pageTitle
  },
}
