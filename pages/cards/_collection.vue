<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <div>
    <warning-demo v-if="!isAuthenticated"></warning-demo>
    <cards collections-filter-hide :collection-param="collection"></cards>
  </div>
</template>

<script>
import WarningDemo from '@/components/UI/WarningDemo'
import { mapGetters } from 'vuex'
import Meta from '~/mixins/meta'
import Cards from '~/components/cards/Cards'
export default {
  components: {
    Cards,
    WarningDemo,
  },
  mixins: [Meta],
  asyncData(data) {
    const collection = data.store.getters['collections/getByTitle'](
      data.route.params.collection
    )
    const meta = {}
    Object.assign(
      meta,
      { title: collection.title },
      { description: collection.description }
    )
    return meta
  },
  validate(data) {
    return !!data.store.getters['collections/getByTitle'](
      data.route.params.collection
    )
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    collection() {
      return this.$store.getters['collections/getByTitle'](
        this.$route.params.collection
      )
    },
  },
}
</script>
