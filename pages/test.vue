<template>
  <div>
    <h1>Test</h1>
    {{ count }}
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.getters['cards/countCardsWithCollection'](
        'Why questions'
      )
    },
  },
  mounted() {
    console.log(
      this.$store.getters['cards/countCardsWithCollection']('Why questions')
    )
  },
}
</script>
