<template>
  <v-card>
    <v-card-title> {{ word }} </v-card-title>
    <v-card-subtitle> {{ annotation }} </v-card-subtitle>
    <v-img v-if="image" :src="image"></v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    annotation: {
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
}
</script>
