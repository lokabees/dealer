export const state = () => ({
  products: [],
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  addProduct(state, product) {
    state.products.push(product)
  },
  editProduct(state, newProduct) {},
  editProductPicture(state, newProduct) {},
}

export const actions = {
  async getProducts({ rootGetters, commit }) {
    try {
      const { rows: products } = await this.$axios.$get(
        `/api/shops/${rootGetters['shops/activeShop']?._id}/products`
      )
      commit('setProducts', products)
    } catch (error) {
      console.error(error)
    }
  },
}

export const getters = {
  products: (state) => state.products,
}
