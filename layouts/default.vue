<template>
  <div class="flex flex-col min-h-screen">
    <navigation class="hidden md:block sticky top-0 z-30" />
    <nuxt class="container flex-1 mx-auto md:mb-10" />
    <v-lazy ssr-only>
      <foot />
    </v-lazy>
    <v-lazy ssr-only>
      <navbar class="block md:hidden fixed bottom-0 w-full" />
    </v-lazy>
  </div>
</template>
<script>
import VLazy from 'vue-lazy-hydration'
export default {
  components: {
    VLazy,
    Navigation: () => import('~/components/layout/Navigation'),
    Navbar: () => import('~/components/layout/Navbar'),
    Foot: () => import('~/components/layout/Footer'),
  },
}
</script>
