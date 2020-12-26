<template>
  <div>
    <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="i in tabs" :key="i.id">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>
      <v-tab-item>
        <v-card class="px-4">
          <v-card-text>
            <v-form ref="loginForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginEmail"
                    :rules="loginEmailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginPassword"
                    :append-icon="showPass ? 'eye' : 'eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showPass ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text :disabled="!valid" @click="submitLogin">
              Login
            </v-btn>
            <v-btn color="primary" text @click="cancel"> Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="px-4">
          <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="firstName"
                    :rules="[rules.required]"
                    label="First Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="lastName"
                    :rules="[rules.required]"
                    label="Last Name"
                    maxlength="20"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showPass ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password2"
                    block
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, passwordMatch]"
                    :type="showPass ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirm Password"
                    counter
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              :disabled="!valid"
              @click="submitRegister"
              >Register
            </v-btn>
            <v-btn color="primary" text @click="cancel"> Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tabInit: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    tabs: [
      { id: 0, name: 'Login', icon: 'mdi-account' },
      { id: 1, name: 'Register', icon: 'mdi-account-outline' },
    ],
    valid: true,

    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    loginEmail: '',
    loginPassword: '',

    showPass: false,

    loginEmailRules: [
      (v) => !!v || 'Required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    emailRules: [
      (v) => !!v || 'Required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => (v && v.length >= 8) || 'Min 8 characters',
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.password2 || 'Password must match'
    },
    tab: {
      get() {
        return this.tabInit
      },
      set(value) {
        this.$emit('update:tabInit', value)
      },
    },
  },
  methods: {
    cancel() {
      this.$emit('dialog-reverse')
    },
    submitLogin() {
      if (this.$refs.loginForm.validate()) {
        this.$notifier.showMessage({
          content: 'Login submitted!',
          color: 'success',
        })
        this.$refs.loginForm.reset()
        // submit form to server/API here...
        this.$emit('dialog-reverse')
      }
    },
    submitRegister() {
      if (this.$refs.registerForm.validate()) {
        console.log(this.email)
        console.log(this.password)
        const req = {
          email: this.email,
          password: this.password,
          returnSecureToken: true,
        }
        this.$refs.registerForm.reset()
        this.$emit('dialog-reverse')
        const authUrl =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          process.env.firebaseKey
        return this.$axios
          .$post(authUrl, req)
          .then((result) => {
            console.log(result)
            this.$notifier.showMessage({
              content: 'Register submitted!',
              color: 'success',
            })
          })
          .catch((e) => {
            this.$notifier.showMessage({
              content:
                'Registration failed. Possible ' +
                req.email +
                ' is already registered.',
              color: 'error',
            })
            console.error(e)
          })
      }
    },
  },
}
</script>
