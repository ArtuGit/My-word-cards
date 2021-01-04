<template>
  <auth-links-anon v-if="!isAuthenticated"></auth-links-anon>
  <auth-links-logged v-else></auth-links-logged>
</template>

<script>
import AuthLinksAnon from '@/components/AuthLinksAnon'
import AuthLinksLogged from '@/components/AuthLinksLogged'
export default {
  components: {
    AuthLinksAnon,
    AuthLinksLogged,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
}
</script>
