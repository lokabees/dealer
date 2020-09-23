<template
  ><div>
    <h1>Hui</h1>
    {{ context.options }}

    <FormulateInput
      v-model="context.model"
      name="categories"
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
}
</script>
