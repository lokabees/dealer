<template>
  <div class="w-full mx-auto object-center flex items-center bg-height">
    <client-only>
      <div
        v-if="!hideHero"
        class="select-none mx-auto antialiased tracking-tight p-4 md:p-6 text-2xl md:text-4xl font-serif text-center"
      >
        <p class="font-bold">{{ heroTitle }}</p>
        <p class="my-3 text-xl">{{ heroSubTitle }}</p>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    heroTitle: { type: String, default: '' },
    heroSubTitle: { type: String, default: '' },
    hideHero: { type: Boolean, default: true },
  },
}
</script>
