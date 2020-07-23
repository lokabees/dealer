<template>
  <div class="container align-text-middle">
    <div class="mt-5 text-center">
      <h1 v-if="$auth.user" class="title">Welcome {{ $auth.user.name }}</h1>
      <p class="py-5">
        Our plattform will soon be available for you.
      </p>
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
