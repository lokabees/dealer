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
  data() {
    return {
      categories: [],
    }
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
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
      /*
      let categories = []
      if (!this.isSelected(category)) {
        categories.push(category.value)
        this.updateShop({ categories })
      } else {
        categories = this.activeShop.categories.filter(
          (item) => item !== category.value
        )
        this.updateShop({ categories })
      }
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
