<template>
  <div class="prose container grid grid-cols-3 gap-6 my-2">
    <div class="w-full border-t col-span-3"></div>
    <div class="text-center grid">
      <n-link to="/imprint">{{ $t('footer.links.imprint') }}</n-link>
      <n-link to="/privacy">{{ $t('footer.links.privacy') }}</n-link>
    </div>
    <div class="col-span-1 flex justify-center">
      <icon name="twitter" />
      <icon name="github" />
    </div>
    <div class="text-center grid">
      <n-link to="/contact">{{ $t('footer.links.contact') }}</n-link>
      <n-link to="/terms">{{ $t('footer.links.terms') }}</n-link>
    </div>
    <div class="col-span-3"></div>
  </div>
</template>

<script>
export default {}
</script>
