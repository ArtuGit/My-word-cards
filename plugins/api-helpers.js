import Vue from 'vue'

Vue.mixin({
  methods: {
    myTestMethod(value) {
      // eslint-disable-next-line
      console.log(value)
      return value
    },
  },
})
