<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <v-card :loading="loading || loadingProp" height="100%">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on: title, attrs2 }">
        <v-card-title>
          <div v-if="isAuthenticated" v-bind="attrs2" v-on="{ ...title }">
            <span class="active headline">{{ word }}</span>
          </div>
          <div v-else>
            <span class="headline">{{ word }}</span>
          </div>
          <v-spacer></v-spacer>
          <v-menu
            v-if="isAuthenticated && !loading && !loadingProp"
            bottom
            left
          >
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
        :image-path="imagePath"
        :collections="collections"
        @dialog-reverse="dialogReverse"
        @toggle-loading="toggleLoading"
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
import { mapGetters } from 'vuex'
import CardForm from '@/components/cards/CardForm'
import DialogFromCard from '~/mixins/DialogFromCard'
export default {
  components: {
    CardForm,
  },
  mixins: [DialogFromCard],
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
    imagePath: {
      type: String,
      required: false,
      default: null,
    },
    collections: {
      type: Array,
      required: false,
      default: null,
    },
    loadingProp: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isAdmin: 'auth/isAdmin',
    }),
    menuItems() {
      const menu = [
        { id: 'edit', title: 'Edit card' },
        { id: 'image', title: 'Set random Image' },
        { id: 'delete', title: 'Delete' },
      ]
      if (this.isAdmin) {
        menu.push({ id: 'test', title: 'Test' })
      }
      return menu
    },
    card() {
      return {
        id: this.id,
        word: this.word,
        annotation: this.annotation,
        image: this.image,
        collections: this.collections,
      }
    },
    trimmedAnnotation() {
      if (this.annotation) {
        if (this.annotation.length > 105) {
          return this.annotation.substr(0, 100) + '...'
        } else {
          return this.annotation
        }
      } else {
        return this.annotation
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
          this.$store
            .dispatch('cards/deleteCard', {
              id: this.id,
              imagePath: this.imagePath,
            })
            .then(() => {
              this.toggleLoading()
            })
          break
        case 'image':
          this.toggleLoading()
          this.card.params = {
            imageType: 'random',
            imagePathOld: this.imagePath,
          }
          this.$store.dispatch('cards/setCardImage', this.card).then(() => {
            this.toggleLoading()
          })
          break
        case 'test':
          // eslint-disable-next-line
          console.log(this.card)
          break
      }
    },
  },
}
</script>

<style scoped>
.active.headline:hover {
  cursor: pointer;
}
.menu-item:hover {
  cursor: pointer;
}
</style>
