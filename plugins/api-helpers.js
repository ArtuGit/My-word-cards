/*
 * Developed by Artu, https://github.com/ArtuGit
 *  Copyleft, 2021.
 */

import { authenticate } from 'pixabay-api'
const { searchImages } = authenticate(process.env.pixabayKey)

const fakeRequestPromise = (delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line
      console.log('Requested Fake promise (for testing reason ) ...')
      resolve()
    }, delay)
  })
}

async function getPixabayImage(phrase, type = 'comments') {
  try {
    const phraseSearch = phrase.split(' ').slice(0, 2).join(' ') // first words
    if (phraseSearch) {
      const data = await searchImages(phraseSearch, { per_page: 200 })
      let largeImageURL = ''
      if (data.total > 0) {
        if (type === 'comments') {
          let maxComments = 0
          data.hits.forEach((item) => {
            if (item.comments >= maxComments) {
              maxComments = item.comments
              largeImageURL = item.largeImageURL
            }
          })
        } else if (type === 'random') {
          const index = Math.floor(Math.random() * data.hits.length)
          largeImageURL = data.hits[index].largeImageURL
        } else if (type === 'first') {
          largeImageURL = data.hits[0].largeImageURL
        }
      }
      return largeImageURL
    } else return ''
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

async function initAppData(vuexContext) {
  let query
  query = makeFBQuery(vuexContext, '/words/[uuid].json')
  let data = await this.$axios.$get(query)
  const cards = []
  for (const key in data) {
    cards.push({ ...data[key], id: key })
  }
  vuexContext.commit('cards/setCards', cards, { root: true })

  query = makeFBQuery(vuexContext, '/collections/[uuid].json')
  data = await this.$axios.$get(query)
  const collections = []
  for (const key in data) {
    collections.push({ ...data[key], id: key })
  }
  vuexContext.commit('collections/setCollections', collections, { root: true })
}

function makeFBQuery(context, pStr) {
  let rStr = pStr
  const isAuth = context.rootGetters['auth/isAuthenticated']
  const isAdmin = context.rootGetters['auth/isAdmin']
  const uuid = context.rootGetters['auth/user'].uuid
  if (!isAuth || isAdmin) {
    if (rStr.includes('/[uuid]/')) {
      rStr = rStr.replace('[uuid]/', '')
    } else if (rStr.includes('/[uuid].json')) {
      rStr = rStr.replace('/[uuid]', '')
    }
    rStr = '/demo' + rStr
  } else if (rStr.includes('[uuid]')) {
    rStr = rStr.replace('[uuid]', uuid)
  }
  return rStr
}

export { fakeRequestPromise, getPixabayImage, initAppData, makeFBQuery }
