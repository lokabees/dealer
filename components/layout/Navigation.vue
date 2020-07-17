<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <nav
        class="bg-white transition ease-in duration-150 shadow"
        :class="{ 'shadow-lg': scroll }"
      >
        <div class="container navigation">
          <div class="brand">
            <n-link to="/" class="text-black" exact>
              lokabees
            </n-link>
          </div>
          <!--
          <div class="ml-3">
            <ul>
              <li>
                <n-link to="/" exact>
                  Home
                </n-link>
              </li>
              <li>
                <n-link to="/#1" exact>
                  Agentur
                </n-link>
              </li>
            </ul>
          </div>
        -->
          <div class="ml-auto">
            <ul>
              <li>
                <n-link to="/account/login">
                  Login
                </n-link>
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
  },
}
</script>
<style lang="scss">
.navigation {
  @apply relative flex items-center text-black antialiased px-2 py-5;

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
