<template>
  <div class="container prose">
    <h1 class="text-center pt-16 pb-8">{{ $t('products.title') }}</h1>

    <div class="flex justify-between">
      <h2>{{ $t('products.add') }}</h2>
      <button
        class="tertiary justify-self-end"
        @click="$router.push('/products/add')"
      >
        {{ $t('products.add_button') }}
      </button>
    </div>

    <div
      v-for="product in products"
      :key="product.id"
      class="flex justify-between"
    >
      <div class="flex">
        <img :src="product.img" class="w-16 object-contain" />
        <div>
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
        </div>
      </div>
      <div class="flex flex-col">
        <button>{{ $t('products.delete') }}</button>
        <button @click="$router.push(`/products/${product.id}/edit`)">
          {{ $t('products.edit') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: '1',
          img: 'icon.png',
          name: 'Example product 1',
          description: 'Product description 1',
        },
        {
          id: '2',
          img: 'icon.png',
          name: 'Example product 2',
          description: 'Product description 2',
        },
        {
          id: '3',
          img: 'icon.png',
          name: 'Example product 3',
          description: 'Product description 3',
        },
      ],
    }
  },
}
</script>
