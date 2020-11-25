export default function ({ store, redirect }) {
  // If user does not have an active shop

  if (!store.state.shops?.activeShop._id) {
    return redirect('/shop/create')
  }
}
