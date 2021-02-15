<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <v-container fluid>
      <video
        playsinline
        autoplay
        muted
        loop
        poster="~/static/images/banner.jpg"
      >
        <source :src="require('~/static/videos/banner.mp4')" type="video/mp4" />
      </video>
    </v-container>

    <v-container fluid>
      <v-carousel v-model="model">
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    }
  },
  computed: {
    cols() {
      const { lg, sm } = this.$vuetify.breakpoint
      return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
    },
  },
}
</script>

<style>
video {
  object-fit: cover;
}
</style>
