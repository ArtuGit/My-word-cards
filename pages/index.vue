<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <banner></banner>
</template>

<script>
import Banner from '~/components/UI/Banner'
import Meta from '~/mixins/meta'

export default {
  components: {
    Banner,
  },
  mixins: [Meta],
  asyncData() {
    return {
      title: 'My Word Cards',
      description: 'Lorem ipsum 0', // ToDo
    }
  },
  head: {
    titleTemplate: 'Word Cards',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '[to be specified2]', // ToDo
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
}
</script>
