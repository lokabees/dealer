<template>
  <div v-if="modalVisible">
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    modalVisible() {
      return this.$store.getters['modal/visible']
    },
  },
}
</script>
