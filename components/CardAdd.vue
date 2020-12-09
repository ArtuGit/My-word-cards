<template>
  <div>
    <v-card class="transparent">
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on"> Add Card</v-btn>
          </template>
          <card-form @dialog-reverse="dialogReverse"></card-form>
        </v-dialog>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
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
