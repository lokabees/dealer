import Vue from 'vue'

const emptyShop = {
  images: {},
  address: {},
  delivery: [],
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
  updateActiveShopOpeningHours(state, { day, openingHours }) {
    const newOpeningHours = Object.assign(
      {},
      state.activeShop.openingHours[day],
      openingHours
    )
    Vue.set(state.activeShop.openingHours, `${day}`, newOpeningHours)
  },
  updateActiveShopBreaks(state, { day, breaks }) {
    const mergedBreaks = Object.assign(
      {},
      state.activeShop.openingHours[day].breaks[0],
      breaks
    )
    const breaksArray = []
    breaksArray.push(mergedBreaks)
    Vue.set(state.activeShop.openingHours[day], `breaks`, breaksArray)
  },
  updateActiveShopAddress(state, changes) {
    const newAddress = Object.assign({}, state.activeShop.address, changes)
    Vue.set(state.activeShop, 'address', newAddress)
  },
  updateActiveShopImages(state, images) {
    const newImages = Object.assign({}, state.activeShop.images, images)
    Vue.set(state.activeShop, 'images', newImages)
  },
  selectActiveShopCategorie(state, category) {
    const categories = state.activeShop.categories
    if (!categories.includes(category.value)) categories.push(category.value)
    else
      state.activeShop.categories = categories.filter(
        (item) => item !== category.value
      )
  },
  selectActiveShopDelivery(state, option) {
    if (!state.activeShop.delivery.includes(option))
      state.activeShop.delivery.push(option)
    else {
      state.activeShop.delivery.splice(
        state.activeShop.delivery.indexOf(option),
        1
      )
    }
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
