export const state = () => ({
  visible: false,
})

export const getters = {
  visible(state) {
    return state.visible
  },
}

export const mutations = {
  showModal(state) {
    state.visible = true
  },
  hideModal(state) {
    state.visible = false
  },
}
