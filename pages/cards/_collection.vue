<template>
  <h1>Cards with "{{ $route.params.collection }}" collection</h1>
</template>

<script>
export default {
  validate(data) {
    if (
      data.store.getters['collections/getByTitle'](data.route.params.collection)
    )
      return true
    else return false
  },
}
</script>
