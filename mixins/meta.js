export default {
  data() {
    return {
      title: null,
      description: null,
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:title', property: 'og:title', content: this.title },
      ],
    }
  },
  mounted() {
    this.$store.commit('setPageTitle', this.title)
  },
  destroyed() {
    this.$store.commit('setPageTitle', '')
  },
}
