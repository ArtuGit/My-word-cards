<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ cardTitle }}, ID: {{ id }}</span>
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
                validate-on-blur
                label="Word*"
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
        {{ submitButtonName }}
      </v-btn>
      <v-btn color="primary" text @click="cancel"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    word: {
      type: String,
      required: false,
      default: null,
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
      valid: true,
      wordRules: [
        (v) => !!v || 'Word is required',
        (v) =>
          (v && v.length <= 100) || 'Word must be less than 100 characters',
      ],
    }
  },
  computed: {
    cardTitle() {
      if (this.id) {
        return this.word
      } else {
        return 'New Card'
      }
    },
    submitButtonName() {
      if (this.id) {
        return 'Save'
      } else {
        return 'Add'
      }
    },
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
    clearForm() {
      this.id = ''
      this.word = ''
      this.annotation = ''
      this.valid = true
      this.$emit('dialog-reverse')
    },
    cancel() {
      this.$emit('dialog-reverse')
    },
    submit() {
      const card = {
        word: this.word,
        annotation: this.annotation,
        image: this.image,
      }
      if (this.id) {
        card.id = this.id
        this.$store.dispatch('saveCard', card)
      } else {
        this.$store.dispatch('addCard', card)
      }
      this.clearForm()
    },
  },
}
</script>
