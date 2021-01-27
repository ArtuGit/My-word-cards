/*
 * Developed by Artu, https://github.com/ArtuGit
 *  Copyleft, 2021.
 */

import {
  delayPromise,
  fakeRequestPromise,
  getPixabayImage,
  makeFBQuery,
  uploadURLToStorage,
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
    if (card.image) {
      card.image = await uploadURLToStorage.call(this, card.image)
    }
    const query = makeFBQuery(vuexContext, '/words/[uuid].json')
    const res = await this.$axios.$post(query, card)
    card.id = res.name
    vuexContext.commit('addCard', card)
  },
  async saveCard(vuexContext, card) {
    const query = makeFBQuery(vuexContext, `/words/[uuid]/${card.id}.json`)
    const response = await this.$axios.$patch(query, card)
    vuexContext.commit('saveCard', card)
    return response
  },
  async rewriteCard(vuexContext, card) {
    const query = makeFBQuery(vuexContext, `/words/[uuid]/${card.id}.json`)
    const response = await this.$axios.$put(query, card)
    vuexContext.commit('saveCard', card)
    return response
  },
  async deleteCard(vuexContext, card) {
    const query = makeFBQuery(vuexContext, `/words/[uuid]/${card.id}.json`)
    const response = await this.$axios.$delete(query)
    vuexContext.commit('deleteCard', card)
    return response
  },
  async setRandomImage(vuexContext, card) {
    card.image = await getPixabayImage(card.word, 'random')
    if (card.image) {
      card.image = await uploadURLToStorage.call(this, card.image)
    }
    if (!card.image) {
      this.$notifier.showMessage({
        content: 'No image returned for this word',
        color: 'warning',
      })
      return
    }
    const query = makeFBQuery(vuexContext, `/words/[uuid]/${card.id}.json`)
    const response = await this.$axios.$patch(query, card)
    vuexContext.commit('saveCard', card)
    await delayPromise(500)
    return response
  },
  async test(vuexContext) {
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
  countCardsWithCollection: (state) => (collection) => {
    return state.myCards.reduce(
      (acc, cur) =>
        cur.collections && cur.collections.includes(collection) ? ++acc : acc,
      0
    )
  },
}
