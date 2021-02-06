<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
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
  emits: ['update-image'],
  props: {
    imageExisted: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      imageDialogURLTemp: null,
      imageDialogObj: null,
    }
  },
  computed: {
    imageDialogDisplayed() {
      return this.imageDialogURLTemp
        ? this.imageDialogURLTemp
        : this.imageExisted
    },
  },
  methods: {
    processImage() {
      if (this.imageDialogObj) {
        this.imageDialogURLTemp = URL.createObjectURL(this.imageDialogObj)
      } else {
        this.imageDialogURLTemp = null
      }
      this.$emit('update-image', this.imageDialogURLTemp)
    },
  },
}
</script>
