/*
 * Developed by Artu, https://github.com/ArtuGit
 *  Copyleft, 2021.
 */

import colors from 'vuetify/es5/util/colors'
import bodyParser from 'body-parser'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | My Word Cards',
    title: 'My Word Cards',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // SCSS file in the project
    '@/assets/common.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/notifier.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL || 'https://my-cards-2021-default-rtdb.firebaseio.com',
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyC6Vj36jf4TfeP2QBS6ojGzKS9ru2ojG7I',
      //authDomain: '<authDomain>',
      //databaseURL: '<databaseURL>',
      projectId: 'my-cards-2021',
      storageBucket: 'gs://my-cards-2021.appspot.com',
      //messagingSenderId: '<messagingSenderId>',
      //appId: '<appId>',
      //measurementId: '<measurementId>'
    },
    services: {
      storage: true,
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true
        }
      })
    }
  },
  env: {
    pixabayKey: '19446257-b0025af71a07915d6889c5664',
    firebaseKey: 'AIzaSyC6Vj36jf4TfeP2QBS6ojGzKS9ru2ojG7I',
  },

  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ]
}
