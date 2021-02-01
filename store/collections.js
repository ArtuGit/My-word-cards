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
    const query = makeFBQuery(vuexContext, '/collections/[uuid].json')
    const res = await this.$axios.$post(query, collection)
    collection.id = res.name
    vuexContext.commit('addCollection', collection)
    return collection.id
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
    const query = makeFBQuery(
      vuexContext,
      `/collections/[uuid]/${collection.id}.json`
    )
    const response = await this.$axios.$patch(query, collection)
    vuexContext.commit('saveCollection', collection)
    return response
  },
  async deleteCollection(vuexContext, collection) {
    // Create a reference to the file to delete
    const fileRef = this.$fire.storage.ref().child(collection.imagePath)
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
    const query = makeFBQuery(
      vuexContext,
      `/collections/[uuid]/${collection.id}.json`
    )
    const response = await this.$axios.$delete(query)
    vuexContext.commit('deleteCollection', collection)
    return response
  },
  async setCollectionImage(vuexContext, collection) {
    const imageType = collection.params ? collection.params.imageType : ''
    const image = await getPixabayImage(collection.title, imageType)
    if (!image) {
      this.$notifier.showMessage({
        content: 'No image returned for this title',
        color: 'warning',
      })
      return
    }
    let imageUploaded
    if (image) {
      imageUploaded = await uploadURLToStorage.call(this, image)
      collection.image = imageUploaded.url
      collection.imagePath = imageUploaded.imagePath
    }
    if (collection.params) {
      delete collection.params.imageType
    }
    if (collection.state) {
      delete collection.state.loading
    }
    const query = makeFBQuery(
      vuexContext,
      `/collections/[uuid]/${collection.id}.json`
    )
    await this.$axios.$patch(query, collection)
    vuexContext.commit('saveCollection', collection)
    return collection
  },

  async test(vuexContext) {
    await uploadURLToStorage.call(
      this,
      'https://pixabay.com/get/g90a114774f44c360c933cc6949f6b10efd09dac16fcb513797c43e3663db2ac1b49ebab0201d7ab9caf6f7593d8f3248e6a3e475aa2d1247ef20bcd28519130a_1280.jpg'
    )
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
