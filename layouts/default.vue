<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

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
      <auth-links v-if="pagePath != 'auth'"></auth-links>
      <dev-panel v-if="isDev && !miniVariant"></dev-panel>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn aria-label="Mini" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <h1>
        <v-toolbar-title v-text="pageTitle" />
      </h1>
      <v-spacer />
      <user-bar v-if="isAuthenticated"></user-bar>
    </v-app-bar>
    <v-main>
      <Snackbar></Snackbar>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <a-footer></a-footer>
  </v-app>
</template>

<script>
import AuthLinks from '@/components/auth/AuthLinks'
import DevPanel from '@/components/DevPanel'
import Snackbar from '@/components/UI/Snackbar'
import UserBar from '@/components/UI/UserBar'
import AFooter from '@/components/UI/Footer'
import { mapGetters } from 'vuex'
export default {
  middleware: ['check-auth'],
  components: {
    UserBar,
    Snackbar,
    AuthLinks,
    DevPanel,
    AFooter,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      title: 'My Word Cards',
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isAdmin: 'auth/isAdmin',
    }),
    isDev() {
      return this.$store.getters.isDev
    },
    pageTitle(state) {
      return this.$store.getters.pageTitle
    },
    pagePath() {
      return this.$route.name
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    items() {
      const menu = [
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
      ]
      if (this.isAdmin) {
        menu.push({ icon: 'mdi-test-tube', title: 'Test', to: '/test' })
      }
      return menu
    },
  },
}
</script>

<style>
.border {
  border: 1px solid gold;
}
</style>
