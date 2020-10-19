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
  async nuxtServerInit({ commit, dispatch, state }) {
    try {
      // Try to get token from Browser
      const [type, token] = this.$cookies.get('Authorization').split(' ')

      // Set token to $axios module config
      this.$axios.setToken(token, type)

      // Set token to vuex state
      commit('setToken', token)

      // If token exist, try to get user information with getMe action
      if (token) {
        await dispatch('getMe')
        await dispatch('shops/getActiveShop')
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
   * get active shop
   */
  async getMe({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/users/me')
      if (data) commit('setUser', data)
      else dispatch('resetUser')
    } catch (error) {
      console.error(error)
      dispatch('resetUser')
    }
  },
}

export const getters = {
  user: (state) => state.user,
  isAdmin: (state) => state.user?.role === 'admin',
  pending: (state) => state.pending,
}
