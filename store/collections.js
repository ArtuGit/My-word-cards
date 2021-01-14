import { fakeRequestPromise, getPixabayImage } from '@/plugins/api-helpers'

export const state = () => ({
  myCollections: [],
})

export const mutations = {
  setCollections(state, collections) {
    state.myCollections = collections
  },
  addCollections(state, collection) {
    state.myCollections.push(collection)
  },
  addNewCollections(state, collections) {
    state.myCollections = state.myCollections.concat(collections)
  },
}

export const actions = {
  async addNewCollections(vuexContext, collections) {
    let res = null
    let collectionObj = null
    const collectionArr = []
    for (const collection of collections) {
      const image = await getPixabayImage(collection, 'first')
      collectionObj = { title: collection, image }
      res = await this.$axios.$post('/collections.json', collectionObj)
      collectionObj.id = res.name
      collectionArr.push(collectionObj)
    }
    vuexContext.commit('addNewCollections', collectionArr)
  },
  async test(vuexContext) {
    await fakeRequestPromise(3000)
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
