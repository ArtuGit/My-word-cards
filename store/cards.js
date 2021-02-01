/*
 * Developed by Artu, https://github.com/ArtuGit
 * Copyleft 2020-2021.
 */

import {
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
    const query = makeFBQuery(vuexContext, '/words/[uuid].json')
    const res = await this.$axios.$post(query, card)
    card.id = res.name
    vuexContext.commit('addCard', card)
    return card.id
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
    // Create a reference to the file to delete
    const fileRef = this.$fire.storage.ref().child(card.imagePath)
    // Delete the file
    fileRef
      .delete()
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error)
      })
    const query = makeFBQuery(vuexContext, `/words/[uuid]/${card.id}.json`)
    const response = await this.$axios.$delete(query)
    vuexContext.commit('deleteCard', card)
    return response
  },
  async setCardImage(vuexContext, card) {
    const imageType = card.params ? card.params.imageType : ''
    const image = await getPixabayImage(card.word, imageType)
    if (!image) {
      this.$notifier.showMessage({
        content: 'No image returned for this word',
        color: 'warning',
      })
      return
    }
    let imageUploaded
    if (image) {
      imageUploaded = await uploadURLToStorage.call(this, image)
    }
    card.image = imageUploaded.url
    card.imagePath = imageUploaded.imagePath
    if (card.params) {
      delete card.params.imageType
    }
    if (card.state) {
      delete card.state.loading
    }
    const query = makeFBQuery(vuexContext, `/words/[uuid]/${card.id}.json`)
    await this.$axios.$patch(query, card)
    vuexContext.commit('saveCard', card)
    return card
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
