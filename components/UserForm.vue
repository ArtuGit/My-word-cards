<template>
  <v-card>
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
    valid: true,
    firstName: '',
    lastName: '',
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  mounted() {
    const user = this.$store.getters['auth/user']
    this.firstName = user.firstName
    this.lastName = user.lastName
  },
  methods: {
    cancel() {
      console.log('Cancel!')
    },
    submitUser() {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
      }
      console.log('Before Update!')
      this.$store.dispatch('auth/setUserData', userData).then(() => {
        console.log('Updated!')
      })
    },
  },
}
</script>
