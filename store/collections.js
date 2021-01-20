/*
 * Developed by Artu,
 * https://github.com/ArtuGit
 *  2021.
 */

import {
  fakeRequestPromise,
  getPixabayImage,
  makeFBQuery,
} from '@/plugins/api-helpers'
export const strict = false

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
    if (
      collection.params.titleBefore &&
      collection.params.titleBefore !== collection.title
    ) {
      let cards = vuexContext.rootGetters['cards/loadedCards']
      cards = cards.filter((item) => {
        if (item.collections) return true
      })
      let index
      for (const item of cards) {
        index = item.collections.indexOf(collection.params.titleBefore)
        if (index !== -1) {
          item.collections.splice(index, 1, collection.title)
          await vuexContext.dispatch('cards/rewriteCard', item, { root: true })
        }
      }
      delete collection.params
    }
    const response = await this.$axios.$patch(
      `/collections/${collection.id}.json`,
      collection
    )
    vuexContext.commit('saveCollection', collection)
    return response
  },
  async deleteCollection(vuexContext, collection) {
    const cards = vuexContext.rootState.cards.myCards.filter((item) => {
      if (item.collections) return true
    })
    let index
    for (const item of cards) {
      index = item.collections.indexOf(collection.title)
      if (index !== -1) {
        item.collections.splice(index, 1)
        await vuexContext.dispatch('cards/rewriteCard', item, { root: true })
      }
    }
    const response = await this.$axios.$delete(
      `/collections/${collection.id}.json`
    )
    vuexContext.commit('deleteCollection', collection)
    return response
  },

  async setRandomImage(vuexContext, collection) {
    collection.image = await getPixabayImage(collection.title, 'random')
    if (!collection.image) {
      this.$notifier.showMessage({
        content: 'No image returned for this title',
        color: 'warning',
      })
    }
    const response = await this.$axios.$patch(
      `/collections/${collection.id}.json`,
      collection
    )
    vuexContext.commit('saveCollection', collection)
    return response
  },

  async test(vuexContext) {
    console.log(makeFBQuery(vuexContext, '/collections.json'))
    console.log(makeFBQuery(vuexContext, `/collections/colID.json`))
    console.log(makeFBQuery(vuexContext, `/collections/[uuid]/colID.json`))
    await fakeRequestPromise(500)
  },
}

export const getters = {
  loadedCollections(state) {
    return state.myCollections
  },
  loadedCollectionsTitles(state) {
    return state.myCollections.map((el) => el.title).sort()
  },
  getByTitle: (state) => (title) => {
    return state.myCollections.find((el) => el.title === title)
  },
}
