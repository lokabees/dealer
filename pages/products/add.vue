<template>
  <div class="container prose">
    <h1 class="text-center pt-16 pb-8">{{ $t('add_product.title') }}</h1>
    <FormulateForm v-model="product" @submit="addProduct">
      <FormulateInput
        type="image"
        name="img"
        :label="$t('add_product.image')"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="name"
        :label="$t('add_product.name')"
        :placeholder="$t('add_product.name_placeholder')"
        validation="required"
      />
      <FormulateInput
        type="textarea"
        name="description"
        :label="$t('add_product.description')"
        :placeholder="$t('add_product.description_placeholder')"
        validation="required"
      />
      <FormulateInput
        type="checkbox"
        :options="{
          first: 'First',
          second: 'Second',
          third: 'Third',
          fourth: 'Fourth',
        }"
        name="category"
        :label="$t('add_product.category')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('add_product.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    }
  },
  methods: {
    addProduct() {
      console.log('add product')
      console.log(this.product)
    },
  },
}
</script>
