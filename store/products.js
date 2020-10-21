export const state = () => ({
  products: [],
})

export const mutations = {
  addProduct(state, product) {
    state.products.push(product)
  },
}

export const getters = {
  products: (state) => state.products,
}
