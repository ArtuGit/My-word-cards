<template>
  <div>Test</div>
</template>

<script>
import { searchImages } from 'pixabay-api'
const authKey = '19446257-b0025af71a07915d6889c5664'
searchImages(authKey, 'puppy', { per_page: 3 }).then((r) =>
  console.log(r.hits[0].largeImageURL)
)
export default {}
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
