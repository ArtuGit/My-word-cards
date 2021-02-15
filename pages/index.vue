<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <use-cases></use-cases>
    <banner></banner>
  </div>
</template>

<script>
import Banner from '~/components/home/Banner'
import UseCases from '~/components/home/UseCases'
import Meta from '~/mixins/meta'

export default {
  components: {
    Banner,
    UseCases,
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
