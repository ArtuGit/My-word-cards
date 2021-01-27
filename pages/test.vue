<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2021.
  -->

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
    // eslint-disable-next-line
    console.log(
      this.$store.getters['cards/countCardsWithCollection']('Why questions')
    )
  },
}
</script>
