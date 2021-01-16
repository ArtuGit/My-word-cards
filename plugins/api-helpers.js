/*
 * Developed by Artu, https://github.com/ArtuGit
 * Copyright (c) 2021.
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
    const data = await searchImages(phrase, { per_page: 200 })
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
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

export { fakeRequestPromise, getPixabayImage }
