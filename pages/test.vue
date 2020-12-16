<template>
  <div>
    <div>
      <div>Test</div>
      <v-btn color="primary" @click="submit"> Run</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async submit() {
      await this.$store.dispatch('cards/testPage', 0)
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
