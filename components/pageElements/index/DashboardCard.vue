<template>
  <div class="dashboard-card">
    <div class="relative bg-grey pb-1/2">
      <slot name="image" />
    </div>
    <div class="flex">
      <div class="flex flex-wrap content-end">
        <slot name="text" />
      </div>
      <div class="flex flex-wrap content-end">
        <slot name="button" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-card {
  @apply w-full overflow-hidden px-4 my-4;

  @screen sm {
    @apply w-1/2;
  }
  img {
    @apply absolute w-full h-full object-cover my-0;
  }
  h2 {
    @apply my-2;
  }
  p {
    @apply mb-0;
  }
}
</style>
