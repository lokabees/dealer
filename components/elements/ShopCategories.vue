<template>
  <div>
    <FormulateInput
      v-model="context.model"
      name="categories"
      data-classification="shopCategories"
      type="checkbox"
      :options="context.options"
      :label="$t('edit_shop.categories')"
    />
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      validation: (context) => {
        console.log(context)
        return context.options
      },
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      checkbox: null,
    }
  },
}
</script>
