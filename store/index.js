import Vuex from 'vuex'
import axios from 'axios'
import { searchImages } from 'pixabay-api'

const pixabayKey = '19446257-b0025af71a07915d6889c5664'

const CreateStore = () => {
  return new Vuex.Store({
    state: {
      myCards: [],
    },
    mutations: {
      setCards(state, cards) {
        state.myCards = cards
      },
      addCard(state, card) {
        state.myCards.push(card)
      },
      saveCard(state, card) {
        const index = state.myCards.findIndex((item) => item.id === card.id)
        if (index !== -1) state.myCards.splice(index, 1, card)
      },
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
            vuexContext.commit('setCards', cards)
          })
          .catch((e) => context.error(e))
      },
      setCards(vuexContext, cards) {
        vuexContext.commit('setCards', cards)
      },
      addCard(vuexContext, card) {
        card.image = ''
        searchImages(pixabayKey, card.word, { per_page: 3 })
          .then((r) => {
            if (r.total > 0) {
              card.image = r.hits[0].largeImageURL
              axios
                .post(
                  'https://my-cards-2021-default-rtdb.firebaseio.com/words.json',
                  card
                )
                .then((result) => {
                  vuexContext.commit('addCard', {
                    ...card,
                    id: result.data.name,
                  })
                })
                // eslint-disable-next-line no-console
                .catch((e) => console.log(e))
            }
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.error(e))
      },
      saveCard(vuexContext, card) {
        vuexContext.commit('saveCard', card)
      },
    },
    getters: {
      loadedCards(state) {
        return state.myCards
      },
      getCard: (state) => (id) => {
        return state.myCards[
          state.myCards.findIndex((element) => element.id === id)
        ]
      },
    },
  })
}

export default CreateStore
