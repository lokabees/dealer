<template>
  <div class="container prose">
    <n-link to="/"><img src="/img/logo.svg" width="150px" /></n-link>
    <button @click="$router.push('/user')">Profile</button>
    <button v-if="$store.state.accessToken" @click="logoutUser">
      Sign out
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapActions(['resetUser']),
    ...mapMutations('modal', {
      showModal: 'showModal',
    }),
    async logoutUser() {
      try {
        await this.$axios.post(`/api/auth/logout`)
        this.resetUser()
        this.$router.push('/auth/login')
        // Send toast
        // this.$store.dispatch('toast/add', { message: `toast.logout` })
      } catch (error) {
        // TODO what if logout does not work?
        this.resetUser()
        this.$router.push('/auth/login')
        console.error(error)
        this.showModal(error)
      }
    },
  },
}
</script>
