export default ({ app: { store, i18n } }, inject) => {
  inject('errorHandler', (args) => {
    const error = args?.error || 'unknown error'
    const status = error?.response?.status
    const prefix = args.prefix || 'general'
    const suffix = args.suffix || status

    const errorMessage = prefix + '.errors.' + suffix

    console.error(error)

    // show modal
    store.commit('modal/showModal', errorMessage)
  })
}
