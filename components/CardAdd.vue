<template>
  <v-card class="transparent">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on"> Add Card </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Card</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="word"
                    :counter="100"
                    :rules="wordRules"
                    autofocus
                    clearable
                    validate-on-blur
                    label="Word*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="inputLength === 0"
              text
              @click="submit"
            >
              Add
            </v-btn>
            <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      dialog: false,
      word: '',
      wordRules: [
        (v) => !!v || 'Word is required',
        (v) =>
          (v && v.length <= 100) || 'Word must be less than 100 characters',
      ],
    }
  },
  computed: {
    inputLength() {
      if (this.word) {
        return this.word.length
      } else {
        return 0
      }
    },
  },

  methods: {
    submit() {
      console.log(this.word)
      this.dialog = false
      this.word = ''
      this.valid = true
    },
  },
}
</script>
