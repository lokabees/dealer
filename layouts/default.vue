<template>
  <div class="flex flex-col min-h-screen">
    <toast />
    <modal :show="showModal" centered></modal>
    <navigation class="hidden md:block sticky top-0 z-30" />
    <nuxt class="container flex-1 mx-auto md:mb-10" />
    <!--  <v-lazy ssr-only> -->
    <foot />
    <!--  </v-lazy> -->
    <v-lazy ssr-only>
      <navbar class="block md:hidden fixed bottom-0 w-full" />
    </v-lazy>
  </div>
</template>
<script>
import VLazy from 'vue-lazy-hydration'
import { mapGetters } from 'vuex'
export default {
  components: {
    VLazy,
    Navigation: () => import('~/components/layout/Navigation'),
    Navbar: () => import('~/components/layout/Navbar'),
    Foot: () => import('~/components/layout/Footer'),
    Modal: () => import('~/components/layout/Modal'),
    Toast: () => import('~/components/layout/Toast'),
  },
  computed: {
    ...mapGetters('modal', {
      showModal: 'showModal',
    }),
  },
}
</script>
