<template>
  <h1>Home</h1>
</template>

<script>
import Meta from '~/mixins/meta'

export default {
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
