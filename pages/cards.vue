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
            :annotation="card.annotation"
            :image="card.image"
          >
          </card>
        </v-col>
        <v-col
          v-if="myCards.length > 10"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          align-self="center"
        >
          <card-add></card-add>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '@/components/cards/Card'
import CardAdd from '@/components/cards/CardAdd'
export default {
  components: {
    Card,
    CardAdd,
  },
  computed: {
    myCards() {
      return this.$store.getters['cards/loadedCards']
    },
  },
}
</script>
