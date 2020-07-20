<template>
  <div class="container">
    <div class="mt-5">
      <h1 class="title">
        dealer
        <icon name="comments" />
      </h1>
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
