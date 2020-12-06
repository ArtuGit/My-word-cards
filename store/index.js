import Vuex from 'vuex'

const CreateStore = () => {
  return new Vuex.Store({
    state: {
      myCards: [],
    },
    mutation: {
      setCards(state, cards) {
        state.myCards = cards
      },
    },
    actions: {
      setCards(vuexContext, cards) {
        vuexContext.commit('setCards', cards)
      },
    },
    getters: {
      loadedCards(state) {
        return state.myCards
      },
    },
  })
}

export default CreateStore
