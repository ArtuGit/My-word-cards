<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

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
        <v-col v-if="isAuthenticated">
          <add-button form-type="addCollection"> </add-button>
        </v-col>
      </v-row>

      <v-row v-if="collectionsFiltered.length > 0">
        <v-col
          v-for="collection in collectionsFiltered"
          :key="collection.id"
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="4"
        >
          <collection
            :id="collection.id"
            :ref="collection.id"
            :title="collection.title"
            :description="collection.description"
            :image-path="collection.imagePath"
            :image="collection.image"
          ></collection>
        </v-col>
      </v-row>
      <v-row v-else>
        No collections found according to the current search criteria.
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Collection from '@/components/collections/Collection'
import AddButton from '@/components/UI/AddButton'
import orderBy from 'lodash.orderby'
import Meta from '~/mixins/meta'

export default {
  components: {
    Collection,
    AddButton,
  },
  mixins: [Meta],
  asyncData() {
    return {
      title: 'Collections',
      description: 'Lorem ipsum',
    }
  },
  data() {
    return {
      orderList: [
        { text: 'Adding date, Asc', value: ['id', 'asc'] },
        { text: 'Adding date, Desc', value: ['id', 'desc'] },
        { text: 'Alphabet, Asc', value: ['title', 'asc'] },
        { text: 'Alphabet, Desc', value: ['title', 'desc'] },
      ],
      orderBy: ['id', 'asc'],
      search: '',
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isAdmin: 'auth/isAdmin',
    }),
    collectionsAll() {
      return this.$store.getters['collections/loadedCollections']
    },
    collectionsFiltered() {
      if (this.collectionsAll) {
        return orderBy(
          this.collectionsAll.filter((item) => {
            return (
              !this.search ||
              this.search.length < 2 ||
              item.title.toLowerCase().includes(this.search.toLowerCase()) ||
              (item.description &&
                item.description
                  .toLowerCase()
                  .includes(this.search.toLowerCase()))
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
