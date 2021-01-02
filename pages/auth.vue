<template>
  <div class="d-flex flex-column">
    <v-alert dark border="left" type="warning">
      You are not authorized to access this page. Please
      <strong>login</strong> or <strong>register</strong> below.
    </v-alert>
    <auth-form
      id="auth-form"
      class="mt-12 align-self-center"
      :tab-init="tab"
    ></auth-form>
  </div>
</template>

<script>
import AuthForm from '@/components/AuthForm'
export default {
  components: {
    AuthForm,
  },
  data() {
    return {
      tab: 0,
    }
  },
}
</script>

<style scoped>
#auth-form {
  max-width: 600px;
  min-width: 360px;
}
</style>
