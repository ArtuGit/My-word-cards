<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <v-container>
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex md6 offset-sm3>
        <div>
          <div>
            <v-btn @click="click1">choose photo</v-btn>
            <input
              ref="input1"
              type="file"
              style="display: none"
              accept="image/*"
              @change="previewImage"
            />
          </div>

          <div v-if="imageData != null">
            <img class="preview" height="268" width="356" :src="img1" />
            <br />
          </div>
        </div>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex md6 offset-sm3 class="text-center">
        <v-text-field v-model="caption" solo label="Caption goes here">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <v-btn color="pink" @click="create">upload</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      caption: '',
      img1: '',
      imageData: null,
    }
  },
  methods: {
    create() {
      const post = {
        photo: this.img1,
        caption: this.caption,
      }
      console.log(post)
    },
    click1() {
      this.$refs.input1.click()
    },
    previewImage(event) {
      this.uploadValue = 0
      this.img1 = null
      this.imageData = event.target.files[0]
      this.onUpload()
    },
    onUpload() {
      this.img1 = null
      const storageRef = this.$fire.storage
        .ref(`${this.imageData.name}`)
        .put(this.imageData)
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url
            console.log(this.img1)
          })
        }
      )
    },
  },
}
</script>
