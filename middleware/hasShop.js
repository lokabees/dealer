export default function ({ store, redirect }) {
  // If user does not have an active shop

  if (!store.state.shops?.activeShop.name) {
    return redirect('/shop/create')
  }
}
