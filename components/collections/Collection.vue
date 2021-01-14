<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-4 text-wrap">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-wrap"
          >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="120">
        <img :src="image" alt="" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text> Button </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import CollectionForm from '@/components/collections/CollectionForm'
import DialogFromCard from '~/mixins/DialogFromCard'
export default {
  // components: {
  //   CollectionForm,
  // },
  mixins: [DialogFromCard],
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      menuItems: [
        { id: 'edit', title: 'Edit collection' },
        { id: 'image', title: 'Set random Image' },
        { id: 'delete', title: 'Delete' },
        { id: 'test', title: 'Test' },
      ],
    }
  },
  computed: {
    collection() {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        image: this.image,
      }
    },
    trimmedDescription() {
      if (this.description) {
        if (this.description.length > 55) {
          return this.description.substr(0, 50) + '...'
        } else {
          return this.description
        }
      } else {
        return this.description
      }
    },
  },
  methods: {
    menuHandler(item) {
      switch (item.id) {
        case 'edit':
          this.dialogReverse()
          break
        case 'delete':
          this.toggleLoading()
          this.$store.dispatch('cards/deleteCard', { id: this.id })
          break
        case 'image':
          this.toggleLoading()
          this.$store.dispatch('cards/setRandomImage', this.card).then(() => {
            this.toggleLoading()
          })
          break
        case 'test':
          this.toggleLoading()
          // eslint-disable-next-line
          console.log(this.$store.getters['collections/loadedCollections'])
          // eslint-disable-next-line
          console.log(this.$store.getters['collections/loadedCollectionsTitles'])
          // eslint-disable-next-line
          console.log(this.$store.getters['cards/loadedCards'])
          this.$store.dispatch('cards/test').then(() => {
            this.toggleLoading()
          })
          break
      }
    },
  },
}
</script>

<style scoped>
.headline:hover {
  cursor: pointer;
}
.menu-item:hover {
  cursor: pointer;
}
</style>
