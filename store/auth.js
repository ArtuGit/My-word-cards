import Cookie from 'js-cookie'
import { authOp, authenticateUser } from '~/plugins/auth-helpers'

export const state = () => ({
  token: null,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
}

export const actions = {
  async signIn(vuexContext, authData) {
    try {
      const result = await authOp('sign-in', authData, this.$axios)
      authenticateUser(result)
      vuexContext.commit('setToken', result.idToken)
      authenticateUser(result)
      this.$notifier.showMessage({
        content: 'You are logged in',
        color: 'success',
      })
    } catch (err) {
      let message = 'Login failed'
      if (err.response.data) {
        message = message + ', error code:' + err.response.data.error.message
      }
      this.$notifier.showMessage({
        content: message,
        color: 'error',
      })
    }
  },
  async signUp(vuexContext, authData) {
    try {
      const result = await authOp('sign-up', authData, this.$axios)
      authenticateUser(result)
      vuexContext.commit('setToken', result.idToken)
      this.$notifier.showMessage({
        content: 'You are registered',
        color: 'success',
      })
    } catch (err) {
      let message = 'Registration failed'
      if (err.response.data) {
        message = message + ', error code:' + err.response.data.error.message
      }
      this.$notifier.showMessage({
        content: message,
        color: 'error',
      })
    }
  },
  authenticateUser(vuexContext, authData) {
    let authUrl =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
      process.env.fbAPIKey
    if (!authData.isLogin) {
      authUrl =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
        process.env.fbAPIKey
    }
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((result) => {
        vuexContext.commit('setToken', result.idToken)
        localStorage.setItem('token', result.idToken)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        )
        Cookie.set('jwt', result.idToken)
        Cookie.set(
          'expirationDate',
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        )
      })
      .catch((e) => {
        // eslint-disable-next-line
        console.error(e)
      })
  },
  initAuth(vuexContext, req) {
    let token
    let expirationDate
    if (req) {
      if (!req.headers.cookie) {
        // console.error('No cookie')
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        // console.error('No JWT')
        return
      }
      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else if (process.client) {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > +expirationDate || !token) {
      // console.error('No token or invalid token')
      vuexContext.dispatch('logout')
      return
    }
    vuexContext.commit('setToken', token)
  },
  logout(vuexContext, payload = {}) {
    vuexContext.commit('clearToken')
    if (payload.message) {
      this.$notifier.showMessage({
        content: 'You are logged out',
        color: 'success',
      })
    }
    if (payload.redirectTo) {
      this.$router.push({ name: payload.redirectTo })
    }
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  },
}
