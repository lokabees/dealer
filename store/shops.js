import Vue from 'vue'

const emptyShop = {
  images: {},
  address: {},
  openingHours: {
    monday: {
      breaks: [],
    },
    tuesday: {
      breaks: [],
    },
    wednesday: {
      breaks: [],
    },
    thursday: {
      breaks: [],
    },
    friday: {
      breaks: [],
    },
    saturday: {
      breaks: [],
    },
    sunday: {
      breaks: [],
    },
  },
  categories: [],
}

export const state = () => ({
  shops: null,
  activeShop: emptyShop,
})

export const mutations = {
  setShops(state, shops) {
    state.shops = shops
  },
  updateActiveShop(state, changes) {
    const newShop = Object.assign({}, state.activeShop, changes)
    Vue.set(state, 'activeShop', newShop)
  },
  updateActiveShopOpeningHours(state, changes) {
    const newOpeningHours = Object.assign({}, state.activeShop.address, changes)
    Vue.set(state.activeShop, 'address', newOpeningHours)
  },
  updateActiveShopAddress(state, changes) {
    const newAddress = Object.assign({}, state.activeShop.address, changes)
    Vue.set(state.activeShop, 'address', newAddress)
  },
  selectActiveShopCategorie(state, category) {
    const categories = state.activeShop.categories
    if (!categories.includes(category.value)) categories.push(category.value)
    else
      state.activeShop.categories = categories.filter(
        (item) => item !== category.value
      )

    console.log(state.activeShop)
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
      if (status === 404) commit('setActiveShop', emptyShop)
    }
  },
}

export const getters = {
  shops: (state) => state.shops,
  activeShop: (state) => {
    return state.activeShop
  },
}
