<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            dark
            background-color="accent"
            solo
            flat
            label="Search"
            prepend-icon="mdi-file-find"
            clearable
            @click:clear="clearSearch"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="collectionsSelected"
            :items="collectionsAll"
            dark
            solo
            flat
            chips
            small-chips
            label="Collections"
            multiple
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-select
            v-model="orderBy"
            :items="orderList"
            flat
            dense
            filled
            label="Order by:"
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <add-button form-type="addCard"> </add-button>
        </v-col>
      </v-row>

      <v-row v-if="cardsFiltered.length > 0">
        <v-col
          v-for="card in cardsFiltered"
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
            :collections="card.collections"
          >
          </card>
        </v-col>
      </v-row>
      <v-row v-else>
        No cards found according to the current search criteria.
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '@/components/cards/Card'
import AddButton from '@/components/UI/AddButton'
import orderBy from 'lodash.orderby'

export default {
  components: {
    Card,
    AddButton,
  },
  data() {
    return {
      orderList: [
        { text: 'Adding date, Asc', value: ['id', 'asc'] },
        { text: 'Adding date, Desc', value: ['id', 'desc'] },
        { text: 'Alphabet, Asc', value: ['word', 'asc'] },
        { text: 'Alphabet, Desc', value: ['word', 'desc'] },
      ],
      orderBy: ['id', 'asc'],
      search: '',
      collectionsSelected: [],
    }
  },
  computed: {
    collectionsAll() {
      return this.$store.getters['collections/loadedCollectionsTitles']
    },
    cardsAll() {
      return this.$store.getters['cards/loadedCards']
    },
    cardsFiltered() {
      if (this.cardsAll) {
        return orderBy(
          this.cardsAll.filter((item) => {
            return (
              (!this.search ||
                this.search.length < 2 ||
                item.word.toLowerCase().includes(this.search.toLowerCase()) ||
                (item.annotation &&
                  item.annotation
                    .toLowerCase()
                    .includes(this.search.toLowerCase()))) &&
              (this.collectionsSelected.length === 0 ||
                (item.collections &&
                  this.collectionsSelected.some((r) =>
                    item.collections.includes(r)
                  )))
            )
          }),
          this.orderBy[0],
          this.orderBy[1]
        )
      } else return []
    },
  },
  methods: {
    clearSearch() {
      this.search = ''
    },
  },
}
</script>
