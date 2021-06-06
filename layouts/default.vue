<template>
  <div class="flex flex-col min-h-screen bg-primary-lightest">
    <LayoutNavigation class="md:block sticky top-0 z-30 bg-primary-lightest" />
    <Nuxt class="h-full" />
    <LayoutFooter class="mt-auto" />
    <ElementsErrorModal />
    <ElementsCookiesConsent />
  </div>
</template>
