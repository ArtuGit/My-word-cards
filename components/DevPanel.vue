<template>
  <v-sheet dark>
    <h3>Dev Panel</h3>
    <ul>
      <li>isAuthenticated: {{ isAuthenticated }}</li>
      <li>uuid: {{ uuid }}</li>
      <li>isDev: {{ isDev }}</li>
    </ul>
  </v-sheet>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    uuid() {
      return this.$store.getters['auth/uuid']
    },
    isDev() {
      return this.$store.getters.isDev
    },
  },
}
</script>

<style scoped>
.v-sheet {
  padding-right: 1rem;
}
</style>
