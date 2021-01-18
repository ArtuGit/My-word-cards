<template>
  <h1>Cards with "{{ collection.title }}" collection</h1>
</template>

<script>
import Meta from '~/mixins/meta'
export default {
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
    collection() {
      return this.$store.getters['collections/getByTitle'](
        this.$route.params.collection
      )
    },
  },
}
</script>
