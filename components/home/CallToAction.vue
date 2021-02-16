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
          class="mx-auto d-flex flex-no-wrap justify-space-between align-stretch"
          height="100%"
        >
          <div class="flex-grow-0 flex-shrink-1" style="border: 1px solid gold">
            <v-img
              :style="imgWidth"
              :src="require('@/static/images/cards/' + action.image)"
              :aspect-ratio="1.5"
            ></v-img>
          </div>
          <div class="flex-grow-1" style="border: 1px solid gold">
            <v-card-title class="headline" v-text="action.title"></v-card-title>
            <v-card-subtitle v-text="action.subTitle"></v-card-subtitle>

            <v-card-actions>
              <v-btn fab icon> </v-btn>

              <v-btn color="primary">
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
          image: 'undraw_work_from_anywhere_7sdx.svg',
        },
        {
          title: 'Cards',
          subTitle: 'You can manage all cards',
          call: 'Go to All Cards',
          link: '/cards',
          image: 'undraw_Modern_life_re_8pdp.svg',
        },
      ],
    }
  },
  computed: {
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
