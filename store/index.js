import Vuex from 'vuex'
import axios from 'axios'
import cards from './cards'

const CreateStore = () => {
  return new Vuex.Store({
    modules: {
      cards,
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get('https://my-cards-2021-default-rtdb.firebaseio.com/words.json')
          .then((res) => {
            const cards = []
            for (const key in res.data) {
              cards.push({ ...res.data[key], id: key })
            }
            vuexContext.commit('cards/setCards', cards)
          })
          .catch((e) => context.error(e))
      },
    },
  })
}

export default CreateStore
