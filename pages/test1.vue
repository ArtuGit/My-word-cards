<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <v-card>
    <v-row>
      <v-col>
        <v-img
          :lazy-src="url"
          max-height="75"
          max-width="100"
          :src="url"
        ></v-img>
      </v-col>
      <v-col>
        <v-file-input
          ref="input1"
          v-model="image"
          show-size
          label="File input"
          type="file"
          accept="image/*"
          @change="Preview_image"
        ></v-file-input>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      url: null,
      image: null,
    }
  },
  methods: {
    Preview_image() {
      console.log(this.image.name)
      this.url = URL.createObjectURL(this.image)
    },
  },
}
</script>
