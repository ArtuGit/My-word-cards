import Cookie from 'js-cookie'
import { authOp, authenticateUser } from '~/plugins/auth-helpers'

export const state = () => ({
  token: null,
  uuid: null,
  firstName: '',
  lastName: '',
  isAdmin: false,
})

export const mutations = {
  setAuth(state, payload) {
    state.token = payload.token
    state.uuid = payload.uuid
    state.firstName = payload.firstName
    state.lastName = payload.lastName
    state.isAdmin = payload.isAdmin
  },
  clearAuth(state) {
    state.token = null
    state.uuid = null
    state.firstName = null
    state.lastName = null
    state.isAdmin = false
  },
  setToken(state, token) {
    state.token = token
  },
}

export const actions = {
  async signIn(vuexContext, authData) {
    try {
      const result = await authOp('sign-in', authData, this.$axios)
      let auth = {
        token: result.idToken,
        uuid: result.localId,
      }
      const userData = await this.$axios.$get(`users/${auth.uuid}.json`)
      auth = {
        ...auth,
        ...userData,
      }
      authenticateUser(result)
      vuexContext.commit('setAuth', auth)
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
      let auth = {
        token: result.idToken,
        uuid: result.localId,
      }
      const userData = {
        firstName: authData.firstName,
        lastName: authData.lastName,
      }
      await this.$axios.$put(`users/${auth.uuid}.json`, userData)
      auth = {
        ...auth,
        ...userData,
      }
      authenticateUser(result)
      vuexContext.commit('setAuth', auth)
      this.$notifier.showMessage({
        content: 'You are registered',
        color: 'success',
      })
      return true
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
  async initAuth(vuexContext, req) {
    let token
    let uuid
    let expirationDate
    if (req) {
      if (!req.headers.cookie) {
        // console.error('No cookie')
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))
      const uuidCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('uuid='))
      if (!jwtCookie) {
        // console.error('No JWT')
        return
      }
      if (!uuidCookie) {
        // console.error('No UUID')
        return
      }
      token = jwtCookie.split('=')[1]
      uuid = uuidCookie.split('=')[1]
      console.log(uuid)
      expirationDate = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else if (process.client) {
      token = localStorage.getItem('token')
      uuid = localStorage.getItem('uuid')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > +expirationDate || !token) {
      // console.error('No token or invalid token')
      vuexContext.dispatch('logout')
      return
    }
    const userData = await this.$axios.$get(`users/${uuid}.json`)
    const auth = {
      token,
      uuid,
      ...userData,
    }
    vuexContext.commit('setAuth', auth)
  },
  logout(vuexContext, payload = {}) {
    vuexContext.commit('clearAuth')
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
    Cookie.remove('uuid')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('uuid')
      localStorage.removeItem('tokenExpiration')
    }
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  },
  user(state) {
    return {
      token: state.token,
      uuid: state.uuid,
      firstName: state.firstName,
      lastName: state.lastName,
      isAdmin: state.isAdmin,
    }
  },
}
