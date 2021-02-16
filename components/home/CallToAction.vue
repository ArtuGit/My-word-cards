<!--
  - Developed by Artu, https://github.com/ArtuGit
  -  Copyleft, 2020-2021.
  -->

<template>
  <div>
    <h2>Let's go!</h2>
    <v-row>
      <v-col
        v-for="action in actions"
        :key="action.title"
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <v-card dark class="mx-auto" height="100%">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar height="125" width="300" tile>
              <v-img
                :src="require('@/static/images/cards/' + action.image)"
                :aspect-ratio="1.7778"
              ></v-img>
            </v-avatar>
            <div>
              <v-card-title
                class="headline"
                v-text="action.title"
              ></v-card-title>

              <v-card-subtitle v-text="action.subTitle"></v-card-subtitle>

              <v-card-actions>
                <v-btn
                  class="mr-2 mt-3"
                  fab
                  icon
                  height="40px"
                  right
                  width="40px"
                >
                </v-btn>

                <v-btn class="mr-2 mt-5" outlined rounded small>
                  {{ action.call }}
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actions: [
        {
          title: 'Collections',
          subTitle: 'You can manage cards within an specific Collection',
          call: 'Go to Collections',
          link: '/collections',
          image: 'undraw_work_from_anywhere_7sdx.svg',
        },
        {
          title: 'Cards',
          subTitle: 'You can manage all cards',
          call: 'Go to All Cards',
          link: '/cards',
          image: 'undraw_Modern_life_re_8pdp.svg',
        },
      ],
    }
  },
}
</script>
