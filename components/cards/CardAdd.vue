<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" class="mx-2" fab dark v-on="on">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <card-form @dialog-reverse="dialogReverse"> </card-form>
    </v-dialog>
  </div>
</template>

<script>
import CardForm from '@/components/cards/CardForm'
export default {
  components: {
    CardForm,
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    dialogReverse() {
      this.dialog = !this.dialog
    },
  },
}
</script>
