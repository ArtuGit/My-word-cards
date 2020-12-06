<template>
  <div>
    <v-container class="d-flex flex-wrap justify-space-around lighten-4">
      <v-card v-for="n in 8" :key="n" class="card pa-2" outlined tile>
        Card {{ n }}
      </v-card>
    </v-container>
  </div>
</template>

<!--<script>
export default {
  data: () => ({
  }),
}
</script>-->

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
