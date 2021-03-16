/*
 * Developed by Artu, https://github.com/ArtuGit
 * Copyleft 2020-2021.
 */

import {
  getPixabayImage,
  makeFBQuery,
  uploadURLToStorage,
  uploadURLToStorage2,
  deleteFileOnStorage,
} from '@/plugins/api-helpers'

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
    const collectionClean = JSON.parse(JSON.stringify(collection))
    if (collectionClean.params) {
      delete collectionClean.params
    }
    if (collectionClean.state) {
      delete collectionClean.state
    }
    const query = makeFBQuery(vuexContext, '/collections/[uuid].json')
    const res = await this.$axios.$post(query, collectionClean)
    collection.id = res.name
    vuexContext.commit('addCollection', collection)
    return collection.id
  },
  async addCollectionsMultiple(vuexContext, collections) {
    let collectionObj = null
    for (const collection of collections) {
      collectionObj = {
        title: collection,
        state: { loading: true },
      }
      collectionObj.id = await vuexContext.dispatch(
        'addCollection',
        collectionObj
      )
      collectionObj.params = { imageType: 'first' }
      vuexContext.dispatch('setCollectionImage', collectionObj)
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
    if (collection.imagePath) {
      deleteFileOnStorage.call(this, collection.imagePath)
    }
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
    let image
    let imageUploaded
    if (imageType === 'upload') {
      if (collection.params.imageNew) {
        image = collection.params.imageNew
      } else {
        image = null
        // eslint-disable-next-line
        console.error('No uploaded image is passed')
      }
    } else {
      image = await getPixabayImage(collection.title, imageType)
      if (!image) {
        this.$notifier.showMessage({
          content: 'No image returned for this title',
          color: 'warning',
        })
        delete collection.state
        delete collection.params
        vuexContext.commit('saveCollection', collection)
        return
      }
      if (collection.params.imagePathOld) {
        deleteFileOnStorage.call(this, collection.params.imagePathOld)
        delete collection.params.imagePathOld
      }
    }
    if (image) {
      imageUploaded = await uploadURLToStorage.call(this, image)
      collection.image = imageUploaded.url
      collection.imagePath = imageUploaded.imagePath
      if (collection.params) {
        delete collection.params.imageType
        delete collection.params.imageNew
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
    }
  },
  async test(vuexContext, collection) {
    const imageUploaded = await uploadURLToStorage2.call(this, collection.image)
    // eslint-disable-next-line
    console.log(imageUploaded)
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
