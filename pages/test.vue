<template>
  <v-combobox
    v-model="select"
    :items="items"
    label="I use a scoped slot"
    multiple
    chips
  >
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :disabled="data.disabled"
        @click:close="data.parent.selectItem(data.item)"
      >
        <v-avatar
          class="accent white--text"
          left
          v-text="data.item.slice(0, 1).toUpperCase()"
        ></v-avatar>
        {{ data.item }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      select: ['Vuetify', 'Programming'],
      items: ['Programming', 'Design', 'Vue', 'Vuetify'],
    }
  },
}
</script>
