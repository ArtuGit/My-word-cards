<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ cardTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="formCollection" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="input.title"
                :counter="100"
                :rules="wordRules"
                :clearable="!id"
                validate-on-blur
                label="Collection*"
              ></v-text-field>
              <v-textarea
                v-model="input.description"
                name="Description"
                auto-grow
                :clearable="!id"
                validate-on-blur
                label="Description"
                hint="What is the collection about?"
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
    title: {
      type: String,
      required: false,
      default: null,
    },
    description: {
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
        title: '',
        description: '',
      },
      valid: true,
      wordRules: [
        (v) => !!v || 'Title is required',
        (v) =>
          (!!v && v.length <= 100) || 'Title must be less than 100 characters',
      ],
    }
  },
  computed: {
    cardTitle() {
      if (this.id) {
        return this.title
      } else {
        return 'New Collections'
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
        return (
          (this.input.description === this.description &&
            this.input.title === this.title) ||
          !(
            this.input.title &&
            this.input.title.length > 0 &&
            this.input.title.length <= 100
          )
        )
      } else return false
    },
  },
  mounted() {
    this.input.title = this.title
    this.input.description = this.description
  },
  beforeRouteUpdate(to, from, next) {
    this.input.word = this.word
    this.input.description = this.description
    next()
  },
  emits: ['dialog-reverse', 'toggle-loading'],
  methods: {
    clearForm() {
      this.valid = true
      if (!this.id) {
        this.input.title = ''
        this.input.description = ''
      }
    },
    cancel() {
      this.$emit('dialog-reverse')
    },
    async submit() {
      if (this.$refs.formCollection.validate()) {
        this.$emit('dialog-reverse')
        this.$emit('toggle-loading')
        if (!this.id && this.input.title) {
          this.input.title = this.input.title.trimEnd()
        }
        if (this.input.description) {
          this.input.description = this.input.description.trimEnd()
        }
        let collection = {
          title: this.input.title,
          description: this.input.description,
          image: this.image,
          params: {
            titleBefore: this.title,
          },
        }
        this.clearForm()
        if (this.id) {
          collection.id = this.id
          await this.$store.dispatch('collections/saveCollection', collection)
        } else {
          collection.params = { imageType: 'first' }
          collection.state = { loading: true }
          collection.id = await this.$store.dispatch(
            'collections/addCollection',
            collection
          )
          collection = await this.$store.dispatch(
            'collections/setCollectionImage',
            collection
          )
          this.$store.commit('collections/saveCollection', collection)
        }
        this.$emit('toggle-loading')
      }
    },
  },
}
</script>
