export default {
  data() {
    return {
      loading: false,
      dialog: false,
    }
  },
  methods: {
    dialogReverse() {
      this.dialog = !this.dialog
    },
    toggleLoading() {
      this.loading = !this.loading
    },
  },
}
