/*
 * Developed by Artu, https://github.com/ArtuGit
 * Copyleft 2020-2021.
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
  nuxtClientInit(vuexContext, context) {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('tokenExpiration')
    const expiredIn = expirationDate - new Date().getTime()
    if (token && expiredIn > 0) {
      vuexContext.dispatch('auth/setLogoutTimer', expiredIn, { root: true })
    }
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
