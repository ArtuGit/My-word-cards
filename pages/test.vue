<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <div>
    <!--
    <v-card>
      <v-row>
        <v-col>
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="50"
            max-width="50"
            src="https://picsum.photos/id/11/500/300"
          ></v-img>
        </v-col>
        <v-col>
          <v-file-input
            ref="input1"
            show-size
            label="File input"
            type="file"
            accept="image/*"
            @change="previewImage"
          ></v-file-input>
        </v-col>
        <v-col>
          <v-btn @click="create">upload</v-btn>
        </v-col>
      </v-row>
    </v-card>
-->

    <v-main>
      <v-container fill-height>
        <v-row justify="center">
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>Vuetify v-file-input Example:</v-card-title>
              <br />
              <v-card-text>
                <v-file-input
                  v-model="chosenFile"
                  accept=".txt"
                  label="Click here to select a .txt file"
                  outlined
                >
                </v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn right @click="importTxt">Read File</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card width="600" height="300" raised>
              <v-card-title>File contents:</v-card-title>
              <v-card-text
                ><p>{{ data }}</p></v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenFile: null, // <- initialize the v-model prop
      data: null,
    }
  },
  methods: {
    importTxt() {
      if (!this.chosenFile) {
        this.data = 'No File Chosen'
      }
      const reader = new FileReader()

      // Use the javascript reader object to load the contents
      // of the file in the v-model prop
      reader.readAsText(this.chosenFile)
      reader.onload = () => {
        this.data = reader.result
      }
    },
  },
}
</script>
