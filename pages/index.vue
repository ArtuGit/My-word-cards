<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <use-cases></use-cases>
    <!--    <banner></banner>-->
  </div>
</template>

<script>
// import Banner from '~/components/home/Banner'
import UseCases from '~/components/home/UseCases'

export default {
  components: {
    //    Banner,
    UseCases,
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
