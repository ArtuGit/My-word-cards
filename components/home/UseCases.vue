<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
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
      <v-card class="mx-auto" max-width="344">
        <v-img
          :src="require('@/static/images/tmp/undraw_Analysis_re_w2vd.svg')"
          :aspect-ratio="undefined"
        ></v-img>
        <v-card-title> Top western road trips</v-card-title>
        <v-card-subtitle> 1,000 miles of wonder</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      cases: [
        { title: 'Languages Learning', subTitle: '1,000 miles of wonder' },
        { title: 'New Terms Learning', subTitle: '2,000 miles of wonder' },
        {
          title: 'Inventories and Collections',
          subTitle: '3,000 miles of wonder',
        },
      ],
    }
  },
}
</script>
