<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft 2020-2021.
  -->

<template>
  <v-footer class="mt-15" dark padless>
    <v-container fluid>
      <v-row no-gutters align="center" justify="center">
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
          Developed by
          <a href="https://github.com/ArtuGit" rel="noopener">Artu</a>
        </v-col>
        <v-col cols="12" lg="4" md="12" class="f-section pa-2">
          <div>Powered by</div>
          <div class="logo">
            <a href="https://pixabay.com/" rel="noopener" target="_blank">
              <img src="@/static/images/logos/Pixabay.svg" width="" alt="" />
            </a>
          </div>
        </v-col>
      </v-row>
      <v-row id="sub-footer" no-gutters>
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

<style lang="scss" scoped>
.f-section {
  text-align: center;
}
.logo img {
  max-height: 33px;
}

#slogan {
  letter-spacing: 2px;
}

#sub-footer {
  background-color: #006400;
}
</style>
