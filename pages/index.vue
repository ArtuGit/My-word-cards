<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <banner></banner>
    <use-cases></use-cases>
    <capabilities></capabilities>
  </div>
</template>

<script>
import Banner from '~/components/home/Banner'
import UseCases from '~/components/home/UseCases'
import Capabilities from '~/components/home/Capabilities'
import Meta from '~/mixins/meta'

export default {
  components: {
    Banner,
    UseCases,
    Capabilities,
  },
  mixins: [Meta],
  asyncData() {
    return {
      title: 'My Word Cards',
    }
  },
  head: {
    titleTemplate: 'My Word Cards',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Simple Word Cards',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
}
</script>

<style lang="scss">
h2 {
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  font-size: 2rem;
}
</style>
