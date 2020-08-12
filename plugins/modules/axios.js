export default ({ store, $axios, redirect }) => {
  /**
   * set global accessToken on refresh
   */
  $axios.setToken(store.state.accessToken, 'Bearer')
}
