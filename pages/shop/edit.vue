<template>
  <div class="container prose">
    <h1>{{ $t('edit_shop.title') }}</h1>
    <FormulateForm v-model="shop" @submit="save">
      <FormulateInput
        name="name"
        type="text"
        :label="$t('edit_shop.shop_name')"
        :placeholder="$t('edit_shop.shop_name_placeholder')"
      />
      <FormulateInput
        name="visible"
        type="checkbox"
        :label="$t('edit_shop.visibility')"
      />
      <span>{{ $t('edit_shop.visibility_hint') }}</span>
      <FormulateInput
        name="categories"
        type="checkbox"
        :options="{
          first: 'First',
          second: 'Second',
          third: 'Third',
          fourth: 'Fourth',
        }"
        :label="$t('edit_shop.categories')"
      />
      <FormulateInput
        name="location"
        type="text"
        :label="$t('edit_shop.location')"
        :placeholder="$t('edit_shop.location_placeholder')"
      />
      <FormulateInput
        type="textarea"
        name="description"
        :placeholder="$t('edit_shop.description_placeholder')"
        :label="$t('edit_shop.description')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('edit_shop.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shop: {},
    }
  },
  methods: {
    save() {
      console.log(this.shop)
      this.$router.push('/')
    },
  },
}
</script>
