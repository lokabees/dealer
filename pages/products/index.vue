<template>
  <div class="container prose">
    <h1>{{ $t('products.title') }}</h1>
    <h2>{{ $t('products.add') }}</h2>
    <button class="tertiary" @click="$router.push('/products/add')">
      {{ $t('products.add_button') }}
    </button>

    <div v-for="product in products" :key="product.id">
      <img :src="product.img" width="50px" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <button @click="$router.push(`/products/${product.id}/edit`)">
        {{ $t('products.edit') }}
      </button>
      <button>{{ $t('products.delete') }}</button>
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
