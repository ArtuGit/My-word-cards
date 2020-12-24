<template>
  <v-btn color="primary" @click="showSnackbar"> Show snackbar </v-btn>
</template>

<script>
export default {
  methods: {
    showSnackbar() {
      this.$notifier.showMessage({
        content: 'Hello, snackbar!',
        color: 'success',
      })
    },
  },
}
</script>
