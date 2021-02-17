<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <h2>Let's go!</h2>
    <v-row>
      <v-col
        v-for="action in actions"
        :key="action.title"
        cols="12"
        sm="12"
        md="12"
        lg="6"
        xl="6"
      >
        <v-card
          dark
          class="mx-auto d-flex flex-column flex-md-row flex-no-wrap justify-space-between align-stretch"
          height="100%"
          :max-width="cardWidth"
        >
          <div class="flex-grow-0 flex-shrink-1 mx-auto">
            <v-img
              :style="imgWidth"
              :src="require('@/static/images/cards/' + action.image)"
              :aspect-ratio="1.5"
            ></v-img>
          </div>
          <div
            class="flex-grow-1 d-flex flex-column justify-space-around align-center"
          >
            <v-card-title class="headline" v-text="action.title"></v-card-title>
            <v-card-subtitle
              class="text-center"
              v-text="action.subTitle"
            ></v-card-subtitle>

            <v-card-actions>
              <v-btn nuxt link :href="action.link" color="primary">
                {{ action.call }}
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actions: [
        {
          title: 'Collections',
          subTitle: 'You can manage cards within an specific Collection',
          call: 'Go to Collections',
          link: '/collections',
          image: 'undraw_folder_39kl.svg',
        },
        {
          title: 'Cards',
          subTitle: 'You can manage all cards',
          call: 'Go to All Cards',
          link: '/cards',
          image: 'undraw_body_text_l3ld.svg',
        },
      ],
    }
  },
  computed: {
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '350'
        default:
          return null
      }
    },
    imgWidth() {
      let width
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          width = '180px'
          break
        case 'sm':
          width = '250px'
          break
        case 'md':
          width = '300px'
          break
        case 'lg':
          width = '200px'
          break
        default:
          width = '300px'
          break
      }
      return 'width: ' + width
    },
  },
}
</script>
