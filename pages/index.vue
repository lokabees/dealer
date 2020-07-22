<template>
  <div class="container">
    <div class="mt-5">
      <h1 class="title">
        dealer
      </h1>
      {{ $auth.loggedIn }}<br />
      {{ $auth.user }}
      <button @click="showToast">showToast</button>
      <button @click="fetchShops">fetch shops</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showToast() {
      this.$store.dispatch('toast/add', { message: `toast.logout` })
    },
    async fetchShops() {
      try {
        const shops = await this.$axios.$get('/api/shops')
        console.log(shops)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
