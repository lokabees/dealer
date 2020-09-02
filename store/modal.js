export const state = () => ({
  visible: false,
  message: null,
})

export const getters = {
  visible(state) {
    return state.visible
  },
  message(state) {
    return state.message
  },
}

export const mutations = {
  showModal(state, message) {
    state.visible = true
    state.message = message
  },
  hideModal(state) {
    state.visible = false
    state.message = null
  },
}
