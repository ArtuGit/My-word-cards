import { authenticate } from 'pixabay-api'
const pixabayKey = '19446257-b0025af71a07915d6889c5664'
const { searchImages } = authenticate(pixabayKey)

const fakeRequestPromise = (delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line
      console.log('Requested Fake promise (for testing reason ) ...')
      resolve()
    }, delay)
  })
}

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

async function firebaseOp(card, type, axios) {
  try {
    if (typeof axios !== 'function') {
      throw new TypeError('Axios not available')
    }
    let response = ''
    let result = ''
    switch (type) {
      case 'POST':
        response = await axios.$post('/words.json', card)
        result = response.name
        break
      case 'PUT':
        response = await axios.$put('/words/' + card.id + '.json', card)
        result = response
        break
      case 'PATCH':
        response = await axios.$patch('/words/' + card.id + '.json', card)
        result = response
        break
      case 'DELETE':
        response = await axios.$delete('/words/' + card.id + '.json')
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
      card.id = await firebaseOp(card, 'POST', this.$axios)
      vuexContext.commit('addCard', card)
    },
    async saveCard(vuexContext, card) {
      const response = await firebaseOp(card, 'PATCH', this.$axios)
      vuexContext.commit('saveCard', card)
      return response
    },
    async deleteCard(vuexContext, card) {
      const response = await firebaseOp(card, 'DELETE', this.$axios)
      vuexContext.commit('deleteCard', card)
      return response
    },
    async setRandomImage(vuexContext, card) {
      card.image = await getPixabayImage(card.word, 'random')
      const response = await firebaseOp(card, 'PATCH', this.$axios)
      vuexContext.commit('saveCard', card)
      return response
    },
    async test(vuexContext, card) {
      await fakeRequestPromise(3000)
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
