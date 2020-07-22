<template>
  <div class="mt-5">
    <h1 class="title">
      Callback
    </h1>
    <p>logging in...</p>
  </div>
</template>

<script>
export default {
  async mounted() {
    // exchange tokens
    try {
      const strategy = this.$auth.strategy.name
      const accessToken = this.$auth.getToken(strategy).substr(7)
      this.$axios.setToken('')
      const { token } = await this.$axios.$post(`/api/auth/google`, {
        accessToken,
      })
      this.$auth.setToken('local', 'Bearer ' + token)
      this.$router.push('/')
    } catch (error) {
      this.$errorHandler({ error })
    }
  },
}
</script>
