<template>
  <v-sheet dark> isAuthenticated: {{ isAuthenticated }} </v-sheet>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
}
</script>

<style scoped>
.v-sheet {
  padding-left: 3rem;
  padding-right: 3rem;
}
</style>
