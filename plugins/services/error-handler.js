export default ({ app: { store } }, inject) => {
  inject('errorHandler', (args) => {
    const error = args?.error || 'unknown error'

    const status = error?.response?.status
    let prefix = args.prefix || 'general'
    let suffix = args.suffix || status

    if (error.message === 'Network Error') {
      prefix = 'general'
      suffix = 'network'
    }

    const errorMessage = prefix + '.errors.' + suffix

    console.error(error)

    // show modal
    store.commit('modal/showModal', errorMessage)
  })
}
