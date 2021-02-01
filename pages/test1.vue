<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <div>
    {{ url }}
    {{ image }}
    <v-file-input v-model="image" @change="Preview_image"></v-file-input>
    <v-img :src="url"></v-img>
  </div>
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
      console.log(this.image)
      this.url = URL.createObjectURL(this.image)
    },
  },
}
</script>
