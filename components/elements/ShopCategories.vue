<template>
  <div>
    <div class="flex">
      <div
        v-for="category in context.options"
        :key="category.id"
        :class="{ category: true, selected: isSelected(category) }"
        @click="select(category)"
      >
        <span class="text-white"> {{ category.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      validation: (context) => {
        return context.options
      },
      required: true,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      checkbox: null,
    }
  },
  methods: {
    isSelected(category) {
      return this.context.model.includes(category.value)
    },
    select(category) {
      if (!this.context.model) this.context.model = []
      if (!this.isSelected(category)) this.context.model.push(category.value)
      else
        this.context.model = this.context.model.filter(
          (item) => item !== category.value
        )
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  @apply bg-grey text-white rounded-full px-2 py-1 m-1;

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.selected {
  @apply bg-primary;
}
</style>
