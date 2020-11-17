<template>
  <div class="bg-primary-lightest">
    <Modal :visible="showModal" :message="$t('products.delete_confirmation')">
      <template v-slot:buttons>
        <button @click="showModal = false">{{ $t('products.cancel') }}</button>
        <button :class="{ 'spinner-light': pending }" @click="deleteProduct">
          {{ $t('products.ok') }}
        </button>
      </template>
    </Modal>

    <h1 class="text-center font-serif font-black text-grey-dark pt-16 pb-8">
      {{ $t('products.title') }}
    </h1>

    <div class="bg-white py-6 mb-8">
      <div class="container max-w-2xl flex justify-between items-center px-2">
        <h2>{{ $t('products.add') }}</h2>
        <button
          class="tertiary justify-self-end capitalize"
          @click="$router.push('/products/add')"
        >
          {{ $t('products.add_button') }}
        </button>
      </div>
    </div>

    <div class="container max-w-2xl px-2">
      <Product
        v-for="product in products"
        :key="product.id"
        class="flex justify-between"
      >
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <template v-slot:img>
          <img :src="product.picture.url" />
        </template>
        <template v-slot:buttons>
          <button
            class="flex items-center text-grey-dark capitalize"
            @click="showDeleteModal(product._id)"
          >
            {{ $t('products.delete') }}
            <eva-icon
              class="ml-2"
              name="close"
              height="20"
              width="20"
              fill="#2B2B2B"
            />
          </button>
          <button
            class="bg-white text-grey-dark border border-grey-dark my-auto flex items-center capitalize"
            @click="$router.push(`/products/${product._id}/edit`)"
          >
            {{ $t('products.edit') }}
            <eva-icon
              class="ml-2"
              name="edit-2-outline"
              height="20"
              width="20"
              fill="#2B2B2B"
            />
          </button>
        </template>
      </Product>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  async fetch({ store }) {
    try {
      await store.dispatch('products/getProducts')
    } catch (e) {
      console.error(e)
    }
  },
  data() {
    return {
      deleteId: null,
      showModal: false,
      pending: false,
    }
  },
  computed: {
    ...mapGetters('products', { products: 'products' }),
  },
  methods: {
    ...mapMutations('products', {
      deleteProductInStore: 'deleteProduct',
    }),
    showDeleteModal(id) {
      this.deleteId = id
      this.showModal = true
    },
    async deleteProduct() {
      try {
        if (!this.deleteId) return
        this.pending = true
        await this.$axios.$delete(`/api/products/${this.deleteId}`)
        this.deleteProductInStore(this.deleteId)
        this.deleteId = null
        this.showModal = false
        this.pending = false
      } catch (error) {
        this.pending = false
        this.$errorHandler({ prefix: 'products', error })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  @apply text-4xl;
}
h2 {
  @apply font-serif antialiased select-none text-2xl font-black text-grey-dark;
}
</style>
