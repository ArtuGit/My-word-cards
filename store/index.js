import Vuex from 'vuex'
// import axios from 'axios'
import { searchImages } from 'pixabay-api'

const pixabayKey = '19446257-b0025af71a07915d6889c5664'

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
      saveCard(state, card) {
        const index = state.myCards.findIndex((item) => item.id === card.id)
        if (index !== -1) state.myCards.splice(index, 1, card)
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
                annotation: 'Trans Word 1',
                image: 'https://picsum.photos/600/500?1',
              },
              {
                id: '2',
                word: 'Word 2',
                annotation: 'Trans Word 2',
                image: 'https://picsum.photos/600/500?2',
              },
              {
                id: '3',
                word: 'Word 3',
                annotation: 'Trans Word 3',
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
        card.id = Date.now().toString()
        card.image = ''
        searchImages(pixabayKey, card.word, { per_page: 3 })
          .then((r) => {
            if (r.total > 0) {
              card.image = r.hits[0].largeImageURL
            }
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.error(e))
        vuexContext.commit('addCard', card)
      },
      saveCard(vuexContext, card) {
        vuexContext.commit('saveCard', card)
      },
    },
    getters: {
      loadedCards(state) {
        return state.myCards
      },
      getCard: (state) => (id) => {
        return state.myCards[
          state.myCards.findIndex((element) => element.id === id)
        ]
      },
    },
  })
}

export default CreateStore
