export const state = () => ({
  isDev: false,
})

export const mutations = {
  setDev(state, dev) {
    state.isDev = dev
  },
}

export const actions = {
  nuxtServerInit(vuexContext, context) {
    vuexContext.commit('setDev', vuexContext.isDev)
    return this.$axios
      .$get('/words.json')
      .then((data) => {
        const cards = []
        for (const key in data) {
          cards.push({ ...data[key], id: key })
        }
        vuexContext.commit('cards/setCards', cards)
      })
      .catch((e) => context.error(e))
  },
}

export const getters = {
  isDev(state) {
    return state.isDev
  },
}
