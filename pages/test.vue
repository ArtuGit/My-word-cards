<template>
  <div>
    <div>Test</div>
    <v-btn color="primary" @click="submit"> Run</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      const data = this.$store.getters.getCard('2')
      console.log(data.word)
    },
  },
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.card {
  width: 20%;
  @media #{map-get($display-breakpoints, 'lg-and-down')} {
    width: 30%;
  }
  @media #{map-get($display-breakpoints, 'md-and-down')} {
    width: 45%;
  }
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    width: 90%;
  }
}
</style>
