<template>
  <v-card :loading="loading">
    <v-card-title>
      <span class="headline">Edit User</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="formUser" v-model="valid" lazy-validation>
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
      <v-btn
        color="primary"
        text
        :disabled="submitButtonState"
        @click="submitUser"
        >Save
      </v-btn>
      <v-btn color="primary" text @click="cancel"> Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  emit: ['dialog-reverse'],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    input: {
      firstName: '',
      lastName: '',
    },
    loading: false,
    valid: false,
    firstName: '',
    lastName: '',
    email: '',
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  computed: {
    submitButtonState() {
      return (
        (this.input.firstName === this.firstName &&
          this.input.lastName === this.lastName) ||
        this.firstName.length === 0 ||
        this.lastName.length === 0
      )
    },
  },
  mounted() {
    const user = this.$store.getters['auth/user']
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.input.firstName = user.firstName
    this.input.lastName = user.lastName
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading
    },
    cancel() {
      this.$emit('dialog-reverse')
    },
    submitUser() {
      if (this.$refs.formUser.validate()) {
        this.toggleLoading()
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
        }
        this.$store.dispatch('auth/setUserData', userData).then(() => {
          this.input.firstName = this.firstName
          this.input.lastName = this.lastName
          this.toggleLoading()
          this.$emit('dialog-reverse')
        })
      }
    },
  },
}
</script>
