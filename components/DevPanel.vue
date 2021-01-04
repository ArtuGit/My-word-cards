<template>
  <v-sheet dark>
    <h3>Dev Panel</h3>
    <ul>
      <li>isAuthenticated: {{ isAuthenticated }}</li>
      <li v-if="user.uuid">user.uuid: {{ user.uuid }}</li>
      <li v-if="user.email">user.email: {{ user.email }}</li>
      <li v-if="user.firstName">user.firstName: {{ user.firstName }}</li>
      <li v-if="user.lastName">user.lastName: {{ user.lastName }}</li>
      <li v-if="user.isAdmin">user.isAdmin: {{ user.isAdmin }}</li>
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
    user() {
      return this.$store.getters['auth/user']
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
