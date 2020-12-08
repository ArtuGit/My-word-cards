<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" align-self="center">
          <card-add></card-add>
        </v-col>

        <v-col
          v-for="card in myCards"
          :key="card.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <card
            :id="card.id"
            :word="card.word"
            :translation="card.translation"
            :image="card.image"
          >
          </card>
        </v-col>
      </v-row>
    </v-container>
    {{ loadedCards }}
  </div>
</template>

<script>
import Card from '@/components/Card'
import CardAdd from '@/components/CardAdd'
export default {
  components: {
    Card,
    CardAdd,
  },
  data() {
    return {
      myCards: [],
    }
  },
  computed: {
    loadedCards() {
      return this.$store.getters.loadedCards
    },
  },
  created() {
    this.$store.commit('index/setCards', {
      id: '4',
      word: 'This word',
      translation: 'Trans Word',
      image: 'https://picsum.photos/600/500?4',
    })
    this.myCards = this.$store.getters.loadedCards
  },
}
</script>
