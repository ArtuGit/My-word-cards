<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i">
      <v-list-item-content>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          min-width="360px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-title v-bind="attrs" v-on="on" v-text="item.title" />
          </template>
          <auth-form></auth-form>
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
      items: [
        {
          title: 'Sign In',
        },
        {
          title: 'Sign Up',
        },
      ],
    }
  },
}
</script>
