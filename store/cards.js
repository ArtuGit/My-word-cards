import axios from 'axios'

import { authenticate } from 'pixabay-api'
const pixabayKey = '19446257-b0025af71a07915d6889c5664'
const { searchImages } = authenticate(pixabayKey)

const firebaseURL = 'https://my-cards-2021-default-rtdb.firebaseio.com'

async function getPixabayImages(phrase) {
  try {
    const data = await searchImages(phrase, { per_page: 200 })
    let maxComments = 0
    let largeImageURL = ''
    data.hits.forEach((item) => {
      if (item.comments >= maxComments) {
        maxComments = item.comments
        largeImageURL = item.largeImageURL
      }
    })
    return largeImageURL
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

async function firebasePut(card) {
  try {
    const res = await axios.post(firebaseURL + '/words.json', card)
    return res.data.name
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

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
    async addCard(vuexContext, card) {
      card.image = await getPixabayImages(card.word)
      card.id = await firebasePut(card)
      vuexContext.commit('addCard', card)
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
