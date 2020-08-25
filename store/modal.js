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
    console.log(state.visible)
    state.visible = true
    console.log(state.visible)
  },
  hideModal(state) {
    state.visible = false
  },
}
