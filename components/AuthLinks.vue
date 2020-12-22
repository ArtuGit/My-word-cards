<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i.tab">
      <v-list-item-content>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          min-width="360px"
        >
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-list-item-title v-text="item.title" />
            </div>
          </template>
          <auth-form @dialog-reverse="dialogReverse"></auth-form>
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
      dialog: false,
      items: [
        {
          title: 'Login',
          tab: 0,
          lock: 0,
        },
        {
          title: 'Register',
          tab: 1,
          lock: 1,
        },
      ],
    }
  },
  methods: {
    dialogReverse() {
      this.dialog = !this.dialog
    },
  },
}
</script>
