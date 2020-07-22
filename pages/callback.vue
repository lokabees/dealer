<template>
  <div class="mt-5">
    <h1 class="title">
      Callback
    </h1>
    {{ $auth.loggedIn }}<br />
    {{ $auth.user }}
    <button @click="fetchShops">fetch shops</button>
  </div>
</template>

<script>
export default {
  async mounted() {
    // exchange tokens
    try {
      const strategy = this.$auth.strategy.name
      console.log()
      // const accessToken = this.$auth.getToken(strategy).substr(7)
      const {
        data: { token },
      } = await this.$axios.$post(`/api/auth/google`, {
        data: {
          provider: strategy,
          // token: accessToken,
        },
        params: { master: process.env.VUE_APP_MASTER_KEY },
      })
      this.$auth.setToken('local', 'Bearer ' + token)
    } catch (error) {
      this.$errorHandler({ error })
    }
  },
  methods: {
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
