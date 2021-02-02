<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ cardTitle }}</span>
      {{ input.imageRaw }}
    </v-card-title>
    <v-card-text>
      <v-form ref="formCard" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-if="!id"
                v-model="input.word"
                :counter="100"
                :rules="wordRules"
                :autofocus="!id"
                :clearable="!id"
                validate-on-blur
                label="Word*"
                :readonly="!!id"
              ></v-text-field>
              <v-combobox
                v-model="input.collections"
                :rules="collectionRules"
                :items="collectionsAll"
                label="Collection(s)*"
                validate-on-blur
                deletable-chips
                multiple
                chips
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
              <v-textarea
                v-model="input.annotation"
                name="Annotation"
                auto-grow
                :clearable="!id"
                validate-on-blur
                label="Annotation"
                hint="Translation, definition, comment and so on."
              ></v-textarea>
              <image-upload
                :image-existed="image"
                @update-image="updateImage"
              ></image-upload>
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
import ImageUpload from '~/components/UI/ImageUpload'
export default {
  components: {
    ImageUpload,
  },
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
    collections: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      input: {
        word: '',
        annotation: '',
        collections: [],
        imageRaw: null,
      },
      valid: true,
      collectionRules: [
        (v) => (!!v && v.length > 0) || 'Collection is required',
      ],
      wordRules: [
        (v) => !!v || 'Word is required',
        (v) =>
          (!!v && v.length <= 100) || 'Word must be less than 100 characters',
      ],
    }
  },
  computed: {
    collectionsAll() {
      return this.$store.getters['collections/loadedCollectionsTitles']
    },
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
        return (
          (this.input.annotation === this.annotation &&
            this.input.collections === this.collections) ||
          !(
            this.input.word &&
            this.input.word.length > 0 &&
            this.input.word.length <= 100
          ) ||
          !(this.input.collections && this.input.collections.length > 0)
        )
      } else return false
    },
  },
  mounted() {
    this.input.word = this.word
    this.input.annotation = this.annotation
    this.input.collections = this.collections
    this.input.imageRaw = null
  },
  beforeRouteUpdate(to, from, next) {
    this.input.word = this.word
    this.input.annotation = this.annotation
    this.input.collections = this.collections
    this.input.imageRaw = null
    next()
  },
  emits: ['dialog-reverse', 'toggle-loading'],
  methods: {
    updateImage(image) {
      this.input.imageRaw = image
      console.log('Primary:', this.image)
      console.log('Raw:', this.input.imageRaw)
      // await this.$store.dispatch('cards/test', image)
    },
    clearForm() {
      this.valid = true
      if (!this.id) {
        this.input.word = ''
        this.input.annotation = ''
        this.input.imageRaw = null
      }
    },
    cancel() {
      this.$emit('dialog-reverse')
    },
    async submit() {
      if (this.$refs.formCard.validate()) {
        this.$emit('dialog-reverse')
        if (this.id) {
          this.$emit('toggle-loading')
        }
        if (!this.id && this.input.word) {
          this.input.word = this.input.word.trimEnd()
        }
        if (this.input.annotation) {
          this.input.annotation = this.input.annotation.trimEnd()
        }
        let card = {
          word: this.input.word,
          annotation: this.input.annotation,
          image: this.image,
          collections: this.input.collections,
        }
        let collectionsDiff = null
        if (this.input.collections) {
          collectionsDiff = this.input.collections.filter(
            (x) => !this.collectionsAll.includes(x)
          )
        }
        this.clearForm()
        if (collectionsDiff) {
          await this.$store.dispatch(
            'collections/addCollectionsMultiple',
            collectionsDiff
          )
        }
        if (this.id) {
          card.id = this.id
          await this.$store.dispatch('cards/saveCard', card)
        } else {
          card.params = { imageType: 'first' }
          card.state = { loading: true }
          card.id = await this.$store.dispatch('cards/addCard', card)
          card = await this.$store.dispatch('cards/setCardImage', card)
          this.$store.commit('cards/saveCard', card)
        }
        this.$emit('toggle-loading')
      }
    },
  },
}
</script>
