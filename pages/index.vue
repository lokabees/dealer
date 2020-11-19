<template>
  <div>
    <ProductCreationPrompt
      v-if="productCreationPrompt"
      @hide="productCreationPrompt = false"
    />
    <div class="relative pb-1/2 md:pb-1/4 bg-primary-light">
      <ShopImage
        :value="shop.images.cover"
        upload-url="/api/media/shop"
        @uploaded="updateCoverImage($event)"
        @delete="removeImage('cover')"
      />
    </div>

    <div class="relative">
      <div
        class="hidden md:block absolute bottom-0 md:left-8 bg-white border-4 border-white -mb-5 w-2/3 md:w-1/3 pb-1/3 md:pb-1/5"
      >
        <ShopImage
          :value="shop.images.profile"
          upload-url="/api/media/shop"
          @uploaded="updateProfileImage($event)"
          @delete="removeImage('profile')"
        />
      </div>

      <div class="bg-primary-lightest py-3 mb-5 hidden md:block">
        <div class="container flex justify-end">
          <div>
            <button class="primary" @click="$router.push('/shop/edit')">
              {{ $t('dashboard.shop.manage_shop') }}
            </button>

            <a
              class="h-full"
              :href="`${$config.consumerUrl}/shops/${shop.slug}`"
              target="_blank"
            >
              <button class="tertiary" @click="$router.push('/')">
                {{ $t('dashboard.shop.view_shop') }}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full justify-items-center">
      <div
        class="mx-auto relative md:hidden bg-white border-4 border-white -mb-5 w-2/3 pb-1/3 -mt-1/4"
      >
        <ShopImage
          :value="shop.images.profile"
          upload-url="/api/media/shop"
          @uploaded="updateProfileImage($event)"
          @delete="removeImage('profile')"
        />
      </div>
    </div>

    <div class="container">
      <div class="md:flex px-2">
        <div class="w-full">
          <h1
            class="py-5 text-center md:text-left font-serif antialiased leading-tight select-none text-6xl font-black text-grey-dark"
          >
            {{ shopName }}
          </h1>
        </div>
        <!-- categories -->
        <div class="flex items-center w-full">
          <div class="flex flex-wrap justify-center md:justify-end w-full pb-6">
            <div
              v-for="(categoryId, key) in shop.categories"
              :key="key"
              class="category"
            >
              <span class="text-white text-sm"
                >{{ categoryName(categoryId) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-primary-lightest py-3 mb-5 md:hidden">
      <div class="container flex justify-center">
        <div>
          <button class="primary" @click="$router.push('/shop/edit')">
            {{ $t('dashboard.shop.manage_shop') }}
          </button>

          <a
            class="h-full"
            :href="`${$config.consumerUrl}/shops/${shop.slug}`"
            target="_blank"
          >
            <button class="tertiary">
              {{ $t('dashboard.shop.view_shop') }}
            </button>
          </a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="flex flex-wrap overflow-hidden">
        <!-- manage shop -->
        <DashboardCard>
          <template v-slot:image>
            <img src="/img/index/shop.jpg" />
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
            <img src="/img/index/product.jpg" />
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
            <img src="/img/index/academy.jpg" />
          </template>
          <template v-slot:text>
            <h2>{{ $t('dashboard.academy.title') }}</h2>
            <p>{{ $t('dashboard.academy.text') }}</p>
          </template>
        </DashboardCard>

        <!-- analysis -->
        <DashboardCard>
          <template v-slot:image>
            <img src="/img/index/dashboard.jpg" />
          </template>
          <template v-slot:text>
            <h2>{{ $t('dashboard.analysis.title') }}</h2>
            <p>{{ $t('dashboard.analysis.text') }}</p>
          </template>
        </DashboardCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  async asyncData({ $axios, store }) {
    let productCreationPrompt = true
    try {
      const shopCategories = await $axios.$get('/api/shops/categories')
      await store.dispatch('shops/getActiveShop')
      await store.dispatch('products/getProducts')
      productCreationPrompt = store.getters['products/products'].length === 0
      return { shopCategories, productCreationPrompt }
    } catch (e) {
      console.error(e)
      return { shopCategories: {}, productCreationPrompt }
    }
  },
  data() {
    return {
      uploading: { cover: false, profile: false },
    }
  },
  middleware: ['authenticated', 'hasShop'],

  computed: {
    ...mapGetters('shops', {
      shop: 'activeShop',
    }),
    ...mapGetters('products', {
      products: 'products',
    }),
    coverImage() {
      if (this.shop?.images?.cover?.url === 'cdn-link') return null
      return this.shop?.images?.cover?.url
    },
    profileImage() {
      if (this.shop?.images?.profile?.url === 'cdn-link') return null
      return this.shop?.images?.profile?.url
    },
    shopName() {
      return this.shop?.name
    },
  },
  methods: {
    ...mapMutations('shops', {
      updateActiveShopImages: 'updateActiveShopImages',
      removeActiveShopImage: 'removeActiveShopImage',
    }),
    categoryName(id) {
      return this.shopCategories[id]
    },
    async updateCoverImage(image) {
      try {
        await this.$axios.$put(`/api/shops/${this.shop._id}`, {
          images: { cover: image },
        })
        this.updateActiveShopImages({ cover: image })
      } catch (error) {
        this.$errorHandler({ prefix: 'dashboard', error })
        this.removeActiveShopImage('cover')
      }
    },
    async updateProfileImage(image) {
      try {
        await this.$axios.$put(`/api/shops/${this.shop._id}`, {
          images: { profile: image },
        })
        this.updateActiveShopImages({ profile: image })
      } catch (error) {
        this.$errorHandler({ prefix: 'dashboard', error })
        this.removeActiveShopImage('profile')
      }
    },
    removeImage(key) {
      this.removeActiveShopImage(key)
      this.$forceUpdate()
    },
  },
}
</script>

<style lang="scss">
.category {
  @apply bg-grey-light text-white rounded-full px-2 py-1 m-1 flex-none select-none;
}
</style>
