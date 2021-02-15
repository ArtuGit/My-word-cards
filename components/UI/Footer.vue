<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <v-footer dark padless>
    <v-container fluid>
      <v-row no-gutters class="d-flex">
        <v-col
          id="slogan"
          cols="12"
          lg="4"
          md="6"
          class="f-section pa-2 font-weight-bold font-italic"
        >
          Enjoy your word cards!
        </v-col>
        <v-col cols="12" lg="4" md="6" class="f-section pa-2">
          Developed by <a href="https://github.com/ArtuGit">Artu</a>
        </v-col>
        <v-col cols="12" lg="4" md="12" class="f-section pa-2">
          <div>Powered by</div>
          <div class="logo">
            <a href="https://pixabay.com/" target="_blank"
              ><img src="@/static/images/logos/Pixabay.svg"
            /></a>
          </div>
          <div class="logo">
            <a href="https://firebase.google.com/" target="_blank"
              ><img src="@/static/images/logos/Firebase.svg"
            /></a>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="pa-2 text-center">
          {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped>
.logo img {
  max-height: 50px;
}
.f-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#slogan {
  letter-spacing: 2px;
}
</style>
