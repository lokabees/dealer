<template>
  <div class="container prose">
    <h1>{{ shopName }}</h1>

    store img outside
    <img :src="coverImage" width="150px" />
    store img inside
    <img :src="profileImage" width="150px" />

    <button @click="$router.push('/shop/create')">
      create store (delete this button)
    </button>

    <button class="primary" @click="$router.push('/shop/edit')">
      {{ $t('dashboard.store.manage_store') }}
    </button>
    <button class="tertiary" @click="$router.push('/')">
      {{ $t('dashboard.store.view_store') }}
    </button>

    <div>
      <img src="icon.png" width="150px" />
      <h2>{{ $t('dashboard.store.title') }}</h2>
      <p>{{ $t('dashboard.store.text') }}</p>
      <button class="secondary" @click="$router.push('/shop/edit')">
        {{ $t('dashboard.store.manage') }}
      </button>
    </div>
    <div>
      <img src="icon.png" width="150px" />
      <h2>{{ $t('dashboard.products.title') }}</h2>
      <p>{{ $t('dashboard.products.text') }}</p>
      <button class="secondary" @click="$router.push('/products')">
        {{ $t('dashboard.products.manage') }}
      </button>
    </div>
    <div>
      <img src="icon.png" width="150px" />
      <h2>{{ $t('dashboard.academy.title') }}</h2>
      <p>{{ $t('dashboard.academy.text') }}</p>
    </div>
    <div>
      <img src="icon.png" width="150px" />
      <h2>{{ $t('dashboard.analysis.title') }}</h2>
      <p>{{ $t('dashboard.analysis.text') }}</p>
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
      return this.shop?.images?.cover?.url
    },
    profileImage() {
      return this.shop?.images?.profile?.url
    },
    shopName() {
      return this.shop?.name
    },
  },
}
</script>
