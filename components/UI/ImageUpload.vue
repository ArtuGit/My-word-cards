<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->
<template>
  <div class="mt-4">
    <v-sheet>
      <v-row>
        <v-col cols="3" class="d-flex flex-column">
          <v-img
            v-if="imageDialogURLTemp"
            class="d-block"
            :lazy-src="imageDialogURLTemp"
            :src="imageDialogURLTemp"
            max-height="225"
          ></v-img>
        </v-col>
        <v-col cols="9">
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
    </v-sheet>
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
