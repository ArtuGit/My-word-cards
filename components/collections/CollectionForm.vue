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
              <image-upload
                :image-existed="input.image"
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
import { deleteFileOnStorage, uploadURLToStorage } from '~/plugins/api-helpers'
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
    imagePath: {
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
        image: '',
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
            this.input.title === this.title &&
            this.input.image === this.image) ||
          !(
            this.input.title &&
            this.input.title.length > 0 &&
            this.input.title.length <= 100
          )
        )
      } else return false
    },
  },
  watch: {
    image(newVal, oldVal) {
      this.input.image = newVal
    },
    imagePath(newVal, oldVal) {
      this.input.imagePath = newVal
    },
  },
  beforeMount() {
    this.input.title = this.title
    this.input.description = this.description
    this.input.image = this.image
  },
  beforeRouteUpdate(to, from, next) {
    this.input.title = this.title
    this.input.description = this.description
    this.input.image = this.image
    next()
  },
  emits: ['dialog-reverse', 'toggle-loading'],
  methods: {
    updateImage(image) {
      this.input.image = image
    },
    clearForm(cancel) {
      this.valid = true
      if (!this.id) {
        // New
        this.input.title = ''
        this.input.description = ''
        this.input.image = ''
      } else if (cancel) {
        // Existed
        this.input.title = this.title
        this.input.description = this.description
        this.input.image = this.image
      }
    },
    cancel() {
      this.$emit('dialog-reverse')
      this.clearForm(true)
    },
    async submit() {
      if (this.$refs.formCollection.validate()) {
        this.$emit('dialog-reverse')
        if (this.id) {
          this.$emit('toggle-loading')
        }
        if (!this.id && this.input.title) {
          this.input.title = this.input.title.trimEnd()
        }
        if (this.input.description) {
          this.input.description = this.input.description.trimEnd()
        }
        let collection = {
          title: this.input.title,
          description: this.input.description,
          params: {
            titleBefore: this.title,
          },
        }
        // Before clearing the form
        let imageNew = null
        imageNew = this.input.image
        this.clearForm()
        let imageUploaded
        if (this.id) {
          // Updating collection
          collection.id = this.id
          if (imageNew) {
            if (imageNew !== this.image) {
              if (this.imagePath) {
                deleteFileOnStorage.call(this, this.imagePath)
              }
              imageUploaded = await uploadURLToStorage.call(this, imageNew)
              collection.image = imageUploaded.url
              collection.imagePath = imageUploaded.imagePath
            } else {
              collection.image = this.image
              collection.imagePath = this.imagePath
            }
          } else {
            deleteFileOnStorage.call(this, this.imagePath)
            delete collection.image
            delete collection.imagePath
          }
          await this.$store.dispatch('collections/saveCollection', collection)
        } else {
          // Adding collection
          collection.state = { loading: true }
          collection.id = await this.$store.dispatch(
            'collections/addCollection',
            collection
          )
          if (imageNew) {
            collection.params = { imageType: 'upload', imageNew }
          } else {
            collection.params = { imageType: 'first' }
          }
          collection = await this.$store.dispatch(
            'collections/setCollectionImage',
            collection
          )
          this.input.image = ''
        }
        this.$emit('toggle-loading')
      }
    },
  },
}
</script>
