<template>
  <div class="dashboard-card">
    <div class="relative pb-1/2">
      <slot name="image" />
    </div>
    <div class="flex">
      <div class="flex flex-wrap pr-4">
        <slot name="text" />
      </div>
      <div class="flex flex-shrink-0 items-end">
        <div>
          <slot name="button" />
        </div>
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
    @apply my-4 font-serif antialiased text-2xl font-black text-grey-dark;
  }
  p {
    @apply mb-0;
  }
}
</style>
