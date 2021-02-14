<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <div>
    <warning-demo v-if="!isAuthenticated"></warning-demo>
    <cards></cards>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WarningDemo from '@/components/UI/WarningDemo'
import Cards from '~/components/cards/Cards'
import Meta from '~/mixins/meta'

export default {
  components: {
    WarningDemo,
    Cards,
  },
  mixins: [Meta],
  asyncData() {
    return {
      title: 'Cards',
      description: 'Lorem ipsum 2', // ToDo
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isAdmin: 'auth/isAdmin',
    }),
  },
}
</script>
