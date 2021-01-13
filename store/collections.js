export const state = () => ({
  myCollections: [],
})

export const mutations = {
  setCollections(state, collections) {
    state.myCollections = collections
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
      collectionObj = { title: collection }
      res = await this.$axios.$post('/collections.json', collectionObj)
      collectionObj.id = res.name
      collectionArr.push(collectionObj)
    }
    vuexContext.commit('addNewCollections', collectionArr)
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
