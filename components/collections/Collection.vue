<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyright (c) 2021.
  -->

<template>
  <v-card
    :loading="loading"
    min-height="100%"
    class="mx-auto d-flex flex-column flex-nowrap"
    outlined
  >
    <div class="d-flex flex-row flex-nowrap align-start">
      <v-list-item>
        <v-list-item-content>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on: title2, attrs2 }">
              <v-card-title>
                <div v-bind="attrs2" v-on="{ ...title2 }">
                  <v-list-item-title class="headline mb-4 text-wrap">
                    {{ title }}
                  </v-list-item-title>
                </div>
              </v-card-title>
            </template>
            <collection-form
              :id="id"
              :title="title"
              :description="description"
              :image="image"
              @dialog-reverse="dialogReverse"
              @toggle-loading="toggleLoading"
            >
            </collection-form>
          </v-dialog>

          <v-list-item-subtitle v-if="description" class="text-wrap">{{
            description
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item-avatar tile color="grey" size="120">
        <v-img v-if="image" :src="image" alt="" />
      </v-list-item-avatar>
    </div>
    <div class="mt-auto d-flex flex-row flex-nowrap">
      <v-card-actions>
        <v-btn
          nuxt
          link
          :href="`/cards/${title}`"
          class="px-3"
          outlined
          rounded
          text
        >
          {{ cardsCount }} {{ cardsButtonLabel }}</v-btn
        >
      </v-card-actions>
      <v-menu v-if="isAuthenticated" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-2" dark icon v-bind="attrs" v-on="on">
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
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import CollectionForm from '@/components/collections/CollectionForm'
import DialogFromCard from '~/mixins/DialogFromCard'
export default {
  components: {
    CollectionForm,
  },
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
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isAdmin: 'auth/isAdmin',
    }),
    menuItems() {
      const menu = [
        { id: 'edit', title: 'Edit collection' },
        { id: 'image', title: 'Set random Image' },
      ]
      if (this.cardsCount === 0) {
        menu.push({ id: 'delete', title: 'Delete' })
      }
      if (this.isAdmin) {
        menu.push({ id: 'test', title: 'Test' })
      }
      return menu
    },
    cardsCount() {
      return this.$store.getters['cards/countCardsWithCollection'](this.title)
    },
    cardsButtonLabel() {
      if (this.cardsCount !== 1) return 'cards'
      else return 'card'
    },
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
          this.$store
            .dispatch('collections/deleteCollection', this.collection)
            .then(() => {
              this.toggleLoading()
            })
          break
        case 'image':
          this.toggleLoading()
          this.$store
            .dispatch('collections/setRandomImage', this.collection)
            .then(() => {
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
          this.$store.dispatch('collections/test').then(() => {
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
