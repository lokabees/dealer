<template>
  <div class="container prose">
    <n-link to="/"><img src="/img/logo.svg" width="150px" /></n-link>
    <button @click="$router.push('/user')">Profile</button>
    <button @click="logoutUser">Sign out</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['resetUser']),
    async logoutUser() {
      try {
        await this.$axios.post(`/api/auth/logout`)
        this.resetUser()
        this.$router.push('/auth/login')
        // Send toast
        // this.$store.dispatch('toast/add', { message: `toast.logout` })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
