<template>
  <div class="bg-primary-lightest h-full">
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
      <PageElementsProductsProduct
        v-for="product in products"
        :key="product.id"
      >
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <template v-slot:img>
          <img class="h-32 w-32" :src="product.picture.url" />
        </template>
        <template v-slot:buttons>
          <button
            class="flex items-center text-grey-dark capitalize"
            @click="showDeleteModal(product._id)"
          >
            {{ $t('products.delete') }}
            <i class="eva-hover ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#2B2B2B"
                class="eva"
              >
                <g data-name="Layer 2">
                  <g data-name="close">
                    <rect
                      width="24"
                      height="24"
                      transform="rotate(180 12 12)"
                      opacity="0"
                    ></rect>
                    <path
                      d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
                    ></path>
                  </g>
                </g>
              </svg>
            </i>
          </button>
          <button
            class="
              bg-white
              text-grey-dark
              border border-grey-dark
              my-auto
              flex
              items-center
              capitalize
            "
            @click="$router.push(`/products/${product._id}/edit`)"
          >
            {{ $t('products.edit') }}
            <i class="eva-hover ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#2B2B2B"
                class="eva"
              >
                <g data-name="Layer 2">
                  <g data-name="edit-2">
                    <rect width="24" height="24" opacity="0"></rect>
                    <path d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2z"></path>
                    <path
                      d="M5 18h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71L16.66 2.6A2 2 0 0 0 14 2.53l-9 9a2 2 0 0 0-.57 1.21L4 16.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 18zM15.27 4L18 6.73l-2 1.95L13.32 6zm-8.9 8.91L12 7.32l2.7 2.7-5.6 5.6-3 .28z"
                    ></path>
                  </g>
                </g>
              </svg>
            </i>
          </button>
        </template>
      </PageElementsProductsProduct>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '../../components/elements/Modal.vue'
export default {
  components: { Modal },
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
