<template>
  <div class="border-black border-b">
    <div class="flex">
      <slot name="img"></slot>
      <div>
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
