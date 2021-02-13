<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <div>
    <div>Test</div>

    <v-card height="300" flat>
      <v-snackbar :timeout="-1" :value="true" top color="primary" outlined>
        Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
        consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor
        sit amet consectetur.
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>
