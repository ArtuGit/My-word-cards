<template>
  <cards></cards>
</template>

<script>
import Cards from '~/components/cards/Cards'
import Meta from '~/mixins/meta'

export default {
  components: {
    Cards,
  },
  mixins: [Meta],
  asyncData() {
    return {
      title: 'Cards',
      description: 'Lorem ipsum 2', // ToDo
    }
  },
}
</script>
