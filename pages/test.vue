<template>
  <div>
    <user-form></user-form>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm'
export default {
  components: {
    UserForm,
  },
  middleware: ['auth'],
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
