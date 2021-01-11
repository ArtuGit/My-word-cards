<template>
  <v-card :loading="loading" height="100%">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on: title, attrs2 }">
        <v-card-title>
          <div v-bind="attrs2" v-on="{ ...title }">
            <span class="headline">{{ word }}</span>
          </div>
          <v-spacer></v-spacer>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in menuItems"
                :key="item.id"
                class="menu-item"
              >
                <v-list-item-title @click="menuHandler(item)">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
      </template>
      <card-form
        :id="id"
        :word="word"
        :annotation="annotation"
        :image="image"
        :collections="collections"
        @dialog-reverse="dialogReverse"
      >
      </card-form>
    </v-dialog>

    <v-card-subtitle v-if="trimmedAnnotation">
      {{ trimmedAnnotation }}
    </v-card-subtitle>
    <v-img v-if="image" :src="image"></v-img>
  </v-card>
</template>

<script>
import CardForm from '@/components/cards/CardForm'
export default {
  components: {
    CardForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    annotation: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    collections: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      menuItems: [
        { id: 'edit', title: 'Edit card' },
        { id: 'image', title: 'Set random Image' },
        { id: 'delete', title: 'Delete' },
        { id: 'test', title: 'Test' },
      ],
    }
  },
  computed: {
    card() {
      return {
        id: this.id,
        word: this.word,
        annotation: this.annotation,
        image: this.image,
      }
    },
    trimmedAnnotation() {
      if (this.annotation) {
        if (this.annotation.length > 55) {
          return this.annotation.substr(0, 50) + '...'
        } else {
          return this.annotation
        }
      } else {
        return this.annotation
      }
    },
  },
  methods: {
    dialogReverse() {
      this.dialog = !this.dialog
    },
    toggleLoading() {
      this.loading = !this.loading
    },
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
          console.log(this.$store.getters['cards/loadedCollections'])
          // eslint-disable-next-line
          console.log(this.$store.getters['cards/loadedCollectionsTitles'])
          this.$store.dispatch('cards/test', this.card).then(() => {
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
