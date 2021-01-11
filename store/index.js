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
    let data = await this.$axios.$get('/words.json')
    const cards = []
    for (const key in data) {
      cards.push({ ...data[key], id: key })
    }
    vuexContext.commit('cards/setCards', cards)

    data = await this.$axios.$get('/collections.json')
    const collections = []
    for (const key in data) {
      collections.push({ ...data[key], id: key })
    }
    vuexContext.commit('cards/setCollections', collections)
  },
}

export const getters = {
  isDev(state) {
    return state.isDev
  },
}
