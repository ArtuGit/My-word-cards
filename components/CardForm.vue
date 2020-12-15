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
                v-model="input.word"
                :counter="100"
                :rules="wordRules"
                :autofocus="!id"
                :clearable="!id"
                validate-on-blur
                label="Word*"
                :readonly="!!id"
              ></v-text-field>
              <v-textarea
                v-model="input.annotation"
                name="Annotation"
                auto-grow
                :clearable="!id"
                validate-on-blur
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
      <v-btn color="primary" :disabled="submitButtonState" text @click="submit">
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
      input: {
        word: '',
        annotation: '',
      },
      valid: true,
      wordRules: [
        (v) => !!v || 'Word is required',
        (v) =>
          (!!v && v.length <= 100) || 'Word must be less than 100 characters',
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
    submitButtonState() {
      if (this.id) {
        if (this.input.annotation !== this.annotation) {
          return false
        } else {
          return true
        }
      } else if (
        this.input.word &&
        this.input.word.length > 0 &&
        this.input.word.length <= 100
      ) {
        return false
      } else {
        return true
      }
    },
  },
  mounted() {
    this.input.word = this.word
    this.input.annotation = this.annotation
  },
  beforeRouteUpdate(to, from, next) {
    this.input.word = this.word
    this.input.annotation = this.annotation
    next()
  },
  emits: ['dialog-reverse'],
  methods: {
    clearForm() {
      this.valid = true
      this.$emit('dialog-reverse')
      if (!this.id) {
        this.input.word = ''
        this.input.annotation = ''
      }
    },
    cancel() {
      this.$emit('dialog-reverse')
    },
    submit() {
      if (!this.id && this.input.word) {
        this.input.word = this.input.word.trimEnd()
      }
      if (this.input.annotation) {
        this.input.annotation = this.input.annotation.trimEnd()
      }
      const card = {
        word: this.input.word,
        annotation: this.input.annotation,
        image: this.image,
      }
      if (this.id) {
        card.id = this.id
        this.$store.dispatch('cards/saveCard', card)
      } else {
        this.$store.dispatch('cards/addCard', card)
      }
      this.clearForm()
    },
  },
}
</script>
