<template>
  <div>
    <ProductCreationPrompt
      v-if="productCreationPrompt"
      @hide="productCreationPrompt = false"
    />
    <div class="relative">
      <div class="relative flex justify-end pb-1/4 bg-primary-light">
        <FormulateInput
          name="coverImage"
          type="image"
          :uploader="uploadCoverImage"
          upload-behavior="live"
          :label="$t('shop_registration_wizard.step_5.shop_photo')"
          validation="mime:image/jpeg,image/png"
          :value="[shop.images.cover]"
          outer-class="absolute h-full w-full"
          label-class="hidden"
          input-class="absolute h-full w-full z-20 img-input"
          help-class="hidden"
          wrapper-class="p-0 m-0"
          element-class="absolute h-full w-full element"
        />
        <div
          v-if="!coverImage || uploading.cover"
          class="absolute flex h-full w-1/2 items-center"
        >
          <div>
            <img class="mx-auto pb-5" src="/img/icons/add-pic.svg" />
            <span class="mx-auto text-center">{{
              $t('dashboard.upload_cover_image')
            }}</span>
          </div>
        </div>
      </div>

      <div class="bg-primary-lightest py-3 mb-5">
        <div class="container flex justify-end">
          <div>
            <button class="primary" @click="$router.push('/shop/edit')">
              {{ $t('dashboard.shop.manage_shop') }}
            </button>
            <button class="tertiary" @click="$router.push('/')">
              {{ $t('dashboard.shop.view_shop') }}
            </button>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-8 bg-white border-4 border-white -mb-5 w-1/3 pb-1/5"
      >
        <FormulateInput
          name="profileImage"
          type="image"
          :value="[shop.images.profile]"
          upload-behavior="live"
          :uploader="uploadProfileImage"
          :label="$t('shop_registration_wizard.step_5.you_photo')"
          validation="mime:image/jpeg,image/png"
          outer-class="absolute h-full w-full"
          label-class="hidden"
          input-class="absolute h-full w-full z-20 img-input"
          help-class="hidden"
          wrapper-class="p-0 m-0"
          element-class="absolute h-full w-full element"
        />

        <div
          v-if="!profileImage"
          class="absolute flex h-full w-full bg-grey-lighter"
        >
          <div class="mx-auto my-auto text-center">
            <img class="mx-auto pb-5" src="/img/icons/add-pic.svg" />
            <span>{{ $t('dashboard.upload_profile_image') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="flex">
        <div class="w-full">
          <h1
            class="py-5 font-serif antialiased select-none text-6xl font-black text-grey-dark"
          >
            {{ shopName }}
          </h1>
        </div>
        <!-- categories -->
        <div class="flex items-center w-full">
          <div class="flex flex-wrap justify-end w-full">
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
    }),
    categoryName(id) {
      return this.shopCategories[id]
    },
    async uploadCoverImage(file, progress, error, options) {
      this.uploading.cover = true
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/shop`, formData)
        this.updateActiveShopImages({ cover: imgLocal })
        await this.$axios.$put(`/api/shops/${this.shop._id}`, {
          images: { cover: imgLocal },
        })
        this.uploading.cover = false
      } catch (err) {
        // TODO handle error
        console.error(err)
        this.uploading.cover = false
      }
    },
    async uploadProfileImage(file, progress, error, options) {
      this.uploading.profile = true
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/shop`, formData)
        this.updateActiveShopImages({ profile: imgLocal })
        await this.$axios.$put(`/api/shops/${this.shop._id}`, {
          images: { profile: imgLocal },
        })
        this.uploading.profile = true
      } catch (err) {
        // TODO handle error
        console.error(err)
        this.uploading.profile = true
      }
    },
  },
}
</script>

<style lang="scss">
.element img {
  @apply absolute h-full w-full object-cover;
}

.formulate-file-name {
  @apply hidden;
}

.img-input {
  @apply opacity-0;
}

.category {
  @apply bg-grey-light text-white rounded-full px-2 py-1 m-1 flex-none select-none;
}
</style>
