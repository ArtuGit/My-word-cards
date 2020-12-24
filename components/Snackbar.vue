<template>
  <v-snackbar v-model="show" :color="color">
    {{ message }}
    <v-btn text @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: '',
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'cards/showMessage') {
        this.message = state.cards.content
        this.color = state.cards.color
        this.show = true
      }
    })
  },
}
</script>
