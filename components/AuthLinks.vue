<template>
  <div>
    <v-list v-if="!isAuthenticated">
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
        <v-dialog
          v-model="dialog[item.tab]"
          persistent
          max-width="600px"
          min-width="360px"
          :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-action v-bind="attrs" v-on="on">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content v-bind="attrs" v-on="on">
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>
          <auth-form :tab-init="item.tab" @dialog-reverse="dialogReverse">
          </auth-form>
        </v-dialog>
      </v-list-item>
    </v-list>
    <v-list v-else>
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
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
      dialog: [false, false],
      items: [
        {
          title: 'Login',
          icon: 'mdi-account',
          tab: 0,
        },
        {
          title: 'Register',
          icon: 'mdi-account-outline',
          tab: 1,
        },
      ],
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },

  methods: {
    dialogReverse() {
      this.dialog = [false, false]
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
