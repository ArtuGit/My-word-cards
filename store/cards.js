import {
  fakeRequestPromise,
  getPixabayImage,
  firebaseOp,
} from '@/plugins/api-helpers'

export const state = () => ({
  myCards: [],
})

export const mutations = {
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
}

export const actions = {
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
}

export const getters = {
  loadedCards(state) {
    return state.myCards
  },
  getCard: (state) => (id) => {
    return state.myCards[
      state.myCards.findIndex((element) => element.id === id)
    ]
  },
}
