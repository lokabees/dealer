export default ({ store, $axios, redirect }) => {
  /**
   * set global accessToken on refresh
   */
  $axios.setToken(store.state.accessToken, 'Bearer')
  /**
   * Logout if user has no right credentials
   * TODO: Temporary Workaround
   */
  $axios.onError((error) => {
    if (error.response.status === 504) {
      store.commit('modal/showModal', {
        message: 'error.connection',
        conrifmText: 'okay',
      })
    }
  })
  /*
    if (error.response.status === 401) {
      store.dispatch('resetUser')
      redirect('/login')
    }

  */
}
