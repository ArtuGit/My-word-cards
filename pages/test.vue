<template>
  <div>
    <v-btn color="primary" @click="axiosTest"> Axios Test</v-btn>
    <v-btn color="primary" @click="showSnackbar"> Show snackbar</v-btn>
  </div>
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
    axiosTest() {
      const authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        process.env.firebaseKey
      return this.$axios
        .$post(authUrl, {
          email: 'artu-bre@gmail.com',
          password: 'passat14',
          returnSecureToken: true,
        })
        .then((result) => {
          console.log(result)
          this.$notifier.showMessage({
            content: 'Register submitted!',
            color: 'success',
          })
        })
        .catch((e) => console.log(e))
    },
  },
}
</script>
