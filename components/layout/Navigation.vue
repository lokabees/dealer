<template>
  <div class="border-b border-grey-dark">
    <div class="md:container prose">
      <div class="flex overflow-hidden">
        <div class="w-1/3 overflow-hidden">
          <!-- Column Content -->
        </div>

        <div
          class="flex flex-wrap content-center w-1/3 justify-center overflow-hidden"
        >
          <n-link to="/"><img src="/img/logo.svg" width="130px" /></n-link>
        </div>

        <div
          class="flex flex-wrap content-center justify-end w-1/3 overflow-hidden"
        >
          <button v-if="user" @click="toggleDropdown">
            {{ user.name }}
          </button>
          <div v-if="dropdown" class="py-2 w-48 bg-white absolut shadow-xl">
            <button class="block px-4 py-2" @click="goToAccountSettings">
              {{ $t('navbar.account_settings') }}
            </button>
            <button class="block px-4 py-2" @click="logoutUser">
              {{ $t('navbar.logout') }}
            </button>
          </div>
        </div>
      </div>
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
    toggleDropdown() {
      this.dropdown = !this.dropdown
    },
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
