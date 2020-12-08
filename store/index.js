import Vuex from 'vuex'

const CreateStore = () => {
  return new Vuex.Store({
    state: {
      myCards: [],
    },
    mutations: {
      setCards(state, cards) {
        state.myCards = cards
      },
      addCard(state, card) {
        state.myCards.push(card)
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit('setCards', [
              {
                id: '1',
                word: 'Word 1',
                translation: 'Trans Word 1',
                image: 'https://picsum.photos/600/500?1',
              },
              {
                id: '2',
                word: 'Word 2',
                translation: 'Trans Word 2',
                image: 'https://picsum.photos/600/500?2',
              },
              {
                id: '3',
                word: 'Word 3',
                translation: 'Trans Word 3',
                image: 'https://picsum.photos/600/500?3',
              },
            ])
            resolve()
          }, 1000)
        })
      },
      setCards(vuexContext, cards) {
        vuexContext.commit('setCards', cards)
      },
      addCard(vuexContext, card) {
        vuexContext.commit('addCard', card)
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
