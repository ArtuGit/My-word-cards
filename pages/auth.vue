<template>
  <div>
    <h1>Authentication</h1>
    <div class="d-flex flex-column">
      <v-alert dark border="left" type="warning">
        You are not authorized to access this page. Please
        <strong>login</strong> or <strong>register</strong> below.
      </v-alert>
      <auth-form
        id="auth-form"
        :dialog="false"
        class="mt-12 align-self-center"
        :tab-init="tab"
        @redirect="redirect"
      ></auth-form>
    </div>
  </div>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm'
export default {
  components: {
    AuthForm,
  },
  data() {
    return {
      tab: 0,
    }
  },
  methods: {
    redirect() {
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect)
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>

<style scoped>
#auth-form {
  max-width: 600px;
  min-width: 360px;
}
</style>
