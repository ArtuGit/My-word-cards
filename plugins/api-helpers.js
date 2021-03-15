/*
 * Developed by Artu, https://github.com/ArtuGit
 * Copyleft 2020-2021.
 */

import { authenticate } from 'pixabay-api'

import imageBlobReduce from 'image-blob-reduce'
const { searchImages } = authenticate(process.env.pixabayKey)
const reduce = imageBlobReduce()

const fakeRequestPromise = (delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // eslint-disable-next-line
      console.log('Requested Fake promise (for testing reason ) ...')
      resolve()
    }, delay)
  })
}

const delayPromise = (delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

async function getPixabayImage(phrase, type = 'comments') {
  try {
    const phraseSearch = phrase.split(' ').slice(0, 2).join(' ') // first words
    if (phraseSearch) {
      const data = await searchImages(phraseSearch, { per_page: 200 })
      let imageURL = ''
      if (data.total > 0) {
        if (type === 'comments') {
          let maxComments = 0
          data.hits.forEach((item) => {
            if (item.comments >= maxComments) {
              maxComments = item.comments
              imageURL = item.largeImageURL
            }
          })
        } else if (type === 'random') {
          const index = Math.floor(Math.random() * data.hits.length)
          imageURL = data.hits[index].largeImageURL
        } else if (type === 'first') {
          imageURL = data.hits[0].largeImageURL
        }
      }
      return imageURL
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
  const user = context.rootGetters['auth/user']
  const isAuth = context.rootGetters['auth/isAuthenticated']
  const isAdmin = user.isAdmin
  const uuid = user.uuid
  const token = user.token
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
  if (token) {
    rStr = rStr + `?auth=${token}`
  }
  return rStr
}

function getFileBlob(url, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.addEventListener('load', function () {
    cb(xhr.response)
  })
  xhr.send()
}

function getStorageDirName() {
  let isAdmin, uuid
  if (this.getters) {
    isAdmin = this.getters['auth/isAdmin']
    uuid = this.getters['auth/user'].uuid
  } else {
    isAdmin = this.$store.getters['auth/isAdmin']
    uuid = this.$store.getters['auth/user'].uuid
  }
  if (!isAdmin) return uuid
  else return 'demo'
}

// ToDo: Improve readability and error handling
function uploadURLToStorage(url) {
  const that = this
  const dirName = getStorageDirName.call(this)
  const fileName = url.split('/').slice(-1)[0]
  return new Promise(function (resolve, reject) {
    getFileBlob(url, (blob) => {
      try {
        reduce
          .toBlob(blob, { max: 400 })
          .then((blob) => {
            return blob
          })
          .then((blobResized) => {
            const path = `${dirName}/${fileName}`
            const storageRef = that.$fire.storage.ref().child(path)
            storageRef.put(blobResized).then(function (snapshot) {
              storageRef.getDownloadURL().then(function (url) {
                const res = { imagePath: path, url }
                resolve(res)
              })
            })
          })
      } catch (e) {
        alert(e.message)
      }
    })
  })
}

function deleteFileOnStorage(path) {
  if (path) {
    const fileRef = this.$fire.storage.ref().child(path)
    // Delete the file
    return fileRef
      .delete()
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error)
      })
  }
}

async function getBlobFromURL(url) {
  let blob = null
  if (url) {
    blob = await fetch(url).then((r) => r.blob())
    blob.name = url.substring(url.lastIndexOf('/') + 1)
  }
  return blob
}

export {
  fakeRequestPromise,
  delayPromise,
  getPixabayImage,
  initAppData,
  makeFBQuery,
  uploadURLToStorage,
  getBlobFromURL,
  deleteFileOnStorage,
}
