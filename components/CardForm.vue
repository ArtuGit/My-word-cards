<template>
  <v-card>
    <v-card-title>
      <span class="headline">New Card</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="word"
                :counter="100"
                :rules="wordRules"
                autofocus
                clearable
                validate-on-blurdialog
                label="Word*"
                required
              ></v-text-field>
              <v-textarea
                v-model="annotation"
                name="Annotation"
                label="Annotation"
                hint="Translation, definition, comment and so on."
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="inputLength === 0" text @click="submit">
        Add
      </v-btn>
      <v-btn color="primary" text @click="cancel"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      word: '',
      annotation: '',
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
  emits: ['dialog-reverse'],
  methods: {
    cancel() {
      this.$emit('dialog-reverse')
    },
    submit() {
      this.$store.dispatch('addCard', {
        word: this.word,
        annotation: this.annotation,
      })
      this.word = ''
      this.annotation = ''
      this.valid = true
      this.$emit('dialog-reverse')
    },
  },
}
</script>
