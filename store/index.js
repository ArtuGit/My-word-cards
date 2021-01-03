export const state = () => ({
  isDev: false,
})

export const mutations = {
  setDev(state, dev) {
    state.isDev = dev
  },
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    vuexContext.commit('setDev', context.isDev)
    const data = await this.$axios.$get('/words.json')
    const cards = []
    for (const key in data) {
      cards.push({ ...data[key], id: key })
    }
    vuexContext.commit('cards/setCards', cards)
  },
}

export const getters = {
  isDev(state) {
    return state.isDev
  },
}
