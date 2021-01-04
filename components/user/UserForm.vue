<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="firstName"
          :rules="[rules.required]"
          label="First Name"
          maxlength="20"
          required
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :rules="[rules.required]"
          label="Last Name"
          maxlength="20"
          required
        ></v-text-field>
        <v-text-field :value="email" label="Email" disabled></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text :disabled="!valid" @click="submitUser"
        >Save
      </v-btn>
      <v-btn color="primary" text @click="cancel"> Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    firstName: '',
    lastName: '',
    email: '',
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  mounted() {
    const user = this.$store.getters['auth/user']
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading
    },
    cancel() {
      console.log('Cancel!')
    },
    submitUser() {
      this.toggleLoading()
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
      }
      this.$store.dispatch('auth/setUserData', userData).then(() => {
        this.toggleLoading()
      })
    },
  },
}
</script>
