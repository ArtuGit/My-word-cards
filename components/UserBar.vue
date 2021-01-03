<template>
  <v-chip> {{ shortName }} </v-chip>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    shortName() {
      return this.user.firstName
    },
  },
}
</script>
