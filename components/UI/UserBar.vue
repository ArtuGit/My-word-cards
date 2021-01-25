<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2021.
  -->

<template>
  <v-chip> {{ displayedName }} </v-chip>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    displayedName() {
      return (
        this.user.firstName +
        ' ' +
        this.user.lastName.charAt(0).toUpperCase() +
        '.'
      )
    },
  },
}
</script>
