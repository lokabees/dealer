export const state = () => ({
  shops: null,
  activeShop: null,
})

export const mutations = {
  setShops(state, shops) {
    state.shops = shops
  },
  setActiveShop(state, shop) {
    state.activeShop = shop
  },
}

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   * token and user validation
   */
  async getAllShops({ commit }) {
    try {
      const { rows } = await this.$axios.$get('/api/shops')
      commit('setShops', rows)
    } catch (error) {
      console.error(error)
    }
  },
  async getActiveShop({ commit }, shopId) {
    try {
      const shop = await this.$axios.$get(`/api/shops/${shopId}`)
      commit('setActiveShop', shop)
    } catch (error) {
      console.error(error)
    }
  },
}

export const getters = {
  shops: (state) => state.shops,
  activeShop: (state) => state.activeShop,
}
