export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home authenticated page
  if (store.state.accessToken) {
    return redirect('/')
  }
}
