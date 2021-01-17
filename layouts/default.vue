<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <auth-links v-if="page != 'auth'"></auth-links>
      <dev-panel v-if="isDev && !miniVariant"></dev-panel>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" /> {{ pageTitle }}
      <v-spacer />
      <user-bar v-if="isAuthenticated"></user-bar>
    </v-app-bar>
    <v-main>
      <Snackbar></Snackbar>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AuthLinks from '@/components/auth/AuthLinks'
import DevPanel from '@/components/DevPanel'
import Snackbar from '@/components/UI/Snackbar'
import UserBar from '@/components/UI/UserBar'
export default {
  middleware: ['check-auth'],
  components: {
    UserBar,
    Snackbar,
    AuthLinks,
    DevPanel,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-folder',
          title: 'Collections',
          to: '/collections',
        },
        {
          icon: 'mdi-cards',
          title: 'Cards',
          to: '/cards',
        },
        {
          icon: 'mdi-test-tube',
          title: 'Test',
          to: '/test',
        },
      ],
      miniVariant: false,
      right: true,
      title: 'My Word Cards',
    }
  },
  computed: {
    isDev() {
      return this.$store.getters.isDev
    },
    pageTitle(state) {
      return this.$store.getters.pageTitle
    },
    page() {
      return this.$route.name
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
}
</script>

<style>
.border {
  border: 1px solid gold;
}
</style>
