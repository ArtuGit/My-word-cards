<template>
  <v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          <v-card-title> {{ word }} </v-card-title>
        </v-btn>
      </template>
      <card-form :id="id" :v-if="annotation" @dialog-reverse="dialogReverse">
      </card-form>
    </v-dialog>

    <v-card-subtitle> {{ annotation }} </v-card-subtitle>
    <v-img v-if="image" :src="image"></v-img>
  </v-card>
</template>

<script>
import CardForm from '@/components/CardForm'
export default {
  components: {
    CardForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    annotation: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
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
