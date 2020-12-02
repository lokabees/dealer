<template>
  <div>
    <div class="flex flex-wrap">
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    context: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  mounted() {
    this.context.model = this.activeShop.categories
  },
  methods: {
    ...mapMutations('shops', {
      updateActiveShopAddress: 'updateActiveShopAddress',
    }),
    isSelected(category) {
      return this.activeShop.categories.includes(category.value)
    },
    select(category) {
      this.$store.commit('shops/selectActiveShopCategorie', category)
      this.context.model = this.activeShop.categories

      /*
      if (this.isSelected(category)) {
        this.context.model.push(category.value)
      } else {
        this.context.model = this.context.model.filter(
          (item) => item !== category.value
        )
      }
      console.log(this.context.model)
      */
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  @apply bg-grey text-white rounded-full px-2 py-1 m-1 flex-none;

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.selected {
  @apply bg-primary;
}
</style>
