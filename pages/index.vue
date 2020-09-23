<template>
  <div class="md:container mx-auto prose">
    <img :src="coverImage" class="h-48 w-full object-cover" />

    <div class="flex flex-wrap overflow-hidden">
      <div>
        <img :src="profileImage" class="h-48 w-48 object-cover" />
      </div>
      <div class="mx-auto">
        <button class="primary" @click="$router.push('/shop/edit')">
          {{ $t('dashboard.shop.manage_shop') }}
        </button>
        <button class="tertiary" @click="$router.push('/')">
          {{ $t('dashboard.shop.view_shop') }}
        </button>
      </div>
    </div>

    <div class="flex">
      <div>
        <h1>{{ shopName }}</h1>
      </div>
      <div class="flex justify-end bg-gray-200">
        <div v-for="(category, key) in shop.categories" :key="key">
          {{ category }}
        </div>
      </div>
    </div>

    <button
      class="tertiary"
      @click="$store.commit('shops/setActiveShop', null)"
    >
      Reset active shop
    </button>

    <div class="flex flex-wrap overflow-hidden">
      <!-- manage shop -->
      <DashboardCard>
        <template v-slot:image>
          <img src="icon.png" />
        </template>
        <template v-slot:text>
          <h2>{{ $t('dashboard.shop.title') }}</h2>
          <p>{{ $t('dashboard.shop.text') }}</p>
        </template>
        <template v-slot:button>
          <button class="secondary" @click="$router.push('/shop/edit')">
            {{ $t('dashboard.shop.manage') }}
          </button>
        </template>
      </DashboardCard>

      <!-- manage products -->
      <DashboardCard>
        <template v-slot:image>
          <img src="icon.png" />
        </template>
        <template v-slot:text>
          <h2>{{ $t('dashboard.products.title') }}</h2>
          <p>{{ $t('dashboard.products.text') }}</p>
        </template>
        <template v-slot:button>
          <button class="secondary" @click="$router.push('/products')">
            {{ $t('dashboard.products.manage') }}
          </button>
        </template>
      </DashboardCard>

      <!-- academy-->
      <DashboardCard>
        <template v-slot:image>
          <img src="icon.png" />
        </template>
        <template v-slot:text>
          <h2>{{ $t('dashboard.academy.title') }}</h2>
          <p>{{ $t('dashboard.academy.text') }}</p>
        </template>
      </DashboardCard>

      <!-- analysis -->
      <DashboardCard>
        <template v-slot:image>
          <img src="icon.png" />
        </template>
        <template v-slot:text>
          <h2>{{ $t('dashboard.analysis.title') }}</h2>
          <p>{{ $t('dashboard.analysis.text') }}</p>
        </template>
      </DashboardCard>
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
      return this.shop?.images?.cover?.url || 'icon.png'
    },
    profileImage() {
      return this.shop?.images?.profile?.url || 'icon.png'
    },
    shopName() {
      return this.shop?.name
    },
  },
}
</script>
