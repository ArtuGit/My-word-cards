<template>
  <h1>Test</h1>
</template>

<script>
export default {
  mounted() {
    console.log(
      this.$store.getters['cards/countCardsWithCollection']('Why questions')
    )
  },
}
</script>
