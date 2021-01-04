<template>
  <v-list>
    <v-list-item>
      <v-list-item-action>
        <v-icon>mdi-account</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item-content>
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
export default {
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
