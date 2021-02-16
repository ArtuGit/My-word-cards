<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <h2>Capabilities</h2>
    <v-row>
      <v-col
        v-for="capability in capabilities"
        :key="capability.title"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="3"
      >
        <v-card
          flat
          class="mx-auto d-flex flex-column align-center"
          max-width="350"
          height="100%"
        >
          <v-icon x-large color="green darken-2">
            {{ capability.icon }}
          </v-icon>
          <v-card-title>{{ capability.title }}</v-card-title>
          <v-card-subtitle class="text-center">
            {{ capability.subTitle }}</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      capabilities: [
        {
          title: 'Visualization',
          subTitle: 'Add related images automatically or upload your images',
          icon: 'mdi-image-area',
        },
        {
          title: 'Organization',
          subTitle: 'Consider Collections as folders or tags',
          icon: 'mdi-folder-multiple',
        },
        {
          title: 'Annotation',
          subTitle: 'Multiline text field',
          icon: 'mdi-text-box',
        },
        {
          title: 'Search',
          subTitle: 'Full-text search and sorting',
          icon: 'mdi-magnify-plus',
        },
      ],
    }
  },
}
</script>
