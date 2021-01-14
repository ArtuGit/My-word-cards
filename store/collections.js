import { fakeRequestPromise, getPixabayImage } from '@/plugins/api-helpers'

export const state = () => ({
  myCollections: [],
})

export const mutations = {
  setCollections(state, collections) {
    state.myCollections = collections
  },
  addCollection(state, collection) {
    state.myCollections.push(collection)
  },
  saveCollection(state, collection) {
    const index = state.myCollections.findIndex(
      (item) => item.id === collection.id
    )
    if (index !== -1) state.myCollections.splice(index, 1, collection)
  },
  deleteCollection(state, collection) {
    const index = state.myCollections.findIndex(
      (item) => item.id === collection.id
    )
    if (index !== -1) state.myCollections.splice(index, 1)
  },
}

export const actions = {
  async addCollection(vuexContext, collection) {
    collection.image = await getPixabayImage(collection.title, 'first')
    const res = await this.$axios.$post('/collections.json', collection)
    collection.id = res.name
    vuexContext.commit('addCollection', collection)
  },
  async addCollectionsMultiple(vuexContext, collections) {
    let collectionObj = null
    for (const collection of collections) {
      collectionObj = { title: collection }
      await vuexContext.dispatch('addCollection', collectionObj)
    }
  },
  async saveCollection(vuexContext, collection) {
    const response = await this.$axios.$patch(
      `/collections/${collection.id}.json`,
      collection
    )
    vuexContext.commit('saveCollection', collection)
    return response
  },
  async deleteCollection(vuexContext, collection) {
    console.log(collection)
    const cards = vuexContext.rootState.cards.myCards.filter((item) => {
      if (item.collections) return true
    })
    let index
    for (const item of cards) {
      index = item.collections.indexOf(collection.title)
      if (index !== -1) {
        console.log(item.id)
        item.collections.splice(index, 1)
        // await dispatch('cards/rewriteCard', item, { root: true })
        await vuexContext.dispatch('cards/rewriteCard', item, { root: true })
      }
    }
    const response = await this.$axios.$delete(
      `/collections/${collection.id}.json`
    )
    vuexContext.commit('deleteCollection', collection)
    return response
  },
  async test(vuexContext) {
    await fakeRequestPromise(300)
  },
}

export const getters = {
  loadedCollections(state) {
    return state.myCollections
  },
  loadedCollectionsTitles(state) {
    return state.myCollections.map((el) => el.title).sort()
  },
}
