import axios from 'axios'

import { authenticate } from 'pixabay-api'
const pixabayKey = '19446257-b0025af71a07915d6889c5664'
const { searchImages } = authenticate(pixabayKey)

const firebaseURL = 'https://my-cards-2021-default-rtdb.firebaseio.com'

async function getPixabayImage(phrase, type = 'comments') {
  try {
    const data = await searchImages(phrase, { per_page: 200 })
    let largeImageURL = ''
    if (type === 'comments') {
      let maxComments = 0
      data.hits.forEach((item) => {
        if (item.comments >= maxComments) {
          maxComments = item.comments
          largeImageURL = item.largeImageURL
        }
      })
    } else if (type === 'random') {
      const index = Math.floor(Math.random() * data.hits.length)
      largeImageURL = data.hits[index].largeImageURL
    } else if (type === 'first') {
      largeImageURL = data.hits[0].largeImageURL
    }
    return largeImageURL
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

async function firebaseOp(card, type) {
  try {
    let response = ''
    let result = ''
    switch (type) {
      case 'POST':
        response = await axios.post(firebaseURL + '/words.json', card)
        result = response.data.name
        break
      case 'PUT':
        response = axios.put(firebaseURL + '/words/' + card.id + '.json', card)
        result = response
        break
      case 'PATCH':
        response = await axios.patch(
          firebaseURL + '/words/' + card.id + '.json',
          card
        )
        result = response
        break
      case 'DELETE':
        response = await axios.delete(
          firebaseURL + '/words/' + card.id + '.json'
        )
        result = response
        break
    }
    return result
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
    deleteCard(state, card) {
      const index = state.myCards.findIndex((item) => item.id === card.id)
      if (index !== -1) state.myCards.splice(index, 1)
    },
  },
  actions: {
    setCards(vuexContext, cards) {
      vuexContext.commit('setCards', cards)
    },
    async addCard(vuexContext, card) {
      card.image = await getPixabayImage(card.word, 'first')
      card.id = await firebaseOp(card, 'POST')
      vuexContext.commit('addCard', card)
    },
    async saveCard(vuexContext, card) {
      const response = await firebaseOp(card, 'PUT')
      vuexContext.commit('saveCard', card)
      return response
    },
    async deleteCard(vuexContext, card) {
      const response = await firebaseOp(card, 'DELETE')
      vuexContext.commit('deleteCard', card)
      return response
    },
    async setRandomImage(vuexContext, card) {
      card.image = await getPixabayImage(card.word, 'random')
      const response = await firebaseOp(card, 'PATCH')
      vuexContext.commit('saveCard', card)
      return response
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
