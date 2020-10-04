<template>
  <div class="border-grey-light border-b-2">
    <div class="flex">
      <div class="relative bg-grey h-32 w-32 rounded-lg my-4">
        <slot name="img"></slot>
      </div>
      <div class="pl-5">
        <slot />
      </div>
    </div>
    <div class="flex flex-col">
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
