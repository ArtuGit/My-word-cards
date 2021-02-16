<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <h2>Use Cases</h2>
    <v-row>
      <v-col
        v-for="caseCurr in cases"
        :key="caseCurr.title"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="3"
      >
        <v-card class="mx-auto" max-width="350" height="100%">
          <v-img
            contain
            :src="require('@/static/images/cards/' + caseCurr.image)"
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
          subTitle: 'New words and phrases with translations',
          image: 'undraw_work_from_anywhere_7sdx.svg',
        },
        {
          title: 'New Terms Learning',
          subTitle: 'Economics, technology, science, etc.',
          image: 'undraw_Modern_life_re_8pdp.svg',
        },
        {
          title: 'Inventories and Collections',
          subTitle: 'Books, movies, people, etc.',
          image: 'undraw_preferences_popup_wbfw.svg',
        },
        {
          title: 'Other',
          subTitle: 'Card Sets for any simple data',
          image: 'undraw_click_here_2li1.svg',
        },
      ],
    }
  },
}
</script>
