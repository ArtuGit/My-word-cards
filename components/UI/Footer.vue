<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <v-footer dark padless>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" sm="4" class="pa-2"> Enjoy your word cards! </v-col>
        <v-col cols="12" sm="4" class="pa-2">
          Developed by <a href="https://github.com/ArtuGit">Artu</a>
        </v-col>
        <v-col cols="12" sm="4" class="pa-2">
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
        <v-col cols="12" class="pa-2">
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

<style>
.logo img {
  max-height: 50px;
}
</style>
