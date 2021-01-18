export default {
  data() {
    return {
      title: null,
      description: null,
    }
  },
  head() {
    const res = {}
    if (this.title) {
      res.title = this.title
      res.meta = [
        { hid: 'og:title', property: 'og:title', content: this.title },
      ]
    }
    if (this.description) {
      res.meta.push({
        hid: 'description',
        property: 'description',
        content: this.description,
      })
    }
    return res
  },
  mounted() {
    this.$store.commit('setPageTitle', this.title)
  },
  destroyed() {
    this.$store.commit('setPageTitle', '')
  },
}
