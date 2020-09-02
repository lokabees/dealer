export const state = () => ({
  accessToken: null,
  user: null,
  pending: {
    login: false,
    signup: false,
    logout: false,
  },
})

export const mutations = {
  setToken(state, token) {
    state.accessToken = token
  },
  setUser(state, user) {
    state.user = user
  },
  setPending(state, { login, signup, logout }) {
    state.pending = {
      ...login,
      ...signup,
      ...logout,
    }
  },
  updateUser(state, updates) {
    Object.assign(state.user, updates)
  },
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async nuxtServerInit({ commit, dispatch, state }, { app, req }) {
    try {
      // Try to get token from Browser
      const accessToken = this.$cookies.get('Authorization')
      // Set token to $axios module config
      app.$axios.setToken(accessToken, 'Bearer')

      // Set token to vuex state
      commit('setToken', accessToken)

      // If token exist, try to get user information with getMe action

      if (accessToken) {
        await dispatch('getMe')
      }
    } catch (e) {
      // Clean store if user not exist with logout action
      console.error(e)
      await dispatch('resetUser')
    }
  },
  setLocalUser({ commit }, token) {
    // Set CSR Token
    this.$axios.setToken(token, 'Bearer')
    this.$cookies.set('Authorization', `Bearer ${token}`, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    commit('setToken', token)
  },

  /**
   * resetUser Action
   * resetUser the user clean the state, remove cookie and reset axios config
   */
  resetUser({ commit }) {
    this.$axios.setToken(false)
    this.$cookies.remove('Authorization')
    commit('setToken', null)
    commit('setUser', null)
  },

  /**
   * getMe Action
   * get User Information
   */
  async getMe({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/users/me')
      // TODO backend: pass active shopId on fetch user
      console.log(data.activeShop)
      await dispatch('shops/getActiveShop', '5f500cf925675e4f543248c5')
      commit('setUser', data)
    } catch (error) {
      await dispatch('resetUser')
      console.log(error)
    }
  },
}

export const getters = {
  user: (state) => state.user,
  isAdmin: (state) => state.user.role === 'admin',
  pending: (state) => state.pending,
}
