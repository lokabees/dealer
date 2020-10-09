export const state = () => ({
  shops: null,
  activeShop: null,
})

export const mutations = {
  setShops(state, shops) {
    state.shops = shops
  },
  updateActiveShop(state, newShop) {
    Object.assign(state.activeShop, newShop)
  },
  updateActiveShopOpeningHours(state, newOpeningHours) {
    Object.assign(state.activeShop.openingHours, newOpeningHours)
  },
  setActiveShop(state, shop) {
    state.activeShop = shop
  },
}

export const actions = {
  async getActiveShop({ rootGetters, commit }) {
    try {
      const shop = await this.$axios.$get(
        `/api/users/${rootGetters.user._id}/shops/active`
      )
      commit('setActiveShop', shop)
    } catch (error) {
      console.error(error)
      const status = error?.response?.status || 500
      if (status === 404) commit('setActiveShop', null)
    }
  },
}

export const getters = {
  shops: (state) => state.shops,
  activeShop: (state) => state.activeShop,
}
