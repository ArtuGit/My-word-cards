<template>
  <v-list>
    <v-list-item>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        min-width="360px"
        :retain-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-list-item-action v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content v-bind="attrs" v-on="on">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </template>
        <user-form :dialog="true" @dialog-reverse="dialogReverse"> </user-form>
      </v-dialog>
    </v-list-item>

    <v-list-item @click="logout">
      <v-list-item-action>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import UserForm from '~/components/user/UserForm'

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    dialogReverse() {
      this.dialog = false
    },
    logout() {
      this.$store.dispatch('auth/logout', {
        redirectTo: 'index',
        message: true,
      })
      this.dialogReverse()
    },
  },
}
</script>
