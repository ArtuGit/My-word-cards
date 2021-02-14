/*
 * Developed by Artu, https://github.com/ArtuGit
 * Copyleft 2020-2021.
 */

import Cookie from 'js-cookie'
import { authOp, authenticateUser } from '~/plugins/auth-helpers'
import { initAppData } from '~/plugins/api-helpers'

export const state = () => ({
  token: null,
  uuid: null,
  firstName: '',
  lastName: '',
  isAdmin: false,
  email: null,
})

export const mutations = {
  setAuth(state, payload) {
    state.token = payload.token
    state.uuid = payload.uuid
    state.email = payload.email
    state.firstName = payload.firstName
    state.lastName = payload.lastName
    state.isAdmin = payload.isAdmin
  },
  setUserData(state, payload) {
    state.firstName = payload.firstName
    state.lastName = payload.lastName
  },
  clearAuth(state) {
    state.token = null
    state.email = null
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
      this.vuexContext = vuexContext
      const result = await authOp.call(this, 'sign-in', authData)
      let auth = {
        email: authData.email,
        token: result.idToken,
        uuid: result.localId,
      }
      const userData = await this.$axios.$get(
        `users/${auth.uuid}.json?auth=${auth.token}`
      )
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
      await initAppData.call(this, vuexContext)
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
      this.vuexContext = vuexContext
      const result = await authOp.call(this, 'sign-up', authData)
      let auth = {
        email: authData.email,
        token: result.idToken,
        uuid: result.localId,
      }
      const userData = {
        firstName: authData.firstName,
        lastName: authData.lastName,
      }
      await this.$axios.$put(
        `users/${auth.uuid}.json?auth=${auth.token}`,
        userData
      )
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
      await initAppData.call(this, vuexContext)
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
  async setUserData(vuexContext, userData) {
    try {
      if (vuexContext.state.token && vuexContext.state.uuid) {
        await this.$axios.$patch(
          `users/${vuexContext.state.uuid}.json?auth=${vuexContext.state.token}`,
          userData
        )
        vuexContext.commit('setUserData', userData)
        this.$notifier.showMessage({
          content: 'The user data are updated',
          color: 'success',
        })
      } else {
        throw new Error('No token')
      }
    } catch (err) {
      let message = 'Update failed'
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
    const userSysData = await authOp.call(this, 'get-user', { idToken: token })
    const userData = await this.$axios.$get(
      `users/${userSysData.localId}.json?auth=${token}`
    )
    const auth = {
      token,
      uuid: userSysData.localId,
      email: userSysData.email,
      ...userData,
    }
    vuexContext.commit('setAuth', auth)
  },
  async logout(vuexContext, payload = {}) {
    vuexContext.commit('clearAuth')
    await initAppData.call(this, vuexContext)
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
  setLogoutTimer(vuexContext, duration) {
    console.log('Duration: ', duration)
    setTimeout(() => {
      console.log('Exit!')
      vuexContext.dispatch('logout', { message: true })
    }, duration)
  },
}

export const getters = {
  isAdmin(state) {
    return state.isAdmin
  },
  isAuthenticated(state) {
    return state.token != null
  },
  user(state) {
    return {
      email: state.email,
      token: state.token,
      uuid: state.uuid,
      firstName: state.firstName,
      lastName: state.lastName,
      isAdmin: state.isAdmin,
    }
  },
}
