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
        this.user.firstName.charAt(0).toUpperCase() +
        '.'
      )
    },
  },
}
</script>
