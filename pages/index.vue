<template>
  <div class="md:container mx-auto prose">
    <img :src="coverImage" class="h-48 w-full object-cover" />

    <div class="flex flex-wrap overflow-hidden">
      <div>
        <img :src="profileImage" class="h-48 w-48 object-cover" />
      </div>
      <div class="mx-auto">
        <button class="primary" @click="$router.push('/shop/edit')">
          {{ $t('dashboard.store.manage_store') }}
        </button>
        <button class="tertiary" @click="$router.push('/')">
          {{ $t('dashboard.store.view_store') }}
        </button>
      </div>
    </div>

    <div class="flex">
      <div>
        <h1>{{ shopName }}</h1>
      </div>
      <div class="flex justify-end bg-gray-200">
        Categories
      </div>
    </div>

    <div class="flex flex-wrap overflow-hidden -mx-2">
      <div class="dashboard-card">
        <img src="icon.png" />
        <h2>{{ $t('dashboard.store.title') }}</h2>
        <p>{{ $t('dashboard.store.text') }}</p>
        <button class="secondary" @click="$router.push('/shop/edit')">
          {{ $t('dashboard.store.manage') }}
        </button>
      </div>

      <div class="dashboard-card">
        <img src="icon.png" />
        <h2>{{ $t('dashboard.products.title') }}</h2>
        <p>{{ $t('dashboard.products.text') }}</p>
        <button class="secondary" @click="$router.push('/products')">
          {{ $t('dashboard.products.manage') }}
        </button>
      </div>

      <div class="dashboard-card">
        <img src="icon.png" />
        <h2>{{ $t('dashboard.academy.title') }}</h2>
        <p>{{ $t('dashboard.academy.text') }}</p>
      </div>

      <div class="dashboard-card">
        <img src="icon.png" />
        <h2>{{ $t('dashboard.analysis.title') }}</h2>
        <p>{{ $t('dashboard.analysis.text') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: ['authenticated', 'hasShop'],
  computed: {
    ...mapGetters('shops', {
      shop: 'activeShop',
    }),
    coverImage() {
      // return this.shop?.images?.cover?.url || 'icon.png'
      return 'icon.png'
    },
    profileImage() {
      // return this.shop?.images?.profile?.url || 'icon.png'
      return 'icon.png'
    },
    shopName() {
      return this.shop?.name
    },
  },
}
</script>

<style lang="scss">
.dashboard-card {
  @apply w-full overflow-hidden px-2 my-2;

  @screen sm {
    @apply w-1/2;
  }

  img {
    @apply w-full h-52 object-cover;
  }
}
</style>
