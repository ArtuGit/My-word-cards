import axios from 'axios'
import { searchImages } from 'pixabay-api'

const pixabayKey = '19446257-b0025af71a07915d6889c5664'
const firebaseURL = 'https://my-cards-2021-default-rtdb.firebaseio.com'

const cards = {
  namespaced: true,
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
    deleteCard(state, id) {
      const index = state.myCards.findIndex((item) => item.id === id)
      if (index !== -1) state.myCards.splice(index, 1)
    },
  },
  actions: {
    setCards(vuexContext, cards) {
      vuexContext.commit('setCards', cards)
    },
    addCard(vuexContext, card) {
      card.image = ''
      searchImages(pixabayKey, card.word, { per_page: 3 })
        .then((r) => {
          if (r.total > 0) {
            card.image = r.hits[0].largeImageURL
            axios
              .post(firebaseURL + '/words.json', card)
              .then((result) => {
                vuexContext.commit('addCard', {
                  ...card,
                  id: result.data.name,
                })
              })
              // eslint-disable-next-line no-console
              .catch((e) => console.log(e))
          }
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.error(e))
    },
    saveCard(vuexContext, card) {
      axios
        .put(firebaseURL + '/words/' + card.id + '.json', card)
        .then((res) => {
          vuexContext.commit('saveCard', card)
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.error(e))
    },
    deleteCard(vuexContext, id) {
      axios.delete(firebaseURL + '/words/' + id + '.json').then((res) => {
        vuexContext.commit('deleteCard', id)
      })
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
}

export default cards
