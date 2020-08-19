<template>
  <div class="container prose">
    <h1>{{ $t('edit_product.title') }}</h1>
    <FormulateForm v-model="product" @submit="updateProduct">
      <FormulateInput
        type="image"
        name="img"
        :label="$t('edit_product.image')"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="name"
        :label="$t('edit_product.name')"
        :placeholder="$t('edit_product.name_placeholder')"
        validation="required"
      />
      <FormulateInput
        type="textarea"
        name="description"
        :label="$t('edit_product.description')"
        :placeholder="$t('edit_product.description_placeholder')"
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
        :label="$t('edit_product.category')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('edit_product.submit')" />
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
    updateProduct() {
      console.log('update product')
      console.log(this.product)
    },
  },
}
</script>
