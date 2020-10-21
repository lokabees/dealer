<template>
  <div>
    <h1 class="text-center pt-16 pb-8">{{ $t('products.title') }}</h1>

    <div class="bg-primary-lightest py-6 mb-8">
      <div class="container flex justify-between items-center">
        <h2>{{ $t('products.add') }}</h2>
        <button
          class="tertiary justify-self-end"
          @click="$router.push('/products/add')"
        >
          {{ $t('products.add_button') }}
        </button>
      </div>
    </div>

    <div class="container">
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
          <button>{{ $t('products.delete') }}</button>
          <button
            class="secondary my-auto"
            @click="$router.push(`/products/${product._id}/edit`)"
          >
            {{ $t('products.edit') }}
          </button>
        </template>
      </Product>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async fetch({ store }) {
    try {
      await store.dispatch('products/getProducts')
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    ...mapGetters('products', { products: 'products' }),
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
