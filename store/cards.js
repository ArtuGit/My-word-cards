import { fakeRequestPromise, getPixabayImage } from '@/plugins/api-helpers'

export const state = () => ({
  myCards: [],
  myCollections: [],
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
  setCollections(state, collections) {
    state.myCollections = collections
  },
  addNewCollections(state, collections) {
    state.myCollections = state.myCollections.concat(collections)
  },
}

export const actions = {
  setCards(vuexContext, cards) {
    vuexContext.commit('setCards', cards)
  },
  async addCard(vuexContext, card) {
    card.image = await getPixabayImage(card.word, 'first')
    card.id = await this.$axios.$post('/words.json', card)
    vuexContext.commit('addCard', card)
  },
  async saveCard(vuexContext, card) {
    const response = await this.$axios.$patch(`/words/${card.id}.json`, card)
    vuexContext.commit('saveCard', card)
    return response
  },
  async deleteCard(vuexContext, card) {
    const response = await this.$axios.$delete(`/words/${card.id}.json`)
    vuexContext.commit('deleteCard', card)
    return response
  },
  async setRandomImage(vuexContext, card) {
    card.image = await getPixabayImage(card.word, 'random')
    const response = await this.$axios.$patch(`/words/${card.id}.json`, card)
    vuexContext.commit('saveCard', card)
    return response
  },
  async test(vuexContext, card) {
    await fakeRequestPromise(3000)
  },
  async addNewCollections(vuexContext, collections) {
    let res = null
    let collectionObj = null
    const collectionArr = []
    for (const collection of collections) {
      collectionObj = { title: collection }
      res = await this.$axios.$post('/collections.json', collectionObj)
      collectionObj.id = res.name
      collectionArr.push(collectionObj)
    }
    vuexContext.commit('addNewCollections', collectionArr)
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
  loadedCollections(state) {
    return state.myCollections
  },
  loadedCollectionsTitles(state) {
    return state.myCollections.map((el) => el.title)
  },
}
