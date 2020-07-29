<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <nav
        class="bg-white transition ease-in duration-150 shadow"
        :class="{ 'shadow-lg': scroll }"
      >
        <div class="container navigation">
          <div>
            <unicon class="align-middle" name="bars" fill="primary"></unicon>
            <span class="inline-block align-middle">
              {{ $t('navigation.menu') }}
            </span>
          </div>
          <div class="brand mx-auto">
            <n-link to="/" class="text-black" exact>
              lokabees
            </n-link>
          </div>
          <div v-if="$auth.loggedIn" class="ml-auto">
            <ul>
              <li>
                <button @click="logout">
                  {{ $t('navbar.logout') }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
/**
 * Default top navigation for desktop view.
 */
export default {
  name: 'Navigation',
  data: () => ({ scroll: false }),
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      // Your scroll handling here
      this.scroll = !!window.scrollY
    },
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
<style lang="scss">
.navigation {
  @apply relative grid grid-cols-3 items-center text-black antialiased px-2 py-4;

  @screen sm {
    @apply px-3;
  }
  ul {
    @apply list-none overflow-hidden;
  }

  li {
    @apply float-left subpixel-antialiased;

    a {
      @apply flex items-center;
      @apply text-black mx-0 font-semibold tracking-wider no-underline;
      @apply transition duration-200 ease-in-out;

      &:hover {
        @apply text-primary;
      }

      @screen sm {
        @apply mx-2;
      }
    }

    /*
    .nuxt-link-active {
      @apply text-primary no-underline;
    }
    */
  }

  .brand {
    @apply font-bold px-1 hidden text-2xl;

    @screen sm {
      @apply inline-block;
    }

    /*
    a {
      @apply text-primary no-underline;

      &:hover {
        @apply text-primary;
      }
    }
*/
    @screen sm {
      @apply px-3;
    }
  }
}
</style>
