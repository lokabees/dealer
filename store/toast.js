import { uniqueId } from 'lodash'
const dismissInterval = 2000

export const state = () => ({
  toasts: [],
})

export const getters = {
  list(state) {
    return state.toasts
  },
}

export const mutations = {
  addToast(state, { message, text }) {
    state.toasts.push({ message, text, id: uniqueId() })
  },
  removeToast({ toasts }, index) {
    toasts.splice(index, 1)
  },
  removeToastById(state, id) {
    const index = state.toasts.findIndex((toast) => toast.id === id)
    state.toasts.splice(index, 1)
  },
  removeLastToast(state, id) {
    state.toasts.pop()
  },
}

export const actions = {
  async add({ commit }, data) {
    if (data.message || data.text) {
      commit('addToast', data)
    }
    if (!data.dontHide) {
      await setTimeout(
        () => commit('removeToastById', data.id),
        dismissInterval
      )
    }
  },
  remove({ state, commit }, { id }) {
    commit('removeToast', id)
  },
}
