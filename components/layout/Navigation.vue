<template>
  <div class="container prose">
    <n-link to="/"><img src="/img/logo.svg" width="150px" /></n-link>
    <button v-if="user" @click="$router.push('/user')">
      {{ user.name }}
    </button>
    <button v-if="user" @click="logoutUser">
      Sign out
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user']),
  },
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
