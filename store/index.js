import Vuex from 'vuex'
import cards from './cards'

const CreateStore = () => {
  return new Vuex.Store({
    modules: {
      cards,
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
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
    },
  })
}

export default CreateStore
