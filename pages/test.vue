<template>
  <main>
    <h1>Test</h1>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6"></v-col>
    </v-row>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function () {
      this.print('Test')
    })
  },
}
</script>
