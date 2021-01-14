<template>
  <div>
    {{ collectionsAll }}
    <v-container>
      <v-row v-if="collectionsAll.length > 0">
        <v-col
          v-for="collection in collectionsAll"
          :key="collection.title"
          cols="12"
          sm="6"
          md="4"
          lg="4"
          xl="4"
        >
          <collection></collection>
        </v-col>
      </v-row>
      <v-row v-else>
        No collections found according to the current search.
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Collection from '@/components/collections/Collection'

export default {
  components: {
    Collection,
  },
  data() {
    return {}
  },
  computed: {
    collectionsAll() {
      return this.$store.getters['collections/loadedCollections']
    },
  },
}
</script>
