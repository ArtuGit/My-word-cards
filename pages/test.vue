<template>
  <div>
    <v-btn color="primary" @click="showSnackbar"> Show snackbar</v-btn>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
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
