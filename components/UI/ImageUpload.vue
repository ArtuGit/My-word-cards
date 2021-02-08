<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->
<template>
  <div class="mt-4">
    <v-card>
      <v-row>
        <div>The Image: {{ imageDialogURLTemp }}</div>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-img
            :lazy-src="imageDialogURLTemp"
            :src="imageDialogURLTemp"
            max-height="75"
            max-width="100"
          ></v-img>
        </v-col>
        <v-col cols="10">
          <v-file-input
            ref="input1"
            v-model="imageDialogObj"
            show-size
            label="Image file"
            type="file"
            accept="image/*"
            @change="processImage"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { getBlobFromURL } from '@/plugins/api-helpers'
export default {
  emits: ['update-image'],
  props: {
    imageExisted: {
      type: String,
      required: false,
      default: null,
    },
  },
  async fetch() {
    this.imageDialogObj = await getBlobFromURL(this.imageExisted)
  },
  data() {
    return {
      imageDialogURLTemp: null,
      imageDialogObj: null,
    }
  },
  watch: {
    async imageExisted(newVal, oldVal) {
      this.imageDialogURLTemp = newVal
      this.imageDialogObj = await getBlobFromURL(this.imageDialogURLTemp)
    },
  },
  mounted() {
    this.imageDialogURLTemp = this.imageExisted
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
