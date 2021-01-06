<template>
  <div>
    <v-container>
      <v-row>
        <v-text-field
          v-model="search"
          dark
          background-color="accent"
          solo-inverted
          flat
          label="Search"
          prepend-icon="mdi-file-find"
          clearable
          @click:clear="clearSearch"
        ></v-text-field>
        <v-spacer></v-spacer>
        <card-add></card-add>
      </v-row>

      <v-row v-if="filteredCards.length > 0">
        <v-col
          v-for="card in filteredCards"
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
      </v-row>
      <v-row v-else> No cards found according to the current search. </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '@/components/cards/Card'
import orderBy from 'lodash.orderby'
import CardAdd from '@/components/cards/CardAdd'
export default {
  components: {
    Card,
    CardAdd,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    currentCards() {
      return this.$store.getters['cards/loadedCards']
    },
    filteredCards() {
      return orderBy(
        this.currentCards.filter((item) => {
          if (!this.search || this.search.length < 2) return this.currentCards
          return (
            item.word.toLowerCase().includes(this.search.toLowerCase()) ||
            (item.annotation &&
              item.annotation.toLowerCase().includes(this.search.toLowerCase()))
          )
        }),
        'id'
      )
    },
  },
  methods: {
    clearSearch() {
      this.search = ''
    },
  },
}
</script>
