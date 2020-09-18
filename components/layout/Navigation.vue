<template>
  <div class="container prose">
    <n-link to="/"><img src="/img/logo.svg" width="150px" /></n-link>
    <button v-if="user" @click="dropdown = !dropdown" @blur="dropdown = false">
      {{ user.name }}
    </button>
    <div v-if="dropdown" class="py-2 w-48 bg-white absolute shadow-xl">
      <button class="block px-4 py-2" @click="goToAccountSettings">
        Account settings
      </button>
      <button @click="logoutUser" class="block px-4 py-2">
        Sign out
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      dropdown: false,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['resetUser']),
    ...mapMutations('modal', {
      showModal: 'showModal',
    }),
    goToAccountSettings() {
      this.dropdown = false
      this.$router.push('/user')
    },
    async logoutUser() {
      this.dropdown = false
      try {
        await this.$axios.post(`/api/auth/logout`)
        this.resetUser()
        this.$router.push('/auth/logout-success')
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
