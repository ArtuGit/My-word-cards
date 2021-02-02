<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->
<template>
  <v-card>
    <v-row>
      <v-col cols="2">
        <v-img
          :lazy-src="imageDialogDisplayed"
          :src="imageDialogDisplayed"
          max-height="75"
          max-width="100"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <v-file-input
          ref="input1"
          v-model="imageDialogObj"
          show-size
          label="New file"
          type="file"
          accept="image/*"
          @change="processImage"
        ></v-file-input>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      imageDialogURLTemp: null,
      imageDialogObj: null,
      input: {
        image:
          'https://knowpathology.com.au/app/uploads/2018/07/Happy-Test-Screen-01.png',
      },
    }
  },
  computed: {
    imageDialogDisplayed() {
      return this.imageDialogURLTemp
        ? this.imageDialogURLTemp
        : this.input.image
    },
  },
  methods: {
    processImage() {
      console.log(this.imageDialogObj.name)
      this.imageDialogURLTemp = URL.createObjectURL(this.imageDialogObj)
    },
  },
}
</script>
