<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <div class="text-h3 text-center py-12">Use Cases</div>
    <v-row>
      <v-col
        v-for="caseCurr in cases"
        :key="caseCurr.title"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
      >
        <v-card class="mx-auto" max-width="350" height="100%">
          <v-img
            contain
            :src="require('@/static/images/tmp/' + caseCurr.image)"
            :aspect-ratio="1.7778"
          ></v-img>
          <v-card-title>{{ caseCurr.title }}</v-card-title>
          <v-card-subtitle> {{ caseCurr.subTitle }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cases: [
        {
          title: 'Languages Learning',
          subTitle: '1,000 miles of wonder',
          image: 'undraw_professional_card_otb4.svg',
        },
        {
          title: 'New Terms Learning',
          subTitle: '2,000 miles of wonder',
          image: 'undraw_Modern_life_re_8pdp.svg',
        },
        {
          title: 'Inventories and Collections',
          subTitle: '3,000 miles of wonder',
          image: 'undraw_preferences_popup_wbfw.svg',
        },
      ],
    }
  },
}
</script>
