<template>
  <h1>Cards with "{{ $route.params.collection }}" collection</h1>
</template>

<script>
export default {
  validate(data) {
    console.log(data)
    return true
  },
}
</script>
