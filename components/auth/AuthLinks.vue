<template>
  <auth-links-anon v-if="!isAuthenticated"></auth-links-anon>
  <auth-links-logged v-else></auth-links-logged>
</template>

<script>
import AuthLinksAnon from '@/components/auth/AuthLinksAnon'
import AuthLinksLogged from '@/components/auth/AuthLinksLogged'
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
