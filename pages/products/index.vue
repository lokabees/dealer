<template>
  <div class="container prose">
    <h1 class="text-center pt-16 pb-8">{{ $t('products.title') }}</h1>

    <div class="flex justify-between items-center">
      <h2>{{ $t('products.add') }}</h2>
      <button
        class="tertiary justify-self-end"
        @click="$router.push('/products/add')"
      >
        {{ $t('products.add_button') }}
      </button>
    </div>

    <Product
      v-for="product in products"
      :key="product.id"
      class="flex justify-between"
    >
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <template v-slot:img>
        <img :src="product.img" />
      </template>
      <template v-slot:buttons>
        <button>{{ $t('products.delete') }}</button>
        <button
          class="secondary"
          @click="$router.push(`/products/${product.id}/edit`)"
        >
          {{ $t('products.edit') }}
        </button>
      </template>
    </Product>
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
