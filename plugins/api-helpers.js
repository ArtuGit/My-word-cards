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
    return largeImageURL
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

async function firebaseOp(type, entry, payload, axios) {
  try {
    if (typeof axios !== 'function') {
      throw new TypeError('Axios not available')
    }
    let response = ''
    let result = ''
    switch (type) {
      case 'GET':
        response = await axios.$get('/words.json')
        result = response
        break
      case 'POST':
        response = await axios.$post(`/${entry}.json`, payload)
        result = response.name
        break
      case 'PUT':
        response = await axios.$put(
          `/${entry}/` + payload.id + '.json',
          payload
        )
        result = response
        break
      case 'PATCH':
        response = await axios.$patch(
          `/${entry}/` + payload.id + '.json',
          payload
        )
        result = response
        break
      case 'DELETE':
        response = await axios.$delete(`/${entry}/` + payload.id + '.json')
        result = response
        break
    }
    return result
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

export { fakeRequestPromise, getPixabayImage, firebaseOp }
