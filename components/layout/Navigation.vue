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
              <i class="mr-2 border-2 border-grey-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="inherit"
                  class="eva"
                >
                  <g data-name="Layer 2">
                    <g data-name="person">
                      <rect width="24" height="24" opacity="0"></rect>
                      <path
                        d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
                      ></path>
                      <path
                        d="M12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </i>
              <div class="hidden sm:block">
                {{ user.name }}
              </div>
              <i class="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="inherit"
                  class="eva"
                >
                  <g data-name="Layer 2">
                    <g data-name="arrow-ios-downward">
                      <rect width="24" height="24" opacity="0"></rect>
                      <path
                        d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="relative md:container">
      <div
        v-if="dropdown"
        class="absolute bg-white border border-t-0 border-grey-dark right-0 top-0 z-30 text-sm"
      >
        <button
          ref="accountSettings"
          class="text-left capitalize font-bold w-full px-2 py-2 hover:bg-grey-dark hover:text-white rounded-none"
          @click="goToAccountSettings"
        >
          {{ $t('navbar.account_settings') }}
        </button>
        <button
          class="text-left capitalize font-bold w-full px-2 py-2 hover:bg-grey-dark hover:text-white rounded-none"
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
