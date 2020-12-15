<template>
  <div>
    <div>
      <div>Test</div>
      <v-btn color="primary" @click="submit"> Run</v-btn>
    </div>
    <v-menu>
      <template v-slot:activator="{ on: menu1 }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip2 }">
            <v-btn color="primary" dark v-on="{ ...tooltip2, ...menu1 }">
              Dropdown w/ Tooltip
            </v-btn>
          </template>
          <span>Im A ToolTip</span>
        </v-tooltip>
      </template>
    </v-menu>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      const data = this.$store.getters.getCard('2')
      // eslint-disable-next-line no-console
      console.log(data.word)
    },
  },
}
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
