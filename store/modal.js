export const state = () => ({
  message: null,
  showModal: false,
  confirmText: 'confirm',
  dismissText: null,
  onConfirm: null,
  onDismiss: null,
})

export const getters = {
  showModal(state) {
    return state.showModal
  },
  message(state) {
    return state.message
  },
  confirmText(state) {
    return state.confirmText
  },
  dismissText(state) {
    return state.dismissText
  },
}

export const mutations = {
  showModal(
    state,
    { message, onConfirm, onDismiss, confirmText, dismissText }
  ) {
    const empty = () => {}
    state.onConfirm = onConfirm || empty
    state.onDismiss = onDismiss || empty
    if (!message) return
    state.message = message
    state.showModal = true

    state.confirmText = confirmText || 'confirm'
    state.dismissText = dismissText || null
  },
  hideModal(state, index) {
    state.showModal = false
  },
  confirm(state) {
    if (state.onConfirm && typeof state.onConfirm === 'function')
      state.onConfirm()
    state.showModal = false
  },
  dismiss(state) {
    if (state.onDismiss && typeof state.onConfirm === 'function')
      state.onDismiss()
    state.showModal = false
  },
}
