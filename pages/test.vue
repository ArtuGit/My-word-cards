<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-combobox
      v-model="select"
      :items="items"
      label="Collections"
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
    <v-btn color="primary" text @click="submit"> Submit </v-btn>
  </v-form>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      valid: true,
      select: ['Vuetify', 'Programming'],
      items: ['Programming', 'Design', 'Vue', 'Vuetify'],
    }
  },
  methods: {
    submit() {
      this.items = this.select
    },
  },
}
</script>
