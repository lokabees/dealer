<template>
  <div>
    <div class="border-b border-grey-dark">
      <div class="md:container prose">
        <div class="flex">
          <div class="w-1/3">
            <!-- Column Content -->
          </div>

          <div class="flex flex-wrap content-center w-1/3 justify-center">
            <n-link to="/"><img src="/img/logo.svg" width="130px" /></n-link>
          </div>

          <div class="relative flex flex-wrap content-center justify-end w-1/3">
            <button
              v-if="user"
              class="flex items-center text-sm capitalize"
              @click="toggleDropdown"
            >
              <eva-icon
                class="mr-2 border-2 border-grey-dark"
                height="16"
                width="16"
                name="person-outline"
              />
              {{ user.name }}
              <eva-icon
                class="ml-2"
                height="16"
                width="16"
                name="arrow-ios-downward"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="relative md:container">
      <div
        v-if="dropdown"
        class="absolute bg-white border border-t-0 border-grey-dark right-0 top-0 z-50 text-sm"
      >
        <button
          ref="accountSettings"
          class="text-left capitalize font-bold w-full px-2 py-2 hover:bg-grey-dark hover:text-white"
          @blur="dropdown = false"
          @click="goToAccountSettings"
        >
          {{ $t('navbar.account_settings') }}
        </button>
        <button
          class="text-left capitalize font-bold w-full px-2 py-2 hover:bg-grey-dark hover:text-white"
          @click="logoutUser"
        >
          {{ $t('navbar.logout') }}
        </button>
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
      if (this.dropdown)
        setTimeout(() => {
          if (this.$refs.accountSettings) this.$refs.accountSettings.focus()
        }, 0)
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

<style lang="scss" scoped>
.dropdown {
  @apply py-2 w-48 bg-white shadow-xl hidden;
}

.dropdown:hover .dropdown {
  @apply block;
}
</style>
