import Vue from 'vue'

Vue.mixin({
  methods: {
    print(value) {
      // eslint-disable-next-line
      console.log(value)
      return value
    },
  },
})
