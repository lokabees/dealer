<template>
  <div class="sm:flex sm:justify-between border-grey-light border-b-2 py-2">
    <div class="sm:flex">
      <div class="relative h-32 w-32 flex-none rounded-lg my-4">
        <slot name="img"></slot>
      </div>
      <div class="pl-5">
        <slot />
      </div>
    </div>
    <div class="flex sm:flex-col justify-end">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
img {
  @apply absolute w-full h-full object-cover m-0;
}

h2 {
  @apply mt-6 mb-2;
}
</style>
