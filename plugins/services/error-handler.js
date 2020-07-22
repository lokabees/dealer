function getErrorMessage(error, type) {
  let prefix = type || 'general'
  let status = error?.response?.status || 500
  const message = error?.response?.data?.message || ''

  if (status === 500 && error.request) {
    prefix = 'general'
    status = 'network'
  }
  if (
    prefix === 'login' &&
    status === 401 &&
    message === 'Deine E-Mail ist nicht verifiziert'
  )
    status += '_1'

  return `${prefix}.error_messages.${status}`
}

export default ({ app: { store, i18n } }, inject) => {
  inject('errorHandler', (args) => {
    const error = args?.error || 'unknown error'
    const type = args?.type || 'general'

    console.error(error)

    const errorMessage = getErrorMessage(error, type)

    // show modal
    store.commit('modal/showModal', {
      message: i18n.t(errorMessage),
      confirmText: i18n.t('general.ok'),
    })
  })
}
