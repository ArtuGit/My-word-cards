<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i.tab">
      <v-list-item-content>
        <v-dialog
          v-model="dialog[item.tab]"
          persistent
          max-width="600px"
          min-width="360px"
          :retain-focus="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-title v-bind="attrs" v-on="on" v-text="item.title" />
          </template>
          <auth-form :tab-init="item.tab" @dialog-reverse="dialogReverse">
          </auth-form>
        </v-dialog>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import AuthForm from '@/components/AuthForm'
export default {
  components: {
    AuthForm,
  },
  data() {
    return {
      dialog: [false, false, false],
      items: [
        {
          title: 'Login',
          tab: 0,
        },
        {
          title: 'Register',
          tab: 1,
        },
      ],
    }
  },
  methods: {
    dialogReverse() {
      this.dialog = [false, false]
    },
  },
}
</script>
