<template>
  <div>
    <h1>Collections</h1>
    {{ loading }} {{ dialog }}
  </div>
</template>

<script>
import DialogFromCard from '~/mixins/DialogFromCard'
export default {
  mixins: [DialogFromCard],
}
</script>
