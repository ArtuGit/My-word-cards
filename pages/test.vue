<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-combobox
            v-model="select"
            :items="items"
            label="Select a favorite activity or create a new one"
            multiple
          ></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="select"
            :items="items"
            label="I use chips"
            multiple
            chips
          ></v-combobox>
        </v-col>
        <v-col cols="12">
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
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="select"
            label="I'm readonly"
            chips
            multiple
            readonly
          ></v-combobox>
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="primary" text @click="submit"> Submit </v-btn>
  </v-form>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      valid: true,
      collectionsSelected: ['Vuetify', 'Programming'],
      collections: ['Programming', 'Design', 'Vue', 'Vuetify'],
      select: ['Vuetify', 'Programming'],
      items: ['Programming', 'Design', 'Vue', 'Vuetify'],
    }
  },
  methods: {
    submit() {
      this.collections = this.collectionsSelected
    },
  },
}
</script>
